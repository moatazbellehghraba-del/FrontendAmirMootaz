import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Animated, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

interface OnboardingScreen {
  id: string;
  component: React.ComponentType;
}

const onboardingScreens: OnboardingScreen[] = [
  {
    id: '1',
    component: Screen1
  },
  {
    id: '2', 
    component: Screen2
  },
  {
    id: '3',
    component: Screen3
  }
];

// Your exact Screen1 content
function Screen1() {
  return (
    <View className="flex-1 justify-center items-center px-8">
      {/* Illustration Placeholder */}
      <View className="mb-8">
        <View 
          style={{ 
            width: width * 0.8, 
            height: height * 0.35 
          }}
          className="bg-white rounded-lg border border-white items-center justify-center"
        >
          <Image source={require('../../assets/images/onb1.png')} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
        </View>
      </View>

      {/* Text Content */}
      <View className="items-center mb-6">
        <Text className="text-3xl font-bold text-black text-center mb-4">
          Discover Services
        </Text>
        <Text className="text-lg text-gray-700 text-center leading-7">
          Find the best barbers, spas, and beauty salons near you. Explore services tailored for men and women, all in one place.
        </Text>
      </View>

     
    </View>
  );
}

// Your exact Screen2 content  
function Screen2() {
  return (
    <View className="flex-1 justify-center items-center px-8">
      {/* Illustration Placeholder */}
      <View className="mb-8">
        <View 
          style={{ 
            width: width * 0.8, 
            height: height * 0.35 
          }}
          className="bg-white rounded-lg border border-white items-center justify-center"
        >
          <Image source={require('../../assets/images/onb2.png')} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
        </View>
      </View>
      {/* Text Content */}
      <View className="items-center mb-6">
        <Text className="text-3xl font-bold text-black text-center mb-4">
          Easy Booking
        </Text>
        <Text className="text-lg text-gray-700 text-center leading-7">
          Book your next haircut, massage, or beauty treatment in seconds. Choose the service, select the time, and you're all set.
        </Text>
      </View>

      {/* Process Steps */}
      <View className="flex-row justify-between items-center w-full max-w-xs mb-6">
        <View className="items-center">
          <View className="w-6 h-6 rounded-full bg-black items-center justify-center mb-1">
            <Text className="text-white text-xs font-bold">1</Text>
          </View>
          <Text className="text-black text-xs font-medium">Choose</Text>
        </View>
        
        <View className="flex-1 h-0.5 bg-gray-300 mx-2"></View>
        
        <View className="items-center">
          <View className="w-6 h-6 rounded-full bg-black items-center justify-center mb-1">
            <Text className="text-white text-xs font-bold">2</Text>
          </View>
          <Text className="text-black text-xs font-medium">Select</Text>
        </View>
        
        <View className="flex-1 h-0.5 bg-gray-300 mx-2"></View>
        
        <View className="items-center">
          <View className="w-6 h-6 rounded-full bg-black items-center justify-center mb-1">
            <Text className="text-white text-xs font-bold">3</Text>
          </View>
          <Text className="text-black text-xs font-medium">Confirm</Text>
        </View>
      </View>

      
     
    </View>
  );
}

