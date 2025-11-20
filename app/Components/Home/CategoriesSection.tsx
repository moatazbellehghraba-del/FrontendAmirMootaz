import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';

interface Category {
  name: string;
  image: string;
  count: string;
}

interface CategoriesSectionProps {
  categories: Category[];
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ categories }) => {
  return (
    <View className="px-6 pb-6">
      <Text className="text-xl font-light text-black mb-4">Categories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row"
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            className="mr-4"
            style={{ width: 140 }}
          >
            <View className="relative">
              <Image
                source={{ uri: category.image }}
                className="w-full h-32 rounded-2xl mb-2"
              />
              <View className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 rounded-b-2xl p-2">
                <Text className="text-white font-semibold text-sm">{category.name}</Text>
                <Text className="text-gray-300 text-xs">{category.count}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoriesSection;