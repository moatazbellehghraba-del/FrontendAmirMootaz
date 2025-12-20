// app/personal-information.tsx
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  ChevronLeft,
  Camera,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Save,
  Navigation,
  ChevronDown,
} from "lucide-react-native";
import { AuthContext } from "@/context/AuthContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Location from "expo-location";
import { useMutation } from "@apollo/client/react";
import { UpdateClientData } from "@/graphql/auth/mutations/auth";
import { client } from "@/apollo/client";
import { GET_CURRENT_CLIENT } from "@/graphql/auth/queries/auth";
import * as SecureStore from "expo-secure-store";
interface LocationData {
  lat?: number;
  long?: number;
}
interface CurrentClientResponse {
  me: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    gender?: string;
    dateOfBirth?: string;
    profilePhoto?: string;
    location?: {
      lat: number;
      long: number;
    };
    region?: string;
    country?: string;
    loyaltyPoints?: number;
    favorites: string[];
    bookings?: any[];
    reviews?: any[];
    createdAt?: string;
  };
}
interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  region: string;
  country: string;
  dateOfBirth: string;
  gender: string;
  createdAt: string;
  loyaltyPoints: number;
  location?: LocationData;
}

const PersonalInformationScreen = () => {
  const { currentUser, setUser, refreshUser } = useContext(AuthContext);
  const router = useRouter();

  // Initialize userData from currentUser
  const initialUserData: UserData = {
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    email: currentUser?.email || "",
    phoneNumber: currentUser?.phoneNumber || "",
    region: currentUser?.region || "",
    country: currentUser?.country || "",
    dateOfBirth: currentUser?.dateOfBirth || "",
    gender: currentUser?.gender || "",
    createdAt: currentUser?.createdAt || "",
    loyaltyPoints: currentUser?.loyaltyPoints || 0,
    location: currentUser?.location || undefined,
  };

  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalData, setOriginalData] = useState<UserData>(initialUserData);

  // New states for improved inputs
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  // Gender options
  const genderOptions = ["Male", "Female", "Prefer not to say"];

  // Update userData when currentUser changes
  useEffect(() => {
    if (currentUser) {
      const updatedData: UserData = {
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        email: currentUser.email || "",
        phoneNumber: currentUser.phoneNumber || "",
        region: currentUser.region || "",
        country: currentUser.country || "",
        dateOfBirth: currentUser.dateOfBirth || "",
        gender: currentUser.gender || "",
        createdAt: currentUser.createdAt || "",
        loyaltyPoints: currentUser.loyaltyPoints || 0,
        location: currentUser.location || undefined, // Nested location
      };
      setUserData(updatedData);
      setOriginalData(updatedData);

      // Set selected date if dateOfBirth exists
      if (currentUser.dateOfBirth) {
        const birthDate = new Date(currentUser.dateOfBirth);
        if (!isNaN(birthDate.getTime())) {
          setSelectedDate(birthDate);
        }
      }
    }
  }, [currentUser]);

  // Check if any fields have been modified
  useEffect(() => {
    const hasChanged =
      JSON.stringify(userData) !== JSON.stringify(originalData);
    setHasChanges(hasChanged);
  }, [userData, originalData]);
  const [updateClient] = useMutation<UserData>(UpdateClientData);

  const handleSave = async () => {
    try {
      // Prepare the updateClientInput object
      const updateClientInput: any = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber,
        gender: userData.gender,
        dateOfBirth: userData.dateOfBirth,
        region: userData.region,
        country: userData.country,
      };

      // Only include location if it has valid coordinates
      if (
        userData.location?.lat !== undefined &&
        userData.location?.long !== undefined
      ) {
        updateClientInput.location = {
          lat: userData.location.lat,
          long: userData.location.long, // Fixed: was using .lat for both
        };
      }

      console.log("Sending data to API:", updateClientInput);

      // Pass the variables with the correct parameter name
      const res = await updateClient({
        variables: {
          input: updateClientInput, // This matches $input in your mutation
        },
      });

      // 3️⃣ Fetch current client using the access token
      const { data } = await client.query<CurrentClientResponse>({
        query: GET_CURRENT_CLIENT,
        fetchPolicy: "network-only",
      });
      if (data?.me) {
        await SecureStore.setItemAsync("currentUser", JSON.stringify(data.me));
        await setUser(data.me);
      }
      console.log(console.log("this the value of current client ", data?.me));
      if (!data || !data.me) {
        Alert.alert("Error", "Failed to load user profile");
        return;
      }
      // Update the original data after saving
      setOriginalData(userData);

      // Show success message
      Alert.alert("Success", "Your profile has been updated successfully!");

      setIsEditing(false);
    } catch (error) {
      console.error("Error saving data:", error);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    }
  };

  const handleCancel = () => {
    if (hasChanges) {
      Alert.alert(
        "Discard Changes?",
        "You have unsaved changes. Are you sure you want to discard them?",
        [
          { text: "Keep Editing", style: "cancel" },
          {
            text: "Discard",
            style: "destructive",
            onPress: () => {
              setUserData(originalData);
              setIsEditing(false);
            },
          },
        ]
      );
    } else {
      setUserData(originalData);
      setIsEditing(false);
    }
  };

  const handleBack = () => {
    if (hasChanges && isEditing) {
      Alert.alert(
        "Unsaved Changes",
        "You have unsaved changes. Do you want to save before leaving?",
        [
          {
            text: "Discard",
            style: "destructive",
            onPress: () => router.back(),
          },
          {
            text: "Save",
            style: "default",
            onPress: () => {
              handleSave();
              router.back();
            },
          },
          { text: "Cancel", style: "cancel" },
        ]
      );
    } else {
      router.back();
    }
  };

  // Handle date change
  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (date) {
      setSelectedDate(date);
      const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD format
      setUserData((prev) => ({ ...prev, dateOfBirth: formattedDate }));
    }
  };

  // Handle gender selection
  const handleGenderSelect = (gender: string) => {
    setUserData((prev) => ({ ...prev, gender }));
    setShowGenderPicker(false);
  };

  // Handle current location
  const handleGetCurrentLocation = async () => {
    setIsGettingLocation(true);
    try {
      // Request permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Please enable location permissions in your device settings."
        );
        setIsGettingLocation(false);
        return;
      }

      // Get current location
      let location = await Location.getCurrentPositionAsync({});

      // Reverse geocode to get address
      let address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (address.length > 0) {
        const { region, country } = address[0];
        setUserData((prev) => ({
          ...prev,
          location: {
            lat: location.coords.latitude,
            long: location.coords.longitude,
          },
          region: region || userData.region,
          country: country || userData.country,
        }));
        Alert.alert(
          "Location Updated",
          "Your current location has been set successfully."
        );
      }
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert(
        "Error",
        "Unable to get your current location. Please try again."
      );
    } finally {
      setIsGettingLocation(false);
    }
  };

  const FieldItem = ({
    icon: Icon,
    label,
    value,
    field,
    editable = true,
    keyboardType = "default",
  }: {
    icon: React.ComponentType<{ size: number; color: string }>;
    label: string;
    value: string;
    field: keyof UserData;
    editable?: boolean;
    keyboardType?: "default" | "email-address" | "phone-pad";
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
              onChangeText={(text) =>
                setUserData((prev) => ({ ...prev, [field]: text }))
              }
              placeholder={`Enter ${label.toLowerCase()}`}
              keyboardType={keyboardType}
              autoCapitalize="none"
            />
          ) : (
            <Text className="text-black font-medium text-base">
              {value || "Not provided"}
            </Text>
          )}
        </View>
      </View>
    </View>
  );

  // Format date to readable string
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch (error) {
      return dateString;
    }
  };

  // Format member since date
  const formatMemberSince = (dateString: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
    } catch (error) {
      return dateString;
    }
  };

  // Get location string from region and country
  const getLocationString = () => {
    if (userData.region && userData.country) {
      return `${userData.region}, ${userData.country}`;
    } else if (userData.country) {
      return userData.country;
    } else if (userData.region) {
      return userData.region;
    }
    return "";
  };

  // Get initials for profile picture
  const getInitials = () => {
    const first = userData?.firstName?.[0] || "";
    const last = userData?.lastName?.[0] || "";
    return `${first}${last}`.toUpperCase() || "U";
  };

  // Get membership level based on loyalty points
  const getMembership = () => {
    return userData.loyaltyPoints > 100 ? "Premium Member" : "Basic Member";
  };

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
                <Text className="text-3xl font-light text-black mb-1">
                  Personal Information
                </Text>
                <Text className="text-gray-400 text-base">
                  Update your details
                </Text>
              </View>
            </View>
            <TouchableOpacity
              className={`w-12 h-12 rounded-2xl items-center justify-center ${
                isEditing && hasChanges ? "bg-black" : "bg-gray-200"
              }`}
              onPress={isEditing ? handleSave : () => setIsEditing(true)}
              disabled={isEditing && !hasChanges}
            >
              {isEditing ? (
                <Save size={22} color={hasChanges ? "#fff" : "#666"} />
              ) : (
                <Text className="font-medium text-sm text-black">Edit</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Profile Picture Section */}
          <View className="items-center mb-8">
            <View className="relative mb-5">
              <View className="w-28 h-28 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full items-center justify-center border-4 border-white shadow-sm">
                <Text className="text-gray-600 text-2xl font-medium">
                  {getInitials()}
                </Text>
              </View>
              <TouchableOpacity
                className="absolute bottom-1 right-1 bg-black rounded-full p-2 shadow-md"
                onPress={() => {
                  // Handle camera/photo upload
                  Alert.alert(
                    "Coming Soon",
                    "Photo upload feature will be available soon!"
                  );
                }}
              >
                <Camera size={16} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text className="text-2xl font-normal text-black mb-2">
              {userData.firstName} {userData.lastName}
            </Text>
            <Text className="text-gray-500 text-base">{getMembership()}</Text>
          </View>
        </View>

        {/* Personal Information Form */}
        <View className="px-6 mb-8">
          <Text className="text-xl font-light text-black mb-5">
            Basic Information
          </Text>
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
                      onChangeText={(text) =>
                        setUserData((prev) => ({ ...prev, firstName: text }))
                      }
                      placeholder="First name"
                    />
                  ) : (
                    <Text className="text-black font-medium text-base">
                      {userData.firstName || "Not provided"}
                    </Text>
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
                      onChangeText={(text) =>
                        setUserData((prev) => ({ ...prev, lastName: text }))
                      }
                      placeholder="Last name"
                    />
                  ) : (
                    <Text className="text-black font-medium text-base">
                      {userData.lastName || "Not provided"}
                    </Text>
                  )}
                </View>
              </View>
            </View>

            {/* Contact Information */}
            {!isEditing && (
              <View className="flex-row items-center justify-between py-5 border-b border-gray-200">
                <View className="flex-row items-center flex-1">
                  <View className="w-12 h-12 bg-gray-50 rounded-xl items-center justify-center mr-4 border border-gray-100">
                    <Mail size={20} color="#000" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-gray-500 text-sm mb-1">
                      Email Address
                    </Text>
                    <Text className="text-black font-medium text-base">
                      {userData.email || "Not provided"}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  className="ml-4 px-4 py-2 bg-gray-100 rounded-lg active:bg-gray-200"
                  onPress={() => router.push("/Components/privacySecurity")} // Navigate to edit email screen
                >
                  <Text className="text-black font-medium text-sm">Edit</Text>
                </TouchableOpacity>
              </View>
            )}
            <FieldItem
              icon={Phone}
              label="Phone Number"
              value={userData.phoneNumber}
              field="phoneNumber"
              keyboardType="phone-pad"
            />

            {/* Location Fields */}
            <View className="border-b border-gray-200">
              <View className="flex-row items-center justify-between py-5">
                <View className="flex-row items-center flex-1">
                  <View className="w-12 h-12 bg-gray-50 rounded-xl items-center justify-center mr-4 border border-gray-100">
                    <MapPin size={20} color="#000" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-gray-500 text-sm mb-1">Location</Text>
                    {isEditing ? (
                      <View>
                        <View className="flex-row">
                          <View className="flex-1 mr-2">
                            <TextInput
                              className="text-black font-medium text-base p-0 m-0 mb-2"
                              value={userData.region}
                              onChangeText={(text) =>
                                setUserData((prev) => ({
                                  ...prev,
                                  region: text,
                                }))
                              }
                              placeholder="Region"
                            />
                          </View>
                          <View className="flex-1 ml-2">
                            <TextInput
                              className="text-black font-medium text-base p-0 m-0 mb-2"
                              value={userData.country}
                              onChangeText={(text) =>
                                setUserData((prev) => ({
                                  ...prev,
                                  country: text,
                                }))
                              }
                              placeholder="Country"
                            />
                          </View>
                        </View>
                        <TouchableOpacity
                          className="flex-row items-center bg-blue-50 rounded-lg py-2 px-3 mt-2 active:bg-blue-100"
                          onPress={handleGetCurrentLocation}
                          disabled={isGettingLocation}
                        >
                          <Navigation size={16} color="#3b82f6" />
                          <Text className="text-blue-600 font-medium text-sm ml-2">
                            {isGettingLocation
                              ? "Getting Location..."
                              : "Use Current Location"}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <Text className="text-black font-medium text-base">
                        {getLocationString() || "Not provided"}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            </View>

            {/* Birth Date Field */}
            <View className="flex-row items-center justify-between py-5 border-b border-gray-200">
              <View className="flex-row items-center flex-1">
                <View className="w-12 h-12 bg-gray-50 rounded-xl items-center justify-center mr-4 border border-gray-100">
                  <Calendar size={20} color="#000" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-500 text-sm mb-1">Birth Date</Text>
                  {isEditing ? (
                    <TouchableOpacity
                      onPress={() => setShowDatePicker(true)}
                      className="flex-row items-center justify-between py-2 px-3 bg-white rounded-lg border border-gray-300"
                    >
                      <Text className="text-black font-medium text-base">
                        {formatDate(userData.dateOfBirth) || "Select Date"}
                      </Text>
                      <ChevronDown size={16} color="#666" />
                    </TouchableOpacity>
                  ) : (
                    <Text className="text-black font-medium text-base">
                      {formatDate(userData.dateOfBirth) || "Not provided"}
                    </Text>
                  )}
                </View>
              </View>
            </View>

            {/* Gender Field */}
            <View className="flex-row items-center justify-between py-5">
              <View className="flex-row items-center flex-1">
                <View className="w-12 h-12 bg-gray-50 rounded-xl items-center justify-center mr-4 border border-gray-100">
                  <User size={20} color="#000" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-500 text-sm mb-1">Gender</Text>
                  {isEditing ? (
                    <TouchableOpacity
                      onPress={() => setShowGenderPicker(true)}
                      className="flex-row items-center justify-between py-2 px-3 bg-white rounded-lg border border-gray-300"
                    >
                      <Text className="text-black font-medium text-base">
                        {userData.gender || "Select Gender"}
                      </Text>
                      <ChevronDown size={16} color="#666" />
                    </TouchableOpacity>
                  ) : (
                    <Text className="text-black font-medium text-base">
                      {userData.gender || "Not provided"}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Date Picker Modal */}
        {showDatePicker &&
          (Platform.OS === "ios" ? (
            <Modal
              transparent={true}
              animationType="slide"
              visible={showDatePicker}
            >
              <View className="flex-1 justify-end bg-black/50">
                <View className="bg-white rounded-t-3xl p-6">
                  <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-xl font-semibold text-black">
                      Select Birth Date
                    </Text>
                    <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                      <Text className="text-blue-600 text-lg font-medium">
                        Done
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="spinner"
                    onChange={handleDateChange}
                    maximumDate={new Date()}
                  />
                </View>
              </View>
            </Modal>
          ) : (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          ))}

        {/* Gender Picker Modal */}
        <Modal
          visible={showGenderPicker}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowGenderPicker(false)}
        >
          <View className="flex-1 justify-end bg-black/50">
            <View className="bg-white rounded-t-3xl p-6">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-xl font-semibold text-black">
                  Select Gender
                </Text>
                <TouchableOpacity onPress={() => setShowGenderPicker(false)}>
                  <Text className="text-gray-500 text-lg">Cancel</Text>
                </TouchableOpacity>
              </View>
              {genderOptions.map((gender) => (
                <TouchableOpacity
                  key={gender}
                  className="py-4 border-b border-gray-200"
                  onPress={() => handleGenderSelect(gender)}
                >
                  <Text className="text-lg text-black">{gender}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>

        {/* Additional Information */}
        <View className="px-6 mb-8">
          <Text className="text-xl font-light text-black mb-5">
            Account Details
          </Text>
          <View className="bg-gray-50 rounded-3xl p-6 border border-gray-200">
            <View className="flex-row justify-between items-center py-3 border-b border-gray-200">
              <Text className="text-gray-500 text-sm">Member Since</Text>
              <Text className="text-black font-medium text-base">
                {formatMemberSince(userData.createdAt) || "Not available"}
              </Text>
            </View>
            <View className="flex-row justify-between items-center py-3">
              <Text className="text-gray-500 text-sm">Loyalty Points</Text>
              <Text className="text-black font-medium text-base">
                {userData.loyaltyPoints}
              </Text>
            </View>
            <View className="flex-row justify-between items-center py-3">
              <Text className="text-gray-500 text-sm">Account Status</Text>
              <View className="bg-green-50 rounded-full px-3 py-1">
                <Text className="text-green-600 text-xs font-medium">
                  Active
                </Text>
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
                <Text className="text-gray-600 font-medium text-base">
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 rounded-2xl py-4 items-center ${
                  hasChanges ? "bg-black active:bg-gray-800" : "bg-gray-400"
                }`}
                onPress={handleSave}
                disabled={!hasChanges}
              >
                <Text
                  className={`font-medium text-base ${
                    hasChanges ? "text-white" : "text-gray-600"
                  }`}
                >
                  Save Changes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Security Notice */}
        <View className="px-6 mb-8">
          <View className="bg-blue-50 rounded-2xl p-5 border border-blue-200">
            <Text className="text-blue-800 font-medium text-sm mb-2">
              Your privacy matters
            </Text>
            <Text className="text-blue-600 text-xs">
              We take your privacy seriously. Your personal information is
              encrypted and protected according to our privacy policy.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalInformationScreen;
