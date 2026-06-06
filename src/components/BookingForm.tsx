import React, { useState, useEffect } from 'react';
import { Calendar, Mail, Phone, Instagram, Send, Sparkles, CheckSquare, Trash2, Edit3, X, Clock, HelpCircle } from 'lucide-react';
import { Booking } from '../types';

interface BookingFormProps {
  selectedServiceId: string;
  initialMessage: string;
  onBookingAdded: () => void;
  bookings: Booking[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
}

export default function BookingForm({
  selectedServiceId,
  initialMessage,
  onBookingAdded,
  bookings,
  setBookings,
}: BookingFormProps) {
  // Form input states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'bridal',
    date: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState<Booking | null>(null);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

  // Sync passed properties
  useEffect(() => {
    if (selectedServiceId) {
      setFormData(prev => ({
        ...prev,
        eventType: selectedServiceId,
      }));
    }
  }, [selectedServiceId]);

  useEffect(() => {
    if (initialMessage) {
      setFormData(prev => ({
        ...prev,
        message: initialMessage,
      }));
    }
  }, [initialMessage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculatePriceEstimate = (type: string) => {
    switch (type) {
      case 'bridal':
        return '$250+ (Royal Bridal Package)';
      case 'party':
        return '$160+ (Event Pricing: $80/hour)';
      case 'festival':
        return '$45+ (Festival Standard)';
      case 'custom':
        return 'Variable Pricing (Custom Estimate)';
      default:
        return 'TBD';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingBooking) {
        // Edit flow
        const updatedBookings = bookings.map((b) => {
          if (b.id === editingBooking.id) {
            return {
              ...b,
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              eventType: formData.eventType,
              date: formData.date,
              message: formData.message,
              priceEstimate: calculatePriceEstimate(formData.eventType),
            };
          }
          return b;
        });

        localStorage.setItem('suhani_bookings', JSON.stringify(updatedBookings));
        setBookings(updatedBookings);
        setEditingBooking(null);
      } else {
        // Create new booking
        const randomId = `SHB-${Math.floor(1000 + Math.random() * 9000)}`;
        const newBooking: Booking = {
          id: randomId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          eventType: formData.eventType,
          date: formData.date,
          message: formData.message,
          status: 'pending',
          createdAt: new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
          priceEstimate: calculatePriceEstimate(formData.eventType),
        };

        // Send to backend to trigger email
        const resp = await fetch('/api/book', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newBooking)
        });

        if (!resp.ok) {
          const errorData = await resp.json().catch(() => ({}));
          throw new Error(errorData.error || `Server responded with ${resp.status}`);
        }

        const updated = [newBooking, ...bookings];
        localStorage.setItem('suhani_bookings', JSON.stringify(updated));
        setBookings(updated);
        setShowReceiptModal(newBooking);
      }

      // Reset Form fields
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: 'bridal',
        date: '',
        message: '',
      });

