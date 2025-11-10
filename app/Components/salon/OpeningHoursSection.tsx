import React from 'react';
import { View, Text } from 'react-native';
import { OpeningHours} from '../../../Types/saloon';
import { COLORS } from '../../../Constant/colors';
interface OpeningHoursSectionProps {
  openingHours: OpeningHours[];
}

export default function OpeningHoursSection({ openingHours }: OpeningHoursSectionProps) {
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
        Opening Hours
      </Text>
      {openingHours.map((day, index) => (
        <View key={index} style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          paddingVertical: 12,
          borderBottomWidth: index === openingHours.length - 1 ? 0 : 1,
          borderBottomColor: COLORS.border
        }}>
          <Text style={{ 
            fontSize: 15, 
            color: day.isClosed ? COLORS.textTertiary : COLORS.textPrimary,
            fontWeight: day.isClosed ? '400' : '500'
          }}>
            {day.day}
          </Text>
          <Text style={{ 
            fontSize: 15, 
            color: day.isClosed ? COLORS.textTertiary : COLORS.textSecondary,
            fontWeight: '500'
          }}>
            {day.hours}
          </Text>
        </View>
      ))}
    </View>
  );
}