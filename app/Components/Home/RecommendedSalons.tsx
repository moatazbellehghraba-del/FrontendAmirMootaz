import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
const router = useRouter();

interface Salon {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  distance: string;
  image: string;
  services: string[];
  openUntil: string;
  priceRange: string;
  featured: boolean;
}

interface RecommendedSalonsProps {
  salons: Salon[];
}

const RecommendedSalons: React.FC<RecommendedSalonsProps> = ({ salons }) => {
  return (
    <View className="px-6 pb-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-light text-black">Recommended Salons</Text>
        <TouchableOpacity>
          <Text className="text-gray-500 text-sm font-medium">View all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row"
      >
        {salons.map((salon) => (
          <TouchableOpacity
            key={salon.id}
            className="bg-gray-50 rounded-2xl mr-4 border border-gray-200"
            style={{ width: 300 }}
          >
            <View className="relative">
              <Image
                source={{ uri: salon.image }}
                className="w-full h-40 rounded-t-2xl"
              />
              {salon.featured && (
                <View className="absolute top-3 left-3 bg-amber-500 rounded-full px-2 py-1">
                  <Text className="text-white text-xs font-medium">Featured</Text>
                </View>
              )}
              <View className="absolute top-3 right-3 bg-black bg-opacity-70 rounded-full px-2 py-1">
                <Text className="text-white text-xs font-medium">{salon.priceRange}</Text>
              </View>
            </View>
            
            <View className="p-4">
              <View className="flex-row justify-between items-start mb-2">
                <View className="flex-1">
                  <Text className="text-black font-semibold text-base mb-1">{salon.name}</Text>
                  <View className="flex-row items-center">
                    <Ionicons name="star" size={14} color="#F59E0B" />
                    <Text className="text-gray-600 text-sm font-medium ml-1 mr-2">{salon.rating}</Text>
                    <Text className="text-gray-400 text-sm">({salon.reviews} reviews)</Text>
                  </View>
                </View>
                <View className="flex-row items-center bg-green-50 rounded-full px-2 py-1">
                  <Ionicons name="time-outline" size={12} color="#10B981" />
                  <Text className="text-green-600 text-xs font-medium ml-1">Until {salon.openUntil}</Text>
                </View>
              </View>
              
              <View className="flex-row items-center mb-3">
                <Ionicons name="location-outline" size={14} color="#666" />
                <Text className="text-gray-600 text-sm font-medium ml-2">{salon.distance}</Text>
              </View>

              <View className="flex-row flex-wrap mb-3">
                {salon.services.map((service, index) => (
                  <View key={index} className="bg-white rounded-full px-2 py-1 mr-2 mb-1 border border-gray-200">
                    <Text className="text-gray-500 text-xs">{service}</Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity 
  className="bg-black rounded-2xl py-3 items-center"
  onPress={() => router.push('/(salon)/SalonScreen')}
>
  <Text className="text-white text-sm font-medium">Book Appointment</Text>
</TouchableOpacity>
            
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default RecommendedSalons;