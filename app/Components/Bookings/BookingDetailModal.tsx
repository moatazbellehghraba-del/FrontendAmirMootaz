// components/bookings/BookingDetailModal.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  MessageCircle, 
  Phone, 
  Star,
  Scissors,
  Sparkles,
  CreditCard,
  Info
} from 'lucide-react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

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
  address?: string;
  category: string;
  rating?: number;
  notes?: string;
}

interface BookingDetailModalProps {
  booking: Booking | null;
  onClose: () => void;
}

const BookingDetailModal: React.FC<BookingDetailModalProps> = ({ booking, onClose }) => {
  if (!booking) return null;

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'confirmed':
        return { 
          color: '#10B981', 
          bg: 'bg-green-50', 
          text: 'text-green-700',
          label: 'Confirmed'
        };
      case 'pending':
        return { 
          color: '#F59E0B', 
          bg: 'bg-yellow-50', 
          text: 'text-yellow-700',
          label: 'Pending'
        };
      case 'completed':
        return { 
          color: '#3B82F6', 
          bg: 'bg-blue-50', 
          text: 'text-blue-700',
          label: 'Completed'
        };
      case 'cancelled':
        return { 
          color: '#EF4444', 
          bg: 'bg-red-50', 
          text: 'text-red-700',
          label: 'Cancelled'
        };
      default:
        return { 
          color: '#6B7280', 
          bg: 'bg-gray-50', 
          text: 'text-gray-700',
          label: 'Unknown'
        };
    }
  };

  const getCategoryIcon = (category: string) => {
    const iconProps = { size: 28, color: '#000' };
    switch (category) {
      case 'hair':
        return <Scissors {...iconProps} />;
      case 'spa':
        return <Sparkles {...iconProps} />;
      case 'nails':
        return <Sparkles {...iconProps} />;
      default:
        return <Scissors {...iconProps} />;
    }
  };

  const statusConfig = getStatusConfig(booking.status);

  const DetailRow = ({ icon: Icon, title, value }: { icon: any; title: string; value: string }) => (
    <View className="py-4 border-b border-gray-100">
      <View className="flex-row items-start">
        <View className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center mr-4 border border-gray-200">
          <Icon size={20} color="#666" />
        </View>
        <View className="flex-1">
          <Text className="text-gray-500 text-base font-medium mb-2">{title}</Text>
          <Text className="text-black text-lg font-normal leading-6">{value}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={!!booking}
      onRequestClose={onClose}
    >
      <BlurView intensity={30} tint="light" className="flex-1">
        <View className="flex-1 justify-end">
          <View 
            className="bg-white rounded-t-3xl w-full"
            style={{ 
              maxHeight: SCREEN_HEIGHT * 0.85,
              minHeight: SCREEN_HEIGHT * 0.7 
            }}
          >
            
            {/* Header with Drag Handle */}
            <View className="pt-4 pb-2">
              <View className="w-12 h-1 bg-gray-300 rounded-full self-center mb-4" />
            </View>

            {/* Header */}
            <View className="px-6 pb-6 border-b border-gray-100">
              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center flex-1">
                  <View className="w-16 h-16 bg-gray-50 rounded-2xl items-center justify-center mr-4 border border-gray-200">
                    {getCategoryIcon(booking.category)}
                  </View>
                  <View className="flex-1">
                    <Text className="text-black font-semibold text-xl mb-2">
                      {booking.service}
                    </Text>
                    <Text className="text-gray-600 text-base">
                      with {booking.professional}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity 
                  onPress={onClose}
                  className="w-12 h-12 bg-gray-100 rounded-2xl items-center justify-center"
                >
                  <X size={24} color="#666" />
                </TouchableOpacity>
              </View>
              
              <View className={`flex-row items-center self-start rounded-full px-4 py-2 ${statusConfig.bg}`}>
                <View 
                  className="w-3 h-3 rounded-full mr-3" 
                  style={{ backgroundColor: statusConfig.color }}
                />
                <Text className={`text-base font-medium ${statusConfig.text}`}>
                  {statusConfig.label}
                </Text>
              </View>
            </View>

            {/* Scrollable Content - Much Larger Area */}
            <ScrollView 
              className="flex-1"
              showsVerticalScrollIndicator={true}
              contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 20 }}
            >
              <View className="space-y-1">
                <DetailRow
                  icon={Calendar}
                  title="Date"
                  value={new Date(booking.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                />
                
                <DetailRow
                  icon={Clock}
                  title="Time"
                  value={`${booking.time} • ${booking.duration} minutes`}
                />
                
                <DetailRow
                  icon={User}
                  title="Professional"
                  value={booking.professional}
                />
                
                <DetailRow
                  icon={MapPin}
                  title="Location"
                  value={booking.location}
                />
                
                {booking.address && (
                  <View className="py-4 border-b border-gray-100">
                    <View className="flex-row items-start">
                      <View className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center mr-4 border border-gray-200">
                        <MapPin size={20} color="#666" />
                      </View>
                      <View className="flex-1">
                        <Text className="text-gray-500 text-base font-medium mb-2">Address</Text>
                        <Text className="text-black text-lg font-normal leading-6">
                          {booking.address}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
                
                {booking.notes && (
                  <View className="py-4 border-b border-gray-100">
                    <View className="flex-row items-start">
                      <View className="w-10 h-10 bg-blue-50 rounded-xl items-center justify-center mr-4 border border-blue-200">
                        <Info size={20} color="#3B82F6" />
                      </View>
                      <View className="flex-1">
                        <Text className="text-blue-600 text-base font-medium mb-2">Important Notes</Text>
                        <Text className="text-black text-lg font-normal leading-6">
                          {booking.notes}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}

                {/* Price Section */}
                <View className="py-6">
                  <View className="flex-row items-center">
                    <View className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center mr-4 border border-gray-200">
                      <CreditCard size={20} color="#666" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-gray-500 text-base font-medium mb-2">Total Amount</Text>
                      <Text className="text-black text-3xl font-bold">
                        {booking.price} {booking.currency}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Rating Section for Completed Bookings */}
                {booking.rating && (
                  <View className="bg-green-50 rounded-3xl p-6 mt-4 border border-green-200">
                    <Text className="text-green-800 font-semibold text-lg mb-4">Your Review</Text>
                    <View className="flex-row items-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={24}
                          color={i < booking.rating! ? "#FFD700" : "#D1D5DB"}
                          fill={i < booking.rating! ? "#FFD700" : "none"}
                        />
                      ))}
                      <Text className="text-green-700 text-lg font-semibold ml-3">
                        {booking.rating}/5
                      </Text>
                    </View>
                    <Text className="text-green-600 text-base leading-6">
                      {booking.status === 'completed' ? 'Thank you for your feedback! We appreciate you taking the time to share your experience.' : 'Looking forward to your review!'}
                    </Text>
                  </View>
                )}
              </View>
            </ScrollView>

            {/* Actions - Fixed at Bottom */}
            <View className="px-6 py-6 border-t border-gray-100 bg-white">
              <View className="flex-row space-x-4 mb-4">
                <TouchableOpacity className="flex-1 bg-gray-50 rounded-2xl py-5 items-center border border-gray-200 active:bg-gray-100">
                  <MessageCircle size={22} color="#374151" />
                  <Text className="text-gray-700 text-base font-medium mt-2">Message</Text>
                </TouchableOpacity>
                
                <TouchableOpacity className="flex-1 bg-gray-50 rounded-2xl py-5 items-center border border-gray-200 active:bg-gray-100">
                  <Phone size={22} color="#374151" />
                  <Text className="text-gray-700 text-base font-medium mt-2">Call</Text>
                </TouchableOpacity>
                
                {booking.status === 'confirmed' && (
                  <TouchableOpacity className="flex-1 bg-black rounded-2xl py-5 items-center active:bg-gray-800">
                    <Text className="text-white text-base font-medium">Reschedule</Text>
                  </TouchableOpacity>
                )}
                
                {booking.status === 'completed' && !booking.rating && (
                  <TouchableOpacity className="flex-1 bg-black rounded-2xl py-5 items-center active:bg-gray-800">
                    <Text className="text-white text-base font-medium">Add Review</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Cancel Button for Upcoming Bookings */}
              {booking.status === 'confirmed' && (
                <TouchableOpacity className="bg-white rounded-2xl py-4 items-center border border-red-200 active:bg-red-50">
                  <Text className="text-red-600 text-base font-medium">Cancel Appointment</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

export default BookingDetailModal;