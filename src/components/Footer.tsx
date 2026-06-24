import { Sparkles, Instagram, Facebook, Compass } from 'lucide-react';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Footer({ onScrollToSection }: FooterProps) {
  return (
    <footer className="bg-editorial-burgundy text-[#FDFBF7] py-16 border-t border-editorial-burgundy/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main top columns grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-white/10 items-start" id="footer-top">
          
          {/* Logo Brand information */}
          <div className="md:col-span-12 lg:col-span-5 space-y-5">
            <div
              className="flex items-center space-x-2.5 cursor-pointer"
              onClick={() => onScrollToSection('hero')}
              id="footer-logo"
            >
              <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-editorial-gold">
                <Sparkles className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="font-serif block text-lg tracking-widest font-normal text-white uppercase">
                  Suhani <span className="text-editorial-gold">Henna</span>
                </span>
                <span className="text-[8px] tracking-[0.25em] block uppercase text-[#F8E1DA]/60 font-mono">
                  Bringing Tradition To Life
                </span>
              </div>
            </div>

            <p className="text-xs text-[#F8E1DA]/70 max-w-sm leading-relaxed font-light font-sans">
              Designing memories and custom luxury adornments utilizing fresh 100% natural organic henna recipes. Free from chemical additives, mixed fresh for each event.
            </p>

            {/* Travel locations banner */}
            <p className="text-[10px] text-editorial-gold font-mono flex items-center space-x-1.5 uppercase tracking-[0.15em] font-semibold">
              <Compass className="w-4 h-4 text-editorial-gold" />
              <span>Based in GTA, Ontario • Available for travel</span>
            </p>
          </div>

          {/* Quick links columns */}
          <div className="md:col-span-6 lg:col-span-4 space-y-4">
            <h4 className="font-serif text-xs font-normal uppercase tracking-[0.2em] text-editorial-gold">
              Explore
            </h4>
            
            <div className="grid grid-cols-2 gap-2 text-xs text-[#F8E1DA]/70 font-sans">
              <button
                onClick={() => onScrollToSection('about')}
                className="text-left hover:text-white transition-colors cursor-pointer"
              >
                Our Story
              </button>
              <button
                onClick={() => onScrollToSection('services')}
                className="text-left hover:text-white transition-colors cursor-pointer"
              >
                Services
              </button>
              <button
                onClick={() => onScrollToSection('style-consultant')}
                className="text-left hover:text-white transition-colors cursor-pointer"
              >
                Style Finder
              </button>
              <button
                onClick={() => onScrollToSection('gallery')}
                className="text-left hover:text-white transition-colors cursor-pointer"
              >
                Designs Grid
              </button>
              <button
                onClick={() => onScrollToSection('testimonials')}
                className="text-left hover:text-white transition-colors cursor-pointer"
              >
                Client Love
              </button>
              <button
                onClick={() => onScrollToSection('contact')}
                className="text-left hover:text-white transition-colors cursor-pointer"
              >
                Book Session
              </button>
            </div>
          </div>

          {/* Social connections */}
          <div className="md:col-span-6 lg:col-span-3 space-y-4">
            <h4 className="font-serif text-xs font-normal uppercase tracking-[0.2em] text-editorial-gold">
              Socialize
            </h4>
            <p className="text-xs text-[#F8E1DA]/70 font-light leading-relaxed font-sans">
              We publish daily henna stains, timelapse cone applications, and bridal stories on our socials!
            </p>

            <div className="flex items-center space-x-3 pt-2" id="footer-social-icons">
              {/* Instagram */}
              <a
                href="https://instagram.com/suhani_henna"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center text-gray-300 hover:text-white transition-all hover:scale-105"
                title="Follow us on Instagram"
              >
                <Instagram className="w-4.5 h-4.5" />
              </a>

              {/* TikTok/Pinterest style logo */}
              <a
                href="https://facebook.com/suhani_henna"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center text-gray-300 hover:text-white transition-all hover:scale-105"
                title="Like us on Facebook"
              >
                <Facebook className="w-4.5 h-4.5" />
              </a>

              <div className="text-[9px] text-[#F8E1DA]/60 font-mono uppercase tracking-widest pl-1 font-semibold leading-none">
                @suhani_henna
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom Metadata copyright info */}
        <div className="pt-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F8E1DA]/50 font-mono" id="footer-bottom">
          <p>© 2026 Suhani Henna Artistry. All Rights Reserved.</p>
          
          <div className="flex space-x-4 text-[9px] uppercase tracking-wider">
            <span className="hover:text-white transition-colors cursor-default">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-default">Terms</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-default">Pure Care</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
