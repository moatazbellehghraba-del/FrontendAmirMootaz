// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, Platform, Animated } from "react-native";
import React, { useRef, useEffect } from "react";

export default function TabsLayout() {
  const iconsMap = {
    Home: {
      focused: "home",
      unfocused: "home-outline",
    },
    Search: {
      focused: "search",
      unfocused: "search-outline",
    },
    Bookings: {
      focused: "calendar",
      unfocused: "calendar-outline",
    },
    Messages: {
      focused: "chatbubble",
      unfocused: "chatbubble-outline",
    },
    Profile: {
      focused: "person",
      unfocused: "person-outline",
    },
  } as const;

  // Create animated values for each tab - background scale and opacity
  const bgAnimations = {
    Home: {
      scale: useRef(new Animated.Value(0)).current,
      opacity: useRef(new Animated.Value(0)).current,
    },
    Search: {
      scale: useRef(new Animated.Value(0)).current,
      opacity: useRef(new Animated.Value(0)).current,
    },
    Bookings: {
      scale: useRef(new Animated.Value(0)).current,
      opacity: useRef(new Animated.Value(0)).current,
    },
    Messages: {
      scale: useRef(new Animated.Value(0)).current,
      opacity: useRef(new Animated.Value(0)).current,
    },
    Profile: {
      scale: useRef(new Animated.Value(0)).current,
      opacity: useRef(new Animated.Value(0)).current,
    },
  };

  const TabIcon = ({
    routeName,
    focused,
  }: {
    routeName: keyof typeof iconsMap;
    focused: boolean;
  }) => {
    const { scale, opacity } = bgAnimations[routeName];

    useEffect(() => {
      if (focused) {
        // Animate background in
        Animated.parallel([
          Animated.spring(scale, {
            toValue: 1,
            tension: 150,
            friction: 10,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      } else {
        // Animate background out
        Animated.parallel([
          Animated.spring(scale, {
            toValue: 0,
            tension: 150,
            friction: 10,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }),
        ]).start();
      }
    }, [focused]);

    return (
      <View style={styles.tabItem}>
        {/* Background highlight */}
        <Animated.View
          style={[
            styles.backgroundHighlight,
            {
              transform: [{ scale }],
              opacity: opacity,
            },
          ]}
        />

        {/* Icon and text */}
        <View style={styles.iconContainer}>
          <Ionicons
            name={
              focused
                ? iconsMap[routeName].focused
                : iconsMap[routeName].unfocused
            }
            size={focused ? 26 : 28}
            color={focused ? "#FFFFFF" : "#989898"}
          />
          {focused && <Text style={styles.tabText}>{routeName}</Text>}
        </View>
      </View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon routeName="Home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon routeName="Search" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="Bookings"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon routeName="Bookings" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="Messages"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon routeName="Messages" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon routeName="Profile" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#101010",
    borderTopColor: "#1C1C1E",
    borderTopWidth: 1,
    height: Platform.OS === "ios" ? 90 : 110,
    paddingBottom: Platform.OS === "ios" ? 25 : 35,
    paddingTop: 12,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    height: Platform.OS === "ios" ? 60 : 70,
    paddingVertical: 8,
    minWidth: 70,
    position: "relative",
  },
  backgroundHighlight: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.15)", // Subtle white overlay
    borderRadius: 16,
    width: 60,
    height: 60,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "500",
    marginTop: 4,
    textAlign: "center",
    includeFontPadding: false,
  },
});
