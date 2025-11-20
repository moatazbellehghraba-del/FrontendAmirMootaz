import React from 'react';
import { Text, TouchableOpacity, Animated, View } from 'react-native';
import { DateItem } from '../../../Types/booking';
interface DateBubbleProps {
  date: DateItem;
  isSelected: boolean; // This should only be boolean, not boolean | null
  onSelect: (date: Date) => void;
  isToday: boolean;
  isTomorrow: boolean;
  isWeekend: boolean;
}

const DateBubble = ({ date, isSelected, onSelect, isToday, isTomorrow, isWeekend }: DateBubbleProps) => {
  const scaleAnim = new Animated.Value(1);
  
  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    onSelect(date.date);
  };

  return (
    <TouchableOpacity onPress={handlePress} className="items-center mx-1">
      <Animated.View 
        style={{ transform: [{ scale: scaleAnim }] }}
        className={`
          w-16 h-20 rounded-xl items-center justify-center border
          ${isSelected ? 'bg-black border-black' : 'bg-white border-gray-200'}
          ${isWeekend && !isSelected ? 'bg-orange-50 border-orange-200' : ''}
          shadow-sm
        `}
      >
        <Text className={`text-xs font-medium ${isSelected ? 'text-white' : 'text-gray-500'} mb-1`}>
          {date.dayName}
        </Text>
        <Text className={`text-lg font-semibold ${isSelected ? 'text-white' : 'text-gray-900'} mb-1`}>
          {date.day}
        </Text>
        <Text className={`text-xs font-medium ${isSelected ? 'text-white' : 'text-gray-400'}`}>
          {date.month}
        </Text>
      </Animated.View>
      {(isToday || isTomorrow) && (
        <View className={`absolute -top-1 -right-1 px-1 py-0.5 rounded-full ${
          isToday ? 'bg-green-500' : 'bg-blue-500'
        }`}>
          <Text className="text-white text-xs font-medium">
            {isToday ? '!' : '1'}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default DateBubble;