import React, { useRef, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SponsoredCard from './SponsoredCard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface SponsoredOffer {
  id: number;
  title: string;
  description: string;
  salon: string;
  image: string;
  expiry: string;
  gradient: [string, string];
  icon: string;
}

interface SponsoredCarouselProps {
  offers: SponsoredOffer[];
}

const SponsoredCarousel: React.FC<SponsoredCarouselProps> = ({ offers }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % offers.length;
      setCurrentIndex(nextIndex);
      
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: nextIndex * (SCREEN_WIDTH * 0.85),
          animated: true,
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, offers.length]);

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / (SCREEN_WIDTH * 0.85));
    setCurrentIndex(index);
  };

  const EnhancedDots = () => {
    return (
      <View className="flex-row justify-center items-center mt-6 mb-2">
        {offers.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setCurrentIndex(index);
              scrollViewRef.current?.scrollTo({
                x: index * (SCREEN_WIDTH * 0.85),
                animated: true,
              });
            }}
            className="mx-1"
          >
            <View className="flex-row items-center">
              <View 
                className={`rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-8 bg-black' 
                    : 'w-2 bg-gray-300'
                } h-2`}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View className="pb-6">
      <View className="px-6 mb-4">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-2xl font-bold text-black mb-1">Special Offers</Text>
            <Text className="text-gray-500 text-sm">Limited time deals for you</Text>
          </View>
          <TouchableOpacity className="flex-row items-center bg-gray-50 rounded-full px-4 py-2">
            <Text className="text-gray-700 text-sm font-medium mr-2">View all</Text>
            <Ionicons name="chevron-forward" size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        decelerationRate="fast"
        snapToInterval={SCREEN_WIDTH * 0.85}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingHorizontal: 12 }}
      >
        {offers.map((offer, index) => (
          <SponsoredCard 
            key={offer.id} 
            offer={offer} 
            index={index}
            currentIndex={currentIndex}
          />
        ))}
      </ScrollView>

      <EnhancedDots />
    </View>
  );
};

export default SponsoredCarousel;