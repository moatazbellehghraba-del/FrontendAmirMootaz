import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../Constant/colors';
import { Service } from '../../../Types/saloon';

interface ServiceCardProps {
  service: Service;
  selectedService: string | null;
  setSelectedService: (id: string | null) => void;
}

const ServiceCard = ({ service, selectedService, setSelectedService }: ServiceCardProps) => {
  // Different colors for different service categories
  const getCategoryColor = (category: string) => {
    const categoryLower = category.toLowerCase();
    
    if (categoryLower.includes('haircut') || categoryLower.includes('hair') || categoryLower.includes('cut')) {
      return '#8B4513'; // SaddleBrown for hair services
    } else if (categoryLower.includes('spa') || categoryLower.includes('massage') || categoryLower.includes('relax')) {
      return '#FF69B4'; // HotPink for spa services
    } else if (categoryLower.includes('facial') || categoryLower.includes('skin') || categoryLower.includes('beauty')) {
      return '#FFD700'; // Gold for facial/skin services
    } else if (categoryLower.includes('manicure') || categoryLower.includes('pedicure') || categoryLower.includes('nail')) {
      return '#FF6347'; // Tomato for nail services
    } else if (categoryLower.includes('wax') || categoryLower.includes('remove')) {
      return '#9370DB'; // MediumPurple for waxing
    } else if (categoryLower.includes('color') || categoryLower.includes('dye') || categoryLower.includes('highlight')) {
      return '#4A90E2'; // Blue for coloring services
    } else {
      return COLORS.accent; // Default accent color
    }
  };

  const categoryColor = getCategoryColor(service.category);
  const isSelected = selectedService === service.id;

  return (
    <TouchableOpacity
      onPress={() => setSelectedService(service.id === selectedService ? null : service.id)}
      style={{
        backgroundColor: isSelected ? `${categoryColor}15` : COLORS.card, // 15 = 8% opacity hex code
        borderRadius: 12,
        padding: 20,
        marginBottom: 12,
        borderWidth: 2,
        borderColor: isSelected ? categoryColor : COLORS.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
        transform: [{ scale: isSelected ? 1.02 : 1 }], // Slight zoom effect when selected
      }}
      activeOpacity={0.7}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
            <Text style={{ 
              fontSize: 17, 
              fontWeight: '600', 
              color: isSelected ? categoryColor : COLORS.textPrimary, 
              flex: 1, 
              marginRight: 12 
            }}>
              {service.name}
            </Text>
            <Text style={{ 
              fontSize: 17, 
              fontWeight: '700', 
              color: isSelected ? categoryColor : COLORS.accent 
            }}>
              {service.price}
            </Text>
          </View>
          
          <Text style={{ 
            fontSize: 14, 
            color: isSelected ? categoryColor + 'CC' : COLORS.textSecondary, // CC = 80% opacity
            marginBottom: 12, 
            lineHeight: 20 
          }}>
            {service.description}
          </Text>
          
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              {/* Duration badge */}
              <View style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                backgroundColor: isSelected ? categoryColor + '20' : COLORS.surface, // 20 = 12% opacity
                borderRadius: 16, 
                paddingHorizontal: 10, 
                paddingVertical: 4, 
                marginRight: 8 
              }}>
                <Ionicons 
                  name="time-outline" 
                  size={12} 
                  color={isSelected ? categoryColor : COLORS.textSecondary} 
                />
                <Text style={{ 
                  fontSize: 12, 
                  color: isSelected ? categoryColor : COLORS.textSecondary, 
                  fontWeight: '500', 
                  marginLeft: 4 
                }}>
                  {service.duration}
                </Text>
              </View>
              
              {/* Category badge with gradient effect */}
              <View style={{ 
                backgroundColor: categoryColor,
                borderRadius: 16, 
                paddingHorizontal: 12,
                paddingVertical: 6,
                shadowColor: categoryColor,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 3,
              }}>
                <Text style={{ 
                  fontSize: 12, 
                  color: '#FFFFFF', 
                  fontWeight: '700',
                  textShadowColor: 'rgba(0, 0, 0, 0.2)',
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 1,
                }}>
                  {service.category}
                </Text>
              </View>
            </View>
            
            {/* Selection indicator */}
            {isSelected && (
              <View style={{ 
                backgroundColor: categoryColor, 
                borderRadius: 12, 
                width: 24, 
                height: 24, 
                alignItems: 'center', 
                justifyContent: 'center',
                marginLeft: 8,
                shadowColor: categoryColor,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 4,
              }}>
                <Ionicons name="checkmark" size={16} color="#FFFFFF" />
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Optional: Add a subtle indicator line at the bottom when selected */}
      {isSelected && (
        <View style={{
          position: 'absolute',
          bottom: 0,
          left: 20,
          right: 20,
          height: 3,
          backgroundColor: categoryColor,
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
        }} />
      )}
    </TouchableOpacity>
  );
};

export default ServiceCard;