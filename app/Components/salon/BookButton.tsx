import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Salon} from '../../../Types/saloon';
import { COLORS } from '../../../Constant/colors';

interface BookButtonProps {
  selectedService: string | null;
  salon: Salon;
}

export default function BookButton({ selectedService, salon }: BookButtonProps) {
  const router = useRouter();

  const handleBookPress = () => {
    if (selectedService) {
      const service = salon.services.find(s => s.id === selectedService);
      router.push({
        pathname: '/Book',
        params: {
          serviceId: selectedService,
          serviceName: service?.name,
          servicePrice: service?.price,
          serviceDuration: service?.duration,
          salonId: salon.id,
          salonName: salon.name
        }
      });
    }
  };

  return (
    <View style={{
      backgroundColor: COLORS.secondary,
      borderTopWidth: 1,
      borderTopColor: COLORS.border,
      paddingHorizontal: 20,
      paddingVertical: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 5,
    }}>
      <TouchableOpacity
        onPress={handleBookPress}
        disabled={!selectedService}
        style={{
          borderRadius: 12,
          paddingVertical: 18,
          alignItems: 'center',
          backgroundColor: selectedService ? COLORS.accent : COLORS.border,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: selectedService ? 0.2 : 0,
          shadowRadius: 4,
          elevation: selectedService ? 3 : 0,
        }}
      >
        <Text style={{
          color: selectedService ? COLORS.secondary : COLORS.textTertiary,
          fontSize: 16,
          fontWeight: '700'
        }}>
          {selectedService ? 'Book Now' : 'Select a Service'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}