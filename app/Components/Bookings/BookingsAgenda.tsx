// components/bookings/BookingsAgenda.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react-native';

interface Booking {
  id: string;
  date: string;
  status: string;
}

interface BookingsAgendaProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  bookings: Booking[];
}

const BookingsAgenda: React.FC<BookingsAgendaProps> = ({ 
  selectedDate, 
  onDateSelect, 
  bookings 
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Generate dates for the current month view
  const generateDates = () => {
    const dates = [];
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Get first day of the month
    const firstDay = new Date(year, month, 1);
    // Get last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Generate all days of the current month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      dates.push(date);
    }
    
    return dates;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const hasBookingOnDate = (dateString: string) => {
    return bookings.some(booking => booking.date === dateString && booking.status !== 'cancelled');
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getDayName = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getDayNumber = (date: Date) => {
    return date.getDate();
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return formatDate(date) === selectedDate;
  };

  const monthDates = generateDates();

  return (
    <View className="px-6 pb-4 bg-white border-b border-gray-100">
      {/* Month Navigation Header */}
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity 
          className="w-10 h-10 bg-gray-50 rounded-2xl items-center justify-center border border-gray-200"
          onPress={() => navigateMonth('prev')}
        >
          <ChevronLeft size={20} color="#000" />
        </TouchableOpacity>
        
        <View className="flex-row items-center">
          <Calendar size={20} color="#000" className="mr-2" />
          <Text className="text-lg font-semibold text-black">
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </Text>
        </View>
        
        <TouchableOpacity 
          className="w-10 h-10 bg-gray-50 rounded-2xl items-center justify-center border border-gray-200"
          onPress={() => navigateMonth('next')}
        >
          <ChevronRight size={20} color="#000" />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="flex-row"
      >
        {monthDates.map((date, index) => {
          const dateString = formatDate(date);
          const hasBooking = hasBookingOnDate(dateString);
          const isTodayDate = isToday(date);
          const isSelectedDate = isSelected(date);
          
          return (
            <TouchableOpacity
              key={index}
              className={`items-center justify-center mx-1 rounded-2xl p-3 min-w-16 ${
                isSelectedDate 
                  ? 'bg-black' 
                  : isTodayDate 
                    ? 'bg-gray-100' 
                    : 'bg-gray-50'
              } border ${
                isSelectedDate 
                  ? 'border-black' 
                  : hasBooking 
                    ? 'border-blue-200' 
                    : 'border-gray-200'
              }`}
              onPress={() => onDateSelect(dateString)}
            >
              <Text className={`text-xs font-medium ${
                isSelectedDate ? 'text-white' : 'text-gray-500'
              }`}>
                {getDayName(date)}
              </Text>
              
              <View className={`w-6 h-6 rounded-full items-center justify-center mt-1 ${
                hasBooking && !isSelectedDate ? 'bg-blue-500' : ''
              }`}>
                <Text className={`text-sm font-semibold ${
                  isSelectedDate 
                    ? 'text-white' 
                    : hasBooking 
                      ? 'text-white' 
                      : isTodayDate 
                        ? 'text-black' 
                        : 'text-gray-700'
                }`}>
                  {getDayNumber(date)}
                </Text>
              </View>

              {/* Booking indicator dot */}
              {hasBooking && !isSelectedDate && (
                <View className="w-1 h-1 bg-blue-500 rounded-full mt-1" />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default BookingsAgenda;