// Your exact Screen3 content
function Screen3() {
  return (
    <View className="flex-1 justify-center items-center px-8">
      {/* Illustration Placeholder */}
      <View className="mb-8">
        <View 
          style={{ 
            width: width * 0.8, 
            height: height * 0.35 
          }}
          className="bg-white rounded-lg border border-white items-center justify-center"
        >
          <Image source={require('../../assets/images/onb3.png')} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
        </View>
      </View>
      {/* Text Content */}
      <View className="items-center mb-6">
        <Text className="text-3xl font-bold text-black text-center mb-4">
          Relax & Enjoy
        </Text>
        <Text className="text-lg text-gray-700 text-center leading-7">
          Sit back and relax! No waiting lines. Get reminders for your appointments and enjoy a smooth beauty experience.
        </Text>
      </View>

      {/* Features List */}
      <View className="w-full max-w-xs mb-6">
        <View className="flex-row items-center mb-3">
          <View className="w-6 h-6 rounded-full bg-black items-center justify-center mr-3">
            <Text className="text-white text-xs font-bold">✓</Text>
          </View>
          <Text className="text-black text-sm">No waiting lines</Text>
        </View>
        
        <View className="flex-row items-center mb-3">
          <View className="w-6 h-6 rounded-full bg-black items-center justify-center mr-3">
            <Text className="text-white text-xs font-bold">✓</Text>
          </View>
          <Text className="text-black text-sm">Smart reminders</Text>
        </View>
        
        <View className="flex-row items-center">
          <View className="w-6 h-6 rounded-full bg-black items-center justify-center mr-3">
            <Text className="text-white text-xs font-bold">✓</Text>
          </View>
          <Text className="text-black text-sm">Smooth experience</Text>
        </View>
      </View>

      {/* Dots Indicator */}
    
    </View>
  );
}

import type { ViewToken } from 'react-native';

export default function CombinedOnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      if (viewableItems[0] && typeof viewableItems[0].index === 'number') {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const handleNext = () => {
    if (currentIndex < onboardingScreens.length - 1) {
      scrollToIndex(currentIndex + 1);
    } else {
      router.push('/(auth)/Login');
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  const renderItem = ({ item, index }: { item: OnboardingScreen; index: number }) => {
    const ScreenComponent = item.component;
    
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0, 1, 0],
    });

    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [30, 0, 30],
    });

    return (
      <Animated.View
        style={{
          width,
          opacity,
          transform: [{ translateY }],
        }}
      >
        <ScreenComponent />
      </Animated.View>
    );
  };

  const renderHeader = () => (
    <View className="flex-row justify-between items-center px-6 pt-4">
      <View className="w-10 h-10 rounded-full border border-gray-300 items-center justify-center">
        <Text className="text-black text-lg font-bold">{currentIndex + 1}</Text>
      </View>
      <TouchableOpacity onPress={() => router.push('/(auth)/Login')}>
        <Text className="text-black font-semibold">Skip</Text>
      </TouchableOpacity>
    </View>
  );

  const renderDots = () => (
    <View className="flex-row justify-center space-x-2 mb-8">
      {onboardingScreens.map((_, index: number) => {
        const dotOpacity = scrollX.interpolate({
          inputRange: [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ],
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        const dotScale = scrollX.interpolate({
          inputRange: [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ],
          outputRange: [0.8, 1.2, 0.8],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={index}
            style={{
              opacity: dotOpacity,
              transform: [{ scale: dotScale }],
            }}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-black' : 'bg-gray-300'
            }`}
          />
        );
      })}
    </View>
  );

  const renderFooter = () => (
    <View className="w-full mt-auto pb-8 px-8">
      {currentIndex === 0 ? (
        // First screen - Only Next button
        <TouchableOpacity 
          className="w-full bg-black py-4 rounded-2xl items-center shadow-lg"
          onPress={handleNext}
        >
          <Text className="text-white font-semibold text-lg">Next</Text>
        </TouchableOpacity>
      ) : (
        // Other screens - Back and Next/Get Started buttons
        <View className="flex-row justify-between w-full space-x-4">
          <TouchableOpacity 
            className="flex-1 border border-gray-300 py-4 rounded-2xl items-center"
            onPress={handleBack}
          >
            <Text className="text-black font-semibold text-lg">Back</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="flex-1 bg-black py-4 rounded-2xl items-center shadow-lg"
            onPress={handleNext}
          >
            <Text className="text-white font-semibold text-lg">
              {currentIndex === onboardingScreens.length - 1 ? 'Get Started' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {renderHeader()}
      
      <View className="flex-1">
        <Animated.FlatList
          ref={flatListRef}
          data={onboardingScreens}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewConfig}
          scrollEventThrottle={16}
          keyExtractor={(item) => item.id}
        />
        
        {renderDots()}
        {renderFooter()}
      </View>
    </SafeAreaView>
  );
}