import React from 'react';
import { View, Text } from 'react-native';
import ServiceCard from './ServiceCard';
import { COLORS } from '../../../Constant/colors';
import { Service} from '../../../Types/saloon';

interface ServicesSectionProps {
  services: Service[];
  selectedService: string | null;
  setSelectedService: (id: string | null) => void;
}

export default function ServicesSection({ services, selectedService, setSelectedService }: ServicesSectionProps) {
  return (
    <View style={{ marginBottom: 32 }}>
      <Text style={{ fontSize: 22, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 20 }}>
        Services
      </Text>
      {services.map((service) => (
        <ServiceCard 
          key={service.id} 
          service={service} 
          selectedService={selectedService}
          setSelectedService={setSelectedService}
        />
      ))}
    </View>
  );
}