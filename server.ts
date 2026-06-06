import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, getDoc } from "firebase/firestore";

dotenv.config();

// Initialize Firebase
const firebaseConfigPath = path.join(process.cwd(), "firebase-applet-config.json");
let db: any = null;
if (fs.existsSync(firebaseConfigPath)) {
  const firebaseConfig = JSON.parse(fs.readFileSync(firebaseConfigPath, "utf-8"));
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app, firebaseConfig.firestoreDatabaseId || "(default)");
  console.log("Firebase initialized successfully for persistence.");
} else {
  console.warn("firebase-applet-config.json not found, make sure Firebase is provisioned.");
}

// Fallback Simple file-based storage
const DB_FILE = path.join(process.cwd(), "bookings.json");

// Helper to read bookings
async function getBookings() {
  if (db) {
    try {
      const snap = await getDocs(collection(db, "bookings"));
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (e) {
      console.error("Error reading from Firestore, falling back to local:", e);
    }
  }
  if (!fs.existsSync(DB_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
  } catch (e) {
    return [];
  }
}

// Helper to update a booking
async function updateBookingStatus(id: string, status: string) {
  if (db) {
    try {
      await updateDoc(doc(db, "bookings", id), { status });
      const d = await getDoc(doc(db, "bookings", id));
      return { id: d.id, ...d.data() };
    } catch (e) {
      console.error("Error updating Firestore, falling back to local:", e);
    }
  }
  const bookings = await getBookings();
  const booking = bookings.find((b: any) => b.id === id);
  if (booking) {
    booking.status = status;
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(bookings, null, 2));
    } catch (e) {
      console.warn("Local storage write failed (Read-only on Netlify/Vercel)");
    }
  }
  return booking;
}

// Helper to write a new booking
async function addBooking(bookingData: any) {
  if (db) {
    try {
      const docRef = await addDoc(collection(db, "bookings"), bookingData);
      return { id: docRef.id, ...bookingData };
    } catch (e) {
      console.error("Error writing to Firestore, falling back to local:", e);
    }
  }
  const booking = { id: Date.now().toString(), ...bookingData };
  const bookings = await getBookings();
  bookings.push(booking);
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(bookings, null, 2));
  } catch (e) {
    console.warn("Local storage write failed (Read-only on Netlify/Vercel)");
  }
  return booking;
}

const app = express();

app.use(express.json());

// Email Transporter (Only works if user provides credentials in Settings -> API Keys)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// -------------- API ROUTES --------------

const apiRouter = express.Router();

