import { Star, Quote, Heart } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-editorial-cream border-t border-editorial-peach">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-editorial-gold font-bold block">
            CLIENT SATISFACTION
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-editorial-burgundy tracking-tight">
            Exquisite Reviews & Love Notes
          </h2>
          <div className="w-12 h-px bg-editorial-gold/40 mx-auto" />
          <p className="text-sm text-editorial-burgundy/80 font-light leading-relaxed">
            Read from our wonderful brides and celebrants who trusted Suhani Henna with their most memorable lifecycle milestones.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="testimonials-grid">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-[#FDFBF7] border border-editorial-peach rounded-xs p-6 sm:p-8 flex flex-col justify-between relative shadow-3xs hover:border-editorial-gold/30 hover:shadow-2xs transition-all duration-300"
              id={`testimonial-card-${testimonial.id}`}
            >
              <div className="space-y-6">
                
                {/* Visual quote mark */}
                <div className="absolute top-6 right-6 text-editorial-gold/15 pointer-events-none">
                  <Quote className="w-10 h-10 fill-current" />
                </div>

                {/* Rating Stars */}
                <div className="flex items-center space-x-1" id={`stars-wrapper-${testimonial.id}`}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-editorial-gold fill-editorial-gold" />
                  ))}
                </div>

                {/* Testimonial message */}
                <p className="text-xs sm:text-sm text-editorial-burgundy/85 leading-relaxed italic font-light">
                  "{testimonial.content}"
                </p>

              </div>

              {/* Author footer banner */}
              <div className="mt-8 pt-5 border-t border-dashed border-editorial-peach flex items-center space-x-3">
                
                {/* Initial Avatar */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ring-1 ring-editorial-peach/30 ${testimonial.avatarColor}`}>
                  {testimonial.name.slice(0, 1)}
                </div>

                <div className="space-y-0.5">
                  <h4 className="font-serif text-sm font-semibold text-editorial-burgundy">
                    {testimonial.name}
                  </h4>
                  <span className="block text-[9px] text-editorial-burgundy/60 font-mono uppercase tracking-tight">
                    {testimonial.role} • {testimonial.date}
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Satisfaction Trust Anchor footer banner */}
        <div className="mt-16 bg-[#FDFBF7] border border-editorial-peach p-6 sm:p-8 rounded-xs flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-6 max-w-4xl mx-auto shadow-3xs" id="testimonials-trust-footer">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-editorial-peach/30 border border-editorial-gold/20 flex items-center justify-center p-2.5 shrink-0">
              <Heart className="w-6 h-6 text-editorial-burgundy fill-current" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-semibold text-editorial-burgundy">
                Pure Ingredients & Meticulous Handcraft
              </h4>
              <p className="text-[11px] text-editorial-burgundy/70 font-light mt-0.5">
                We stand strictly on 5-star ratings for hygiene, dark staining, skin-safety, and exquisite symmetric precision.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-editorial-burgundy tracking-[0.15em] uppercase font-mono bg-[#FDFBF7] px-4 py-2.5 rounded-xs border border-editorial-peach shadow-3xs hover:scale-102 transition-transform cursor-default select-none">
            ⭐⭐⭐⭐⭐ 4.9 YELP & GOOGLE RATING
          </span>
        </div>

      </div>
    </section>
  );
}
