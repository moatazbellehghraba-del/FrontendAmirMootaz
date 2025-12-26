import React from 'react';
import { View, Text } from 'react-native';
import { OpeningHours} from '../../../Types/saloon';
import { COLORS } from '../../../Constant/colors';

interface OpeningHoursSectionProps {
  openingHours: OpeningHours[];
}

export default function OpeningHoursSection({ openingHours }: OpeningHoursSectionProps) {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  
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
      <Text style={{ 
        fontSize: 18, 
        fontWeight: '700', 
        color: COLORS.textPrimary, 
        marginBottom: 16 
      }}>
        Opening Hours
      </Text>
      
      {openingHours.map((day, index) => {
        const isToday = day.day.toLowerCase() === today.toLowerCase();
        const isClosed = day.isClosed;
        
        return (
          <View 
            key={index} 
            style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              paddingVertical: 12,
              borderBottomWidth: index === openingHours.length - 1 ? 0 : 1,
              borderBottomColor: COLORS.border
            }}
          >
            <Text style={{ 
              fontSize: 15, 
              color: isClosed ? '#EF4444' : isToday ? COLORS.textPrimary : COLORS.textPrimary,
              fontWeight: isToday ? '700' : '500'
            }}>
              {day.day}
              {isToday && ' (Today)'}
            </Text>
            
            <Text style={{ 
              fontSize: 15, 
              color: isClosed ? '#EF4444' : '#10B981',
              fontWeight: isToday ? '700' : '500'
            }}>
              {isClosed ? 'Closed' : day.hours}
            </Text>
          </View>
        );
      })}
    </View>
  );
}