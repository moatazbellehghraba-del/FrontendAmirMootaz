// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Platform } from "react-native";
import React from "react";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  
  return (
    <Tabs
      // @ts-ignore: sceneContainerStyle is not present in the expo-router Tabs types but is supported at runtime
      sceneContainerStyle={{
        backgroundColor: "#FFFFFF",
        paddingBottom: Platform.OS === "android" ? insets.bottom + 65 : 88,
      }}
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#E5E5E5",
          borderTopWidth: 1,
          height: Platform.OS === "ios" ? 88 : 65 + insets.bottom,
          paddingBottom: Platform.OS === "ios" ? 34 : insets.bottom,
          paddingTop: Platform.OS === "ios" ? 10 : 8,
          paddingHorizontal: 20,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 8,
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.05,
          shadowRadius: 8,
        },
        headerBackground: () => null,
        headerTitle: "",
        headerShadowVisible: false,
        headerTintColor: "#FFFFFF",
        headerStyle: {
          backgroundColor: "#FFFFFF",
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          height: 0,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={focused ? "home" : "home-outline"}
              label="Home"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={focused ? "search" : "search-outline"}
              label="Search"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Bookings"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={focused ? "calendar" : "calendar-outline"}
              label="Bookings"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Messages"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={focused ? "chatbubble" : "chatbubble-outline"}
              label="Messages"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={focused ? "person" : "person-outline"}
              label="Profile"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}

function TabIcon({
  name,
  label,
  focused,
}: {
  name: string;
  label: string;
  focused: boolean;
}) {
  return (
    <View style={styles.tabItem}>
      <View
        style={[
          styles.iconContainer,
          focused && styles.iconContainerFocused,
        ]}
      >
        <Ionicons
          name={name as any}
          size={24}
          color={focused ? "#000000" : "#9CA3AF"}
        />
        {focused && (
          <View style={styles.activeIndicator} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 12,
    position: "relative",
  },
  iconContainerFocused: {
    backgroundColor: "#F3F4F6",
  },
  activeIndicator: {
    position: "absolute",
    bottom: -6,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#000000",
  },
});