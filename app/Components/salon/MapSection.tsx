import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Salon} from '../../../Types/saloon';
import { COLORS } from '../../../Constant/colors';
interface MapSectionProps {
  salon: Salon;
}

export default function MapSection({ salon }: MapSectionProps) {
  return (
    <View style={{
      backgroundColor: COLORS.card,
      borderRadius: 12,
      padding: 20,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: COLORS.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2,
    }}>
      <Text style={{ fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 16 }}>
        Location
      </Text>
      <TouchableOpacity style={{
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
      }}>
        <Ionicons name="map" size={40} color={COLORS.textTertiary} />
        <Text style={{ fontSize: 14, color: COLORS.textTertiary, marginTop: 12, fontWeight: '500', textAlign: 'center' }}>
          {salon.address}
        </Text>
        <Text style={{ fontSize: 12, color: COLORS.textTertiary, marginTop: 4 }}>
          Tap to view on maps
        </Text>
      </TouchableOpacity>
    </View>
  );
}