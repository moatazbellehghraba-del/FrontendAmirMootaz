// components/bookings/BookingsHeader.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronLeft, Filter } from 'lucide-react-native';

interface BookingsHeaderProps {
  userData: {
    name: string;
    loyaltyPoints: number;
  };
  onBack: () => void;
  upcomingCount: number;
  completedCount: number;
}

const BookingsHeader: React.FC<BookingsHeaderProps> = ({ 
  userData, 
  onBack, 
  upcomingCount, 
  completedCount 
}) => {
  return (
    <View className="px-6 pt-12 pb-1 bg-white">
      <View className="flex-row items-center justify-between mb-8">
        <View className="flex-row items-center">
          <TouchableOpacity 
            className="w-12 h-12 bg-gray-50 rounded-2xl items-center justify-center mr-4 border border-gray-200"
            onPress={onBack}
          >
            <ChevronLeft size={22} color="#000" />
          </TouchableOpacity>
          <View>
            <Text className="text-3xl font-light text-black mb-1">My Bookings</Text>
            <Text className="text-gray-400 text-base">Manage your appointments</Text>
          </View>
        </View>
        <TouchableOpacity className="w-12 h-12 bg-gray-50 rounded-2xl items-center justify-center border border-gray-200">
          <Filter size={22} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Stats Summary */}
      <View className="flex-row justify-between bg-gray-50 rounded-3xl p-6 mb-6 border border-gray-200">
        <View className="items-center flex-1">
          <Text className="text-black font-bold text-2xl mb-1">{upcomingCount}</Text>
          <Text className="text-gray-500 text-xs text-center">Upcoming</Text>
        </View>
        <View className="w-px bg-gray-300" />
        <View className="items-center flex-1">
          <Text className="text-black font-bold text-2xl mb-1">{completedCount}</Text>
          <Text className="text-gray-500 text-xs text-center">Completed</Text>
        </View>
        <View className="w-px bg-gray-300" />
        <View className="items-center flex-1">
          <Text className="text-black font-bold text-2xl mb-1">{userData.loyaltyPoints}</Text>
          <Text className="text-gray-500 text-xs text-center">Loyalty Points</Text>
        </View>
      </View>
    </View>
  );
};

export default BookingsHeader;