// components/bookings/BookingsList.tsx
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import BookingCard from './BookingCard';
import { Calendar, Clock } from 'lucide-react-native';

interface Booking {
  id: string;
  service: string;
  professional: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  currency: string;
  status: string;
  location: string;
  category: string;
  rating?: number;
}

interface BookingsListProps {
  bookings: Booking[];
  onBookingSelect: (booking: Booking) => void;
  selectedDate: string;
}

const BookingsList: React.FC<BookingsListProps> = ({ 
  bookings, 
  onBookingSelect, 
  selectedDate 
}) => {
  const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  };

  // Sort bookings by time
  const sortedBookings = [...bookings].sort((a, b) => {
    const timeA = a.time.toLowerCase();
    const timeB = b.time.toLowerCase();
    return timeA.localeCompare(timeB);
  });

  // Group bookings by status
  const groupedBookings = {
    upcoming: sortedBookings.filter(booking => booking.status === 'confirmed' || booking.status === 'pending'),
    completed: sortedBookings.filter(booking => booking.status === 'completed'),
    cancelled: sortedBookings.filter(booking => booking.status === 'cancelled')
  };

  if (bookings.length === 0) {
    const today = new Date();
    const selected = new Date(selectedDate);
    const isToday = selected.toDateString() === today.toDateString();
    const isPast = selected < today && !isToday;
    const isFuture = selected > today;

    let message = '';
    let subMessage = '';

    if (isToday) {
      message = 'No bookings today';
      subMessage = 'You have no appointments scheduled for today';
    } else if (isPast) {
      message = 'No bookings on this date';
      subMessage = 'You had no appointments on this day';
    } else {
      message = 'No bookings scheduled';
      subMessage = `You have no appointments on ${formatDisplayDate(selectedDate)}`;
    }

    return (
      <View className="flex-1 px-6 justify-center items-center">
        <View className="items-center py-20">
          <Calendar size={64} color="#E5E7EB" />
          <Text className="text-gray-400 text-lg font-medium mt-4">{message}</Text>
          <Text className="text-gray-400 text-sm text-center mt-2 px-8">
            {subMessage}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
      <View className="py-4">
        {/* Date Header */}
        <View className="mb-6">
          <Text className="text-2xl font-light text-black mb-2">
            {formatDisplayDate(selectedDate)}
          </Text>
          <View className="flex-row items-center">
            <Clock size={16} color="#666" />
            <Text className="text-gray-500 text-sm font-medium ml-2">
              {bookings.length} appointment{bookings.length !== 1 ? 's' : ''}
            </Text>
          </View>
        </View>

        {/* Upcoming Bookings */}
        {groupedBookings.upcoming.length > 0 && (
          <View className="mb-6">
            <Text className="text-lg font-semibold text-black mb-4">
              Upcoming • {groupedBookings.upcoming.length}
            </Text>
            {groupedBookings.upcoming.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onPress={() => onBookingSelect(booking)}
              />
            ))}
          </View>
        )}

        {/* Completed Bookings */}
        {groupedBookings.completed.length > 0 && (
          <View className="mb-6">
            <Text className="text-lg font-semibold text-black mb-4">
              Completed • {groupedBookings.completed.length}
            </Text>
            {groupedBookings.completed.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onPress={() => onBookingSelect(booking)}
              />
            ))}
          </View>
        )}

        {/* Cancelled Bookings */}
        {groupedBookings.cancelled.length > 0 && (
          <View className="mb-6">
            <Text className="text-lg font-semibold text-black mb-4">
              Cancelled • {groupedBookings.cancelled.length}
            </Text>
            {groupedBookings.cancelled.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onPress={() => onBookingSelect(booking)}
              />
            ))}
          </View>
        )}

        {/* Daily Summary */}
        <View className="bg-gray-50 rounded-2xl p-4 border border-gray-200 mt-4">
          <Text className="text-black font-semibold text-base mb-2">Daily Summary</Text>
          <View className="flex-row justify-between">
            <View className="flex-1">
              <Text className="text-gray-500 text-sm">Total Appointments</Text>
              <Text className="text-black font-bold text-lg">{bookings.length}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-gray-500 text-sm">Total Duration</Text>
              <Text className="text-black font-bold text-lg">
                {bookings.reduce((total, booking) => total + booking.duration, 0)} min
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-gray-500 text-sm">Total Cost</Text>
              <Text className="text-black font-bold text-lg">
                {bookings.reduce((total, booking) => total + booking.price, 0)} {bookings[0]?.currency}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default BookingsList;