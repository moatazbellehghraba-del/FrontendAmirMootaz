import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PaymentMethod, BookingData } from '../../../Types/booking';

interface PaymentSelectionProps {
  selectedPayment: string | null;
  paymentMethods: PaymentMethod[];
  bookingData: BookingData;
  onSelectPayment: (paymentId: string) => void;
  onConfirm: () => void;
  onBack: () => void;
}

const PaymentSelection = ({
  selectedPayment,
  paymentMethods,
  bookingData,
  onSelectPayment,
  onConfirm,
  onBack
}: PaymentSelectionProps) => {
  return (
    <View className="flex-1 bg-white">
      {/* Booking Summary */}
      <View className="bg-white rounded-xl mx-6 mt-6 p-5 border border-gray-200">
        <Text className="text-xl font-semibold text-gray-900 mb-4">Booking Summary</Text>
        
        <View className="space-y-3 mb-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Service</Text>
            <Text className="text-gray-900 font-medium text-right">{bookingData.serviceName}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Professional</Text>
            <Text className="text-gray-900 font-medium">{bookingData.employeeName}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Date & Time</Text>
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
          <View className="border-t border-gray-200 pt-3">
            <View className="flex-row justify-between">
              <Text className="text-lg font-semibold text-gray-900">Total</Text>
              <Text className="text-lg font-semibold text-black">{bookingData.servicePrice}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Payment Methods */}
      <View className="bg-white rounded-xl mx-6 mt-4 p-5 border border-gray-200">
        <Text className="text-lg font-semibold text-gray-900 mb-4">Payment Method</Text>
        
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            onPress={() => onSelectPayment(method.id)}
            className={`
              flex-row items-center p-4 mb-3 rounded-lg border
              ${selectedPayment === method.id ? 'border-black bg-black' : 'border-gray-200 bg-white'}
            `}
          >
            <View className={`w-12 h-12 rounded-lg items-center justify-center mr-4 ${
              selectedPayment === method.id ? 'bg-white' : 'bg-gray-100'
            }`}>
              <Ionicons 
                name={method.icon as any} 
                size={24} 
                color={selectedPayment === method.id ? '#000' : '#666'} 
              />
            </View>
            <Text className={`text-base font-medium flex-1 ${
              selectedPayment === method.id ? 'text-white' : 'text-gray-900'
            }`}>
              {method.name}
            </Text>
            {selectedPayment === method.id && (
              <View className="bg-white rounded-full p-1">
                <Ionicons name="checkmark" size={16} color="#000" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View className="bg-white border-t border-gray-200 px-6 py-5">
        <View className="flex-row space-x-3">
          <TouchableOpacity
            onPress={onBack}
            className="flex-1 rounded-xl py-4 items-center border border-gray-300 bg-white"
          >
            <Text className="text-gray-700 text-base font-semibold">Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onConfirm}
            disabled={!selectedPayment}
            className={`flex-1 rounded-xl py-4 items-center ${
              selectedPayment ? 'bg-black' : 'bg-gray-200'
            }`}
          >
            <Text className="text-white text-base font-semibold">
              Confirm Booking
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PaymentSelection;