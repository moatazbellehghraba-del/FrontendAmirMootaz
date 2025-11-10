import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import StepIndicator from '../Components/Booking/StepIndicator';
import Header from '../Components/Booking/Header';
import EmployeeSelection from '../Components/Booking/EmployeeSelection';
import DateTimeSelection from '../Components/Booking/DateTimeSelection';
import PaymentSelection from '../Components/Booking//PaymentSelection';
import BookingConfirmation from '../Components/Booking/BookingConfirmation';
import { employees, paymentMethods, generateTimeSlots } from '../../Data/bookingData';
import { BookingData, Employee, PaymentMethod, TimeSlot } from '../../Types/booking';

export default function BookingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  // Get service data from route params
  const serviceData = {
    id: params.serviceId as string || '1',
    name: params.serviceName as string || 'Signature Haircut',
    price: params.servicePrice as string || '65 TND',
    duration: params.serviceDuration as string || '45 min'
  };

  const timeSlots = generateTimeSlots();

  const bookingData: BookingData = {
    serviceId: serviceData.id,
    serviceName: serviceData.name,
    servicePrice: serviceData.price,
    serviceDuration: serviceData.duration,
    employeeId: selectedEmployee || '',
    employeeName: employees.find(e => e.id === selectedEmployee)?.name || '',
    date: selectedDate ? selectedDate.toISOString() : '',
    time: selectedTime || '',
    paymentMethod: selectedPayment || '',
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleConfirmBooking = () => {
    setCurrentStep(4);
  };

  const handleDone = () => {
    router.back();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <EmployeeSelection
            employees={employees}
            selectedEmployee={selectedEmployee}
            onSelectEmployee={setSelectedEmployee}
            onNext={handleNextStep}
          />
        );
      case 2:
        return (
          <DateTimeSelection
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            timeSlots={timeSlots}
            onSelectDate={setSelectedDate}
            onSelectTime={setSelectedTime}
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          />
        );
      case 3:
        return (
          <PaymentSelection
            selectedPayment={selectedPayment}
            paymentMethods={paymentMethods}
            bookingData={bookingData}
            onSelectPayment={setSelectedPayment}
            onConfirm={handleConfirmBooking}
            onBack={handlePreviousStep}
          />
        );
      case 4:
        return (
          <BookingConfirmation
            bookingData={bookingData}
            onDone={handleDone}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header currentStep={currentStep} />
      <StepIndicator currentStep={currentStep} />
      {renderStep()}
    </SafeAreaView>
  );
}