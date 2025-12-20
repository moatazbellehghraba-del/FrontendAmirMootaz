import React, { useContext, useEffect, useState } from "react";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  User,
  Settings,
  Calendar,
  Star,
  Edit3,
  ChevronRight,
  Heart,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  Camera,
  Clock,
  MapPin,
  Phone,
  Mail,
  Crown,
} from "lucide-react-native";
import { AuthContext } from "@/context/AuthContext";

const ProfileScreen = () => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Text>Loading....</Text>;
  }

  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const { logout } = useContext(AuthContext);
  const handleLogout = async () => {
    await logout(); // here we goina Clears Tokens + user

    router.replace("/(auth)/Login"); // Redirect
  };

  const stats = [
    { value: "24", label: "Completed", icon: Calendar, color: "#000" },
    { value: "2", label: "Upcoming", icon: Clock, color: "#000" },
    {
      value: currentUser ? `${currentUser.loyaltyPoints}` : "6",
      label: "Loyalty Points",
      icon: Star,
      color: "#000",
    },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      service: "Haircut & Styling",
      professional: "Sophie Martin",
      date: "Dec 15, 2024",
      time: "10:00 AM",
      status: "Confirmed",
    },
    {
      id: 2,
      service: "Facial Care",
      professional: "Léa Bernard",
      date: "Dec 18, 2024",
      time: "2:00 PM",
      status: "Confirmed",
    },
  ];

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

  type StatCardProps = {
    value: string;
    label: string;
    icon: React.ComponentType<{ size: number; color: string }>;
    color: string;
  };

  const StatCard: React.FC<StatCardProps> = ({
    value,
    label,
    icon: Icon,
    color,
  }) => (
    <View className="items-center flex-1">
      <View className="w-14 h-14 bg-gray-50 rounded-2xl items-center justify-center mb-3 border border-gray-100">
        <Icon size={22} color={color} />
      </View>
      <Text className="text-black font-semibold text-lg mb-1">{value}</Text>
      <Text className="text-gray-500 text-xs text-center">{label}</Text>
    </View>
  );

  type Appointment = {
    id: number;
    service: string;
    professional: string;
    date: string;
    time: string;
    status: string;
  };

  const AppointmentCard: React.FC<{ appointment: Appointment }> = ({
    appointment,
  }) => (
    <TouchableOpacity className="bg-gray-50 rounded-2xl p-5 mb-3 border border-gray-200 active:bg-gray-100">
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1">
          <Text className="text-black font-semibold text-base mb-2">
            {appointment.service}
          </Text>
          <Text className="text-gray-600 text-sm">
            with {appointment.professional}
          </Text>
        </View>
        <View className="bg-green-50 rounded-full px-3 py-1">
          <Text className="text-green-600 text-xs font-medium">
            {appointment.status}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center justify-between pt-3 border-t border-gray-200">
        <View className="flex-row items-center">
          <Calendar size={16} color="#666" />
          <Text className="text-gray-600 text-sm font-medium ml-2">
            {appointment.date}
          </Text>
        </View>
        <View className="flex-row items-center bg-white rounded-full px-3 py-1 border border-gray-200">
          <Clock size={14} color="#666" />
          <Text className="text-gray-600 text-sm font-medium ml-2">
            {appointment.time}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

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
      className="flex-row items-center justify-between py-4 border-b border-gray-100 active:bg-gray-50"
      onPress={onPress}
    >
      <View className="flex-row items-center flex-1">
        <View className="w-12 h-12 bg-gray-50 rounded-xl items-center justify-center mr-4 border border-gray-100">
          <Icon size={20} color="#000" />
        </View>
        <View className="flex-1">
          <Text className="text-black font-medium text-base">{title}</Text>
          <Text className="text-gray-500 text-sm mt-1">{subtitle}</Text>
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
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Enhanced Header */}
        <View className="px-6 pt-12 pb-6 bg-white">
          <View className="flex-row items-center justify-between mb-8">
            <View>
              <Text className="text-3xl font-light text-black mb-1">
                Profile
              </Text>
              <Text className="text-gray-400 text-base">Welcome back</Text>
            </View>

            <Settings size={22} color="#000" />
          </View>

          {/* Enhanced Profile Section */}
          <View className="items-center mb-8">
            <View className="relative mb-5">
              <View className="w-28 h-28 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full items-center justify-center border-4 border-white shadow-sm">
                <Text className="text-gray-600 text-2xl font-medium">AB</Text>
              </View>
            </View>
            <Text className="text-2xl font-normal text-black mb-2">
              {currentUser.firstName} {currentUser.lastName}
            </Text>

            <Text className="text-gray-500 text-base mb-2">
              {currentUser.email}
            </Text>
            <View className="flex-row items-center">
              <MapPin size={14} color="#666" />
              <Text className="text-gray-600 text-sm ml-2">
                {currentUser.region} , {currentUser.country}
              </Text>
            </View>
          </View>

          {/* Enhanced Stats */}
          <View className="flex-row justify-between bg-gray-50 rounded-3xl p-6 mb-8 border border-gray-200">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </View>
        </View>

        {/* Enhanced Upcoming Appointments */}
        <View className="px-6 mb-8">
          <View className="flex-row items-center justify-between mb-5">
            <Text className="text-xl font-light text-black">
              Upcoming Appointments
            </Text>
            <TouchableOpacity>
              <Text className="text-gray-500 text-sm font-medium">
                View all
              </Text>
            </TouchableOpacity>
          </View>
          {upcomingAppointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </View>

        {/* Enhanced Menu Items */}
        <View className="px-6 mb-8">
          <Text className="text-xl font-light text-black mb-5">
            Settings & Preferences
          </Text>
          <View className="bg-gray-50 rounded-3xl p-2 border border-gray-200">
            {menuItems.map((item, index) => (
              <View key={index}>
                <MenuItem {...item} />
                {index < menuItems.length - 1 && (
                  <View className="border-b border-gray-200 mx-4" />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Enhanced Sign Out */}
        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center justify-center py-5 mx-6 mb-8 border border-gray-300 rounded-2xl active:bg-gray-50"
        >
          <LogOut size={20} color="#666" />
          <Text className="text-gray-600 text-base font-medium ml-3">
            Sign Out
          </Text>
        </TouchableOpacity>

        {/* Enhanced App Version */}
        <View className="items-center pb-10">
          <Text className="text-gray-400 text-sm font-medium">Saha v0.0.1</Text>
          <Text className="text-gray-400 text-xs mt-1">
            © 2025 All rights reserved
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