      setIsSubmitting(false);
      onBookingAdded();
    } catch (err) {
      console.error("Booking error:", err);
      setIsSubmitting(false);
      alert("There was an issue processing your request. Please try again.");
    }
  };

  const handleDeleteBooking = (id: string) => {
    if (confirm('Are you sure you want to cancel and delete this reservation appointment?')) {
      const filtered = bookings.filter((b) => b.id !== id);
      localStorage.setItem('suhani_bookings', JSON.stringify(filtered));
      setBookings(filtered);
      onBookingAdded();
    }
  };

  const handleEditBookingClick = (booking: Booking) => {
    setEditingBooking(booking);
    setFormData({
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      eventType: booking.eventType,
      date: booking.date,
      message: booking.message || '',
    });
    // Scroll smoothly to form top
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCancelEdit = () => {
    setEditingBooking(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      eventType: 'bridal',
      date: '',
      message: '',
    });
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#FDFBF7] border-t border-editorial-peach scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dual Layout Column: Left (Form) - Right (My Appointments & Info) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: The Appointment Request Form */}
          <div className="lg:col-span-7 bg-editorial-cream border border-editorial-peach rounded-xs p-6 sm:p-10 shadow-xs">
            
            <div className="space-y-3 mb-8">
              <span className="text-[10px] uppercase tracking-[0.3em] text-editorial-gold font-bold block">
                RESERVE YOUR APPOINTMENT
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-editorial-burgundy tracking-tight">
                {editingBooking ? 'Modify My Reservation' : 'Request a Booking Session'}
              </h2>
              <p className="text-xs text-editorial-burgundy/70 font-light">
                {editingBooking 
                  ? `Editing reservation reference: ${editingBooking.id}. Fill out any field to update your booking details.`
                  : 'Submit the reservation details below. Suhani will review your request and contact you within 24 hours.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" id="appointment-form animate-fade-in">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-[9px] font-bold text-editorial-burgundy uppercase tracking-widest block font-mono">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Diya Patel"
                    className="w-full text-xs px-4 py-3.5 rounded-xs border border-editorial-peach bg-white text-editorial-burgundy focus:border-editorial-burgundy focus:outline-hidden transition-all font-sans font-medium"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-[9px] font-bold text-editorial-burgundy uppercase tracking-widest block font-mono">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g., diya@gmail.com"
                    className="w-full text-xs px-4 py-3.5 rounded-xs border border-editorial-peach bg-white text-editorial-burgundy focus:border-editorial-burgundy focus:outline-hidden transition-all font-sans font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone */}
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-[9px] font-bold text-editorial-burgundy uppercase tracking-widest block font-mono">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g., (647) 555-0199"
                    className="w-full text-xs px-4 py-3.5 rounded-xs border border-editorial-peach bg-white text-editorial-burgundy focus:border-editorial-burgundy focus:outline-hidden transition-all font-sans font-medium"
                  />
                </div>

                {/* Event Type Dropdown */}
                <div className="space-y-1.5">
                  <label htmlFor="eventType" className="text-[9px] font-bold text-editorial-burgundy uppercase tracking-widest block font-mono">Event Type</label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    className="w-full text-xs px-4 py-3.2 rounded-xs border border-editorial-peach bg-white text-editorial-burgundy focus:border-editorial-burgundy focus:outline-hidden transition-all cursor-pointer font-sans font-medium"
                  >
                    <option value="bridal">Royal Bridal Henna Package</option>
                    <option value="party">Party & Event Group Booking ($80/hr)</option>
                    <option value="festival">Festival & Holiday Mehndi</option>
                    <option value="custom">Custom & Concept Session</option>
                  </select>
                </div>
              </div>

              {/* Date */}
              <div className="space-y-1.5">
                <label htmlFor="date" className="text-[9px] font-bold text-editorial-burgundy uppercase tracking-widest block font-mono">Event Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full text-xs px-4 py-3.5 rounded-xs border border-editorial-peach bg-white text-editorial-burgundy focus:border-editorial-burgundy focus:outline-hidden transition-all cursor-pointer font-sans font-medium"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-[9px] font-bold text-editorial-burgundy uppercase tracking-widest block font-mono">Message / Design Request Details</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Share details such as desired coverage, themes, size of your assembly, or particular visual references..."
                  className="w-full text-xs px-4 py-3.5 rounded-xs border border-editorial-peach bg-white text-editorial-burgundy focus:border-editorial-burgundy focus:outline-hidden transition-all resize-y font-sans font-light"
                />
              </div>

              {/* Form buttons */}
              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-4 rounded-xs bg-editorial-burgundy hover:bg-editorial-gold text-white font-medium text-xs tracking-[0.2em] uppercase transition-colors select-none flex items-center justify-center space-x-2 cursor-pointer duration-300 shadow-xs"
                  id="reserve-submit-btn"
                >
                  <Send className="w-3.5 h-3.5 mt-0.5 text-white" />
                  <span>{isSubmitting ? 'Processing Request...' : editingBooking ? 'Save Modifications' : 'Reserve Appointment'}</span>
                </button>

                {editingBooking && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-5 py-4 rounded-xs border border-editorial-burgundy/30 text-editorial-burgundy font-medium text-xs uppercase tracking-[0.2em] hover:bg-editorial-peach/25 cursor-pointer duration-300"
                    id="cancel-edit-btn"
                  >
                    Cancel
                  </button>
                )}
              </div>

            </form>

          </div>

          {/* Right Column: Contact Details & Integrated Booking Dashboard panel */}
          <div className="lg:col-span-5 h-full space-y-10" id="contact-info-column">
            
            {/* Business Contact Cards */}
            <div className="bg-[#FDFBF7] border border-editorial-peach rounded-xs p-6 sm:p-8 space-y-6 shadow-3xs" id="contact-details-box">
              <h3 className="font-serif text-lg font-normal text-editorial-burgundy tracking-tight">
                Our Studio Info
              </h3>
              
              <div className="space-y-4">
                {/* Email address */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-editorial-peach/30 border border-editorial-gold/20 flex items-center justify-center text-editorial-burgundy shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[9px] text-editorial-burgundy/60 font-mono uppercase tracking-widest">Email Us</span>
                    <a href="mailto:suhani.henna.art@gmail.com" className="text-xs text-editorial-burgundy hover:text-editorial-gold font-semibold transition-colors">
                      suhani.henna.art@gmail.com
                    </a>
                  </div>
                </div>

                {/* Telephone Number */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-editorial-peach/30 border border-editorial-gold/20 flex items-center justify-center text-editorial-burgundy shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[9px] text-editorial-burgundy/60 font-mono uppercase tracking-widest">Call / Text</span>
                    <a href="tel:+16475550199" className="text-xs text-editorial-burgundy hover:text-editorial-gold font-semibold transition-colors">
                      +1 (647) 555-0199
                    </a>
                  </div>
                </div>

                {/* Instagram Handle */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-editorial-peach/30 border border-editorial-gold/20 flex items-center justify-center text-editorial-burgundy shrink-0 mt-0.5">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[9px] text-editorial-burgundy/60 font-mono uppercase tracking-widest">Instagram</span>
                    <a href="https://instagram.com/suhani_henna" target="_blank" rel="noopener noreferrer" className="text-xs text-editorial-burgundy hover:text-editorial-gold font-semibold transition-colors font-sans">
                      @suhani_henna
                    </a>
                  </div>
                </div>
              </div>

              {/* Working Hours statement */}
              <div className="pt-4 border-t border-editorial-peach/45 space-y-1.5 text-xs text-editorial-burgundy/80 font-light font-sans">
                <span className="block font-semibold text-editorial-burgundy uppercase text-[9px] tracking-widest font-mono">Studio Availability</span>
                <p>Monday – Sunday: 9:00 AM – 7:30 PM</p>
                <p>Private Travel availability for out-of-state weddings.</p>
              </div>
            </div>

            {/* Display list of active bookings if they exist! (Interactive Dashboard Panel!) */}
            {bookings.length > 0 && (
              <div className="bg-editorial-cream border border-editorial-peach rounded-xs p-6 sm:p-8 space-y-5 shadow-3xs" id="active-bookings-dashboard animate-fade-in">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-sm font-normal text-editorial-burgundy tracking-tight uppercase flex items-center space-x-1.5">
                    <CheckSquare className="w-4.5 h-4.5 text-editorial-burgundy" />
                    <span>My Reservations ({bookings.length})</span>
                  </h3>
                  <span className="text-[9px] uppercase tracking-wider text-editorial-burgundy bg-editorial-peach/50 border border-editorial-gold/20 px-2 py-0.5 rounded-xs font-mono font-bold">
                    Client Desk
                  </span>
                </div>

                {/* Scrollable list box */}
                <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1" id="bookings-client-list">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-[#FDFBF7] border border-editorial-peach rounded-xs p-4 space-y-3 shadow-3xs"
                      id={`client-booking-${booking.id}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[9px] bg-editorial-peach/40 text-editorial-burgundy border border-editorial-gold/20 px-1.5 py-0.5 rounded-xs font-mono font-bold block w-fit">
                            {booking.id}
                          </span>
                          <span className="text-xs font-bold text-editorial-burgundy block mt-1 uppercase tracking-tight">
                            {booking.eventType === 'bridal' ? 'Royal Bridal' : booking.eventType === 'party' ? 'Party/Event' : booking.eventType === 'festival' ? 'Festival' : 'Custom Concept'}
                          </span>
                        </div>

                        {/* Status Label */}
                        <span className="text-[9px] uppercase tracking-wider font-mono font-bold px-2 py-0.5 rounded-xs bg-[#FDFBF7] text-editorial-gold border border-editorial-peach flex items-center space-x-1">
                          <span className="text-emerald-500">●</span>
                          <span>{booking.status}</span>
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[10px] text-editorial-burgundy/70 border-t border-b border-editorial-peach/40 py-2 font-mono">
                        <div>
                          <span className="block text-[8px] uppercase font-bold text-editorial-burgundy/40">Date Selected</span>
                          <span>{booking.date}</span>
                        </div>
                        <div>
                          <span className="block text-[8px] uppercase font-bold text-editorial-burgundy/40">Rate Guideline</span>
                          <span className="text-editorial-burgundy font-sans tracking-tight block font-medium">{booking.priceEstimate}</span>
                        </div>
                      </div>

                      {/* Item controls */}
                      <div className="flex justify-end space-x-2 pt-1 font-semibold text-[9px] uppercase tracking-wider font-mono">
                        <button
                          onClick={() => handleEditBookingClick(booking)}
                          className="flex items-center space-x-1 px-3 py-1.5 rounded-xs border border-editorial-peach text-editorial-burgundy/80 hover:bg-editorial-peach/20 cursor-pointer duration-200"
                          id={`btn-edit-booking-${booking.id}`}
                        >
                          <Edit3 className="w-3 h-3 text-editorial-burgundy/40" />
                          <span>Modify</span>
                        </button>
                        <button
                          onClick={() => handleDeleteBooking(booking.id)}
                          className="flex items-center space-x-1 px-3 py-1.5 rounded-xs border border-editorial-peach text-rose-500 hover:bg-rose-50 cursor-pointer duration-200"
                          id={`btn-cancel-booking-${booking.id}`}
                        >
                          <Trash2 className="w-3 h-3 text-rose-400" />
                          <span>Cancel</span>
                        </button>
                      </div>

                    </div>
                  ))}
                </div>

                <p className="text-[10px] text-editorial-burgundy/50 text-center font-light font-sans">
                  *Dynamic persistent store matching local browser storage context.
                </p>

              </div>
            )}

          </div>

        </div>
      </div>

      {/* Booking Confirmation Receipt Mockup Modal (Spectacular success visual) */}
      {showReceiptModal && (
        <div
          className="fixed inset-0 z-100 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          id="receipt-confirmation-modal"
        >
          <div className="bg-[#FDFBF7] max-w-md w-full rounded-xs overflow-hidden shadow-2xl border border-editorial-peach relative flex flex-col justify-between" id="receipt-modal-inner">
            
            {/* Header branding */}
            <div className="h-1.5 bg-gradient-to-r from-editorial-burgundy via-editorial-gold to-editorial-peach" />
            
            <button
              onClick={() => setShowReceiptModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-xs bg-editorial-peach/30 border border-editorial-gold/20 hover:bg-editorial-peach/60 text-editorial-burgundy cursor-pointer transition-colors"
              id="close-receipt-btn"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Receipt Body */}
            <div className="p-6 sm:p-8 space-y-6 text-center">
              
              <div className="w-14 h-14 rounded-full bg-editorial-peach/30 text-editorial-burgundy border border-editorial-gold/20 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6 text-editorial-burgundy fill-editorial-gold/40" />
              </div>

              <div className="space-y-2">
                <span className="text-[9px] font-mono tracking-widest uppercase font-bold text-editorial-burgundy bg-editorial-peach/50 border border-editorial-gold/25 px-3 py-1 rounded-xs">
                  Request Received
                </span>
                <h3 className="font-serif text-xl font-normal text-editorial-burgundy tracking-tight">
                  Aesthetic Session Applied!
                </h3>
                <p className="text-xs text-editorial-burgundy/70 max-w-xs mx-auto font-light leading-relaxed font-sans">
                  Thank you, {showReceiptModal.name}! Here is your simulated reservation ticket details.
                </p>
              </div>

              {/* Dotted Lines Receipt Ticket */}
              <div className="border border-dashed border-editorial-peach bg-editorial-cream p-5 rounded-xs space-y-4 text-left font-mono text-[10px] text-editorial-burgundy/75 relative">
                
                {/* Visual half circles on margins simulating a ticket */}
                <div className="absolute top-1/2 -left-3 w-5 h-5 rounded-full bg-[#FDFBF7] border-r border-editorial-peach -translate-y-1/2" />
                <div className="absolute top-1/2 -right-3 w-5 h-5 rounded-full bg-[#FDFBF7] border-l border-editorial-peach -translate-y-1/2" />

                <div className="flex justify-between font-bold text-editorial-burgundy">
                  <span>RESERVATION ID:</span>
                  <span>{showReceiptModal.id}</span>
                </div>

                <div className="space-y-1 border-t border-b border-dashed border-editorial-peach py-2 text-xs text-editorial-burgundy font-sans">
                  <div className="flex justify-between font-mono text-[10px] text-editorial-burgundy/60">
                    <span>Selected Package:</span>
                    <span className="font-semibold text-editorial-burgundy uppercase">
                      {showReceiptModal.eventType === 'bridal' ? 'Royal Bridal' : showReceiptModal.eventType === 'party' ? 'Party Group' : showReceiptModal.eventType === 'festival' ? 'Festival' : 'Custom Concept'}
                    </span>
                  </div>
                  <div className="flex justify-between font-mono text-[10px] text-editorial-burgundy/60 mt-1">
                    <span>Desired Date:</span>
                    <span className="font-semibold text-editorial-burgundy">{showReceiptModal.date}</span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline font-bold text-editorial-burgundy pt-1">
                  <span>ESTIMATE PRICE:</span>
                  <span className="text-xs text-editorial-gold">{showReceiptModal.priceEstimate}</span>
                </div>

                <p className="text-[8px] text-center text-editorial-burgundy/40 font-sans italic pt-2">
                  *Suhani will send a confirmation SMS/email with final rate specs.
                </p>

                {/* Coupon bar */}
                <div className="border-t border-editorial-peach pt-3 text-center">
                  <span className="text-[10px] bg-editorial-peach/50 text-editorial-burgundy font-bold px-3 py-1.5 rounded-xs border border-editorial-gold/25 block font-mono">
                    PROMO CODE: ORGANICMEHNDI10
                  </span>
                  <span className="text-[7px] text-editorial-burgundy/60 block mt-1 uppercase font-sans font-bold">Show code at appt for 10% Off aftercare sealant</span>
                </div>

              </div>

              <div className="space-y-4 pt-4 font-sans">
                <p className="text-[10px] text-editorial-burgundy/60 leading-relaxed">
                  We sent a confirmation summary mock email to <strong>{showReceiptModal.email}</strong>. If you need to reschedule, use the client dashboard below the booking form.
                </p>
                
                <button
                  onClick={() => setShowReceiptModal(null)}
                  className="w-full py-3.5 rounded-xs bg-editorial-burgundy hover:bg-editorial-gold text-white font-medium text-xs tracking-[0.15em] uppercase cursor-pointer select-none transition-colors duration-300"
                  id="close-receipt-ok-btn"
                >
                  Great, Thank You!
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

    </section>
  );
}
