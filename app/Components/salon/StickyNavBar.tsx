import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { COLORS } from '../../../Constant/colors';


interface StickyNavBarProps {
  scrollY: Animated.Value;
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

const sections = [
  { id: 'services', label: 'Services' },
  { id: 'team', label: 'Team' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'about', label: 'About' },
];

const StickyNavBar = ({ scrollY, activeSection, scrollToSection }: StickyNavBarProps) => {
  return (
    <Animated.View style={{
      position: 'absolute',
      top: 100,
      left: 0,
      right: 0,
      zIndex: 15,
      backgroundColor: COLORS.secondary,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 4,
      transform: [{
        translateY: scrollY.interpolate({
          inputRange: [200, 250],
          outputRange: [-60, 0],
          extrapolate: 'clamp',
        })
      }],
      opacity: scrollY.interpolate({
        inputRange: [200, 250],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      })
    }}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {sections.map((section) => (
          <TouchableOpacity
            key={section.id}
            onPress={() => scrollToSection(section.id)}
            style={{
              paddingVertical: 16,
              paddingHorizontal: 20,
              marginRight: 4,
              borderBottomWidth: 2,
              borderBottomColor: activeSection === section.id ? COLORS.accent : 'transparent'
            }}
          >
            <Text style={{
              fontSize: 14,
              fontWeight: '600',
              color: activeSection === section.id ? COLORS.accent : COLORS.textSecondary
            }}>
              {section.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Animated.View>
  );
};

export default StickyNavBar;