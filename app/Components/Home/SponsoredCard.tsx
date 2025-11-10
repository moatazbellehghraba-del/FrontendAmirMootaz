import React, { useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

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

interface SponsoredCardProps {
  offer: SponsoredOffer;
  index: number;
  currentIndex: number;
}

const SponsoredCard: React.FC<SponsoredCardProps> = ({ offer, index, currentIndex }) => {
  const cardAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(cardAnim, {
      toValue: 1,
      delay: index * 150,
      tension: 60,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }, []);

  const scale = cardAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 1],
  });

  const opacity = cardAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  return (
    <Animated.View 
      style={{ 
        transform: [{ scale }], 
        opacity,
        width: SCREEN_WIDTH * 0.85,
        marginHorizontal: 8,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        className="rounded-3xl overflow-hidden bg-white"
        style={{
          height: 200,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.1,
          shadowRadius: 20,
          elevation: 8,
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.05)',
        }}
      >
        <LinearGradient
          colors={[offer.gradient[0], offer.gradient[1]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="absolute inset-0"
        />
        
        <View className="absolute inset-0">
          <Image
            source={{ uri: offer.image }}
            className="w-full h-full"
            resizeMode="cover"
          />
          <View 
            className="absolute inset-0"
            style={{
              backgroundColor: offer.gradient[0],
              opacity: 0.8,
            }}
          />
        </View>

        <View className="flex-1 p-6 justify-between">
          <View className="flex-row justify-between items-start">
            <View className="flex-1">
              <View className="flex-row items-center mb-3">
                <View className="bg-white bg-opacity-20 rounded-full px-3 py-1 mr-2">
                  <Text className="text-white text-xs font-bold">SPECIAL OFFER</Text>
                </View>
                <View className="bg-white rounded-full w-6 h-6 items-center justify-center">
                  <Ionicons name={offer.icon as any} size={12} color={offer.gradient[0]} />
                </View>
              </View>
              
              <Text className="text-white text-xl font-bold mb-2 leading-6">
                {offer.title}
              </Text>
              <Text className="text-white text-sm opacity-90 leading-5">
                {offer.description}
              </Text>
            </View>
          </View>

          <View className="flex-row justify-between items-center">
            <View className="flex-1">
              <View className="flex-row items-center mb-2">
                <Ionicons name="business" size={14} color="#fff" />
                <Text className="text-white text-sm font-medium ml-2">
                  {offer.salon}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="time" size={12} color="#fff" />
                <Text className="text-white text-xs opacity-90 ml-2">
                  {offer.expiry}
                </Text>
              </View>
            </View>

            <TouchableOpacity 
              className="bg-white rounded-2xl px-5 py-3 flex-row items-center"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.2,
                shadowRadius: 10,
                elevation: 5,
              }}
            >
              <Text className="font-bold text-sm mr-2" style={{ color: offer.gradient[0] }}>
                Claim Now
              </Text>
              <Ionicons name="arrow-forward" size={16} color={offer.gradient[0]} />
            </TouchableOpacity>
          </View>
        </View>

        {index === currentIndex && (
          <View className="absolute top-4 right-4 bg-red-500 rounded-full w-2 h-2">
            <View className="absolute inset-0 bg-red-400 rounded-full animate-ping" />
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default SponsoredCard;