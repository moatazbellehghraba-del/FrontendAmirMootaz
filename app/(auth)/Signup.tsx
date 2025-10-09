import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
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
  Mail
} from 'lucide-react-native';

const ProfileScreen = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const userData = {
    name: 'Amira Ben Ahmed',
    email: 'amira.benahmed@email.com',
    phone: '+216 12 345 678',
    location: 'Tunis, Tunisia',
    memberSince: 'Jan 2023'
  };

  const stats = [
    { value: '24', label: 'Appointments', icon: Calendar },
    { value: '2', label: 'Upcoming', icon: Clock },
    { value: '1,250', label: 'Points', icon: Star }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      service: 'Haircut & Styling',
      professional: 'Sophie Martin',
      date: 'Dec 15, 2024',
      time: '10:00 AM'
    },
    {
      id: 2,
      service: 'Facial Care',
      professional: 'Léa Bernard',
      date: 'Dec 18, 2024',
      time: '2:00 PM'
    }
  ];

  const menuItems = [
    { icon: User, title: 'Edit Profile', subtitle: 'Update your personal information' },
    { icon: Bell, title: 'Notifications', subtitle: 'Manage your notifications', switch: true, value: notifications, onChange: setNotifications },
    { icon: Shield, title: 'Privacy & Security', subtitle: 'Control your privacy settings' },
    { icon: Heart, title: 'Favorites', subtitle: 'Your saved services and professionals' },
    { icon: HelpCircle, title: 'Help & Support', subtitle: 'Get help and contact support' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View className="px-6 pt-8 pb-6">
          <View className="flex-row items-center justify-between mb-8">
            <Text className="text-3xl font-light text-black">Profile</Text>
            <TouchableOpacity className="w-10 h-10 items-center justify-center">
              <Settings size={22} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Profile Section */}
          <View className="items-center mb-8">
            <View className="relative mb-4">
              <View className="w-24 h-24 bg-gray-100 rounded-full items-center justify-center border-2 border-gray-200">
                <Text className="text-gray-600 text-xl font-medium">AB</Text>
              </View>
              <TouchableOpacity className="absolute bottom-0 right-0 bg-black rounded-full p-2">
                <Camera size={16} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text className="text-2xl font-normal text-black mb-1">{userData.name}</Text>
            <Text className="text-gray-500 text-base">{userData.email}</Text>
            <View className="flex-row items-center mt-2">
              <MapPin size={14} color="#666" />
              <Text className="text-gray-600 text-sm ml-1">{userData.location}</Text>
            </View>
          </View>

          {/* Stats */}
          <View className="flex-row justify-between bg-gray-50 rounded-2xl p-4 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <View key={index} className="items-center flex-1">
                  <View className="w-12 h-12 bg-white rounded-full items-center justify-center mb-2 border border-gray-200">
                    <Icon size={20} color="#000" />
                  </View>
                  <Text className="text-black font-medium text-lg">{stat.value}</Text>
                  <Text className="text-gray-500 text-xs">{stat.label}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Upcoming Appointments */}
        <View className="px-6 mb-8">
          <Text className="text-xl font-light text-black mb-4">Upcoming</Text>
          {upcomingAppointments.map((appointment) => (
            <TouchableOpacity key={appointment.id} className="bg-gray-50 rounded-2xl p-4 mb-3 border border-gray-200">
              <View className="flex-row justify-between items-start mb-2">
                <Text className="text-black font-medium text-base flex-1">{appointment.service}</Text>
                <Text className="text-gray-500 text-sm">{appointment.time}</Text>
              </View>
              <Text className="text-gray-600 text-sm mb-2">with {appointment.professional}</Text>
              <View className="flex-row items-center">
                <Calendar size={14} color="#666" />
                <Text className="text-gray-600 text-sm ml-2">{appointment.date}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Menu Items */}
        <View className="px-6 mb-8">
          <Text className="text-xl font-light text-black mb-4">Settings</Text>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index}
              className="flex-row items-center justify-between py-4 border-b border-gray-100"
            >
              <View className="flex-row items-center flex-1">
                <View className="w-10 h-10 bg-gray-100 rounded-lg items-center justify-center mr-4">
                  <item.icon size={20} color="#000" />
                </View>
                <View className="flex-1">
                  <Text className="text-black font-normal text-base">{item.title}</Text>
                  <Text className="text-gray-500 text-sm mt-1">{item.subtitle}</Text>
                </View>
              </View>
              
              {item.switch ? (
                <Switch
                  value={item.value}
                  onValueChange={item.onChange}
                  trackColor={{ false: '#f1f5f9', true: '#000' }}
                  thumbColor={item.value ? '#fff' : '#f4f4f5'}
                />
              ) : (
                <ChevronRight size={20} color="#9CA3AF" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Contact Info */}
        <View className="px-6 mb-8">
          <Text className="text-xl font-light text-black mb-4">Contact</Text>
          <View className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
            <View className="flex-row items-center mb-3">
              <Phone size={18} color="#666" />
              <Text className="text-gray-600 text-base ml-3">{userData.phone}</Text>
            </View>
            <View className="flex-row items-center">
              <Mail size={18} color="#666" />
              <Text className="text-gray-600 text-base ml-3">{userData.email}</Text>
            </View>
          </View>
        </View>

        {/* Sign Out */}
        <TouchableOpacity className="flex-row items-center justify-center py-4 mx-6 mb-8 border border-gray-200 rounded-2xl">
          <LogOut size={20} color="#666" />
          <Text className="text-gray-600 text-base font-normal ml-2">Sign Out</Text>
        </TouchableOpacity>

        {/* App Version */}
        <View className="items-center pb-8">
          <Text className="text-gray-400 text-sm">Saha v0.0.1</Text>
        </View>
      </ScrollView>

      {/* Edit Button */}
      <TouchableOpacity className="absolute bottom-6 right-6 bg-black rounded-full p-4 shadow-lg">
        <Edit3 size={20} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;