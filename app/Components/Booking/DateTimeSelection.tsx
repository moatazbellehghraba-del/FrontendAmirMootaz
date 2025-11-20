import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateBubble from './DateBubble';
import TimeSlotPill from './TimeSlotPill';
import { generateDates } from '../../../Data/bookingData';
import { TimeSlot } from '../../../Types/booking';

interface DateTimeSelectionProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  timeSlots: TimeSlot[];
  onSelectDate: (date: Date) => void;
  onSelectTime: (time: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const DateTimeSelection = ({
  selectedDate,
  selectedTime,
  timeSlots,
  onSelectDate,
  onSelectTime,
  onNext,
  onBack
}: DateTimeSelectionProps) => {
  const dates = generateDates();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const isPastTime = (time: string, date: Date) => {
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    const isToday = compareDate.getTime() === today.getTime();
    
    if (!isToday) return false;
    
    const now = new Date();
    const [timePart, period] = time.split(' ');
    const [hours, minutes] = timePart.split(':');
    
    let hour24 = parseInt(hours);
    if (period === 'PM' && hour24 !== 12) hour24 += 12;
    if (period === 'AM' && hour24 === 12) hour24 = 0;
    
    const slotTime = new Date();
    slotTime.setHours(hour24, parseInt(minutes), 0, 0);
    
    return slotTime < now;
  };

  const getTimeOfDaySlots = (period: 'morning' | 'afternoon' | 'evening') => {
    return timeSlots.filter(slot => {
      const [time, ampm] = slot.time.split(' ');
      const hour = parseInt(time.split(':')[0]);
      
      if (period === 'morning') return ampm === 'AM' || (ampm === 'PM' && hour === 12);
      if (period === 'afternoon') return ampm === 'PM' && hour > 12 && hour < 5;
      if (period === 'evening') return ampm === 'PM' && hour >= 5;
      return false;
    });
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      onSelectDate(selectedDate);
    }
  };

  const formatSelectedDate = (date: Date | null) => {
    if (!date) return 'No date selected';
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="px-6 pt-6 pb-4">
        <Text className="text-2xl font-semibold text-gray-900 mb-2">
          Select Date & Time
        </Text>
        <Text className="text-gray-600 text-base">
          Choose when you'd like to visit
        </Text>
      </View>

      {/* Date Selection */}
      <View className="px-6 mb-6">
        <Text className="text-lg font-semibold text-gray-900 mb-3">
          Select Date
        </Text>
        
        {/* Date Picker Trigger */}
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          className="bg-gray-100 rounded-xl p-4 flex-row justify-between items-center mb-4"
        >
          <Text className={`text-base font-medium ${selectedDate ? 'text-gray-900' : 'text-gray-500'}`}>
            {selectedDate ? formatSelectedDate(selectedDate) : 'Choose a date'}
          </Text>
          <Ionicons name="calendar" size={20} color="#666" />
        </TouchableOpacity>

        {/* Date Picker Modal */}
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate || new Date()}
            mode="date"
            display="spinner"
            onChange={onDateChange}
            minimumDate={new Date()}
            maximumDate={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)}
          />
        )}

        {/* Quick Date Selection */}
        <Text className="text-sm font-medium text-gray-700 mb-3">
          Quick Select
        </Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {dates.slice(0, 14).map((date) => (
            <DateBubble
              key={date.id}
              date={date}
              isSelected={!!selectedDate && date.date.toDateString() === selectedDate.toDateString()}
              onSelect={onSelectDate}
              isToday={date.id === '0'}
              isTomorrow={date.id === '1'}
              isWeekend={date.isWeekend}
            />
          ))}
        </ScrollView>
      </View>

      {/* Time Selection */}
      <View className="flex-1 px-6">
        <Text className="text-lg font-semibold text-gray-900 mb-4">
          {selectedDate ? 'Available Times' : 'Select a date first'}
        </Text>
        
        {!selectedDate ? (
          <View className="flex-1 justify-center items-center">
            <View className="bg-gray-50 rounded-xl p-8 items-center">
              <Ionicons name="calendar-outline" size={40} color="#9CA3AF" />
              <Text className="text-gray-500 text-base font-medium mt-4 text-center">
                Choose a date to see available times
              </Text>
            </View>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Morning */}
            <View className="mb-6">
              <Text className="text-sm font-medium text-gray-500 mb-3">
                Morning
              </Text>
              <View className="flex-row flex-wrap">
                {getTimeOfDaySlots('morning').map((slot) => (
                  <TimeSlotPill
                    key={slot.id}
                    slot={slot}
                    isSelected={selectedTime === slot.time}
                    onSelect={onSelectTime}
                    isPopular={slot.isPopular}
                  />
                ))}
              </View>
            </View>

            {/* Afternoon */}
            <View className="mb-6">
              <Text className="text-sm font-medium text-gray-500 mb-3">
                Afternoon
              </Text>
              <View className="flex-row flex-wrap">
                {getTimeOfDaySlots('afternoon').map((slot) => (
                  <TimeSlotPill
                    key={slot.id}
                    slot={slot}
                    isSelected={selectedTime === slot.time}
                    onSelect={onSelectTime}
                    isPopular={slot.isPopular}
                  />
                ))}
              </View>
            </View>

            {/* Evening */}
            <View className="mb-6">
              <Text className="text-sm font-medium text-gray-500 mb-3">
                Evening
              </Text>
              <View className="flex-row flex-wrap">
                {getTimeOfDaySlots('evening').map((slot) => (
                  <TimeSlotPill
                    key={slot.id}
                    slot={slot}
                    isSelected={selectedTime === slot.time}
                    onSelect={onSelectTime}
                    isPopular={slot.isPopular}
                  />
                ))}
              </View>
            </View>
          </ScrollView>
        )}
      </View>

      {/* Footer Buttons */}
      <View className="bg-white border-t border-gray-200 px-6 py-5">
        <View className="flex-row space-x-3">
          <TouchableOpacity
            onPress={onBack}
            className="flex-1 rounded-xl py-4 items-center border border-gray-300 bg-white"
          >
            <Text className="text-gray-700 text-base font-semibold">Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onNext}
            disabled={!selectedDate || !selectedTime}
            className={`flex-1 rounded-xl py-4 items-center ${
              (!selectedDate || !selectedTime) ? 'bg-gray-200' : 'bg-black'
            }`}
          >
            <Text className={`text-base font-semibold ${
              (!selectedDate || !selectedTime) ? 'text-gray-400' : 'text-white'
            }`}>
              Continue to Payment
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DateTimeSelection;