import React from 'react';
import { View, TouchableOpacity, Text, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS } from '../../../Constant/colors';

interface HeaderProps {
  scrollY: Animated.Value;
}

const Header = ({ scrollY }: HeaderProps) => {
  const router = useRouter();

  const headerBackground = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: ['transparent', COLORS.secondary],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 20,
      backgroundColor: headerBackground,
      paddingHorizontal: 16,
      paddingTop: 60,
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={{ 
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: COLORS.secondary,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: COLORS.border,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 3,
          }}
        >
          <Ionicons name="chevron-back" size={20} color={COLORS.primary} />
        </TouchableOpacity>
        
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity 
            style={{ 
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: COLORS.secondary,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 8,
              borderWidth: 1,
              borderColor: COLORS.border,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 3,
            }}
          >
            <Ionicons name="heart-outline" size={20} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={{ 
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: COLORS.secondary,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 8,
              borderWidth: 1,
              borderColor: COLORS.border,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 3,
            }}
          >
            <Ionicons name="share-outline" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

export default Header;