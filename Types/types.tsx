// Sponsored Offers
export interface SponsoredOffer {
  id: number;
  title: string;
  description: string;
  salon: string;
  image: string;
  expiry: string;
  gradient: [string, string];
  icon: string;
}

// Categories
export interface Category {
  name: string;
  image: string;
  count: string;
}

// Salons
export interface Salon {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  distance: string;
  image: string;
  services: string[];
  openUntil: string;
  priceRange: string;
  featured: boolean;
  verified?: boolean;
}

// Professionals
// Add this to your existing types.ts file
export interface Professional {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  image: string;
  salon: string;
  experience?: string;
}

export interface BestRatedProfessionalsSectionProps {
  professionals: Professional[];
  onViewAll?: () => void;
  onProfessionalPress?: (professional: Professional) => void;
}

// Bookings (from your BookingsList component)
export interface Booking {
  id: string;
  service: string;
  professional: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  currency: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  location: string;
  category: string;
  rating?: number;
}

// Trending Services (if you still need them elsewhere)
export interface TrendingService {
  name: string;
  price: string;
  category: string;
  saved: number;
}

// Promotional Offers
export interface PromoOffer {
  id: number;
  title: string;
  description: string;
  discount: string;
  expiry: string;
  image: string;
}

// User Profile
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  location: string;
}

// Service Categories
export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  serviceCount: number;
}

// Reviews
export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  service: string;
}

// Appointment Card Props (if you have a separate AppointmentCard)
export interface AppointmentCardProps {
  appointment: Booking;
  onPress?: () => void;
}

// Booking Card Props
export interface BookingCardProps {
  booking: Booking;
  onPress: (booking: Booking) => void;
}

// Sponsored Card Props
export interface SponsoredCardProps {
  offer: SponsoredOffer;
  index: number;
  currentIndex: number;
}

// Component Props
export interface SponsoredCarouselProps {
  offers: SponsoredOffer[];
}

export interface CategoriesSectionProps {
  categories: Category[];
}

export interface RecommendedSalonsProps {
  salons: Salon[];
}

export interface NextAppointmentSectionProps {
  upcomingBookings: Booking[];
  onViewAll: () => void;
}

export interface BookingsListProps {
  bookings: Booking[];
  onBookingSelect: (booking: Booking) => void;
  selectedDate: string;
}

// Navigation Types
export type RootStackParamList = {
  Home: undefined;
  Appointments: undefined;
  BookingDetails: { bookingId: string };
  SalonDetails: { salonId: number };
  ProfessionalDetails: { professionalId: number };
  Search: undefined;
  Profile: undefined;
};

// Filter Types
export interface FilterOptions {
  priceRange: [number, number];
  rating: number;
  distance: number;
  categories: string[];
  sortBy: 'rating' | 'distance' | 'price' | 'name';
}

// Location Types
export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  country: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface BookingFormData {
  serviceId: string;
  professionalId: string;
  date: string;
  time: string;
  duration: number;
  notes?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Notification Types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'booking' | 'promotion' | 'system' | 'reminder';
  read: boolean;
  createdAt: string;
  data?: any;
}

// Payment Types
export interface PaymentMethod {
  id: string;
  type: 'card' | 'cash' | 'mobile';
  lastFour?: string;
  isDefault: boolean;
}

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed';
  type: 'payment' | 'refund';
  createdAt: string;
  bookingId?: string;
}

// Analytics Types
export interface BookingStats {
  totalBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalSpent: number;
  favoriteCategory: string;
  monthlyBookings: MonthlyBooking[];
}

export interface MonthlyBooking {
  month: string;
  count: number;
  total: number;
}