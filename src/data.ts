import { Service, GalleryItem, Testimonial } from './types';

export const HERO_IMAGE = '/src/assets/images/suhani_henna_hero_1779748582856.png';
export const ABOUT_IMAGE = '/src/assets/images/suhani_henna_about_1779748597601.png';
export const BRIDAL_IMAGE = '/src/assets/images/suhani_henna_bridal_1779748612829.png';
export const FESTIVAL_IMAGE = '/src/assets/images/suhani_henna_festival_1779748626747.png';

export const SERVICES: Service[] = [
  {
    id: 'bridal',
    name: 'Royal Bridal Henna',
    price: 'From $250',
    duration: '3 - 6 hours',
    description: 'Extremely intricate, bespoke traditional or contemporary full-hand and arm designs, including custom elements like wedding hashtags, groom initials, or portraits.',
    features: [
      'Personalized consultation session',
      'Full front & back of hands up to mid-arms',
      'Both feet designs included',
      'Organic high-stain henna paste with essential oils',
      'Aftercare sealent spray & post-application instructions'
    ],
    image: BRIDAL_IMAGE,
    iconName: 'Sparkles'
  },
  {
    id: 'party',
    name: 'Party & Event Henna',
    price: 'From $80/hour',
    duration: 'Min. 2 hours booking',
    description: 'Perfect for Sangeet, bridal showers, baby showers, or corporate events. Quick, elegant designs that delight every guest in attendance.',
    features: [
      'Tailored for groups & events of all sizes',
      'Accommodates 10-12 medium designs per hour',
      'Wide selection of designs for guests to choose',
      'All organic fast-drying materials',
      'Professional set up and friendly interaction'
    ],
    image: 'https://images.unsplash.com/photo-1590075865003-e48277adc558?q=80&w=600&auto=format&fit=crop',
    iconName: 'Users'
  },
  {
    id: 'festival',
    name: 'Festival & Holiday Mehndi',
    price: 'From $45',
    duration: '30 - 45 mins',
    description: 'Celebrate Eid, Karwa Chauth, Diwali, or Teej with beautifully aligned, classic motifs on fronts or backs of hands.',
    features: [
      'Traditional mandalas or modern chains',
      'Fast and sharp application',
      'Choice of classic dark stain or stylish white henna overlay',
      'Premium essential oil blend',
      'Festive discounts for groups or families'
    ],
    image: FESTIVAL_IMAGE,
    iconName: 'Calendar'
  },
  {
    id: 'custom',
    name: 'Custom & Concept Designs',
    price: 'Variable pricing',
    duration: '1 - 3 hours',
    description: 'Minimalist boho patterns, jewelry-style designs, pregnancy/maternal belly henna, or unique modern tattoos tailored to your exact creative ideas.',
    features: [
      'Collaborative concept sketching',
      'Unique experimental placements (shoulders, collarbones, back)',
      'Cosplay, editorial shoot styling',
      'Custom color blends (Black, Red, White, Natural)',
      'Full privacy for private area sessions'
    ],
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=600&auto=format&fit=crop',
    iconName: 'HeartHandshake'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Majestic Bridal Mandala',
    category: 'bridal',
    image: BRIDAL_IMAGE,
    style: 'Intricate',
    popularity: '98% match',
    description: 'Extremely detailed mandala centered on palms with surrounding cuff patterns.'
  },
  {
    id: 'gal-2',
    title: 'Boho Minimalist Vine',
    category: 'festival',
    image: FESTIVAL_IMAGE,
    style: 'Minimalist',
    popularity: '85% match',
    description: 'Delicate leaf trailers crawling along the side of index fingers.'
  },
  {
    id: 'gal-3',
    title: 'Royal Wedding Fusion',
    category: 'bridal',
    image: HERO_IMAGE,
    style: 'Intricate',
    popularity: '95% match',
    description: 'Seamless merger of peacock, floral trellis, and geometric latticework.'
  },
  {
    id: 'gal-4',
    title: 'Contemporary Cuff & Ring',
    category: 'custom',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop',
    style: 'Moderate',
    popularity: '90% match',
    description: 'Simulated cuff watch design with intricate line structures on fingers.'
  },
  {
    id: 'gal-5',
    title: 'Traditional Eid Sikka',
    category: 'festival',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop',
    style: 'Moderate',
    popularity: '92% match',
    description: 'Full circles of fine mesh work with dark-staining fingertips.'
  },
  {
    id: 'gal-6',
    title: 'Maternal Moon Belly',
    category: 'custom',
    image: 'https://images.unsplash.com/photo-1559599104-30476a11c91e?q=80&w=600&auto=format&fit=crop',
    style: 'Minimalist',
    popularity: '88% match',
    description: 'A circular blooming lotus design symbolizing life, protection, and new beginnings.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Priya Sharma',
    role: 'Bride from Summer 2025',
    content: 'Suhani was extraordinary! She spent 5 hours on my bridal henna and the detail was unbelievable. She even cleverly hid my husband\'s initials in the pattern! The stain turned out a deep, rich mahogany. I got so many compliments on my wedding day.',
    rating: 5,
    date: 'June 18, 2025',
    avatarColor: 'bg-rose-100 text-rose-700'
  },
  {
    id: 't-2',
    name: 'Amina Al-Mansoor',
    role: 'Eid Celebration Host',
    content: 'We booked Suhani Henna for our family Eid party and she was a hit with everyone. She was so fast but still incredibly precise. Even the kids got small cute floral designs. Extremely professional and used all natural organic paste.',
    rating: 5,
    date: 'April 12, 2026',
    avatarColor: 'bg-amber-100 text-amber-700'
  },
  {
    id: 't-3',
    name: 'Sonia Patel',
    role: 'Sangeet Party Organizer',
    content: 'Absolute luxury experience. Suhani sets such a calming vibe with her setup, beautiful music, and lovely incense. Booking her was seamless. The custom designs she made for my guests were spectacular!',
    rating: 5,
    date: 'May 04, 2026',
    avatarColor: 'bg-emerald-100 text-emerald-700'
  }
];

