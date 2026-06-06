import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import { Booking } from './types';
import { Calendar, X, Sparkles, AlertCircle } from 'lucide-react';

export default function App() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('bridal');
  const [initialMessage, setInitialMessage] = useState<string>('');
  const [showBookingsDashboard, setShowBookingsDashboard] = useState<boolean>(false);
  const [adminPass, setAdminPass] = useState<string | null>(null);

  useEffect(() => {
    // Check if URL has ?admin=xyz parameter
    const params = new URLSearchParams(window.location.search);
    const adminParam = params.get('admin');
    if (adminParam) {
      setAdminPass(adminParam);
    }
  }, []);

  // Load bookings from LocalStorage on mount
  useEffect(() => {
    const local = localStorage.getItem('suhani_bookings');
    if (local) {
      try {
        setBookings(JSON.parse(local));
      } catch (e) {
        console.error('Failed to parse local suhani bookings', e);
      }
    }
  }, []);

  const handleBookingAdded = () => {
    // Re-sync state from localStorage when child makes updates
    const local = localStorage.getItem('suhani_bookings');
    if (local) {
      setBookings(JSON.parse(local));
    } else {
      setBookings([]);
    }
  };

  const handleSelectService = (serviceId: string, messageTemplate: string) => {
    setSelectedServiceId(serviceId);
    setInitialMessage(messageTemplate);
  };

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'style-consultant') {
      const el = document.getElementById('style-consultant');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openBookingDashboard = () => {
    setShowBookingsDashboard(true);
  };

  // If we are in admin mode, show the dashboard entirely
  if (adminPass) {
    return <AdminDashboard adminPass={adminPass} />;
  }

  return (
    <div className="bg-editorial-cream text-editorial-burgundy min-h-screen font-sans selection:bg-editorial-peach selection:text-editorial-burgundy" id="suhani-henna-app">

      
      {/* Navbar Integration */}
      <Navbar
        onScrollToSection={scrollToSection}
        openBookingDashboard={openBookingDashboard}
        bookingCount={bookings.length}
      />

      {/* Hero Section */}
      <Hero onScrollToSection={scrollToSection} />

      {/* About Section */}
      <About />

      {/* Services List and Quiz section */}
      <Services
        onSelectService={handleSelectService}
        onScrollToSection={scrollToSection}
      />

      {/* Design Portfolio Gallery */}
      <Gallery
        onSelectService={handleSelectService}
        onScrollToSection={scrollToSection}
      />

      {/* Testimonials */}
      <Testimonials />

      {/* Interactive Booking & Appointment Manager Panel */}
      <BookingForm
        selectedServiceId={selectedServiceId}
        initialMessage={initialMessage}
        onBookingAdded={handleBookingAdded}
        bookings={bookings}
        setBookings={setBookings}
      />

      {/* Footer Branding */}
      <Footer onScrollToSection={scrollToSection} />

      {/* Integrated Overhang Appointments Dashboard Modal */}
      {showBookingsDashboard && (
        <div
          className="fixed inset-0 z-100 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          id="global-bookings-dashboard-modal"
        >
          <div className="bg-[#FDFBF7] border border-editorial-peach max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl relative" id="bookings-modal-inner">
            
            {/* Top accent border */}
            <div className="h-2 bg-gradient-to-r from-editorial-gold to-editorial-burgundy" />

            {/* Close trigger button */}
            <button
              onClick={() => setShowBookingsDashboard(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 cursor-pointer"
              id="close-dashboard-btn"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Dashboard Content */}
            <div className="p-6 sm:p-8 space-y-6">
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-editorial-peach/30 border border-editorial-gold/20 flex items-center justify-center text-editorial-burgundy">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-editorial-burgundy">
                    My Active Reservations
                  </h3>
                  <span className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.2em] block">
                    Suhani Client Desk Dashboard
                  </span>
                </div>
              </div>

              {bookings.length > 0 ? (
                <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1" id="modal-bookings-list">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-[#FDFBF7] border border-editorial-peach rounded-xl p-4.5 space-y-3"
                      id={`modal-booking-${booking.id}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] bg-editorial-peach/40 border border-editorial-gold/20 text-editorial-burgundy px-2 py-0.5 rounded-sm font-mono font-bold block w-fit">
                            {booking.id}
                          </span>
                          <span className="text-sm font-bold text-editorial-burgundy block mt-1 uppercase tracking-tight">
                            {booking.eventType === 'bridal' ? 'Royal Bridal' : booking.eventType === 'party' ? 'Party/Event' : booking.eventType === 'festival' ? 'Festival' : 'Custom Concept'}
                          </span>
                        </div>

                        <span className="text-[9px] uppercase tracking-wider font-mono font-bold px-2 py-0.5 rounded-full bg-white text-editorial-gold border border-editorial-gold/30 animate-pulse">
                          {booking.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-500 border-t border-b border-dashed border-editorial-peach py-2 font-mono">
                        <div>
                          <span className="block text-[8px] uppercase font-bold text-gray-400">Date Requested</span>
                          <span>{booking.date}</span>
                        </div>
                        <div>
                          <span className="block text-[8px] uppercase font-bold text-gray-400">Price Estimate</span>
                          <span className="text-editorial-burgundy font-sans tracking-tight block font-semibold">{booking.priceEstimate}</span>
                        </div>
                      </div>

                      {/* Client meta details */}
                      <div className="space-y-1 text-[11px] text-[#5A1A1A]/90 font-light">
                        <p><strong>Contact:</strong> {booking.name} • {booking.phone}</p>
                        {booking.message && <p className="truncate italic"><strong>Note:</strong> "{booking.message}"</p>}
                      </div>

                      {/* Action trigger footer */}
                      <div className="flex justify-end pt-1">
                        <button
                          onClick={() => {
                            setShowBookingsDashboard(false);
                            // Scroll to BookingForm to edit
                            const element = document.getElementById('contact');
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          className="text-[10px] uppercase tracking-widest font-bold text-editorial-burgundy hover:text-editorial-gold"
                        >
                          Modify / Cancel ➔
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 px-4 space-y-4" id="modal-dashboard-empty">
                  <div className="w-12 h-12 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto border border-gray-100">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">No Active Reserved Sessions</p>
                    <p className="text-[11px] text-gray-400 font-light max-w-xs mx-auto">
                      Fill out the appointment request form in the bookings section to request a custom henna artwork session.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowBookingsDashboard(false);
                      scrollToSection('services');
                    }}
                    className="px-4 py-2 bg-[#5A1A1A] hover:bg-[#D4AF37] text-white rounded-xl text-[10px] uppercase tracking-widest font-bold font-mono transition-all"
                  >
                    View Packages
                  </button>
                </div>
              )}

              {/* Modal controls */}
              <button
                onClick={() => setShowBookingsDashboard(false)}
                className="w-full py-3.5 rounded-xl bg-editorial-burgundy hover:bg-editorial-gold text-white font-semibold text-xs uppercase tracking-widest cursor-pointer mt-2 shadow-xs text-center block"
                id="modal-dashboard-exit-btn"
              >
                Done, Back to Site
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
