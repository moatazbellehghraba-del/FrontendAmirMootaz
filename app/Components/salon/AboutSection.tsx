import React from 'react';
import { View, Text } from 'react-native';
import OpeningHoursSection from './OpeningHoursSection';
import AmenitiesSection from './AmenitiesSection';
import MapSection from './MapSection';
import { Salon} from '../../../Types/saloon';
import { COLORS } from '../../../Constant/colors';

interface AboutSectionProps {
  salon: Salon;
}

export default function AboutSection({ salon }: AboutSectionProps) {
  return (
    <View style={{ marginBottom: 32 }}>
      <Text style={{ fontSize: 22, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 20 }}>
        About
      </Text>
      
      <Text style={{ fontSize: 15, color: COLORS.textSecondary, lineHeight: 22, marginBottom: 24, fontWeight: '500' }}>
        {salon.description}
      </Text>

      <OpeningHoursSection openingHours={salon.openingHours} />
      <AmenitiesSection amenities={salon.amenities} />
      <MapSection salon={salon} />
    </View>
  );
}