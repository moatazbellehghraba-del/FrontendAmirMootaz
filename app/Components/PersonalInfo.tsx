// app/personal-information.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { 
  ChevronLeft,
  Camera,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Save
} from 'lucide-react-native';

interface UserData {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  birthDate: string;
  gender: string;
  memberSince: string;
  membership: string;
}

const PersonalInformationScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Parse user data from navigation params
  const initialUserData: UserData = params.userData 
    ? JSON.parse(params.userData as string)
    : {
        name: 'Amira Ben Ahmed',
        firstName: 'Amira',
        lastName: 'Ben Ahmed',
        email: 'amira.benahmed@email.com',
        phone: '+216 12 345 678',
        location: 'Tunis, Tunisia',
        birthDate: '15 March 1990',
        gender: 'Female',
        memberSince: 'Jan 2023',
        membership: 'Premium Member'
      };

  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Check if any fields have been modified
  useEffect(() => {
    const hasChanged = JSON.stringify(userData) !== JSON.stringify(initialUserData);
    setHasChanges(hasChanged);
  }, [userData, initialUserData]);

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log('Saving user data:', userData);
    
    // Show success message
    Alert.alert('Success', 'Your profile has been updated successfully!');
    
    setIsEditing(false);
    
    // You can also pass the updated data back to the profile screen
    // via navigation params or a global state management solution
  };

  const handleCancel = () => {
    if (hasChanges) {
      Alert.alert(
        'Discard Changes?',
        'You have unsaved changes. Are you sure you want to discard them?',
        [
          { text: 'Keep Editing', style: 'cancel' },
          { 
            text: 'Discard', 
            style: 'destructive',
            onPress: () => {
              setUserData(initialUserData);
              setIsEditing(false);
            }
          }
        ]
      );
    } else {
      setUserData(initialUserData);
      setIsEditing(false);
    }
  };

  const handleBack = () => {
    if (hasChanges && isEditing) {
      Alert.alert(
        'Unsaved Changes',
        'You have unsaved changes. Do you want to save before leaving?',
        [
          { 
            text: 'Discard', 
            style: 'destructive',
            onPress: () => router.back()
          },
          { 
            text: 'Save', 
            style: 'default',
            onPress: () => {
              handleSave();
              router.back();
            }
          },
          { text: 'Cancel', style: 'cancel' }
        ]
      );
    } else {
      router.back();
    }
  };

  const FieldItem = ({ 
    icon: Icon, 
    label, 
    value, 
    field, 
    editable = true,
    keyboardType = 'default'
  }: {
    icon: React.ComponentType<{ size: number; color: string }>;
    label: string;
    value: string;
    field: keyof UserData;
    editable?: boolean;
    keyboardType?: 'default' | 'email-address' | 'phone-pad';
  }) => (
    <View className="flex-row items-center justify-between py-5 border-b border-gray-200">
      <View className="flex-row items-center flex-1">
        <View className="w-12 h-12 bg-gray-50 rounded-xl items-center justify-center mr-4 border border-gray-100">
          <Icon size={20} color="#000" />
        </View>
        <View className="flex-1">
          <Text className="text-gray-500 text-sm mb-1">{label}</Text>
          {isEditing && editable ? (
            <TextInput
              className="text-black font-medium text-base p-0 m-0"
              value={value}
              onChangeText={(text) => setUserData(prev => ({ ...prev, [field]: text }))}
              placeholder={`Enter ${label.toLowerCase()}`}
              keyboardType={keyboardType}
              autoCapitalize="none"
            />
          ) : (
            <Text className="text-black font-medium text-base">{value}</Text>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View className="px-6 pt-12 pb-6 bg-white">
          <View className="flex-row items-center justify-between mb-8">
            <View className="flex-row items-center">
              <TouchableOpacity 
                className="w-12 h-12 bg-gray-50 rounded-2xl items-center justify-center mr-4 border border-gray-200"
                onPress={handleBack}
              >
                <ChevronLeft size={22} color="#000" />
              </TouchableOpacity>
              <View>
                <Text className="text-3xl font-light text-black mb-1">Personal Information</Text>
                <Text className="text-gray-400 text-base">Update your details</Text>
              </View>
            </View>
            <TouchableOpacity 
              className={`w-12 h-12 rounded-2xl items-center justify-center ${
                isEditing && hasChanges ? 'bg-black' : 'bg-gray-200'
              }`}
              onPress={isEditing ? handleSave : () => setIsEditing(true)}
              disabled={isEditing && !hasChanges}
            >
              {isEditing ? (
                <Save size={22} color={hasChanges ? "#fff" : "#666"} />
              ) : (
                <Text className={`font-medium text-sm ${isEditing ? 'text-gray-600' : 'text-white'}`}>
                  Edit
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Profile Picture Section */}
          <View className="items-center mb-8">
            <View className="relative mb-5">
              <View className="w-28 h-28 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full items-center justify-center border-4 border-white shadow-sm">
                <Text className="text-gray-600 text-2xl font-medium">
                  {userData.firstName[0]}{userData.lastName[0]}
                </Text>
              </View>
              <TouchableOpacity className="absolute bottom-1 right-1 bg-black rounded-full p-2 shadow-md">
                <Camera size={16} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text className="text-2xl font-normal text-black mb-2">
              {userData.firstName} {userData.lastName}
            </Text>
            <Text className="text-gray-500 text-base">{userData.membership}</Text>
          </View>
        </View>

        {/* Personal Information Form */}
        <View className="px-6 mb-8">
          <Text className="text-xl font-light text-black mb-5">Basic Information</Text>
          <View className="bg-gray-50 rounded-3xl p-2 border border-gray-200">
            
            {/* Name Fields */}
            <View className="flex-row border-b border-gray-200">
              <View className="flex-1 pr-2">
                <View className="py-5">
                  <Text className="text-gray-500 text-sm mb-1">First Name</Text>
                  {isEditing ? (
                    <TextInput
                      className="text-black font-medium text-base p-0 m-0"
                      value={userData.firstName}
                      onChangeText={(text) => setUserData(prev => ({ ...prev, firstName: text }))}
                      placeholder="First name"
                    />
                  ) : (
                    <Text className="text-black font-medium text-base">{userData.firstName}</Text>
                  )}
                </View>
              </View>
              <View className="w-px bg-gray-200" />
              <View className="flex-1 pl-2">
                <View className="py-5">
                  <Text className="text-gray-500 text-sm mb-1">Last Name</Text>
                  {isEditing ? (
                    <TextInput
                      className="text-black font-medium text-base p-0 m-0"
                      value={userData.lastName}
                      onChangeText={(text) => setUserData(prev => ({ ...prev, lastName: text }))}
                      placeholder="Last name"
                    />
                  ) : (
                    <Text className="text-black font-medium text-base">{userData.lastName}</Text>
                  )}
                </View>
              </View>
            </View>

            {/* Contact Information */}
            <FieldItem 
              icon={Mail} 
              label="Email Address" 
              value={userData.email} 
              field="email"
              keyboardType="email-address"
            />
            <FieldItem 
              icon={Phone} 
              label="Phone Number" 
              value={userData.phone} 
              field="phone"
              keyboardType="phone-pad"
            />
            <FieldItem 
              icon={MapPin} 
              label="Location" 
              value={userData.location} 
              field="location"
            />
            <FieldItem 
              icon={Calendar} 
              label="Birth Date" 
              value={userData.birthDate} 
              field="birthDate"
            />
            <FieldItem 
              icon={User} 
              label="Gender" 
              value={userData.gender} 
              field="gender"
            />

          </View>
        </View>

        {/* Additional Information */}
        <View className="px-6 mb-8">
          <Text className="text-xl font-light text-black mb-5">Account Details</Text>
          <View className="bg-gray-50 rounded-3xl p-6 border border-gray-200">
            <View className="flex-row justify-between items-center py-3 border-b border-gray-200">
              <Text className="text-gray-500 text-sm">Member Since</Text>
              <Text className="text-black font-medium text-base">{userData.memberSince}</Text>
            </View>
            <View className="flex-row justify-between items-center py-3">
              <Text className="text-gray-500 text-sm">Account Status</Text>
              <View className="bg-green-50 rounded-full px-3 py-1">
                <Text className="text-green-600 text-xs font-medium">Active</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        {isEditing && (
          <View className="px-6 mb-8">
            <View className="flex-row space-x-4">
              <TouchableOpacity 
                className="flex-1 bg-gray-200 rounded-2xl py-4 items-center active:bg-gray-300"
                onPress={handleCancel}
              >
                <Text className="text-gray-600 font-medium text-base">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className={`flex-1 rounded-2xl py-4 items-center ${
                  hasChanges ? 'bg-black active:bg-gray-800' : 'bg-gray-400'
                }`}
                onPress={handleSave}
                disabled={!hasChanges}
              >
                <Text className={`font-medium text-base ${
                  hasChanges ? 'text-white' : 'text-gray-600'
                }`}>
                  Save Changes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Security Notice */}
        <View className="px-6 mb-8">
          <View className="bg-blue-50 rounded-2xl p-5 border border-blue-200">
            <Text className="text-blue-800 font-medium text-sm mb-2">Your privacy matters</Text>
            <Text className="text-blue-600 text-xs">
              We take your privacy seriously. Your personal information is encrypted and 
              protected according to our privacy policy.
            </Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalInformationScreen;