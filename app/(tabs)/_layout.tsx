// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, Platform } from "react-native";
import React from "react";

export default function TabsLayout() {
  return (
    <Tabs
      // @ts-ignore: sceneContainerStyle is not present in the expo-router Tabs types but is supported at runtime
      sceneContainerStyle={{
        backgroundColor: "#101010",
      }}
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#101010",
          borderTopColor: "#1C1C1E",
          borderTopWidth: 1,
          height: Platform.OS === "ios" ? 85 : 65,
          paddingBottom: Platform.OS === "ios" ? 25 : 10,
          paddingTop: 12,
          position: 'absolute',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerBackground: () => null,
        headerTitle: "",
        headerShadowVisible: false,
        headerTintColor: "#101010",
        headerStyle: {
          backgroundColor: "#101010",
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

function TabIcon({ name, label, focused }: { name: string; label: string; focused: boolean }) {
  return (
    <View style={styles.tabItem}>
      <View style={styles.iconContainer}>
        <Ionicons
          name={name as any}
          size={focused ? 26 : 24}
          color={focused ? "#eff599ff" : "#989898"}
        />
        <Text style={[styles.tabText, { opacity: focused ? 1 : 0 }]}>
          {label}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    height: Platform.OS === "ios" ? 50 : 40,
    paddingVertical: 8,
    minWidth: 70,
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
  },
});