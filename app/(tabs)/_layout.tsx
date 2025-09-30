// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, Platform } from "react-native";

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
            <View style={styles.tabItem}>
              <Ionicons
                name={focused ? iconsMap.Home.focused : iconsMap.Home.unfocused}
                size={focused ? 26 : 28}
                color={focused ? "#FFFFFF" : "#989898"}
              />
              {focused && <Text style={styles.tabText}>Home</Text>}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <Ionicons
                name={
                  focused ? iconsMap.Search.focused : iconsMap.Search.unfocused
                }
                size={focused ? 26 : 28}
                color={focused ? "#FFFFFF" : "#989898"}
              />
              {focused && <Text style={styles.tabText}>Search</Text>}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Bookings"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <Ionicons
                name={
                  focused
                    ? iconsMap.Bookings.focused
                    : iconsMap.Bookings.unfocused
                }
                size={focused ? 26 : 28}
                color={focused ? "#FFFFFF" : "#989898"}
              />
              {focused && <Text style={styles.tabText}>Bookings</Text>}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Messages"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <Ionicons
                name={
                  focused
                    ? iconsMap.Messages.focused
                    : iconsMap.Messages.unfocused
                }
                size={focused ? 26 : 28}
                color={focused ? "#FFFFFF" : "#989898"}
              />
              {focused && <Text style={styles.tabText}>Messages</Text>}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <Ionicons
                name={
                  focused
                    ? iconsMap.Profile.focused
                    : iconsMap.Profile.unfocused
                }
                size={focused ? 26 : 28}
                color={focused ? "#FFFFFF" : "#989898"}
              />
              {focused && <Text style={styles.tabText}>Profile</Text>}
            </View>
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
    // Different heights for iOS vs Android
    height: Platform.OS === "ios" ? 90 : 110,
    paddingBottom: Platform.OS === "ios" ? 25 : 35,
    paddingTop: 12,
    // Safe area for iPhone notch
    paddingHorizontal: Platform.OS === "ios" ? 0 : 0,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    height: Platform.OS === "ios" ? 60 : 70,
    paddingVertical: 8,
    minWidth: 70,
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
