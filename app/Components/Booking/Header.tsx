import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface HeaderProps {
  currentStep: number;
}

const Header = ({ currentStep }: HeaderProps) => {
  const router = useRouter();

  if (currentStep === 4) return null;

  return (
    <View className="bg-white border-b border-gray-200 px-6 py-4">
      <View className="flex-row items-center">
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="mr-4"
        >
          <Ionicons name="close" size={24} color="#374151" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-gray-900">Book Appointment</Text>
      </View>
    </View>
  );
};

export default Header;