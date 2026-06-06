import { useState } from 'react';
import { Sparkles, Users, Calendar, HeartHandshake, Check, HelpCircle, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';
import { SERVICES, CONSULTANT_QUESTIONS } from '../data';
import { Service } from '../types';

interface ServicesProps {
  onSelectService: (serviceName: string, messageTemplate: string) => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function Services({ onSelectService, onScrollToSection }: ServicesProps) {
  // Quiz states
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<{ [key: string]: number }>({
    bridal: 0,
    party: 0,
    festival: 0,
    custom: 0,
  });
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [recommendedStyle, setRecommendedStyle] = useState<Service | null>(null);

  // Map icon strings to icon components safely
  const getIcon = (name: string) => {
    switch (name) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-editorial-burgundy" />;
      case 'Users':
        return <Users className="w-5 h-5 text-editorial-burgundy" />;
      case 'Calendar':
        return <Calendar className="w-5 h-5 text-editorial-burgundy" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-editorial-burgundy" />;
      default:
        return <Sparkles className="w-5 h-5 text-editorial-burgundy" />;
    }
  };

  const handleOptionClick = (points: { [key: string]: number }) => {
    // Accumulate scores
    const updatedScores = { ...scores };
    Object.keys(points).forEach((key) => {
      updatedScores[key] = (updatedScores[key] || 0) + (points[key] || 0);
    });
    setScores(updatedScores);

    if (currentQuestion < CONSULTANT_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate winner
      let highestScore = -1;
      let winnerId = 'bridal';

      Object.keys(updatedScores).forEach((key) => {
        if (updatedScores[key] > highestScore) {
          highestScore = updatedScores[key];
          winnerId = key;
        }
      });

      const matchedService = SERVICES.find((s) => s.id === winnerId) || SERVICES[0];
      setRecommendedStyle(matchedService);
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScores({ bridal: 0, party: 0, festival: 0, custom: 0 });
    setQuizCompleted(false);
    setRecommendedStyle(null);
  };

  const handleApplyRecommended = () => {
    if (recommendedStyle) {
      const template = `Hi Suhani, I took your Style Finder Quiz and my perfect recommendation was "${recommendedStyle.name}"! I would love to reserve my appointment with this package.`;
      
      // Let parent handle setup & scroll
      onSelectService(recommendedStyle.id, template);
      onScrollToSection('contact');
    }
  };

  const handleServiceCardClick = (service: Service) => {
    const template = `Hi Suhani, I am interested in reserving the "${service.name}" package. I'd love to ask about availability and any customize detail options.`;
    onSelectService(service.id, template);
    onScrollToSection('contact');
  };

  return (
    <div id="services-parent">
      {/* Services Listing Section */}
      <section id="services" className="py-20 md:py-28 bg-editorial-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-editorial-gold font-bold block">
              OUR ARTISTIC PACKAGES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-editorial-burgundy tracking-tight">
              Aesthetic Services & Custom Offerings
            </h2>
            <div className="w-12 h-px bg-editorial-gold/40 mx-auto" />
            <p className="text-sm text-editorial-burgundy/80 font-light leading-relaxed">
              We offer several signature mehndi options scaled to fit your unique events. Each session includes premium hand-mixed organic paste and our signature aftercare sealing solution.
            </p>
          </div>

          {/* Service grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10" id="services-grid">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="bg-[#FDFBF7] border border-editorial-peach rounded-xs overflow-hidden shadow-xs hover:border-editorial-gold/40 transition-all duration-300 flex flex-col justify-between group h-full"
                id={`service-card-${service.id}`}
              >
                <div>
                  {/* Thumbnail Banner */}
                  <div className="relative aspect-16/9 overflow-hidden bg-stone-100 border-b border-editorial-peach">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    
                    {/* Corner Service Label Tag */}
                    <div className="absolute top-4 right-4 bg-[#FDFBF7] px-3 py-1 rounded-xs flex items-center space-x-1.5 border border-editorial-peach shadow-xs">
                      <span className="text-[9px] uppercase tracking-wider font-semibold text-editorial-burgundy font-mono">
                        {service.duration}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 flex items-center space-x-2.5 text-white">
                      <div className="w-8 h-8 rounded-full bg-[#FDFBF7] flex items-center justify-center border border-editorial-gold/35">
                        {getIcon(service.iconName)}
                      </div>
                      <h3 className="font-serif text-lg font-medium tracking-tight">
                        {service.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8 space-y-6">
                    <div className="flex justify-between items-baseline border-b border-editorial-peach/20 pb-4">
                      <span className="text-[10px] uppercase tracking-wider text-editorial-gold font-bold">Price Range</span>
                      <span className="font-serif text-lg font-semibold text-editorial-burgundy">{service.price}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-editorial-burgundy/80 leading-relaxed font-light">
                      {service.description}
                    </p>

                    {/* Features list */}
                    <ul className="space-y-2 text-xs text-editorial-burgundy/80">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2.5">
                          <Check className="w-3.5 h-3.5 text-editorial-burgundy shrink-0 mt-0.5" />
                          <span className="font-light">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Button footer */}
                <div className="px-6 pb-6 pt-2">
                  <button
                    onClick={() => handleServiceCardClick(service)}
                    className="w-full py-3.5 rounded-xs border border-editorial-burgundy text-[10px] uppercase tracking-[0.2em] font-bold text-editorial-burgundy bg-transparent hover:bg-editorial-burgundy hover:text-white transition-all cursor-pointer duration-300"
                    id={`btn-select-service-${service.id}`}
                  >
                    Select & Customize
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Style Consultant Quiz Section */}
      <section
        id="style-consultant"
        className="py-16 md:py-24 bg-editorial-cream border-t border-b border-editorial-peach relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-editorial-peach/20 rounded-full filter blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 font-sans">
          <div className="text-center space-y-3 mb-12">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-xs bg-editorial-peach/30 border border-editorial-gold/25">
              <HelpCircle className="w-3.5 h-3.5 text-editorial-burgundy" />
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-editorial-burgundy">Interactive Consultant</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-editorial-burgundy">
              Style Finder Quiz
            </h2>
            <p className="text-xs text-editorial-burgundy/70 max-w-lg mx-auto font-light">
              Answer 3 brief stylistic questions to find the perfect henna design packages matching your event and aesthetic taste.
            </p>
          </div>

          {/* Quiz Card Box */}
          <div className="bg-[#FDFBF7] border border-editorial-peach rounded-xs p-6 sm:p-10 shadow-md" id="quiz-card-box">
            {!quizCompleted ? (
              <div className="space-y-8" id="quiz-active">
                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] text-editorial-burgundy/60 font-mono tracking-[0.2em]">
                    <span>PROGRESS</span>
                    <span>{currentQuestion + 1} OF {CONSULTANT_QUESTIONS.length}</span>
                  </div>
                  <div className="h-1 w-full bg-editorial-peach/30 rounded-xs overflow-hidden">
                    <div
                      className="h-full bg-editorial-burgundy transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / CONSULTANT_QUESTIONS.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Question */}
                <h3 className="font-serif text-xl font-normal text-editorial-burgundy text-center sm:text-left leading-normal">
                  {CONSULTANT_QUESTIONS[currentQuestion].text}
                </h3>

                {/* Options list */}
                <div className="grid grid-cols-1 gap-3.5" id="quiz-options">
                  {CONSULTANT_QUESTIONS[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionClick(option.points)}
                      className="w-full text-left p-4 rounded-xs border border-editorial-peach hover:border-editorial-burgundy bg-white hover:bg-editorial-peach/10 text-editorial-burgundy/85 hover:text-editorial-burgundy font-semibold text-xs sm:text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-3xs"
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center space-y-8 py-4" id="quiz-match-screen">
                <div className="w-16 h-16 rounded-full bg-[#FDFBF7] border border-editorial-gold/30 text-editorial-burgundy flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-editorial-burgundy" />
                </div>

                <div className="space-y-2">
                  <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-editorial-burgundy bg-editorial-peach/50 px-3 py-1 rounded-xs border border-editorial-gold/20">
                    96% PERSONAL MATCH RATING
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-editorial-burgundy mt-2">
                    Your Perfect Match: {recommendedStyle?.name}
                  </h3>
                  <p className="text-xs text-editorial-burgundy/70 max-w-sm mx-auto font-light">
                    Based on your occasion and desired coverage, we recommend reserving this customized service package.
                  </p>
                </div>

                {/* Match Summary Box */}
                {recommendedStyle && (
                  <div className="max-w-md mx-auto aspect-16/9 relative rounded-xs overflow-hidden border border-editorial-peach shadow-md">
                    <img
                      src={recommendedStyle.image}
                      alt={recommendedStyle.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-5 text-left text-white">
                      <span className="text-[9px] uppercase font-mono tracking-widest text-editorial-gold font-bold">Recommended Service</span>
                      <h4 className="font-sans text-base font-bold">{recommendedStyle.name}</h4>
                      <p className="text-[11px] text-gray-200 font-light truncate mt-1">{recommendedStyle.description}</p>
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-sm mx-auto">
                  <button
                    onClick={handleApplyRecommended}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xs bg-editorial-burgundy hover:bg-editorial-gold text-white font-medium text-xs tracking-[0.15em] uppercase flex items-center justify-center gap-2 cursor-pointer transition-colors duration-300"
                    id="btn-quiz-apply"
                  >
                    Apply & Reserve Style
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={resetQuiz}
                    className="w-full sm:w-auto px-5 py-3.5 rounded-xs border border-editorial-burgundy/30 text-editorial-burgundy font-medium text-xs uppercase tracking-[0.15em] hover:bg-editorial-peach/20 flex items-center justify-center gap-1.5 cursor-pointer duration-300"
                    id="btn-quiz-retry"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-editorial-burgundy/60" />
                    Restart
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
