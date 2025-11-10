import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BookingData } from '../../../Types/booking';

interface BookingConfirmationProps {
  bookingData: BookingData;
  onDone: () => void;
}

const BookingConfirmation = ({ bookingData, onDone }: BookingConfirmationProps) => {
  return (
    <View className="flex-1 bg-white justify-center items-center px-6">
      <View className="bg-white rounded-xl p-6 border border-gray-200 items-center w-full">
        <View className="w-20 h-20 bg-green-100 rounded-full items-center justify-center mb-5">
          <Ionicons name="checkmark" size={36} color="#10B981" />
        </View>
        
        <Text className="text-2xl font-semibold text-gray-900 mb-3 text-center">
          Booking Confirmed!
        </Text>
        
        <Text className="text-gray-600 text-base text-center mb-6">
          Your appointment has been successfully scheduled
        </Text>

        <View className="bg-gray-50 rounded-xl p-5 w-full mb-6 border border-gray-200">
          <Text className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Appointment Details
          </Text>
          
          <View className="space-y-3">
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Service</Text>
              <Text className="text-gray-900 font-medium text-right">{bookingData.serviceName}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600">With</Text>
              <Text className="text-gray-900 font-medium">{bookingData.employeeName}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600">When</Text>
              <Text className="text-gray-900 font-medium text-right">
                {bookingData.date ? new Date(bookingData.date).toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric' 
                }) : ''} at {bookingData.time}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Duration</Text>
              <Text className="text-gray-900 font-medium">{bookingData.serviceDuration}</Text>
            </View>
            <View className="flex-row justify-between pt-3 border-t border-gray-200">
              <Text className="text-lg font-semibold text-gray-900">Amount Paid</Text>
              <Text className="text-lg font-semibold text-black">{bookingData.servicePrice}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={onDone}
          className="bg-black rounded-xl py-4 items-center w-full"
        >
          <Text className="text-white text-base font-semibold">Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookingConfirmation;