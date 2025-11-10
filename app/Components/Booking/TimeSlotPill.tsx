import React from 'react';
import { Text, TouchableOpacity, Animated, View } from 'react-native';
import { TimeSlot } from '../../../Types/booking';

interface TimeSlotPillProps {
  slot: TimeSlot;
  isSelected: boolean;
  onSelect: (time: string) => void;
  isPopular: boolean;
}

const TimeSlotPill = ({ slot, isSelected, onSelect, isPopular }: TimeSlotPillProps) => {
  const scaleAnim = new Animated.Value(1);
  
  const handlePress = () => {
    if (!slot.available) return;
    
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start();
    onSelect(slot.time);
  };

  return (
    <TouchableOpacity 
      onPress={handlePress} 
      disabled={!slot.available}
      className="relative"
    >
      <Animated.View 
        style={{ transform: [{ scale: scaleAnim }] }}
        className={`
          px-4 py-3 rounded-lg mx-1 my-1 min-w-20 items-center justify-center border
          ${isSelected ? 'bg-black border-black' : ''}
          ${!slot.available ? 'bg-gray-100 border-gray-200 opacity-50' : 'bg-white border-gray-200'}
          ${isPopular && !isSelected && slot.available ? 'border-blue-200 bg-blue-50' : ''}
        `}
      >
        <Text className={`text-sm font-medium ${
          isSelected ? 'text-white' : 
          !slot.available ? 'text-gray-400' : 'text-gray-900'
        }`}>
          {slot.time}
        </Text>
        
        {!slot.available && (
          <View className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full" />
        )}
        
        {isPopular && slot.available && !isSelected && (
          <View className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default TimeSlotPill;