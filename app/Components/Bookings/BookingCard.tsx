// components/bookings/BookingCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar, Clock, MapPin, Scissors, Sparkles, CheckCircle2, Clock4, XCircle, Star } from 'lucide-react-native';

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

interface BookingCardProps {
  booking: Booking;
  onPress: () => void;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, onPress }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' };
      case 'pending': return { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-200' };
      case 'completed': return { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' };
      case 'cancelled': return { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' };
      default: return { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200' };
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return CheckCircle2;
      case 'pending': return Clock4;
      case 'completed': return CheckCircle2;
      case 'cancelled': return XCircle;
      default: return Clock4;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'hair': return Scissors;
      case 'spa': return Sparkles;
      case 'barber': return Scissors;
      case 'nails': return Sparkles;
      default: return Scissors;
    }
  };

  const StatusIcon = getStatusIcon(booking.status);
  const CategoryIcon = getCategoryIcon(booking.category);
  const statusColors = getStatusColor(booking.status);

  return (
    <TouchableOpacity 
      className="bg-gray-50 rounded-2xl p-5 mb-4 border border-gray-200 active:bg-gray-100"
      onPress={onPress}
    >
      {/* Header */}
      <View className="flex-row justify-between items-start mb-4">
        <View className="flex-row items-center flex-1">
          <View className={`w-10 h-10 ${statusColors.bg} rounded-xl items-center justify-center mr-3 border ${statusColors.border}`}>
            <CategoryIcon size={18} color="#000" />
          </View>
          <View className="flex-1">
            <Text className="text-black font-semibold text-base mb-1">{booking.service}</Text>
            <Text className="text-gray-600 text-sm">with {booking.professional}</Text>
          </View>
        </View>
        <View className={`rounded-full px-3 py-1 ${statusColors.bg} border ${statusColors.border}`}>
          <Text className={`text-xs font-medium ${statusColors.text}`}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Text>
        </View>
      </View>

      {/* Details */}
      <View className="space-y-3 mb-4">
        <View className="flex-row items-center">
          <Calendar size={16} color="#666" />
          <Text className="text-gray-600 text-sm font-medium ml-2">
            {new Date(booking.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </Text>
        </View>
        <View className="flex-row items-center">
          <Clock size={16} color="#666" />
          <Text className="text-gray-600 text-sm font-medium ml-2">
            {booking.time} • {booking.duration}min
          </Text>
        </View>
        <View className="flex-row items-center">
          <MapPin size={16} color="#666" />
          <Text className="text-gray-600 text-sm font-medium ml-2 flex-1">
            {booking.location}
          </Text>
        </View>
      </View>

      {/* Price & Actions */}
      <View className="flex-row items-center justify-between pt-4 border-t border-gray-200">
        <Text className="text-black font-bold text-lg">
          {booking.price} {booking.currency}
        </Text>
        <View className="flex-row space-x-2">
          {booking.status === 'confirmed' && (
            <>
              <TouchableOpacity className="bg-white rounded-full px-4 py-2 border border-gray-300">
                <Text className="text-gray-600 text-sm font-medium">Reschedule</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-red-50 rounded-full px-4 py-2 border border-red-200">
                <Text className="text-red-600 text-sm font-medium">Cancel</Text>
              </TouchableOpacity>
            </>
          )}
          {booking.status === 'completed' && !booking.rating && (
            <TouchableOpacity className="bg-black rounded-full px-4 py-2">
              <Text className="text-white text-sm font-medium">Rate & Review</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Rating for completed bookings */}
      {booking.rating && (
        <View className="flex-row items-center mt-3 pt-3 border-t border-gray-200">
          <View className="flex-row items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                color={i < booking.rating! ? "#FFD700" : "#E5E7EB"}
                fill={i < booking.rating! ? "#FFD700" : "none"}
              />
            ))}
          </View>
          <Text className="text-gray-500 text-sm ml-2">Rated {booking.rating}/5</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default BookingCard;