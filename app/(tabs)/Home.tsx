import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const Home = () => {
  const categories = [
    {
      name: "Hair Salon",
      image:
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=150&h=150&fit=crop&crop=center",
    },
    {
      name: "BarberShop",
      image:
        "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=150&h=150&fit=crop&crop=center",
    },
    {
      name: "Nail Salon",
      image:
        "https://images.unsplash.com/photo-1607778833979-4cc7b3e12e0e?w=150&h=150&fit=crop&crop=center",
    },
    {
      name: "Skin Care",
      image:
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=150&h=150&fit=crop&crop=center",
    },
    {
      name: "Brows & Lashes",
      image:
        "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=150&h=150&fit=crop&crop=center",
    },
    {
      name: "Massage",
      image:
        "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=150&h=150&fit=crop&crop=center",
    },
    {
      name: "Makeup",
      image:
        "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=150&h=150&fit=crop&crop=center",
    },
    {
      name: "Wellness & Spa",
      image:
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=150&h=150&fit=crop&crop=center",
    },
    {
      name: "Tattoo Shop",
      image:
        "https://images.unsplash.com/photo-1571687944729-b79e034a4cda?w=150&h=150&fit=crop&crop=center",
    },
    {
      name: "Hair Removal",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=center",
    },
    {
      name: "Piercing",
      image:
        "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=150&h=150&fit=crop&crop=center",
    },
    {
      name: "Aesthetic Medicine",
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop&crop=center",
    },
    {
      name: "Other",
      image:
        "https://images.unsplash.com/photo-1571019614244-c5d476efa26e?w=150&h=150&fit=crop&crop=center",
    },
  ];

  const featuredSalons = [
    {
      id: 1,
      name: "Elite Barber Shop",
      rating: 4.8,
      distance: "0.8 km",
      image:
        "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=300",
      category: "BarberShop",
    },
    {
      id: 2,
      name: "Luxe Nails Studio",
      rating: 4.9,
      distance: "1.2 km",
      image:
        "https://images.unsplash.com/photo-1607778833979-4cc7b3e12e0e?w=300",
      category: "Nail Salon",
    },
    {
      id: 3,
      name: "Serenity Spa",
      rating: 4.7,
      distance: "2.1 km",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=300",
      category: "Wellness & Spa",
    },
    {
      id: 4,
      name: "Glamour Makeup Studio",
      rating: 4.9,
      distance: "1.5 km",
      image:
        "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=300",
      category: "Makeup",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-6 pt-6 pb-4">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-2xl font-bold text-gray-900">LookLink</Text>
            <Text className="text-gray-500 mt-1">Find your perfect salon</Text>
          </View>
          <TouchableOpacity className="bg-gray-100 p-3 rounded-full">
            <Ionicons name="notifications-outline" size={24} color="#4A90E2" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View className="px-6 pb-4">
        <View className="relative">
          <Ionicons
            name="search"
            size={20}
            color="#9CA3AF"
            style={{ position: "absolute", left: 16, top: 16, zIndex: 10 }}
          />
          <TextInput
            placeholder="Search for salons or services..."
            className="w-full bg-gray-50 rounded-2xl px-12 py-4 text-base border border-gray-200"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Categories Section with Circular Images */}
        <View className="px-6 pb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-900">Categories</Text>
            <TouchableOpacity>
              <Text className="text-[#4A90E2] font-semibold">See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row"
          >
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                className="items-center mr-5"
                style={{ width: 80 }}
              >
                <View className="relative">
                  <Image
                    source={{ uri: category.image }}
                    className="w-16 h-16 rounded-full mb-2"
                    resizeMode="cover"
                  />
                  {/* Optional: Add a subtle border */}
                  <View
                    className="absolute inset-0 rounded-full border-2 border-white shadow-sm"
                    style={{
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.1,
                      shadowRadius: 2,
                    }}
                  />
                </View>
                <Text className="text-gray-800 font-medium text-xs text-center leading-tight">
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Salons Section */}
        <View className="px-6 pb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-900">
              Recommended for you
            </Text>
            <TouchableOpacity>
              <Text className="text-[#4A90E2] font-semibold">See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row"
          >
            {featuredSalons.map((salon) => (
              <TouchableOpacity
                key={salon.id}
                className="bg-white rounded-2xl mr-4 shadow-sm border border-gray-100"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 3,
                  width: 280,
                }}
              >
                <Image
                  source={{ uri: salon.image }}
                  className="w-full h-40 rounded-t-2xl"
                />
                <View className="p-4">
                  <View className="flex-row justify-between items-start mb-2">
                    <View className="flex-1 mr-2">
                      <Text className="text-lg font-bold text-gray-900 mb-1">
                        {salon.name}
                      </Text>
                      <View className="bg-blue-100 px-2 py-1 rounded-full self-start">
                        <Text className="text-blue-800 text-xs font-medium">
                          {salon.category}
                        </Text>
                      </View>
                    </View>
                    <View className="flex-row items-center bg-amber-50 px-2 py-1 rounded-full">
                      <Ionicons name="star" size={14} color="#F59E0B" />
                      <Text className="text-amber-800 text-xs font-semibold ml-1">
                        {salon.rating}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row items-center">
                    <Ionicons
                      name="location-outline"
                      size={16}
                      color="#6B7280"
                    />
                    <Text className="text-gray-500 text-sm ml-1">
                      {salon.distance}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Popular Services Section */}
        <View className="px-6 pb-8">
          <Text className="text-xl font-bold text-gray-900 mb-4">
            Popular Services
          </Text>

          <View className="space-y-3">
            {[
              {
                service: "Haircut & Styling",
                price: "$35",
                time: "45 min",
                category: "Hair Salon",
              },
              {
                service: "Manicure & Pedicure",
                price: "$55",
                time: "60 min",
                category: "Nail Salon",
              },
              {
                service: "Facial Treatment",
                price: "$75",
                time: "90 min",
                category: "Skin Care",
              },
              {
                service: "Beard Trim & Shave",
                price: "$25",
                time: "30 min",
                category: "BarberShop",
              },
              {
                service: "Eyelash Extensions",
                price: "$85",
                time: "120 min",
                category: "Brows & Lashes",
              },
              {
                service: "Therapeutic Massage",
                price: "$65",
                time: "60 min",
                category: "Massage",
              },
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-4 flex-row justify-between items-center shadow-sm"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 3,
                  elevation: 2,
                }}
              >
                <View className="flex-1">
                  <Text className="text-gray-900 font-semibold text-base mb-1">
                    {item.service}
                  </Text>
                  <View className="flex-row items-center">
                    <View className="bg-gray-100 px-2 py-1 rounded-full mr-3">
                      <Text className="text-gray-600 text-xs font-medium">
                        {item.category}
                      </Text>
                    </View>
                    <Text className="text-gray-500 text-sm">{item.time}</Text>
                  </View>
                </View>
                <Text className="text-[#4A90E2] font-bold text-lg">
                  {item.price}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
