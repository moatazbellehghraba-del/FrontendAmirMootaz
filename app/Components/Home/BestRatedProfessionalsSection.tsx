import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Professional {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  image: string;
  salon: string;
  experience?: string;
}

interface BestRatedProfessionalsSectionProps {
  professionals: Professional[];
  onViewAll?: () => void;
  onProfessionalPress?: (professional: Professional) => void;
}

const BestRatedProfessionalsSection: React.FC<BestRatedProfessionalsSectionProps> = ({ 
  professionals, 
  onViewAll,
  onProfessionalPress 
}) => {
  // Filter professionals with rating 4.5 or higher
  const bestRatedProfessionals = professionals.filter(pro => pro.rating >= 4.5);

  if (bestRatedProfessionals.length === 0) return null;

  return (
    <View className="px-6 pb-6">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-xl font-light text-black">Best Rated Professionals</Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text className="text-gray-500 text-sm font-medium">View all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="flex-row"
      >
        {bestRatedProfessionals.map((professional) => (
          <TouchableOpacity
            key={professional.id}
            className="bg-gray-50 rounded-2xl p-4 mr-4 border border-gray-200 items-center"
            style={{ width: 160 }}
            onPress={() => onProfessionalPress?.(professional)}
          >
            {/* Professional Image */}
            <Image
              source={{ uri: professional.image }}
              className="w-20 h-20 rounded-full mb-3"
            />
            
            {/* Verified Badge */}
            <View className="absolute top-3 right-3 bg-blue-500 rounded-full w-6 h-6 items-center justify-center">
              <Ionicons name="checkmark" size={14} color="#fff" />
            </View>

            {/* Professional Info */}
            <Text className="text-black font-semibold text-sm text-center mb-1">
              {professional.name}
            </Text>
            <Text className="text-gray-500 text-xs text-center mb-2">
              {professional.specialty}
            </Text>
            
            {/* Salon */}
            <Text className="text-gray-400 text-xs text-center mb-2">
              {professional.salon}
            </Text>

            {/* Rating */}
            <View className="flex-row items-center mb-2">
              <Ionicons name="star" size={14} color="#F59E0B" />
              <Text className="text-gray-600 text-xs font-medium ml-1 mr-2">
                {professional.rating}
              </Text>
              <Text className="text-gray-400 text-xs">
                ({professional.reviews})
              </Text>
            </View>

            {/* Experience (if available) */}
            {professional.experience && (
              <Text className="text-gray-400 text-xs text-center mb-3">
                {professional.experience}
              </Text>
            )}

            {/* Follow Button */}
            <TouchableOpacity className="bg-black rounded-full px-4 py-2">
              <Text className="text-white text-xs font-medium">Follow</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default BestRatedProfessionalsSection;