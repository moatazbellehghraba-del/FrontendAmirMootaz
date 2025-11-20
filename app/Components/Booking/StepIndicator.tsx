import React from 'react';
import { View, Text } from 'react-native';

interface StepIndicatorProps {
  currentStep: number;
}

const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  if (currentStep === 4) return null;
  
  const steps = ['Professional', 'Schedule', 'Payment'];
  
  return (
    <View className="bg-white border-b border-gray-200 px-6 py-4">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-sm font-medium text-gray-500">
          Step {currentStep} of 3
        </Text>
        <Text className="text-sm font-medium text-gray-900">
          {steps[currentStep - 1]}
        </Text>
      </View>
      <View className="w-full bg-gray-200 rounded-full h-2">
        <View 
          className="bg-black h-2 rounded-full" 
          style={{ width: `${(currentStep / 3) * 100}%` }}
        />
      </View>
    </View>
  );
};

export default StepIndicator;