export const CONSULTANT_QUESTIONS = [
  {
    id: 'q1',
    text: 'What kind of occasion is this elegant henna for?',
    options: [
      { text: 'My bridal ceremony / wedding', points: { bridal: 3, custom: 1 } },
      { text: 'A family festival or holiday (Eid, Diwali, etc.)', points: { festival: 3, party: 1 } },
      { text: 'A social party, shower, or group gathering', points: { party: 3, festival: 1 } },
      { text: 'Personal style statement or photo shoot', points: { custom: 3, bridal: 1 } }
    ]
  },
  {
    id: 'q2',
    text: 'Which style vibe matches your personality best?',
    options: [
      { text: 'Traditional & Royalty (Heavy intricate designs, dense layouts)', points: { bridal: 3 } },
      { text: 'Boho & Chic (Minimalistic, geometric trails, dainty lines)', points: { custom: 2, festival: 2 } },
      { text: 'Classic Floral (Paisleys, mandalas, leaves, dark stained tips)', points: { festival: 3, party: 2 } },
      { text: 'Modern Fusion (Clean whitespace, abstract cuffs & empty spaces)', points: { custom: 3, party: 2 } }
    ]
  },
  {
    id: 'q3',
    text: 'How much coverage or canvas space would you like covered?',
    options: [
      { text: 'Complete hands, wrists, up to the forearms', points: { bridal: 3, custom: 1 } },
      { text: 'Backs or fronts of hands with trailing fingers', points: { festival: 3, party: 2 } },
      { text: 'Simple accent motifs or finger/wrist band style', points: { party: 3, custom: 2 } },
      { text: 'Unconventional placements (shoulders, collarbone, back)', points: { custom: 3 } }
    ]
  }
];
