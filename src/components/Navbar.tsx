import { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Calendar, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onScrollToSection: (sectionId: string) => void;
  openBookingDashboard: () => void;
  bookingCount: number;
}

export default function Navbar({ onScrollToSection, openBookingDashboard, bookingCount }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'about', label: 'Our Story' },
    { id: 'services', label: 'Services' },
    { id: 'style-consultant', label: 'Style Finder' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'contact', label: 'Book' },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-editorial-cream/95 backdrop-blur-md shadow-xs py-3 border-b border-editorial-peach'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => onScrollToSection('hero')}
            id="nav-logo"
          >
            <div className="w-9 h-9 rounded-full bg-editorial-peach/40 flex items-center justify-center border border-editorial-gold/30 transition-transform duration-300 group-hover:rotate-12">
              <Sparkles className="w-4.5 h-4.5 text-editorial-burgundy" />
            </div>
            <div>
              <span className="font-serif block text-2xl tracking-[0.05em] font-medium text-editorial-burgundy">
                Suhani <span className="italic font-light text-editorial-gold">Henna</span>
              </span>
              <span className="text-[8px] tracking-[0.3em] block uppercase text-editorial-burgundy/60 font-mono">
                Bringing Tradition To Life
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-7" id="desktop-nav">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onScrollToSection(link.id)}
                className="text-editorial-burgundy/80 hover:text-editorial-gold text-[10px] tracking-[0.2em] uppercase font-semibold transition-colors cursor-pointer"
                id={`nav-link-${link.id}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={openBookingDashboard}
              className="relative p-2 text-editorial-burgundy/80 hover:text-editorial-gold transition-colors rounded-full hover:bg-editorial-peach/30 flex items-center"
              title="View my bookings"
              id="nav-appointments-btn"
            >
              <Calendar className="w-4.5 h-4.5" />
              {bookingCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[9px] font-bold leading-none text-white bg-editorial-burgundy rounded-full scale-90">
                  {bookingCount}
                </span>
              )}
            </button>
            <button
              onClick={() => onScrollToSection('contact')}
              className="px-5 py-2.5 border border-editorial-burgundy/40 text-[10px] uppercase tracking-[0.2em] font-semibold text-editorial-burgundy bg-transparent hover:border-editorial-burgundy hover:bg-editorial-burgundy hover:text-white transition-all duration-300 cursor-pointer"
              id="nav-book-btn"
            >
              Reserve Now
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center md:hidden space-x-4">
            <button
              onClick={openBookingDashboard}
              className="relative p-2 text-editorial-burgundy/80 hover:text-editorial-gold transition-colors rounded-full"
              id="mobile-appointments-btn"
            >
              <Calendar className="w-5 h-5" />
              {bookingCount > 0 && (
                <span className="absolute top-1 right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-[8px] font-bold leading-none text-white bg-editorial-burgundy rounded-full">
                  {bookingCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-editorial-burgundy hover:text-editorial-gold"
              id="mobile-menu-trigger"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-editorial-cream border-b border-editorial-peach max-h-[85vh] overflow-y-auto"
            id="mobile-nav-menu"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setIsOpen(false);
                    onScrollToSection(link.id);
                  }}
                  className="block w-full text-left px-4 py-2.5 rounded-lg text-editorial-burgundy/80 hover:text-editorial-gold hover:bg-[#FAF7F2] text-xs uppercase tracking-widest font-semibold"
                  id={`mobile-nav-link-${link.id}`}
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-4 border-t border-editorial-peach flex flex-col space-y-2 px-4">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    openBookingDashboard();
                  }}
                  className="flex items-center justify-center space-x-2 py-2 text-xs text-editorial-burgundy/80"
                  id="mobile-nav-appointments"
                >
                  <Calendar className="w-4 h-4" />
                  <span>My Appointments ({bookingCount})</span>
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onScrollToSection('contact');
                  }}
                  className="w-full text-center py-3 bg-editorial-burgundy hover:bg-editorial-gold text-white font-semibold text-xs uppercase tracking-widest"
                  id="mobile-nav-book"
                >
                  Reserve Appointment
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
