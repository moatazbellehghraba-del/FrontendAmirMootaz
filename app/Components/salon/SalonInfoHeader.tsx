import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../Constant/colors';
import { Salon } from '../../../Types/saloon';

interface SalonInfoHeaderProps {
  salon: Salon;
}

export default function SalonInfoHeader({ salon }: SalonInfoHeaderProps) {
  return (
    <View style={{ backgroundColor: COLORS.secondary, padding: 20, borderBottomWidth: 1, borderBottomColor: COLORS.border }}>
      <Text style={{ fontSize: 24, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 8 }}>
        {salon.name}
      </Text>
      
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
          <Ionicons name="star" size={16} color={COLORS.accent} />
          <Text style={{ fontSize: 14, color: COLORS.accent, fontWeight: '700', marginLeft: 4 }}>
            {salon.rating}
          </Text>
          <Text style={{ fontSize: 14, color: COLORS.textSecondary, marginLeft: 4 }}>
            ({salon.reviews} reviews)
          </Text>
        </View>
        
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="location" size={14} color={COLORS.textSecondary} />
          <Text style={{ fontSize: 14, color: COLORS.textSecondary, marginLeft: 4 }}>
            {salon.distance}
          </Text>
        </View>
      </View>
      
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <Ionicons name="business" size={14} color={COLORS.textSecondary} style={{ marginTop: 2 }} />
        <Text style={{ fontSize: 14, color: COLORS.textSecondary, marginLeft: 8, flex: 1, lineHeight: 20 }}>
          {salon.address}
        </Text>
      </View>
    </View>
  );
}