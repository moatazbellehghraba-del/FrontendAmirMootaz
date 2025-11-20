export interface Employee {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  image: string;
  available: boolean;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  isPopular: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'cash' | 'mobile';
  name: string;
  icon: string;
}

export interface BookingData {
  serviceId: string;
  serviceName: string;
  servicePrice: string;
  serviceDuration: string;
  employeeId: string;
  employeeName: string;
  date: string;
  time: string;
  paymentMethod: string;
}

export interface DateItem {
  id: string;
  date: Date;
  dayName: string;
  day: number;
  month: string;
  fullDate: string;
  available: boolean;
  isWeekend: boolean;
}