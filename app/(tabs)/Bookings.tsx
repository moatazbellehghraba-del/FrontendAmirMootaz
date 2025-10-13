// app/bookings.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import BookingsHeader from '../Components/Bookings/BookingsHeader'
import BookingsAgenda from '../Components/Bookings/BookingsAgenda';
import BookingsList from '../Components/Bookings/BookingsList';
import BookingDetailModal from '../Components/Bookings/BookingDetailModal';

// Static user data
const userData = {
  id: 'user_123',
  name: 'Amira Ben Ahmed',
  loyaltyPoints: 1250
};

// Static bookings data
const bookingsData = {
  upcoming: [
    {
      id: 'booking_001',
      service: 'Haircut & Styling',
      professional: 'Sophie Martin',
      professionalId: 'pro_001',
      serviceId: 'service_001',
      date: '2025-10-15',
      time: '10:00',
      duration: 60,
      price: 45.00,
      currency: 'TND',
      status: 'confirmed',
      location: 'Beauty Salon Downtown',
      address: '123 Avenue Habib Bourguiba, Tunis',
      notes: 'Please arrive 10 minutes early',
      category: 'hair'
    },
    {
      id: 'booking_002',
      service: 'Facial Care & Massage',
      professional: 'Léa Bernard',
      professionalId: 'pro_002',
      serviceId: 'service_002',
      date: '2025-10-18',
      time: '14:00',
      duration: 90,
      price: 80.00,
      currency: 'TND',
      status: 'confirmed',
      location: 'Spa Relax Center',
      address: '456 Rue de Carthage, Tunis',
      notes: 'Avoid makeup before appointment',
      category: 'spa'
    }
  ],
  completed: [
    {
      id: 'booking_003',
      service: 'Hair Color & Treatment',
      professional: 'Sophie Martin',
      professionalId: 'pro_001',
      serviceId: 'service_003',
      date: '2025-10-10',
      time: '15:00',
      duration: 120,
      price: 120.00,
      currency: 'TND',
      status: 'completed',
      location: 'Beauty Salon Downtown',
      address: '123 Avenue Habib Bourguiba, Tunis',
      rating: 5,
      review: 'Excellent service! Sophie is amazing.',
      category: 'hair'
    }
  ],
  cancelled: []
};

const BookingsScreen = () => {
  const router = useRouter();
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // Get bookings for selected date
  const getBookingsForDate = (date: string) => {
    const allBookings = [...bookingsData.upcoming, ...bookingsData.completed, ...bookingsData.cancelled];
    return allBookings.filter(booking => booking.date === date);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <BookingsHeader 
        userData={userData}
        onBack={() => router.back()}
        upcomingCount={bookingsData.upcoming.length}
        completedCount={bookingsData.completed.length}
      />

      {/* Agenda View */}
      <BookingsAgenda
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
        bookings={[...bookingsData.upcoming, ...bookingsData.completed, ...bookingsData.cancelled]}
      />

      {/* Bookings List for Selected Date */}
      <BookingsList
        bookings={getBookingsForDate(selectedDate)}
        onBookingSelect={setSelectedBooking}
        selectedDate={selectedDate}
      />

      {/* New Blur Background Modal */}
      <BookingDetailModal
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </SafeAreaView>
  );
};

export default BookingsScreen; // Make sure this line exists!