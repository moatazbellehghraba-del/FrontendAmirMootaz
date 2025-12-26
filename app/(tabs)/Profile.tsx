import React, { useContext, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  User,
  ChevronRight,
  Heart,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  MapPin,
} from "lucide-react-native";
import { AuthContext } from "@/context/AuthContext";
import { Image } from "react-native";

const ProfileScreen = () => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Text>Loading....</Text>;
  }

  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/Login");
  };

  const menuItems = [
    {
      icon: User,
      title: "Personal Information",
      subtitle: "Update your details",
      onPress: () =>
        router.push({
          pathname: "/Components/PersonalInfo",
        }),
    },
    {
      icon: Bell,
      title: "Notifications",
      subtitle: "Manage alerts",
      switch: true,
      value: notifications,
      onChange: setNotifications,
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      subtitle: "Control your privacy",
      onPress: () => router.push("/Components/privacySecurity"),
    },
    {
      icon: Heart,
      title: "Favorites",
      subtitle: "Saved services & professionals",
    },
    {
      icon: HelpCircle,
      title: "Help & Support",
      subtitle: "Get help anytime",
      onPress: () => router.push("/Components/HelpSupport"),
    },
  ];

  type MenuItemProps = {
    icon: React.ComponentType<{ size: number; color: string }>;
    title: string;
    subtitle: string;
    switch?: boolean;
    value?: boolean;
    onChange?: (value: boolean) => void;
    onPress?: () => void;
  };

  const MenuItem: React.FC<MenuItemProps> = ({
    icon: Icon,
    title,
    subtitle,
    switch: hasSwitch,
    value,
    onChange,
    onPress,
  }) => (
    <TouchableOpacity
      className="flex-row items-center justify-between py-4 active:bg-gray-50 px-4"
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View className="flex-row items-center flex-1">
        <View className="w-11 h-11 bg-gray-100 rounded-xl items-center justify-center mr-4">
          <Icon size={20} color="#000" />
        </View>
        <View className="flex-1">
          <Text className="text-black font-semibold text-base">{title}</Text>
          <Text className="text-gray-500 text-sm mt-0.5">{subtitle}</Text>
        </View>
      </View>

      {hasSwitch ? (
        <Switch
          value={!!value}
          onValueChange={onChange}
          trackColor={{ false: "#e5e5e5", true: "#000" }}
          thumbColor={value ? "#fff" : "#f4f4f5"}
        />
      ) : (
        <ChevronRight size={20} color="#9CA3AF" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Header - Now scrolls with content */}
        <View className="px-6 pt-8 pb-6">
          <View className="flex-row items-center justify-between mb-6">
            <View>
              <Text className="text-3xl font-bold text-black">Profile</Text>
            </View>
          </View>

          {/* Profile Section */}
          <View className="items-center py-8">
            {currentUser.profilePhoto === null ? (
              <View className="w-24 h-24 bg-black rounded-full items-center justify-center mb-4 shadow-lg">
                <Text className="text-white text-2xl font-bold">
                  {currentUser.firstName[0]}
                  {currentUser.lastName[0]}
                </Text>
              </View>
            ) : (
              <Image
                source={{ uri: currentUser.profilePhoto }}
                className="w-24 h-24 rounded-full mb-4 shadow-lg"
                resizeMode="cover"
              />
            )}

            <Text className="text-2xl font-bold text-black mb-1">
              {currentUser.firstName} {currentUser.lastName}
            </Text>

            <Text className="text-gray-500 text-base mb-3">
              {currentUser.email}
            </Text>

            <View className="flex-row items-center bg-gray-50 px-4 py-2 rounded-full mb-6">
              <MapPin size={14} color="#666" />
              <Text className="text-gray-600 text-sm ml-2">
                {currentUser.region}, {currentUser.country}
              </Text>
            </View>

            {/* Loyalty Points - No background, gold star */}
            <View className="flex-row items-center">
              <View className="mr-3">
                <Text className="text-amber-600 text-2xl">★</Text>
              </View>
              <View>
                <Text className="text-gray-500 text-xs font-medium">
                  Loyalty Points
                </Text>
                <Text className="text-black text-2xl font-bold">
                  {currentUser.loyaltyPoints || 350}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View className="px-6 mb-6">
          <Text className="text-lg font-bold text-black mb-4 px-2">
            Settings
          </Text>
          <View className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            {menuItems.map((item, index) => (
              <View key={index}>
                <MenuItem {...item} />
                {index < menuItems.length - 1 && (
                  <View className="h-px bg-gray-100 ml-20" />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Sign Out Button */}
        <View className="px-6 mb-8">
          <TouchableOpacity
            onPress={handleLogout}
            className="flex-row items-center justify-center py-4 border-2 border-gray-200 rounded-2xl active:bg-gray-50"
            activeOpacity={0.7}
          >
            <LogOut size={20} color="#EF4444" />
            <Text className="text-red-500 text-base font-semibold ml-3">
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View className="items-center pb-8">
          <Text className="text-gray-400 text-xs">Saha v0.0.1</Text>
          <Text className="text-gray-400 text-xs mt-1">
            © 2025 All rights reserved
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
