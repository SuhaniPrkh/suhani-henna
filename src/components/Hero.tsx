import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake, Leaf } from 'lucide-react';
import { HERO_IMAGE } from '../data';
import { motion } from 'motion/react';

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Hero({ onScrollToSection }: HeroProps) {
  // Staggered child variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="hero"
      className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-editorial-cream min-h-screen flex items-center"
    >
      {/* Soft overlay patterns or background blurs */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 bg-editorial-peach/30 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-editorial-gold/10 rounded-full filter blur-3xl pointer-events-none" />

      {/* Traditional mandala outline background (Stylized CSS pattern) */}
      <motion.div 
        className="absolute right-[-100px] top-[-100px] opacity-10 select-none pointer-events-none text-editorial-gold hidden lg:block"
        initial={{ rotate: -15, opacity: 0 }}
        animate={{ rotate: 0, opacity: 0.1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <svg width="400" height="400" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1,1" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <path d="M 50 0 L 50 100 M 0 50 L 100 50 M 15 15 L 85 85 M 15 85 L 85 15" stroke="currentColor" strokeWidth="0.2" />
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center font-sans">
          
          {/* Left Column: Context Branding */}
          <motion.div 
            className="lg:col-span-7 space-y-8 text-center lg:text-left" 
            id="hero-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            
            {/* Top Badge */}
            <motion.div 
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-xs bg-editorial-peach/40 border border-[#D4AF37]/25 shadow-xs"
              variants={itemVariants}
            >
              <Sparkles className="w-3.5 h-3.5 text-editorial-burgundy" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-editorial-burgundy font-bold">
                Bespoke Organic Ornaments
              </span>
            </motion.div>

            {/* Main Title & Tagline */}
            <div className="space-y-4">
              <motion.h1 
                className="font-serif text-4xl sm:text-5xl lg:text-6.5xl font-normal text-editorial-burgundy tracking-tight leading-[1.1] sm:leading-[1.15]"
                variants={itemVariants}
              >
                An Elegant <span className="italic font-light text-editorial-gold">Mehndi Story</span> <br className="hidden sm:inline" />
                Drawn With Pure Devotion
              </motion.h1>
              <motion.p 
                className="text-sm sm:text-base text-editorial-burgundy/80 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed"
                variants={itemVariants}
              >
                Expertly handcrafted, luxury henna artwork utilizing 100% natural, hand-ground leaves and organic essential oils for a deep, brilliant, rich mahogany sunset stain.
              </motion.p>
            </div>

            {/* CTAs with beautiful architectural square button style */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              variants={itemVariants}
            >
              <button
                onClick={() => onScrollToSection('contact')}
                className="w-full sm:w-auto px-8 py-4 rounded-xs bg-editorial-burgundy hover:bg-editorial-gold active:scale-98 text-white font-medium text-xs tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2 group cursor-pointer duration-300"
                id="hero-book-cta"
              >
                Book Your Experience
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button
                onClick={() => onScrollToSection('style-consultant')}
                className="w-full sm:w-auto px-8 py-4 rounded-xs border border-editorial-burgundy text-editorial-burgundy bg-transparent hover:bg-editorial-burgundy hover:text-white active:scale-98 transition-all duration-300 font-medium text-xs tracking-[0.2em] uppercase cursor-pointer"
                id="hero-quiz-cta"
              >
                Find My Style
              </button>
            </motion.div>

            {/* Quality Anchors */}
            <motion.div 
              className="border-t border-editorial-peach pt-6 grid grid-cols-3 gap-4" 
              id="hero-highlights"
              variants={itemVariants}
            >
              <div className="text-center lg:text-left space-y-1">
                <div className="flex items-center justify-center lg:justify-start text-editorial-burgundy space-x-1.5">
                  <Leaf className="w-3.5 h-3.5 text-editorial-burgundy" />
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-editorial-burgundy">100% Organic</span>
                </div>
                <p className="text-[10px] text-gray-500 font-sans">No chemicals, therapeutic grade</p>
              </div>

              <div className="text-center lg:text-left space-y-1">
                <div className="flex items-center justify-center lg:justify-start text-editorial-burgundy space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-editorial-burgundy" />
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-editorial-burgundy">Bespoke Art</span>
                </div>
                <p className="text-[10px] text-gray-500 font-sans">Custom hand-drawn layouts</p>
              </div>

              <div className="text-center lg:text-left space-y-1">
                <div className="flex items-center justify-center lg:justify-start text-editorial-burgundy space-x-1.5">
                  <HeartHandshake className="w-3.5 h-3.5 text-editorial-burgundy" />
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-editorial-burgundy">Sunset Stain</span>
                </div>
                <p className="text-[10px] text-gray-500 font-sans">Guaranteed rich mahogany color</p>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column: Imagery with Palatial Arched Mask */}
          <motion.div 
            className="lg:col-span-5 relative flex justify-center py-6" 
            id="hero-image-wrapper"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* The decorative frame - arched structure evoking architectural motifs */}
            <div className="relative w-full max-w-sm sm:max-w-md aspect-4/5 sm:aspect-[3/4] bg-editorial-cream rounded-t-full border-[8px] border-editorial-peach shadow-2xl p-2.5 overflow-hidden ring-1 ring-editorial-gold/25">
              
              {/* Actual Image */}
              <motion.img
                src={HERO_IMAGE}
                alt="Intricate Suhani Henna design on hands"
                className="w-full h-full object-cover rounded-t-full"
                referrerPolicy="no-referrer"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.6 }}
              />

              {/* Decorative interior elegant overlay ring */}
              <div className="absolute inset-4 rounded-t-full border border-dashed border-editorial-gold/40 pointer-events-none" />

              {/* Glowing accent circle */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-editorial-gold/15 rounded-full filter blur-xl pointer-events-none" />
            </div>

            {/* Quick trust floaty card widget with Editorial styling */}
            <motion.div 
              className="absolute bottom-10 left-[-15px] sm:left-[-30px] bg-[#FDFBF7]/95 backdrop-blur-md border border-editorial-peach p-4 rounded-xs shadow-md flex items-center space-x-3 hidden sm:flex max-w-[210px]"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="w-9 h-9 rounded-full bg-editorial-peach flex items-center justify-center border border-editorial-gold/25">
                <ShieldCheck className="w-4.5 h-4.5 text-editorial-burgundy" />
              </div>
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-wide text-editorial-burgundy">Bridal Calendar</span>
                <span className="block text-[9px] text-editorial-gold font-mono font-semibold uppercase tracking-wider">Dates Securing Quickly</span>
              </div>
            </motion.div>

            {/* Little aesthetic dot clusters */}
            <div className="absolute top-1/10 left-5 flex flex-col gap-1 text-editorial-gold opacity-80">
              <span className="text-xs font-mono">•</span>
              <span className="text-xs font-mono">•</span>
              <span className="text-xs font-mono">•</span>
            </div>
            <div className="absolute bottom-1/5 right-5 flex gap-1 text-editorial-gold opacity-80 font-mono">
              <span className="text-xs">•</span>
              <span className="text-xs">•</span>
              <span className="text-xs">•</span>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
