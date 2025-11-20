import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Employee } from '../../../Types/booking';

interface EmployeeSelectionProps {
  employees: Employee[];
  selectedEmployee: string | null;
  onSelectEmployee: (employeeId: string) => void;
  onNext: () => void;
}

const EmployeeSelection = ({ employees, selectedEmployee, onSelectEmployee, onNext }: EmployeeSelectionProps) => {
  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="px-6 pt-6 pb-4">
        <Text className="text-2xl font-semibold text-gray-900 mb-2">Choose Your Artist</Text>
        <Text className="text-gray-600 text-base">
          Select your preferred professional
        </Text>
      </View>

      {/* Employee List */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {employees.map((employee, index) => (
          <TouchableOpacity
            key={employee.id}
            onPress={() => onSelectEmployee(employee.id)}
            className={`
              bg-white rounded-2xl p-5 mb-4 border-2
              ${selectedEmployee === employee.id ? 'border-black bg-black' : 'border-gray-100'}
              ${!employee.available ? 'opacity-60' : ''}
              shadow-sm
            `}
            disabled={!employee.available}
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            <View className="flex-row items-center">
              {/* Profile Image with Status */}
              <View className="relative">
                <Image
                  source={{ uri: employee.image }}
                  className="w-20 h-20 rounded-2xl mr-4"
                />
                
                {/* Selection Checkmark */}
                {selectedEmployee === employee.id && (
                  <View className="absolute -top-2 -right-2 bg-black rounded-full p-1.5 border-2 border-white shadow-lg">
                    <Ionicons name="checkmark" size={16} color="#fff" />
                  </View>
                )}
                
                {/* Availability Overlay */}
                {!employee.available && (
                  <View className="absolute inset-0 bg-gray-800 rounded-2xl opacity-50" />
                )}
              </View>
              
              {/* Employee Info */}
              <View className="flex-1">
                {/* Name and Specialty */}
                <View className="mb-3">
                  <Text className={`text-lg font-semibold mb-1 ${
                    selectedEmployee === employee.id ? 'text-white' : 'text-gray-900'
                  }`}>
                    {employee.name}
                  </Text>
                  <Text className={`text-sm ${
                    selectedEmployee === employee.id ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {employee.specialty}
                  </Text>
                </View>
                
                {/* Rating and Reviews */}
                <View className="flex-row items-center">
                  <View className="flex-row items-center bg-yellow-50 px-3 py-1.5 rounded-full mr-3">
                    <Ionicons name="star" size={14} color="#F59E0B" />
                    <Text className="text-yellow-800 text-sm font-semibold ml-1">
                      {employee.rating}
                    </Text>
                  </View>
                  <Text className={`text-sm ${
                    selectedEmployee === employee.id ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {employee.reviews} reviews
                  </Text>
                </View>
              </View>
            </View>
            
            {/* Availability Message */}
            {!employee.available && (
              <View className="mt-4 bg-red-50 rounded-xl px-4 py-3 border border-red-200">
                <View className="flex-row items-center">
                  <Ionicons name="time-outline" size={16} color="#DC2626" />
                  <Text className="text-red-600 text-sm font-medium ml-2">
                    Not available for this service
                  </Text>
                </View>
              </View>
            )}
            
            {/* Popular Badge */}
            {employee.available && index === 0 && (
              <View className="absolute top-4 right-4 bg-blue-500 rounded-full px-3 py-1">
                <Text className="text-white text-xs font-semibold">Most Popular</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
        
        {/* Empty State */}
        {employees.filter(e => e.available).length === 0 && (
          <View className="items-center justify-center py-12">
            <Ionicons name="people-outline" size={64} color="#9CA3AF" />
            <Text className="text-gray-500 text-lg font-medium mt-4 text-center">
              No available professionals
            </Text>
            <Text className="text-gray-400 text-sm mt-2 text-center">
              Please check back later or try a different service
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Continue Button */}
      <View className="bg-white border-t border-gray-100 px-6 py-6">
        <TouchableOpacity
          onPress={onNext}
          disabled={!selectedEmployee}
          className={`
            rounded-xl py-4 items-center justify-center
            ${selectedEmployee ? 'bg-black' : 'bg-gray-100'}
            shadow-lg
          `}
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: selectedEmployee ? 0.2 : 0,
            shadowRadius: 12,
            elevation: selectedEmployee ? 4 : 0,
          }}
        >
          <Text className={`text-base font-semibold ${
            selectedEmployee ? 'text-white' : 'text-gray-400'
          }`}>
            Continue to Schedule
          </Text>
        </TouchableOpacity>
        
        {/* Help Text */}
        {!selectedEmployee && (
          <Text className="text-gray-400 text-sm text-center mt-3">
            Please select a professional to continue
          </Text>
        )}
      </View>
    </View>
  );
};

export default EmployeeSelection;
