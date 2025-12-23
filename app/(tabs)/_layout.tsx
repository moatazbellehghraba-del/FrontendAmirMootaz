// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Platform, StatusBar } from "react-native";
import React from "react";

export default function TabsLayout() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopColor: "#E5E5E5",
            borderTopWidth: 1,
            height: Platform.select({
              ios: 88,
              android: 80, // Reduced height for Android
              default: 65,
            }),
            paddingBottom: Platform.select({
              ios: 34,
              android: 12, // Reduced padding bottom
              default: 8,
            }),
            paddingTop: Platform.select({
              ios: 10,
              android: 8, // Reduced padding top
              default: 6,
            }),
            paddingHorizontal: 20,
            position: "absolute",
            bottom: Platform.select({
              android: 0, // No extra bottom margin needed
              ios: 0,
              default: 0,
            }),
            left: 0,
            right: 0,
            elevation: 8,
            shadowColor: "#000000",
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: Platform.select({
              ios: 0.05,
              android: 0.1,
              default: 0.1,
            }),
            shadowRadius: 8,
          },
          tabBarItemStyle: {
            height: "100%",
            justifyContent: "center",
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
            height: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
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
    </View>
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
        style={[styles.iconContainer, focused && styles.iconContainerFocused]}
      >
        <Ionicons
          name={name as any}
          size={22} // Reduced icon size
          color={focused ? "#000000" : "#9CA3AF"}
        />
        {focused && <View style={styles.activeIndicator} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: "100%",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 36, // Reduced width
    height: 36, // Reduced height
    borderRadius: 10,
    position: "relative",
  },
  iconContainerFocused: {
    backgroundColor: "#F3F4F6",
  },
  activeIndicator: {
    position: "absolute",
    bottom: -5,
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "#000000",
  },
});
