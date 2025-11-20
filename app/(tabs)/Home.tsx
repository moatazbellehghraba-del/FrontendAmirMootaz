import React, { useRef, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Import components
import SponsoredCarousel from '../Components/Home/SponsoredCarousel';
import CategoriesSection from '../Components/Home/CategoriesSection';
import RecommendedSalons from '../Components/Home/RecommendedSalons';
import NextAppointmentSection from '../Components/Home/NextAppointmentSection';
import BestRatedProfessionalsSection from '../Components/Home/BestRatedProfessionalsSection';

// Import types
import { SponsoredOffer, Category, Salon, Booking, Professional } from '../../Types/types';

interface HomeProps {
  navigation: any;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Data
  const sponsoredOffers: SponsoredOffer[] = [
    {
      id: 1,
      title: "30% Off First Visit",
      description: "New clients get 30% off any service",
      salon: "Glamour Studio",
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=200&fit=crop",
      expiry: "Ends in 2 days",
      gradient: ["#667eea", "#764ba2"],
      icon: "sparkles"
    },
    {
      id: 2,
      title: "Free Manicure",
      description: "Get free manicure with any hair service",
      salon: "Luxe Beauty",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=200&fit=crop",
      expiry: "Limited time",
      gradient: ["#f093fb", "#f5576c"],
      icon: "gift"
    },
  ];

  const categories: Category[] = [
    {
      name: "Hair Salon",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&h=200&fit=crop&crop=center",
      count: "245 salons"
    },
    {
      name: "Tattoo Shop",
      image:
        "https://images.unsplash.com/photo-1605648916483-9a98044d15c3?w=150&h=150&fit=crop&crop=center",
    },
    {
    name: "Nail Salon",
    image: "https://images.unsplash.com/photo-1607778833979-4cc7b3e12e0e?w=200&h=200&fit=crop&crop=center",
    count: "156 studios"
  },
  {
    name: "Beauty Spa",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=200&h=200&fit=crop&crop=center",
    count: "203 spas"
  },
  {
    name: "Massage",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=center",
    count: "178 therapists"
  },
  {
    name: "Makeup",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=200&h=200&fit=crop&crop=center",
    count: "92 artists"
  },
  {
    name: "Skincare",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=200&h=200&fit=crop&crop=center",
    count: "134 clinics"
  },
  {
    name: "Waxing",
    image: "https://images.unsplash.com/photo-1594736797933-d0ea3ff8db41?w=200&h=200&fit=crop&crop=center",
    count: "87 studios"
  }
  ];
  const BottomSocialProofSection = () => {
  return (
    <View className="px-6 py-8 bg-gray-50 mt-8">
      <View className="items-center">
        <Text className="text-black font-semibold text-lg mb-2">
          Trusted by Thousands
        </Text>
        <Text className="text-gray-500 text-sm text-center mb-4">
          Join 50,000+ satisfied customers who book with Saha
        </Text>
        <View className="flex-row items-center">
          <Text className="text-amber-500 text-sm mr-1">★★★★★</Text>
          <Text className="text-gray-600 text-sm">4.8 (12,847 reviews)</Text>
        </View>
      </View>
    </View>
  );
};

  const recommendedSalons: Salon[] = [
    {
      name: "Piercing",
      image:
        "https://images.unsplash.com/photo-1594736797933-d0401ba94693?w=150&h=150&fit=crop&crop=center",
    },
    {
    id: 2,
    name: "Elite Barbershop",
    rating: 4.8,
    reviews: 156,
    distance: "1.2 km",
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=300&h=200&fit=crop",
    services: ["Beard Trim", "Haircut", "Shave", "Facial"],
    openUntil: "19:00",
    priceRange: "$$",
    featured: false
  },
  {
    id: 3,
    name: "Luxe Nails & Spa",
    rating: 4.7,
    reviews: 203,
    distance: "0.5 km",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=300&h=200&fit=crop",
    services: ["Manicure", "Pedicure", "Nail Art", "Spa"],
    openUntil: "21:00",
    priceRange: "$$$",
    featured: true
  },
  {
    id: 4,
    name: "Serenity Wellness Spa",
    rating: 4.9,
    reviews: 189,
    distance: "1.5 km",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=300&h=200&fit=crop",
    services: ["Massage", "Facial", "Body Treatment", "Aromatherapy"],
    openUntil: "22:00",
    priceRange: "$$$",
    featured: true
  },
  ];

  const upcomingBookings: Booking[] = [
    {
      id: "1",
      service: "Haircut & Styling",
      professional: "Sophie Martin",
      date: "2024-01-15",
      time: "14:30",
      duration: 60,
      price: 45,
      currency: "TND",
      status: "confirmed",
      location: "Glamour Hair Studio",
      category: "Hair",
      rating: 4.9
    },
  ];

  const bestRatedProfessionals: Professional[] = [
    {
      id: "1",
      name: "Sophie Martin",
      specialty: "Hair Stylist",
      rating: 4.9,
      reviews: 127,
      image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=150&h=150&fit=crop&crop=face",
      salon: "Glamour Studio",
      experience: "8 years experience"
    },
    {
      id: "2",
      name: "Marc Dubois",
      specialty: "Master Barber",
      rating: 4.9,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      salon: "Elite Barbers",
      experience: "12 years experience"
    },
    {
      id: "3",
      name: "Léa Bernard",
      specialty: "Skincare Expert",
      rating: 4.8,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      salon: "Serenity Spa",
      experience: "6 years experience"
    },
  ];

  const specialOffers = [
    {
      id: 1,
      title: "50% Off First Visit",
      description: "For new customers only",
      code: "WELCOME50",
      color: "#FF6B6B",
    },
    {
      id: 2,
      title: "Free Manicure",
      description: "With any hair service",
      code: "FREEMANI",
      color: "#4ECDC4",
    },
    {
      id: 3,
      title: "Student Discount",
      description: "20% off all services",
      code: "STUDENT20",
      color: "#45B7D1",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header with Larger Logo */}
      <View className="px-6 pt-6">
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Image
              source={require("../../assets/images/logopng.png")}
              className="w-16 h-16"
              resizeMode="contain"
            />
          </View>
          <TouchableOpacity className="bg-gray-100 p-3 rounded-full">
            <Ionicons name="notifications-outline" size={24} color="#4A90E2" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View className="px-6 pt-4">
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

  const handleProfessionalPress = (professional: Professional) => {
    navigation.navigate('ProfessionalDetails', { professionalId: professional.id });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Categories Section - First */}
        <View className="px-6 pt-6">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-3xl font-light text-black mb-1">Saha</Text>
              <Text className="text-gray-400 text-base">Book beauty services instantly</Text>
            </View>
            <TouchableOpacity className="w-12 h-12 bg-gray-50 rounded-2xl items-center justify-center border border-gray-200">
              <Ionicons name="notifications-outline" size={22} color="#000" />
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

        {/* Special Offers Banner - Displayed directly without clicking */}
        <View className="px-6 pt-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-900">
              Special Offers
            </Text>
          </View>

          <View className="space-y-3">
            {specialOffers.map((offer) => (
              <View
                key={offer.id}
                className="rounded-2xl p-5"
                style={{
                  backgroundColor: offer.color,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.1,
                  shadowRadius: 12,
                  elevation: 5,
                }}
              >
                <Text className="text-white text-lg font-bold mb-1">
                  {offer.title}
                </Text>
                <Text className="text-white text-sm opacity-90 mb-3">
                  {offer.description}
                </Text>
                <View className="bg-white rounded-lg px-3 py-2 self-start">
                  <Text className="text-gray-900 font-mono font-bold">
                    Code: {offer.code}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Recommended Salons Section */}
        <View className="px-6 pt-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-900">Recommended</Text>
            <TouchableOpacity>
              <Text className="text-[#4A90E2] font-semibold">See All</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Sponsored Carousel */}
        <Animated.View 
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }}
        >
          <SponsoredCarousel offers={sponsoredOffers} />
        </Animated.View>

        {/* Quick Actions Footer */}
        <View className="px-6 pt-6">
          <View className="bg-gray-50 rounded-2xl p-6">
            <Text className="text-lg font-bold text-gray-900 text-center mb-3">
              Need Help Choosing?
            </Text>
            <Text className="text-gray-600 text-sm text-center mb-4">
              Our beauty experts can help you find the perfect service
            </Text>
            <View className="flex-row space-x-3">
              <TouchableOpacity className="flex-1 bg-[#4A90E2] rounded-xl py-3">
                <Text className="text-white font-semibold text-center">
                  Book Consultation
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-white border border-gray-300 rounded-xl py-3">
                <Text className="text-gray-900 font-semibold text-center">
                  Chat with Expert
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Best Rated Professionals */}
        <BestRatedProfessionalsSection 
          professionals={bestRatedProfessionals}
          onViewAll={handleViewAllProfessionals}
          onProfessionalPress={handleProfessionalPress}
        />

        {/* Recommended Salons */}
        <RecommendedSalons salons={recommendedSalons} />
        <BottomSocialProofSection />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;