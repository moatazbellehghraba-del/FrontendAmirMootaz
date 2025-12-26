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
  KeyboardAvoidingView,
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
  Navigation,
  ChevronDown,
  Check,
} from "lucide-react-native";
import { AuthContext } from "@/context/AuthContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Location from "expo-location";
import { useMutation } from "@apollo/client/react";
import { UpdateClientData } from "@/graphql/auth/mutations/auth";
import { client } from "@/apollo/client";
import { GET_CURRENT_CLIENT } from "@/graphql/auth/queries/auth";
import * as SecureStore from "expo-secure-store";
import { Image } from "react-native";

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
  profilePhoto?: string;
}

const PersonalInformationScreen = () => {
  const { currentUser, setUser } = useContext(AuthContext);
  const router = useRouter();

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
    profilePhoto: currentUser?.profilePhoto || "",
  };

  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalData, setOriginalData] = useState<UserData>(initialUserData);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const genderOptions = ["Male", "Female", "Prefer not to say"];

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
        location: currentUser.location || undefined,
        profilePhoto: currentUser.profilePhoto || "",
      };
      setUserData(updatedData);
      setOriginalData(updatedData);

      if (currentUser.dateOfBirth) {
        const birthDate = new Date(currentUser.dateOfBirth);
        if (!isNaN(birthDate.getTime())) {
          setSelectedDate(birthDate);
        }
      }
    }
  }, [currentUser]);

  useEffect(() => {
    const hasChanged =
      JSON.stringify(userData) !== JSON.stringify(originalData);
    setHasChanges(hasChanged);
  }, [userData, originalData]);

  const [updateClient] = useMutation<UserData>(UpdateClientData);

  const handleSave = async () => {
    try {
      const updateClientInput: any = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber,
        gender: userData.gender,
        dateOfBirth: userData.dateOfBirth,
        region: userData.region,
        country: userData.country,
      };

      if (
        userData.location?.lat !== undefined &&
        userData.location?.long !== undefined
      ) {
        updateClientInput.location = {
          lat: userData.location.lat,
          long: userData.location.long,
        };
      }

      await updateClient({
        variables: {
          input: updateClientInput,
        },
      });

      const { data } = await client.query<CurrentClientResponse>({
        query: GET_CURRENT_CLIENT,
        fetchPolicy: "network-only",
      });

      if (data?.me) {
        await SecureStore.setItemAsync("currentUser", JSON.stringify(data.me));
        await setUser(data.me);
      }

      if (!data || !data.me) {
        Alert.alert("Error", "Failed to load user profile");
        return;
      }

      setOriginalData(userData);
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

  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (date) {
      setSelectedDate(date);
      const formattedDate = date.toISOString().split("T")[0];
      setUserData((prev) => ({ ...prev, dateOfBirth: formattedDate }));
    }
  };

  const handleGenderSelect = (gender: string) => {
    setUserData((prev) => ({ ...prev, gender }));
    setShowGenderPicker(false);
  };

  const handleGetCurrentLocation = async () => {
    setIsGettingLocation(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Please enable location permissions in your device settings."
        );
        setIsGettingLocation(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
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

  const formatMemberSince = (dateString: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    } catch (error) {
      return dateString;
    }
  };

  const getInitials = () => {
    const first = userData?.firstName?.[0] || "";
    const last = userData?.lastName?.[0] || "";
    return `${first}${last}`.toUpperCase() || "U";
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View className="px-6 pt-8 pb-6">
            <View className="flex-row items-center justify-between mb-8">
              <View className="flex-row items-center flex-1">
                <TouchableOpacity
                  className="w-10 h-10 items-center justify-center bg-gray-100 rounded-xl mr-4"
                  onPress={handleBack}
                  activeOpacity={0.7}
                >
                  <ChevronLeft size={22} color="#000" />
                </TouchableOpacity>
                <Text className="text-2xl font-bold text-black">
                  Personal Info
                </Text>
              </View>
              <TouchableOpacity
                className={`px-4 h-10 rounded-xl items-center justify-center ${
                  isEditing
                    ? hasChanges
                      ? "bg-black"
                      : "bg-gray-200"
                    : "bg-gray-100"
                }`}
                onPress={isEditing ? handleSave : () => setIsEditing(true)}
                disabled={isEditing && !hasChanges}
                activeOpacity={0.7}
              >
                {isEditing ? (
                  hasChanges ? (
                    <Check size={20} color="#fff" />
                  ) : (
                    <Check size={20} color="#999" />
                  )
                ) : (
                  <Text className="font-semibold text-sm text-black">Edit</Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Profile Picture */}
            <View className="items-center py-6">
              <View className="relative mb-4">
                {userData.profilePhoto === "" ? (
                  <View className="w-24 h-24 bg-black rounded-full items-center justify-center mb-4 shadow-lg">
                    <Text className="text-white text-2xl font-bold">
                      {userData.firstName[0]}
                      {userData.lastName[0]}
                    </Text>
                  </View>
                ) : (
                  <Image
                    source={{ uri: userData.profilePhoto }}
                    className="w-24 h-24 rounded-full mb-4 shadow-lg"
                    resizeMode="cover"
                  />
                )}

                {isEditing && (
                  <TouchableOpacity
                    className="absolute bottom-0 right-0 bg-white border-2 border-black rounded-full p-2"
                    onPress={() => {
                      Alert.alert(
                        "Coming Soon",
                        "Photo upload feature will be available soon!"
                      );
                    }}
                    activeOpacity={0.7}
                  >
                    <Camera size={16} color="#000" />
                  </TouchableOpacity>
                )}
              </View>
              <Text className="text-xl font-bold text-black">
                {userData.firstName} {userData.lastName}
              </Text>
            </View>
          </View>

          {/* Form Fields */}
          <View className="px-6 mb-6">
            <View className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              {/* First Name & Last Name */}
              <View className="flex-row border-b border-gray-200">
                <View className="flex-1 px-4 py-4 border-r border-gray-200">
                  <Text className="text-gray-500 text-xs font-medium mb-2">
                    FIRST NAME
                  </Text>
                  {isEditing ? (
                    <TextInput
                      className="text-black font-semibold text-base"
                      value={userData.firstName}
                      onChangeText={(text) =>
                        setUserData((prev) => ({ ...prev, firstName: text }))
                      }
                      placeholder="First name"
                    />
                  ) : (
                    <Text className="text-black font-semibold text-base">
                      {userData.firstName || "Not set"}
                    </Text>
                  )}
                </View>
                <View className="flex-1 px-4 py-4">
                  <Text className="text-gray-500 text-xs font-medium mb-2">
                    LAST NAME
                  </Text>
                  {isEditing ? (
                    <TextInput
                      className="text-black font-semibold text-base"
                      value={userData.lastName}
                      onChangeText={(text) =>
                        setUserData((prev) => ({ ...prev, lastName: text }))
                      }
                      placeholder="Last name"
                    />
                  ) : (
                    <Text className="text-black font-semibold text-base">
                      {userData.lastName || "Not set"}
                    </Text>
                  )}
                </View>
              </View>

              {/* Email */}
              <View className="flex-row items-center px-4 py-4 border-b border-gray-200">
                <View className="w-10 h-10 bg-gray-100 rounded-xl items-center justify-center mr-3">
                  <Mail size={18} color="#000" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-500 text-xs font-medium mb-1">
                    EMAIL
                  </Text>
                  <Text className="text-black font-semibold text-base">
                    {userData.email}
                  </Text>
                </View>
                {!isEditing && (
                  <TouchableOpacity
                    className="px-3 py-1.5 bg-gray-100 rounded-lg"
                    onPress={() => router.push("/Components/privacySecurity")}
                    activeOpacity={0.7}
                  >
                    <Text className="text-black font-medium text-xs">Edit</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Phone */}
              <View className="flex-row items-center px-4 py-4 border-b border-gray-200">
                <View className="w-10 h-10 bg-gray-100 rounded-xl items-center justify-center mr-3">
                  <Phone size={18} color="#000" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-500 text-xs font-medium mb-1">
                    PHONE
                  </Text>
                  {isEditing ? (
                    <TextInput
                      className="text-black font-semibold text-base"
                      value={userData.phoneNumber}
                      onChangeText={(text) =>
                        setUserData((prev) => ({ ...prev, phoneNumber: text }))
                      }
                      placeholder="Phone number"
                      keyboardType="phone-pad"
                    />
                  ) : (
                    <Text className="text-black font-semibold text-base">
                      {userData.phoneNumber || "Not set"}
                    </Text>
                  )}
                </View>
              </View>

              {/* Location */}
              <View className="px-4 py-4 border-b border-gray-200">
                <View className="flex-row items-center mb-3">
                  <View className="w-10 h-10 bg-gray-100 rounded-xl items-center justify-center mr-3">
                    <MapPin size={18} color="#000" />
                  </View>
                  <Text className="text-gray-500 text-xs font-medium">
                    LOCATION
                  </Text>
                </View>
                {isEditing ? (
                  <View>
                    <View className="flex-row mb-2" style={{ gap: 8 }}>
                      <View className="flex-1">
                        <TextInput
                          className="text-black font-semibold text-base px-3 py-2 bg-gray-50 rounded-lg"
                          value={userData.region}
                          onChangeText={(text) =>
                            setUserData((prev) => ({ ...prev, region: text }))
                          }
                          placeholder="Region"
                        />
                      </View>
                      <View className="flex-1">
                        <TextInput
                          className="text-black font-semibold text-base px-3 py-2 bg-gray-50 rounded-lg"
                          value={userData.country}
                          onChangeText={(text) =>
                            setUserData((prev) => ({ ...prev, country: text }))
                          }
                          placeholder="Country"
                        />
                      </View>
                    </View>
                    <TouchableOpacity
                      className="flex-row items-center justify-center bg-black rounded-lg py-2.5 mt-2"
                      onPress={handleGetCurrentLocation}
                      disabled={isGettingLocation}
                      activeOpacity={0.7}
                    >
                      <Navigation size={16} color="#fff" />
                      <Text className="text-white font-semibold text-sm ml-2">
                        {isGettingLocation
                          ? "Getting..."
                          : "Use Current Location"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Text className="text-black font-semibold text-base ml-13">
                    {userData.region && userData.country
                      ? `${userData.region}, ${userData.country}`
                      : "Not set"}
                  </Text>
                )}
              </View>

              {/* Birth Date */}
              <View className="flex-row items-center px-4 py-4 border-b border-gray-200">
                <View className="w-10 h-10 bg-gray-100 rounded-xl items-center justify-center mr-3">
                  <Calendar size={18} color="#000" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-500 text-xs font-medium mb-1">
                    BIRTH DATE
                  </Text>
                  {isEditing ? (
                    <TouchableOpacity
                      onPress={() => setShowDatePicker(true)}
                      className="flex-row items-center justify-between"
                      activeOpacity={0.7}
                    >
                      <Text className="text-black font-semibold text-base">
                        {formatDate(userData.dateOfBirth) || "Select Date"}
                      </Text>
                      <ChevronDown size={16} color="#666" />
                    </TouchableOpacity>
                  ) : (
                    <Text className="text-black font-semibold text-base">
                      {formatDate(userData.dateOfBirth) || "Not set"}
                    </Text>
                  )}
                </View>
              </View>

              {/* Gender */}
              <View className="flex-row items-center px-4 py-4">
                <View className="w-10 h-10 bg-gray-100 rounded-xl items-center justify-center mr-3">
                  <User size={18} color="#000" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-500 text-xs font-medium mb-1">
                    GENDER
                  </Text>
                  {isEditing ? (
                    <TouchableOpacity
                      onPress={() => setShowGenderPicker(true)}
                      className="flex-row items-center justify-between"
                      activeOpacity={0.7}
                    >
                      <Text className="text-black font-semibold text-base">
                        {userData.gender || "Select Gender"}
                      </Text>
                      <ChevronDown size={16} color="#666" />
                    </TouchableOpacity>
                  ) : (
                    <Text className="text-black font-semibold text-base">
                      {userData.gender || "Not set"}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </View>

          {/* Member Since */}
          <View className="px-6 mb-6">
            <View className="bg-gray-50 rounded-2xl px-4 py-4 border border-gray-200">
              <View className="flex-row items-center justify-between">
                <Text className="text-gray-600 text-sm font-medium">
                  Member Since
                </Text>
                <Text className="text-black text-base font-bold">
                  {formatMemberSince(userData.createdAt)}
                </Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          {isEditing && (
            <View className="px-6 mb-8">
              <View className="flex-row" style={{ gap: 12 }}>
                <TouchableOpacity
                  className="flex-1 bg-gray-100 rounded-2xl py-3.5 items-center"
                  onPress={handleCancel}
                  activeOpacity={0.7}
                >
                  <Text className="text-gray-700 font-semibold text-base">
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`flex-1 rounded-2xl py-3.5 items-center ${
                    hasChanges ? "bg-black" : "bg-gray-300"
                  }`}
                  onPress={handleSave}
                  disabled={!hasChanges}
                  activeOpacity={0.7}
                >
                  <Text
                    className={`font-semibold text-base ${
                      hasChanges ? "text-white" : "text-gray-500"
                    }`}
                  >
                    Save Changes
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

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
                  <Text className="text-xl font-bold text-black">
                    Select Birth Date
                  </Text>
                  <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                    <Text className="text-black text-base font-semibold">
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
              <Text className="text-xl font-bold text-black">
                Select Gender
              </Text>
              <TouchableOpacity onPress={() => setShowGenderPicker(false)}>
                <Text className="text-gray-500 text-base font-semibold">
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
            {genderOptions.map((gender, index) => (
              <TouchableOpacity
                key={gender}
                className={`py-4 ${
                  index < genderOptions.length - 1
                    ? "border-b border-gray-200"
                    : ""
                }`}
                onPress={() => handleGenderSelect(gender)}
                activeOpacity={0.7}
              >
                <Text className="text-base text-black font-medium">
                  {gender}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PersonalInformationScreen;
