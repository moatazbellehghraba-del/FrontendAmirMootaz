import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen3() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 pt-4">
        <View className="w-10 h-10 rounded-full border border-gray-300 items-center justify-center">
          <Text className="text-black text-lg font-bold">3</Text>
        </View>
        <TouchableOpacity 
          onPress={() => router.push('/(auth)/Login')}
        >
          <Text className="text-black font-semibold">Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View className="flex-1 justify-center items-center px-8">
        {/* Illustration Placeholder */}
        <View className="mb-8">
          <View 
            style={{ 
              width: width * 0.8, 
              height: height * 0.35 
            }}
            className="bg-gray-50 rounded-lg border border-gray-200 items-center justify-center"
          >
            <Text className="text-gray-500 text-sm mb-1">Relax & Enjoy Illustration</Text>
            <Text className="text-gray-400 text-xs">Spa setting with reminder notifications</Text>
          </View>
        </View>

        {/* Text Content */}
        <View className="items-center mb-6">
          <Text className="text-3xl font-bold text-black text-center mb-4">
            Relax & Enjoy
          </Text>
          <Text className="text-lg text-gray-700 text-center leading-7">
            Sit back and relax! No waiting lines. Get reminders for your appointments and enjoy a smooth beauty experience.
          </Text>
        </View>

        {/* Features List */}
        <View className="w-full max-w-xs mb-6">
          <View className="flex-row items-center mb-3">
            <View className="w-6 h-6 rounded-full bg-black items-center justify-center mr-3">
              <Text className="text-white text-xs font-bold">✓</Text>
            </View>
            <Text className="text-black text-sm">No waiting lines</Text>
          </View>
          
          <View className="flex-row items-center mb-3">
            <View className="w-6 h-6 rounded-full bg-black items-center justify-center mr-3">
              <Text className="text-white text-xs font-bold">✓</Text>
            </View>
            <Text className="text-black text-sm">Smart reminders</Text>
          </View>
          
          <View className="flex-row items-center">
            <View className="w-6 h-6 rounded-full bg-black items-center justify-center mr-3">
              <Text className="text-white text-xs font-bold">✓</Text>
            </View>
            <Text className="text-black text-sm">Smooth experience</Text>
          </View>
        </View>

        {/* Dots Indicator */}
        <View className="flex-row justify-center space-x-2 mb-8">
          <View className="w-3 h-3 bg-gray-300 rounded-full"></View>
          <View className="w-3 h-3 bg-gray-300 rounded-full"></View>
          <View className="w-3 h-3 bg-black rounded-full"></View>
        </View>

        {/* Navigation Buttons - Fixed at bottom */}
        <View className="w-full mt-auto pb-8">
          <View className="flex-row justify-between w-full space-x-4">
            <TouchableOpacity 
              className="flex-1 border border-gray-300 py-4 rounded-2xl items-center"
              onPress={() => router.back()}
            >
              <Text className="text-black font-semibold text-lg">Back</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="flex-1 bg-black py-4 rounded-2xl items-center shadow-lg"
              onPress={() => router.push('/(auth)/Login')}
            >
              <Text className="text-white font-semibold text-lg">Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}