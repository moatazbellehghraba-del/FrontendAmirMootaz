// components/NextAppointmentSection.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import BookingCard from '../Bookings/BookingCard';

interface Booking {
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

interface NextAppointmentSectionProps {
  upcomingBookings: Booking[];
  onViewAll: () => void;
}

const NextAppointmentSection: React.FC<NextAppointmentSectionProps> = ({ 
  upcomingBookings, 
  onViewAll 
}) => {
  const upcoming = upcomingBookings.filter(
    booking => booking.status === 'confirmed' || booking.status === 'pending'
  );

  if (upcoming.length === 0) return null;

  return (
    <View className="mb-6">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-lg font-semibold text-black">
          Upcoming • {upcoming.length}
        </Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text className="text-gray-500 text-sm font-medium">View all</Text>
        </TouchableOpacity>
      </View>
      {upcoming.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          onPress={() => {}} // Empty function or you can pass a handler
        />
      ))}
    </View>
  );
};

// Make sure this is a DEFAULT export
export default NextAppointmentSection; // ✅ This line is crucial