// 1. Submit a new booking
apiRouter.post("/book", async (req, res) => {
  try {
    const bookingData = {
      ...req.body,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    const booking = await addBooking(bookingData);

    // Send Email to the business owner
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      const host = req.headers['x-forwarded-host'] || req.get('host');
      const protocol = req.headers['x-forwarded-proto'] || req.protocol;
      const appUrl = `${protocol}://${host}`;
      const adminPass = process.env.ADMIN_PASSWORD || 'secret';

      await transporter.sendMail({
        from: `"Suhani Henna" <${process.env.GMAIL_USER}>`,
        to: 'suhanihenna4@gmail.com',
        replyTo: booking.email,
        subject: `New Booking Request from ${booking.name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #4a2b29;">
            <h2 style="color: #4a2b29; border-bottom: 1px solid #e1cbb1; padding-bottom: 10px;">New Booking Request</h2>
            <p><strong>Name:</strong> ${booking.name}</p>
            <p><strong>Email:</strong> ${booking.email}</p>
            <p><strong>Phone:</strong> ${booking.phone}</p>
            <p><strong>Date:</strong> ${booking.date}</p>
            <p><strong>Type:</strong> ${booking.type}</p>
            <p><strong>Details:</strong> ${booking.details}</p>
            <br/>
            <div style="margin-top: 20px; display: flex; gap: 15px;">
              <a href="${appUrl}/?admin=${adminPass}&action=respond&status=accepted&bookingId=${booking.id}" style="background-color: #2e7d32; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Accept Request</a>
              <a href="${appUrl}/?admin=${adminPass}&action=respond&status=declined&bookingId=${booking.id}" style="background-color: #c62828; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block; margin-left: 10px;">Decline Request</a>
            </div>
          </div>
        `,
      });
    }

    res.status(200).json({ success: true, booking });
  } catch (err: any) {
    console.error("Booking error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. Get all bookings for the Admin Dashboard (secured by a simple admin password)
apiRouter.get("/bookings", async (req, res) => {
  const adminPass = req.headers.authorization;
  if (adminPass !== `Bearer ${process.env.ADMIN_PASSWORD || 'secret'}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const bookings = await getBookings();
  res.json(bookings);
});

// 3. Respond to a booking (Accept or Decline with Note)
apiRouter.post("/bookings/:id/respond", async (req, res) => {
  const adminPass = req.headers.authorization;
  if (adminPass !== `Bearer ${process.env.ADMIN_PASSWORD || 'secret'}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { status, note } = req.body;
    const booking = await updateBookingStatus(req.params.id, status);
    
    if (!booking) return res.status(404).json({ error: "Not found" });

    // Send Email back to the customer
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      
      const isAccepted = status === 'accepted';
      const subject = isAccepted ? 'Your Suhani Henna Booking is Confirmed!' : 'Update regarding your Suhani Henna request';
      
      const htmlContent = isAccepted ? `
          <div style="font-family: sans-serif; color: #4a2b29; max-width: 600px; margin: 0 auto; border: 1px solid #e1cbb1; padding: 30px; border-radius: 8px;">
            <h2 style="color: #4a2b29;">Booking Confirmed! ✨</h2>
            <p>Hi ${booking.name},</p>
            <p>I am thrilled to confirm your booking request for <strong>${booking.date}</strong> (${booking.type}).</p>
            ${note ? `<div style="background-color: #fdfbf7; padding: 15px; border-left: 3px solid #d4af37; margin: 20px 0;"><strong>Note from Suhani:</strong><br/>${note}</div>` : ''}
            <p>Please let me know if you have any inspiration photos you would like to share, and we will be in touch with further details.</p>
            <br/>
            <p>Warmly,</p>
            <p>Suhani<br/><em>Suhani Henna Studio</em></p>
          </div>
        ` : `
          <div style="font-family: sans-serif; color: #4a2b29; max-width: 600px; margin: 0 auto; border: 1px solid #e1cbb1; padding: 30px; border-radius: 8px;">
            <h2 style="color: #4a2b29;">Update regarding your Booking Request</h2>
            <p>Hi ${booking.name},</p>
            <p>Thank you so much for reaching out about booking me for <strong>${booking.date}</strong>.</p>
            ${note ? `<div style="background-color: #fdfbf7; padding: 15px; border-left: 3px solid #d4af37; margin: 20px 0;"><strong>Note from Suhani:</strong><br/>${note}</div>` : ''}
            <br/>
            <p>Warmly,</p>
            <p>Suhani<br/><em>Suhani Henna Studio</em></p>
          </div>
        `;

      await transporter.sendMail({
        from: `"Suhani Henna" <${process.env.GMAIL_USER}>`,
        to: booking.email,
        subject: subject,
        html: htmlContent,
      });
    }

    res.json({ success: true, booking });
  } catch (err: any) {
    console.error("Respond error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.use("/api", apiRouter);
app.use("/.netlify/functions/api", apiRouter);

// Export app for Vercel serverless integration
export default app;

async function startServer() {
  const PORT = process.env.PORT || 3000;

  // -------------- VITE MIDDLEWARE --------------
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Do not automatically start the server if in a Serverless environment (like Vercel)
if (!process.env.VERCEL) {
  startServer();
}
