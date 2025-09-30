// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function TabsLayout() {
  const iconsMap: Record<
    string,
    {
      focused: keyof typeof Ionicons.glyphMap;
      unfocused: keyof typeof Ionicons.glyphMap;
    }
  > = {
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
              {focused && (
                <Text style={styles.tabText} numberOfLines={1}>
                  Search
                </Text>
              )}
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
              {focused && (
                <Text style={styles.tabText} numberOfLines={1}>
                  Bookings
                </Text>
              )}
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
              {focused && (
                <Text style={styles.tabText} numberOfLines={1}>
                  Messages
                </Text>
              )}
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
              {focused && (
                <Text style={styles.tabText} numberOfLines={1}>
                  Profile
                </Text>
              )}
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
    height: 130,
    paddingBottom: 40,
    paddingTop: 15,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    height: 70,
    paddingVertical: 12,
    minWidth: 70, // Minimum width to prevent text breaking
  },
  tabText: {
    color: "#FFFFFF",
    fontSize: 10, // Slightly smaller font to fit in one line
    fontWeight: "500",
    marginTop: 4,
    textAlign: "center",
    includeFontPadding: false, // Remove extra padding that causes breaking
  },
});
