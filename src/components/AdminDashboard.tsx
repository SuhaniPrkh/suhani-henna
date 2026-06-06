import React, { useState, useEffect } from 'react';

export default function AdminDashboard({ adminPass }: { adminPass: string }) {
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Quick Respond State
  const [respondMode, setRespondMode] = useState<boolean>(false);
  const [respondBookingId, setRespondBookingId] = useState<string | null>(null);
  const [respondStatus, setRespondStatus] = useState<string | null>(null);
  const [respondNote, setRespondNote] = useState<string>('');
  const [isResponding, setIsResponding] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const action = params.get('action');
    const status = params.get('status');
    const bookingId = params.get('bookingId');
    if (action === 'respond' && status && bookingId) {
      setRespondMode(true);
      setRespondStatus(status);
      setRespondBookingId(bookingId);
    }
  }, []);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/bookings', {
        headers: { 'Authorization': `Bearer ${adminPass}` }
      });
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      } else {
        alert("Invalid Admin Password");
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!respondMode) {
      fetchBookings();
    }
  }, [respondMode]);

  const handleRespond = async () => {
    setIsResponding(true);
    try {
      const res = await fetch(`/api/bookings/${respondBookingId}/respond`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${adminPass}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: respondStatus, note: respondNote })
      });
      if (res.ok) {
        alert(`Successfully ${respondStatus} booking and sent email to client!`);
        window.location.href = `/?admin=${adminPass}`; // Go back to normal dashboard
      } else {
        alert("Failed to respond to booking.");
      }
    } catch (e) {
      console.error(e);
      alert("Error responding to booking.");
    }
    setIsResponding(false);
  };

  if (respondMode) {
    return (
      <div className="min-h-screen bg-editorial-cream flex items-center justify-center p-4">
        <div className="bg-white p-8 max-w-lg w-full rounded-xs shadow-xl border border-editorial-peach">
          <h2 className="text-2xl font-serif text-editorial-burgundy mb-4">
            {respondStatus === 'accepted' ? 'Accepting Request' : 'Declining Request'}
          </h2>
          <p className="text-sm mb-4">Add an optional personal note to include in the email sent to the client.</p>
          <textarea
            value={respondNote}
            onChange={(e) => setRespondNote(e.target.value)}
            className="w-full h-32 p-3 border border-editorial-peach bg-editorial-cream/30 focus:outline-hidden focus:border-editorial-burgundy mb-4 font-sans text-sm"
            placeholder={respondStatus === 'accepted' ? "e.g., I'd love to work with you! Can you send me some inspiration photos?" : "e.g., Unfortunately, I am completely booked for that date."}
          ></textarea>
          <div className="flex justify-end gap-3">
            <button 
              onClick={() => window.location.href = `/?admin=${adminPass}`}
              className="px-4 py-2 border border-editorial-burgundy text-editorial-burgundy uppercase text-xs tracking-wider"
            >
              Cancel
            </button>
            <button 
              onClick={handleRespond}
              disabled={isResponding}
              className={`px-4 py-2 text-white uppercase text-xs tracking-wider ${respondStatus === 'accepted' ? 'bg-green-700' : 'bg-red-700'} ${isResponding ? 'opacity-50' : ''}`}
            >
              {isResponding ? 'Sending...' : `Confirm & Send Email`}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-editorial-cream p-8">
      <h1 className="text-3xl font-serif text-editorial-burgundy mb-6">Admin Booking Dashboard</h1>
      {isLoading ? (
        <p>Loading bookings...</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b.id} className="bg-white p-6 rounded-xs shadow-md border border-editorial-peach flex flex-col md:flex-row justify-between">
              <div>
                <h2 className="text-xl font-bold text-editorial-burgundy">{b.name}</h2>
                <p className="text-sm"><strong>Email:</strong> {b.email} | <strong>Phone:</strong> {b.phone}</p>
                <p className="text-sm"><strong>Date:</strong> {b.date} | <strong>Type:</strong> {b.eventType}</p>
                <p className="text-sm mt-2 italic">{b.message}</p>
              </div>
              <div className="text-left md:text-right mt-4 md:mt-0">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${b.status === 'accepted' ? 'bg-green-100 text-green-800' : b.status === 'declined' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {b.status.toUpperCase()}
                </span>
                <br /><br />
                {b.status === 'pending' && (
                  <div className="flex gap-2 justify-end">
                    <button 
                      onClick={() => {
                        window.location.href = `/?admin=${adminPass}&action=respond&status=accepted&bookingId=${b.id}`;
                      }}
                      className="px-4 py-2 bg-green-700 text-white text-xs font-bold tracking-widest hover:bg-opacity-90 transition-all rounded-xs uppercase cursor-pointer"
                    >
                      Accept
                    </button>
                    <button 
                      onClick={() => {
                        window.location.href = `/?admin=${adminPass}&action=respond&status=declined&bookingId=${b.id}`;
                      }}
                      className="px-4 py-2 bg-red-700 text-white text-xs font-bold tracking-widest hover:bg-opacity-90 transition-all rounded-xs uppercase cursor-pointer"
                    >
                      Decline
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {bookings.length === 0 && <p>No bookings received yet, or local JSON was reset.</p>}
        </div>
      )}
    </div>
  );
}
