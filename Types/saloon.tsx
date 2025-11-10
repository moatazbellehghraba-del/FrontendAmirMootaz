// types/index.ts
export interface Service {
  id: string;
  name: string;
  duration: string;
  price: string;
  category: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  experience: string;
  rating: number;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  userImage: string;
}

export interface OpeningHours {
  day: string;
  hours: string;
  isClosed: boolean;
}

export interface Salon {
  id: string;
  name: string;
  images: string[];
  rating: number;
  reviews: number;
  address: string;
  distance: string;
  description: string;
  openingHours: OpeningHours[];
  priceRange: string;
  services: Service[];
  team: TeamMember[];
  reviewsList: Review[];
  amenities: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
}