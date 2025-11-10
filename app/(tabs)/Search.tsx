import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Modal,
  Platform,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Type definitions
interface SearchResult {
  id: string;
  name: string;
  category: string;
  city: string;
  rating: number;
  reviews: number;
  image: string;
  priceRange: string;
  duration: string;
  distance: string;
  isOpen: boolean;
  offers: boolean;
  homeService: boolean;
  topRated: boolean;
}

interface Filters {
  offers: boolean;
  homeService: boolean;
  topRated: boolean;
  openNow: boolean;
}

export default function SearchScreen() {
  const router = useRouter();
  const [city, setCity] = useState("");
  const [showCityModal, setShowCityModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [category, setCategory] = useState("All");
  const [filters, setFilters] = useState<Filters>({
    offers: false,
    homeService: false,
    topRated: false,
    openNow: false,
  });
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    "All",
    "Hair Salon",
    "Barber",
    "Nails",
    "Spa",
    "Massage",
    "Makeup",
    "Eyebrows",
    "Skincare",
  ];

  const cities = ["Tunis", "Sousse", "Sfax", "Nabeul", "Bizerte", "Monastir", "Hammamet", "Djerba"];

  const handleSearch = () => {
    // Mock data with more details
    const mockResults: SearchResult[] = [
      {
        id: "1",
        name: "Glamour Hair Studio",
        category: "Hair Salon",
        city: "Tunis",
        rating: 4.9,
        reviews: 284,
        image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=300&h=200&fit=crop",
        priceRange: "$$$",
        duration: "45min",
        distance: "1.2km",
        isOpen: true,
        offers: true,
        homeService: false,
        topRated: true,
      },
      {
        id: "2",
        name: "Elite Barber Shop",
        category: "Barber",
        city: "Sousse",
        rating: 4.8,
        reviews: 156,
        image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=300&h=200&fit=crop",
        priceRange: "$$",
        duration: "30min",
        distance: "2.5km",
        isOpen: true,
        offers: false,
        homeService: true,
        topRated: true,
      },
      {
        id: "3",
        name: "Relaxation Spa",
        category: "Spa",
        city: "Nabeul",
        rating: 4.7,
        reviews: 89,
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=300&h=200&fit=crop",
        priceRange: "$$$$",
        duration: "2h",
        distance: "3.1km",
        isOpen: false,
        offers: true,
        homeService: false,
        topRated: false,
      },
      {
        id: "4",
        name: "Nail Art Studio",
        category: "Nails",
        city: "Sfax",
        rating: 4.6,
        reviews: 203,
        image: "https://images.unsplash.com/photo-1607778833979-4c13c14a8d71?w=300&h=200&fit=crop",
        priceRange: "$$",
        duration: "1h",
        distance: "0.8km",
        isOpen: true,
        offers: false,
        homeService: true,
        topRated: false,
      },
    ];

    const filtered = mockResults.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesCity = city === "" || item.city === city;
      const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase()) || 
                          item.category.toLowerCase().includes(query.toLowerCase());
      const matchesOffers = !filters.offers || item.offers;
      const matchesHomeService = !filters.homeService || item.homeService;
      const matchesTopRated = !filters.topRated || item.topRated;
      const matchesOpenNow = !filters.openNow || item.isOpen;

      return matchesCategory && matchesCity && matchesQuery && 
             matchesOffers && matchesHomeService && matchesTopRated && matchesOpenNow;
    });
    
    setResults(filtered);
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const ResultCard = ({ item }: { item: SearchResult }) => (
    <TouchableOpacity 
      className="bg-white rounded-xl p-4 mb-3 border border-gray-200"
      onPress={() => router.push({
        pathname: '/(salon)/SalonScreen',
        params: {
          id: item.id,
          name: item.name,
        }
      })}
    >
      <View className="flex-row">
        <Image
          source={{ uri: item.image }}
          className="w-20 h-20 rounded-lg mr-4"
        />
        <View className="flex-1">
          <View className="flex-row justify-between items-start mb-1">
            <Text className="text-lg font-semibold text-gray-900 flex-1 mr-2">
              {item.name}
            </Text>
            <View className={`px-2 py-1 rounded-full ${
              item.isOpen ? 'bg-green-100' : 'bg-red-100'
            }`}>
              <Text className={`text-xs font-medium ${
                item.isOpen ? 'text-green-800' : 'text-red-800'
              }`}>
                {item.isOpen ? 'OPEN' : 'CLOSED'}
              </Text>
            </View>
          </View>
          
          <Text className="text-gray-600 text-sm mb-2">
            {item.category} • {item.distance} • {item.priceRange}
          </Text>
          
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="star" size={14} color="#F59E0B" />
              <Text className="text-gray-700 text-sm font-medium ml-1 mr-2">
                {item.rating}
              </Text>
              <Text className="text-gray-500 text-sm">
                ({item.reviews})
              </Text>
            </View>
            
            <View className="flex-row items-center space-x-2">
              {item.offers && (
                <View className="bg-blue-100 px-2 py-1 rounded-full">
                  <Text className="text-blue-800 text-xs font-medium">Offers</Text>
                </View>
              )}
              {item.homeService && (
                <View className="bg-green-100 px-2 py-1 rounded-full">
                  <Text className="text-green-800 text-xs font-medium">Home</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="bg-white border-b border-gray-200 px-6 py-4">
          <Text className="text-2xl font-semibold text-gray-900">
            Discover Services
          </Text>
          <Text className="text-gray-600 text-sm mt-1">
            Find the perfect salon for your needs
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6">
          {/* Search Bar */}
          <View className="relative mt-4 mb-4">
            <TextInput
              placeholder="Search for salons, services..."
              placeholderTextColor="#9CA3AF"
              value={query}
              onChangeText={setQuery}
              className="border border-gray-300 rounded-xl px-4 h-12 text-base text-gray-900 bg-white pl-12"
            />
            <Ionicons 
              name="search" 
              size={20} 
              color="#9CA3AF" 
              style={{ position: 'absolute', left: 16, top: 14 }}
            />
          </View>

          {/* Location & Date Row */}
          <View className="flex-row space-x-3 mb-4">
            <TouchableOpacity
              className="flex-1 border border-gray-300 rounded-xl p-3 flex-row items-center"
              onPress={() => setShowCityModal(true)}
            >
              <Ionicons name="location" size={18} color="#666" />
              <Text className="text-gray-700 ml-2 text-sm font-medium flex-1">
                {city ? city : "Location"}
              </Text>
              <Ionicons name="chevron-down" size={16} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 border border-gray-300 rounded-xl p-3 flex-row items-center"
              onPress={() => setShowDatePicker(true)}
            >
              <Ionicons name="calendar" size={18} color="#666" />
              <Text className="text-gray-700 ml-2 text-sm font-medium flex-1">
                {formatDate(date)}
              </Text>
              <Ionicons name="chevron-down" size={16} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Categories */}
          <View className="mb-4">
            <Text className="text-base font-semibold text-gray-900 mb-3">
              Categories
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ flexDirection: 'row' }}
            >
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  className={`px-4 py-2.5 rounded-xl mr-3 border ${
                    category === cat ? "bg-black border-black" : "bg-white border-gray-300"
                  }`}
                  onPress={() => setCategory(cat)}
                >
                  <Text
                    className={`text-sm font-medium ${
                      category === cat ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Filters */}
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-base font-semibold text-gray-900">
                Filters
              </Text>
              <TouchableOpacity onPress={() => setShowFilters(!showFilters)}>
                <Text className="text-black text-sm font-medium">
                  {showFilters ? 'Hide' : 'Show'} Filters
                </Text>
              </TouchableOpacity>
            </View>

            {showFilters && (
              <View className="flex-row flex-wrap justify-between">
                {[
                  { key: 'openNow', label: 'Open Now', icon: 'time' },
                  { key: 'topRated', label: 'Top Rated', icon: 'star' },
                  { key: 'offers', label: 'Special Offers', icon: 'pricetag' },
                  { key: 'homeService', label: 'Home Service', icon: 'home' },
                ].map((filter) => (
                  <TouchableOpacity
                    key={filter.key}
                    className={`w-[48%] py-3 rounded-xl border mb-3 flex-row items-center justify-center ${
                      filters[filter.key as keyof Filters]
                        ? "bg-black border-black"
                        : "bg-white border-gray-300"
                    }`}
                    onPress={() =>
                      setFilters((prev) => ({ 
                        ...prev, 
                        [filter.key]: !prev[filter.key as keyof Filters] 
                      }))
                    }
                  >
                    <Ionicons 
                      name={filter.icon as any} 
                      size={16} 
                      color={filters[filter.key as keyof Filters] ? "#fff" : "#666"} 
                      style={{ marginRight: 8 }}
                    />
                    <Text
                      className={`text-sm font-medium ${
                        filters[filter.key as keyof Filters] ? "text-white" : "text-gray-700"
                      }`}
                    >
                      {filter.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Search Button */}
          <TouchableOpacity 
            className="bg-black rounded-xl py-4 mb-6"
            onPress={handleSearch}
          >
            <Text className="text-white text-base font-semibold text-center">
              Search Services
            </Text>
          </TouchableOpacity>

          {/* Results */}
          {results.length > 0 && (
            <View className="mb-6">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-xl font-semibold text-gray-900">
                  Found {results.length} Salons
                </Text>
                <TouchableOpacity onPress={() => setResults([])}>
                  <Text className="text-gray-500 text-sm">Clear</Text>
                </TouchableOpacity>
              </View>
              
              {results.map((item) => (
                <ResultCard key={item.id} item={item} />
              ))}
            </View>
          )}

          {results.length === 0 && query && (
            <View className="items-center justify-center py-12">
              <Ionicons name="search" size={48} color="#9CA3AF" />
              <Text className="text-gray-500 text-lg font-medium mt-4 text-center">
                No results found for "{query}"
              </Text>
              <Text className="text-gray-400 text-sm mt-2 text-center">
                Try adjusting your search or filters
              </Text>
            </View>
          )}

          {results.length === 0 && !query && (
            <View className="items-center justify-center py-12">
              <Ionicons name="search-outline" size={48} color="#9CA3AF" />
              <Text className="text-gray-500 text-lg font-medium mt-4 text-center">
                Search for salons and services
              </Text>
              <Text className="text-gray-400 text-sm mt-2 text-center">
                Use the filters above to find exactly what you need
              </Text>
            </View>
          )}
        </ScrollView>

        {/* City Modal */}
        <Modal visible={showCityModal} transparent animationType="slide">
          <View className="flex-1 justify-end">
            {/* Transparent Overlay */}
            <TouchableOpacity 
              className="flex-1"
              onPress={() => setShowCityModal(false)}
            />
            
            {/* Modal Content */}
            <View 
              className="bg-white rounded-t-3xl p-6 max-h-4/5"
              style={{
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: -2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 20,
                elevation: 20,
              }}
            >
              <View className="flex-row justify-between items-center mb-6">
                <Text className="text-xl font-semibold text-gray-900">
                  Select City
                </Text>
                <TouchableOpacity 
                  onPress={() => setShowCityModal(false)}
                  className="w-8 h-8 items-center justify-center"
                >
                  <Ionicons name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>
              
              <FlatList
                data={cities}
                keyExtractor={(item) => item}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="py-4 border-b border-gray-200 flex-row items-center"
                    onPress={() => {
                      setCity(item);
                      setShowCityModal(false);
                    }}
                  >
                    <Ionicons name="location" size={18} color="#666" style={{ marginRight: 12 }} />
                    <Text className="text-base text-gray-700 font-medium">{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        {/* Date Picker Modal */}
        {showDatePicker && (
          <Modal transparent animationType="slide" visible={showDatePicker}>
            <View className="flex-1 justify-end">
              {/* Transparent Overlay */}
              <TouchableOpacity 
                className="flex-1"
                onPress={() => setShowDatePicker(false)}
              />
              
              {/* Modal Content */}
              <View 
                className="bg-white rounded-t-3xl p-6"
                style={{
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: -2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 20,
                  elevation: 20,
                }}
              >
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-xl font-semibold text-gray-900">
                    Select Date
                  </Text>
                  <TouchableOpacity 
                    onPress={() => setShowDatePicker(false)}
                    className="w-8 h-8 items-center justify-center"
                  >
                    <Ionicons name="close" size={24} color="#666" />
                  </TouchableOpacity>
                </View>
                
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="spinner"
                  onChange={onDateChange}
                  minimumDate={new Date()}
                  style={{ backgroundColor: 'white' }}
                />
                
                <TouchableOpacity
                  className="bg-black rounded-xl py-4 mt-4"
                  onPress={() => setShowDatePicker(false)}
                >
                  <Text className="text-white text-base font-semibold text-center">
                    Confirm Date
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </SafeAreaView>
  );
}