import { motion } from 'motion/react';
import { Sparkles, HeartPulse, Palette, Leaf } from 'lucide-react';
import { ABOUT_IMAGE } from '../data';

export default function About() {
  return (
    <section
      id="about"
      className="py-24 md:py-32 bg-editorial-cream border-t border-b border-editorial-peach overflow-hidden relative"
    >
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-0 left-12 w-96 h-96 bg-editorial-peach/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-12 w-96 h-96 bg-editorial-gold/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Collage Box */}
          <motion.div 
            className="lg:col-span-6 relative flex justify-center order-last lg:order-first" 
            id="about-image-column"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Main Collage Container */}
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] p-3 bg-[#FDFBF7] rounded-xs border border-editorial-peach/80 shadow-xs">
              <div className="w-full h-full relative overflow-hidden rounded-xs bg-stone-50">
                <motion.img
                  src={ABOUT_IMAGE}
                  alt="Henna application process closeup"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Floating stamp tag */}
                <div className="absolute top-4 right-4 bg-editorial-burgundy text-editorial-cream px-3 py-1.5 rounded-xs flex items-center space-x-1.5 shadow-xs border border-editorial-gold/20">
                  <Sparkles className="w-3 h-3 text-editorial-gold animate-pulse" />
                  <span className="text-[9px] uppercase tracking-[0.15em] font-semibold font-mono">The Studio Handcraft</span>
                </div>

                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/55 to-transparent p-6 text-white text-left">
                  <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-editorial-gold font-semibold">Fresh Organic Paste</span>
                  <p className="text-xs font-light text-stone-200 mt-1">Brewed with premium essential oils & tea-infusions.</p>
                </div>
              </div>

              {/* Decorative back framing tile */}
              <div className="absolute -z-10 -bottom-6 -left-6 w-3/4 aspect-square rounded-xs bg-editorial-peach/25 border border-editorial-gold/15 hidden sm:block" />
            </div>
            
            {/* Cute floating leaf seal badge */}
            <motion.div 
              className="absolute -bottom-6 right-2 sm:right-6 bg-[#FDFBF7] border border-editorial-peach p-4 rounded-xs shadow-sm flex items-center space-x-3 max-w-[210px]"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="w-10 h-10 rounded-full bg-editorial-peach/40 flex items-center justify-center border border-editorial-gold/20 shrink-0">
                <Leaf className="w-4.5 h-4.5 text-editorial-burgundy" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-editorial-burgundy uppercase tracking-wider">Humble Startups</span>
                <span className="block text-[9px] text-editorial-burgundy/60 leading-tight mt-0.5">Bespoke Local Adornments</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Story Copy */}
          <div className="lg:col-span-6 space-y-10" id="about-text-column">
            
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-editorial-gold font-bold block">
                MEET SUHANI
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-editorial-burgundy tracking-tight leading-[1.15]">
                A Passion Born <br />
                from Pure Clay, Deep Stains & Community
              </h2>
              <div className="w-12 h-px bg-editorial-gold/40 mt-1" />
            </motion.div>

            <motion.div 
              className="space-y-6 text-editorial-burgundy/85 text-xs sm:text-sm leading-relaxed font-light"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <p>
                Hi, I’m <strong className="font-serif font-semibold text-editorial-burgundy">Suhani</strong>. Based in the <strong className="font-semibold text-editorial-burgundy">Greater Toronto Area (GTA)</strong>, my boutique henna artistry is a true labor of love. What began as a childhood fascination has blossomed into a growing business venture—one that I am balancing and nurturing while currently finishing high school.
              </p>
              
              <p>
                To me, henna is a living, breathing heritage art form. Starting this business has allowed me to turn quiet hours of drawing delicate mandalas and custom paisleys in quiet study halls into breathtaking real-world moments for brides and celebrants across Toronto and the GTA. Every single pattern is drawn completely freehand and custom-contoured to your hand.
              </p>

              <blockquote className="border-l-2 border-editorial-gold pl-4 py-1.5 italic text-editorial-burgundy/90 font-light text-xs sm:text-sm my-4 bg-editorial-peach/15 rounded-r-xs">
                "Balancing schoolwork with custom artistry has taught me that the most beautiful things in life are those we build with absolute devotion, patience, and pure raw ingredients."
              </blockquote>

              <p>
                Because visual depth should never come at the cost of wellness, I handcraft all of my paste from scratch in micro-batches. I source premium organic triple-sifted powder directly from Rajasthani farms, mixing it with pure cane sugar and therapeutic-grade lavender essential oils. This ensures a hypoallergenic, aromatic experience that yields rich, deep mahogany-sunset stains.
              </p>
            </motion.div>

            {/* Subtly designed decorative attributes cards rather than bullet lines */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-editorial-peach" 
              id="about-qualities"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2.5">
                  <Palette className="w-4 h-4 text-editorial-gold" />
                  <h4 className="text-[10px] font-bold text-editorial-burgundy uppercase tracking-widest font-mono">Bespoke Freehand</h4>
                </div>
                <p className="text-[11px] sm:text-xs text-editorial-burgundy/70 font-light leading-relaxed">
                  No generic stencils or decals. Every curve is tailored dynamically to complement your frame with precision.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2.5">
                  <HeartPulse className="w-4 h-4 text-editorial-gold" />
                  <h4 className="text-[10px] font-bold text-editorial-burgundy uppercase tracking-widest font-mono">Pure & Grounded</h4>
                </div>
                <p className="text-[11px] sm:text-xs text-editorial-burgundy/70 font-light leading-relaxed">
                  Completely raw, fresh-mixed paste. Hypoallergenic, skin-safe aromatherapy that stays safely fragrant.
                </p>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
