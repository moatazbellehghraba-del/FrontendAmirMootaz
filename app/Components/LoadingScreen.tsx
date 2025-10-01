import {
  View,
  Text,
  ActivityIndicator,
  Animated,
  Image,
  Dimensions
} from "react-native";
import { useEffect, useRef, useState } from "react";

const { width, height } = Dimensions.get('window');

export default function LoadingScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // Subtle pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.02,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Calculate optimal size for 1280px image
  const logoSize = Math.min(width * 0.7, height * 0.5); // 70% of screen width or 50% of height

  return (
    <View className="flex-1 bg-white justify-center items-center px-8">
      <Animated.View 
        style={{ opacity: fadeAnim }}
        className="items-center"
      >
        {/* High-resolution Logo */}
        <Animated.View 
          style={{ 
            transform: [{ scale: pulseAnim }],
            marginBottom: 30 
          }}
        >
          {imageError ? (
            // Fallback placeholder
            <View 
              style={{ 
                width: logoSize, 
                height: logoSize,
              }}
              className="bg-black rounded-3xl items-center justify-center shadow-2xl border-4 border-yellow-500/30"
            >
              <Text className="text-yellow-500 text-6xl font-bold">G</Text>
            </View>
          ) : (
            // High-resolution logo
            <Image 
              source={require('../../assets/images/logopng.png')}
              style={{ 
                width: logoSize, 
                height: logoSize 
              }}
              resizeMode="contain"
              onError={() => setImageError(true)}
            />
          )}
        </Animated.View>

        {/* Loading Indicator */}
        <ActivityIndicator size="large" color="#D4AF37" />
        
       
      </Animated.View>
    </View>
  );
}