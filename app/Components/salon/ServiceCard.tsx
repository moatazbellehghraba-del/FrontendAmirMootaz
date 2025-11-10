import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../Constant/colors';
import { Service} from '../../../Types/saloon';
interface ServiceCardProps {
  service: Service;
  selectedService: string | null;
  setSelectedService: (id: string | null) => void;
}

const ServiceCard = ({ service, selectedService, setSelectedService }: ServiceCardProps) => {
  return (
    <TouchableOpacity
      onPress={() => setSelectedService(service.id === selectedService ? null : service.id)}
      style={{
        backgroundColor: COLORS.card,
        borderRadius: 12,
        padding: 20,
        marginBottom: 12,
        borderWidth: 2,
        borderColor: selectedService === service.id ? COLORS.accent : COLORS.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
            <Text style={{ fontSize: 17, fontWeight: '600', color: COLORS.textPrimary, flex: 1, marginRight: 12 }}>
              {service.name}
            </Text>
            <Text style={{ fontSize: 17, fontWeight: '700', color: COLORS.accent }}>
              {service.price}
            </Text>
          </View>
          
          <Text style={{ fontSize: 14, color: COLORS.textSecondary, marginBottom: 12, lineHeight: 20 }}>
            {service.description}
          </Text>
          
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, borderRadius: 16, paddingHorizontal: 10, paddingVertical: 4, marginRight: 8 }}>
                <Ionicons name="time-outline" size={12} color={COLORS.textSecondary} />
                <Text style={{ fontSize: 12, color: COLORS.textSecondary, fontWeight: '500', marginLeft: 4 }}>
                  {service.duration}
                </Text>
              </View>
              
              <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: 16, paddingHorizontal: 8, paddingVertical: 4 }}>
                <Text style={{ fontSize: 11, color: COLORS.accent, fontWeight: '600' }}>
                  {service.category}
                </Text>
              </View>
            </View>
            
            {selectedService === service.id && (
              <View style={{ backgroundColor: COLORS.accent, borderRadius: 10, width: 20, height: 20, alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="checkmark" size={14} color={COLORS.secondary} />
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ServiceCard;