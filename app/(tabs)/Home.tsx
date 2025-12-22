import React, { useContext, useState, useRef } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

// Type definitions
interface SponsoredOffer {
  id: number;
  title: string;
  description: string;
  salon: string;
  image: string;
  expiry: string;
  gradient: readonly [string, string];
  icon: string;
}

interface Salon {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  distance: string;
  image: string;
  services: string[];
  price: string;
  open: boolean;
  featured?: boolean;
  new?: boolean;
  trending?: boolean;
}

interface Category {
  id: number;
  name: string;
  image?: any;
}

const HomeScreen = () => {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();
  const scrollX = useRef(new Animated.Value(0)).current;

  // Sponsored Offers Data
  const sponsoredOffers: SponsoredOffer[] = [
    {
      id: 1,
      title: "30% Off First Visit",
      description: "New clients get 30% off any service",
      salon: "Glamour Studio",
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=200&fit=crop",
      expiry: "Ends in 2 days",
      gradient: ["#667eea", "#764ba2"] as const,
      icon: "sparkles",
    },
    {
      id: 2,
      title: "Free Manicure",
      description: "Get free manicure with any hair service",
      salon: "Luxe Beauty",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=200&fit=crop",
      expiry: "Limited time",
      gradient: ["#f093fb", "#f5576c"] as const,
      icon: "gift",
    },
    {
      id: 3,
      title: "50% Off Massage",
      description: "Relaxing massage at half price",
      salon: "Serenity Spa",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=200&fit=crop",
      expiry: "Today only",
      gradient: ["#4facfe", "#00f2fe"] as const,
      icon: "flash",
    },
  ];

  // Recommended Salons Data
  const recommendedSalons: Salon[] = [
    {
      id: 1,
      name: "Glamour Hair Studio",
      rating: 4.9,
      reviews: 342,
      distance: "0.8 km",
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=300&h=200&fit=crop",
      services: ["Haircut", "Coloring", "Styling", "Extensions"],
      price: "$$",
      open: true,
      featured: true,
    },
    {
      id: 2,
      name: "Elite Barbershop",
      rating: 4.8,
      reviews: 156,
      distance: "1.2 km",
      image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=300&h=200&fit=crop",
      services: ["Beard Trim", "Haircut", "Shave", "Facial"],
      price: "$$",
      open: true,
      featured: false,
    },
    {
      id: 3,
      name: "Luxe Nails & Spa",
      rating: 4.7,
      reviews: 203,
      distance: "0.5 km",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=300&h=200&fit=crop",
      services: ["Manicure", "Pedicure", "Nail Art", "Spa"],
      price: "$$$",
      open: true,
      featured: true,
    },
    {
      id: 4,
      name: "Serenity Wellness Spa",
      rating: 4.9,
      reviews: 189,
      distance: "1.5 km",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=300&h=200&fit=crop",
      services: ["Massage", "Facial", "Body Treatment"],
      price: "$$$",
      open: true,
      featured: true,
    },
  ];

  // New to Saha Data
  const newToSaha: Salon[] = [
    {
      id: 5,
      name: "Sparkle Beauty Lounge",
      rating: 4.6,
      reviews: 89,
      distance: "2.1 km",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=200&fit=crop",
      services: ["Makeup", "Facials", "Waxing"],
      price: "$$",
      open: true,
      new: true,
    },
    {
      id: 6,
      name: "Urban Tattoo Studio",
      rating: 4.9,
      reviews: 67,
      distance: "3.5 km",
      image: "https://images.unsplash.com/photo-1605648916483-9a98044d15c3?w=300&h=200&fit=crop",
      services: ["Tattoos", "Piercings", "Design"],
      price: "$$$",
      open: true,
      new: true,
    },
    {
      id: 7,
      name: "Pure Wellness Center",
      rating: 4.8,
      reviews: 124,
      distance: "1.8 km",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
      services: ["Massage", "Yoga", "Meditation"],
      price: "$$",
      open: true,
      new: true,
    },
  ];

  // Trending Data
  const trending: Salon[] = [
    {
      id: 8,
      name: "Microblading Brow Studio",
      rating: 4.9,
      reviews: 456,
      distance: "1.5 km",
      image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=300&h=200&fit=crop",
      services: ["Microblading", "Brow Lamination"],
      price: "$$$",
      open: true,
      trending: true,
    },
    {
      id: 9,
      name: "Laser Hair Removal Clinic",
      rating: 4.7,
      reviews: 289,
      distance: "2.3 km",
      image: "https://images.unsplash.com/photo-1594736797933-d0ea3ff8db41?w=300&h=200&fit=crop",
      services: ["Laser Treatments", "Skin Care"],
      price: "$$$$",
      open: true,
      trending: true,
    },
    {
      id: 10,
      name: "Men's Grooming Lounge",
      rating: 4.8,
      reviews: 178,
      distance: "0.9 km",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=300&h=200&fit=crop",
      services: ["Haircut", "Shave", "Facial"],
      price: "$$",
      open: true,
      trending: true,
    },
  ];

  // Categories Data
  const categories: Category[] = [
    { 
      id: 1, 
      name: "Hair Salons", 
      image: require("../../assets/images/haircute.png")
    },
    { 
      id: 2, 
      name: "Nail Salons", 
      image: require("../../assets/images/nails.png")
    },
    { 
      id: 3, 
      name: "Beauty & Spa", 
      image: require("../../assets/images/spa.png")
    },
    { 
      id: 4, 
      name: "Massage", 
      image: require("../../assets/images/massage.png")
    },
    { 
      id: 5, 
      name: "Makeup Artists", 
      image: require("../../assets/images/makeup.png")
    },
    { 
      id: 6, 
      name: "Tattoo & Piercing", 
      image: require("../../assets/images/tato.png")
    },
  ];

  // Simple navigation to salon screen
  const goToSalonScreen = (salon: Salon) => {
    router.push({
      pathname: "/(salon)/SalonScreen",
      params: { salon: JSON.stringify(salon) }
    });
  };

  // Component for Sponsored Offer Card
  const SponsoredOfferCard = ({ offer, index }: { offer: SponsoredOffer; index: number }) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];
    
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={{
          transform: [{ scale }],
          opacity,
          width: width * 0.85,
          marginHorizontal: 8,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          className="rounded-3xl overflow-hidden"
          style={{
            height: 180,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.1,
            shadowRadius: 20,
            elevation: 8,
          }}
          onPress={() => {
            // Find a matching salon from any list
            const salon = [...recommendedSalons, ...newToSaha, ...trending].find(
              s => s.name.includes(offer.salon) || offer.salon.includes(s.name)
            );
            if (salon) goToSalonScreen(salon);
          }}
        >
          <LinearGradient
            colors={offer.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="absolute inset-0"
          />
          
          <Image
            source={{ uri: offer.image }}
            className="absolute inset-0 opacity-20"
            resizeMode="cover"
          />

          <View className="flex-1 p-6 justify-between">
            <View>
              <View className="flex-row items-center mb-3">
                <View className="bg-white bg-opacity-20 rounded-full px-3 py-1 mr-2">
                  <Text className="text-white text-xs font-bold">SPECIAL OFFER</Text>
                </View>
              </View>
              
              <Text className="text-white text-xl font-bold mb-2">
                {offer.title}
              </Text>
              <Text className="text-white text-sm opacity-90">
                {offer.description}
              </Text>
            </View>

            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-white text-sm font-medium">
                  {offer.salon}
                </Text>
                <Text className="text-white text-xs opacity-90">
                  {offer.expiry}
                </Text>
              </View>

              <TouchableOpacity 
                className="bg-white rounded-2xl px-5 py-3"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 5 },
                  shadowOpacity: 0.2,
                  shadowRadius: 10,
                  elevation: 5,
                }}
              >
                <Text className="font-bold text-sm" style={{ color: offer.gradient[0] }}>
                  Claim Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  // Component for Salon Card
  const SalonCard = ({ salon, showNewBadge = false, showTrendingBadge = false }: { salon: Salon; showNewBadge?: boolean; showTrendingBadge?: boolean }) => (
    <TouchableOpacity 
      className="bg-white rounded-2xl border border-gray-200 mr-4 overflow-hidden"
      style={{ width: width * 0.65 }}
      onPress={() => goToSalonScreen(salon)}
    >
      <View className="relative">
        <Image
          source={{ uri: salon.image }}
          className="w-full h-40"
          resizeMode="cover"
        />
        {showNewBadge && (
          <View className="absolute top-3 left-3 bg-blue-500 rounded-full px-3 py-1">
            <Text className="text-white text-xs font-bold">NEW</Text>
          </View>
        )}
        {showTrendingBadge && (
          <View className="absolute top-3 left-3 bg-red-500 rounded-full px-3 py-1">
            <Text className="text-white text-xs font-bold">TRENDING</Text>
          </View>
        )}
        {salon.featured && (
          <View className="absolute top-3 left-3 bg-amber-500 rounded-full px-3 py-1">
            <Text className="text-white text-xs font-bold">FEATURED</Text>
          </View>
        )}
        <View className="absolute top-3 right-3 bg-black bg-opacity-70 rounded-full px-2 py-1">
          <Text className="text-white text-xs">{salon.price}</Text>
        </View>
        <TouchableOpacity className="absolute bottom-3 right-3 bg-white rounded-full w-10 h-10 items-center justify-center">
          <Ionicons name="heart-outline" size={20} color="#666" />
        </TouchableOpacity>
      </View>
      
      <View className="p-4">
        <View className="flex-row justify-between items-start mb-2">
          <View className="flex-1">
            <Text className="text-black font-bold text-base mb-1" numberOfLines={1}>
              {salon.name}
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="star" size={14} color="#F59E0B" />
              <Text className="text-gray-600 text-sm font-medium ml-1 mr-2">
                {salon.rating}
              </Text>
              <Text className="text-gray-400 text-xs">
                ({salon.reviews} reviews)
              </Text>
            </View>
          </View>
        </View>
        
        <View className="flex-row items-center mb-3">
          <Ionicons name="location-outline" size={14} color="#666" />
          <Text className="text-gray-600 text-sm font-medium ml-2">
            {salon.distance} away
          </Text>
          {salon.open && (
            <View className="ml-auto flex-row items-center bg-green-50 rounded-full px-2 py-1">
              <Ionicons name="time-outline" size={12} color="#10B981" />
              <Text className="text-green-600 text-xs font-medium ml-1">Open</Text>
            </View>
          )}
        </View>

        <View className="flex-row flex-wrap">
          {salon.services.slice(0, 2).map((service, index) => (
            <View 
              key={index} 
              className="bg-gray-50 rounded-full px-3 py-1 mr-2 mb-1"
            >
              <Text className="text-gray-600 text-xs">{service}</Text>
            </View>
          ))}
          {salon.services.length > 2 && (
            <View className="bg-gray-100 rounded-full px-3 py-1">
              <Text className="text-gray-500 text-xs">+{salon.services.length - 2}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  // Component for Category Card (2 per row)
  const CategoryCard = ({ category }: { category: Category }) => (
    <TouchableOpacity 
      className="w-1/2 pr-2"
      style={{ height: 100 }}
      onPress={() => console.log(`Category pressed: ${category.name}`)}
    >
      <View className="relative rounded-2xl overflow-hidden h-full">
        <Image
          source={category.image}
          className="w-full h-full absolute"
          resizeMode="cover"
        />
        <View className="flex-1 p-4 justify-end h-full">
          <Text className="text-white font-bold text-lg mb-1">
            {category.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Component for Section Header
  const SectionHeader = ({ title, onViewAll }: { title: string; onViewAll: () => void }) => (
    <View className="flex-row justify-between items-center mb-4 px-6">
      <Text className="text-xl font-bold text-black">{title}</Text>
      <TouchableOpacity onPress={onViewAll} className="flex-row items-center">
        <Text className="text-blue-500 font-semibold mr-1">See all</Text>
        <Ionicons name="chevron-forward" size={16} color="#3b82f6" />
      </TouchableOpacity>
    </View>
  );

  // Pagination Dots for Offers
  const PaginationDots = () => {
    return (
      <View className="flex-row justify-center items-center mt-4">
        {sponsoredOffers.map((_, index) => {
          const inputRange = [
            (index - 1) * width * 0.85,
            index * width * 0.85,
            (index + 1) * width * 0.85,
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 20, 8],
            extrapolate: 'clamp',
          });

          const dotOpacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={{
                width: dotWidth,
                height: 8,
                borderRadius: 4,
                backgroundColor: '#3b82f6',
                opacity: dotOpacity,
                marginHorizontal: 4,
              }}
            />
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View className="px-6 pt-6 pb-4">
          <View className="flex-row justify-between items-center mb-6">
            <View>
              <Text className="text-3xl font-bold text-black mb-1">
                Hi, {currentUser?.firstName || "Welcome"} 👋
              </Text>
              <Text className="text-gray-500 text-base">
                What service are you looking for?
              </Text>
            </View>
            <TouchableOpacity 
              className="w-12 h-12 bg-gray-100 rounded-2xl items-center justify-center"
              onPress={() => console.log("Notifications pressed")}
            >
              <Ionicons name="notifications-outline" size={24} color="#000" />
              <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
                <Text className="text-white text-xs font-bold">3</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <TouchableOpacity 
            className="flex-row items-center bg-gray-50 rounded-2xl px-4 py-3"
            onPress={() => console.log("Search pressed")}
          >
            <Ionicons name="search-outline" size={20} color="#666" />
            <Text className="text-gray-400 ml-3 text-base">
              Search services, salons, or stylists...
            </Text>
          </TouchableOpacity>
        </View>

        {/* Special Offers Section */}
        <View className="mb-8">
          <SectionHeader 
            title="Special Offers" 
            onViewAll={() => console.log("View all offers")}
          />
          <Animated.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            decelerationRate="fast"
            snapToInterval={width * 0.85 + 16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          >
            {sponsoredOffers.map((offer, index) => (
              <SponsoredOfferCard key={offer.id} offer={offer} index={index} />
            ))}
          </Animated.ScrollView>
          <PaginationDots />
        </View>

        {/* Recommended for You Section */}
        <View className="mb-8">
          <SectionHeader 
            title="Recommended for You" 
            onViewAll={() => console.log("View all recommended")}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 24, paddingRight: 12 }}
          >
            {recommendedSalons.map((salon) => (
              <SalonCard key={salon.id} salon={salon} />
            ))}
          </ScrollView>
        </View>

        {/* New to Saha Section */}
        <View className="mb-8">
          <SectionHeader 
            title="New to Saha" 
            onViewAll={() => console.log("View all new")}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 24, paddingRight: 12 }}
          >
            {newToSaha.map((salon) => (
              <SalonCard key={salon.id} salon={salon} showNewBadge={true} />
            ))}
          </ScrollView>
        </View>

        {/* Trending Now Section */}
        <View className="mb-8">
          <SectionHeader 
            title="Trending Now" 
            onViewAll={() => console.log("View all trending")}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 24, paddingRight: 12 }}
          >
            {trending.map((salon) => (
              <SalonCard key={salon.id} salon={salon} showTrendingBadge={true} />
            ))}
          </ScrollView>
        </View>

        {/* Categories Section */}
        <View className="mb-8">
          <View className="flex-row justify-between items-center mb-4 px-6">
            <Text className="text-xl font-bold text-black">Categories</Text>
            <TouchableOpacity 
              onPress={() => console.log("View all categories")}
              className="flex-row items-center"
            >
              <Text className="text-blue-500 font-semibold mr-1">See all</Text>
              <Ionicons name="chevron-forward" size={16} color="#3b82f6" />
            </TouchableOpacity>
          </View>
          
          <View className="px-6">
            <View className="flex-row mb-3">
              {categories.slice(0, 2).map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </View>
            
            <View className="flex-row mb-3">
              {categories.slice(2, 4).map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </View>
            
            <View className="flex-row">
              {categories.slice(4, 6).map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </View>
          </View>
        </View>

        {/* Social Proof Section */}
        <View className="px-6 mb-8">
          <View className="items-center bg-gray-50 rounded-3xl py-8">
            <Text className="text-black font-bold text-lg mb-2">
              Trusted by Thousands
            </Text>
            <Text className="text-gray-500 text-sm text-center mb-4 px-8">
              Join 50,000+ satisfied customers who book with Saha
            </Text>
            <View className="flex-row items-center mb-6">
              <Ionicons name="star" size={16} color="#F59E0B" />
              <Ionicons name="star" size={16} color="#F59E0B" />
              <Ionicons name="star" size={16} color="#F59E0B" />
              <Ionicons name="star" size={16} color="#F59E0B" />
              <Ionicons name="star" size={16} color="#F59E0B" />
              <Text className="text-gray-600 text-sm font-medium ml-2">
                4.8 (12,847 reviews)
              </Text>
            </View>
            <View className="flex-row items-center">
              <View className="items-center mx-2">
                <Text className="text-black font-bold text-2xl">50K+</Text>
                <Text className="text-gray-500 text-xs">Happy Clients</Text>
              </View>
              <View className="h-8 w-px bg-gray-300 mx-4" />
              <View className="items-center mx-2">
                <Text className="text-black font-bold text-2xl">1.2K+</Text>
                <Text className="text-gray-500 text-xs">Salons</Text>
              </View>
              <View className="h-8 w-px bg-gray-300 mx-4" />
              <View className="items-center mx-2">
                <Text className="text-black font-bold text-2xl">98%</Text>
                <Text className="text-gray-500 text-xs">Satisfaction</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;