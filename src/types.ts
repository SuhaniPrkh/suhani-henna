export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventType: string;
  date: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  priceEstimate?: string;
  designId?: string;
}

export interface Service {
  id: string;
  name: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  image: string;
  iconName: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'bridal' | 'festival' | 'party' | 'custom';
  image: string;
  style: 'Intricate' | 'Moderate' | 'Minimalist';
  popularity: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  date: string;
  avatarColor: string;
}
