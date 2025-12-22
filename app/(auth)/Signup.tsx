import DateTimePicker from "@react-native-community/datetimepicker";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import {
  Calendar,
  ChevronDown,
  Eye,
  EyeOff,
  Lock,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react-native";
import React, { useContext, useState, useRef } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useMutation } from "@apollo/client/react";
import * as SecureStore from "expo-secure-store";
import { REGISTER } from "../../graphql/auth/mutations/auth";
import { client } from "@/apollo/client";
import { GET_CURRENT_CLIENT } from "../../graphql/auth/queries/auth";
import { AuthContext } from "@/context/AuthContext";

interface RegisterResponse {
  register: {
    message: string;
  };
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

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  gender: string;
  dateOfBirth: Date;
  latitude: number | null;
  longitude: number | null;
  region: string;
  country: string;
}

const { width } = Dimensions.get("window");

const Signup = () => {
  const router = useRouter();
  const [signupData, setSignupData] = useState<SignupData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dateOfBirth: new Date(),
    latitude: null,
    longitude: null,
    region: "",
    country: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);
  const lastNameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  // Calculate logo size to match login screen
  const logoSize = width * 0.5;

  // Handle input changes
  const handleInputChange = (
    field: keyof SignupData,
    value: string | Date | number | null
  ) => {
    setSignupData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Function to reverse geocode coordinates to address (region and country only)
  const reverseGeocode = async (latitude: number, longitude: number) => {
    try {
      const geocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (geocode.length > 0) {
        const address = geocode[0];
        return {
          region: address.region || "",
          country: address.country || "",
        };
      }
    } catch (error) {
      console.log("Reverse geocoding error:", error);
    }

    return {
      region: "",
      country: "",
    };
  };

  // Handle get location with reverse geocoding
  const [register, { loading }] = useMutation<RegisterResponse>(REGISTER);
  const handleGetLocation = async () => {
    try {
      setIsGettingLocation(true);

      // Request location permissions
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Please enable location services to get your current location",
          [{ text: "OK" }]
        );
        return;
      }

      // Get current location
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;

      // Reverse geocode to get region and country
      const address = await reverseGeocode(latitude, longitude);

      setSignupData((prev) => ({
        ...prev,
        latitude: latitude,
        longitude: longitude,
        region: address.region,
        country: address.country,
      }));
    } catch (error) {
      console.log("Error getting location:", error);
      Alert.alert(
        "Error",
        "Unable to get your current location. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setIsGettingLocation(false);
    }
  };

  // Handle date change
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleInputChange("dateOfBirth", selectedDate);
    }
  };

  // Handle signup submission
  const { login: authLogin } = useContext(AuthContext);
  const handleSignup = async () => {
    // Validation
    if (
      !signupData.firstName ||
      !signupData.lastName ||
      !signupData.email ||
      !signupData.phone ||
      !signupData.password ||
      !signupData.confirmPassword ||
      !signupData.gender
    ) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (signupData.password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      // Prepare data for backend
      const signupPayload = {
        firstName: signupData.firstName,
        lastName: signupData.lastName,
        email: signupData.email,
        phoneNumber: signupData.phone,
        password: signupData.password,
        gender: signupData.gender,
        dateOfBirth: signupData.dateOfBirth.toISOString(),
        location: {
          lat: signupData.latitude,
          long: signupData.longitude,
        },
        region: signupData.region,
        country: signupData.country,
      };

      console.log("Sending to backend:", signupPayload);
      const res = await register({ variables: { input: signupPayload } });
      console.log("this the value of res ", res);

      router.push({
        pathname: "/(auth)/Verification",
        params: { email: signupData.email, operation: "signup" },
      });
    } catch (error: any) {
      console.log("GraphQL Error:", JSON.stringify(error, null, 2));

      const errorMessage =
        error?.graphQLErrors?.[0]?.message ||
        error?.message ||
        "Signup failed. Please try again.";

      Alert.alert("Error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle social signup
  const handleSocialSignup = (provider: string) => {
    console.log(`${provider} signup clicked`);
  };

  // Handle login navigation
  const handleLogin = () => {
    router.push("/(auth)/Login");
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Clear location data
  const handleClearLocation = () => {
    setSignupData((prev) => ({
      ...prev,
      latitude: null,
      longitude: null,
      region: "",
      country: "",
    }));
  };

  // Focus next input field
  const focusNextField = (nextRef: React.RefObject<TextInput | null>) => {
    nextRef.current?.focus();
  };

  // Scroll to input when focused - REMOVED as we don't need manual scrolling

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          ref={scrollViewRef}
          className="flex-1"
          contentContainerStyle={{ 
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 40 
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo */}
          <View className="items-center mb-6">
            <Image
              source={require("../../assets/images/logopng.png")}
              style={{
                width: logoSize,
                height: logoSize,
              }}
              resizeMode="contain"
            />
          </View>

          {/* Header */}
          <View className="items-center mb-8">
            <Text className="text-4xl font-black text-black mb-2">
              Create Account
            </Text>
            <Text className="text-lg text-gray-600 text-center">
              Join our beauty community today
            </Text>
          </View>

          {/* Signup Form */}
          <View className="mb-6">
            {/* Name Row - First Name & Last Name in same line with spacing */}
            <View className="flex-row mb-4" style={{ gap: 12 }}>
              {/* First Name */}
              <View className="flex-1">
                <View className="flex-row items-center border border-gray-300 rounded-2xl px-4 py-4">
                  <User size={20} color="#6B7280" />
                  <TextInput
                    className="flex-1 ml-3 text-black text-base"
                    placeholder="First Name"
                    placeholderTextColor="#9CA3AF"
                    value={signupData.firstName}
                    onChangeText={(value) =>
                      handleInputChange("firstName", value)
                    }
                    autoCapitalize="words"
                    returnKeyType="next"
                    onSubmitEditing={() => focusNextField(lastNameRef)}
                    blurOnSubmit={false}
                  />
                </View>
              </View>

              {/* Last Name */}
              <View className="flex-1">
                <View className="flex-row items-center border border-gray-300 rounded-2xl px-4 py-4">
                  <User size={20} color="#6B7280" />
                  <TextInput
                    ref={lastNameRef}
                    className="flex-1 ml-3 text-black text-base"
                    placeholder="Last Name"
                    placeholderTextColor="#9CA3AF"
                    value={signupData.lastName}
                    onChangeText={(value) =>
                      handleInputChange("lastName", value)
                    }
                    autoCapitalize="words"
                    returnKeyType="next"
                    onSubmitEditing={() => focusNextField(emailRef)}
                    blurOnSubmit={false}
                  />
                </View>
              </View>
            </View>

            {/* Email Input */}
            <View className="flex-row items-center border border-gray-300 rounded-2xl px-4 py-4 mb-4">
              <Mail size={20} color="#6B7280" />
              <TextInput
                ref={emailRef}
                className="flex-1 ml-3 text-black text-base"
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                value={signupData.email}
                onChangeText={(value) => handleInputChange("email", value)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                returnKeyType="next"
                onSubmitEditing={() => focusNextField(phoneRef)}
                blurOnSubmit={false}
              />
            </View>

            {/* Phone Input */}
            <View className="flex-row items-center border border-gray-300 rounded-2xl px-4 py-4 mb-4">
              <Phone size={20} color="#6B7280" />
              <TextInput
                ref={phoneRef}
                className="flex-1 ml-3 text-black text-base"
                placeholder="Enter your phone number"
                placeholderTextColor="#9CA3AF"
                value={signupData.phone}
                onChangeText={(value) => handleInputChange("phone", value)}
                keyboardType="phone-pad"
                autoComplete="tel"
                returnKeyType="next"
                onSubmitEditing={() => focusNextField(passwordRef)}
                blurOnSubmit={false}
              />
            </View>

            {/* Password Row */}
            <View className="flex-row mb-4" style={{ gap: 12 }}>
              {/* Password */}
              <View className="flex-1">
                <View className="flex-row items-center border border-gray-300 rounded-2xl px-4 py-4">
                  <Lock size={20} color="#6B7280" />
                  <TextInput
                    ref={passwordRef}
                    className="flex-1 ml-3 text-black text-base"
                    placeholder="Password"
                    placeholderTextColor="#9CA3AF"
                    value={signupData.password}
                    onChangeText={(value) =>
                      handleInputChange("password", value)
                    }
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoComplete="password-new"
                    returnKeyType="next"
                    onSubmitEditing={() => focusNextField(confirmPasswordRef)}
                    blurOnSubmit={false}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff size={20} color="#6B7280" />
                    ) : (
                      <Eye size={20} color="#6B7280" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Confirm Password */}
              <View className="flex-1">
                <View className="flex-row items-center border border-gray-300 rounded-2xl px-4 py-4">
                  <Lock size={20} color="#6B7280" />
                  <TextInput
                    ref={confirmPasswordRef}
                    className="flex-1 ml-3 text-black text-base"
                    placeholder="Confirm"
                    placeholderTextColor="#9CA3AF"
                    value={signupData.confirmPassword}
                    onChangeText={(value) =>
                      handleInputChange("confirmPassword", value)
                    }
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    autoComplete="password-new"
                    returnKeyType="next"
                    onSubmitEditing={() => Keyboard.dismiss()}
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} color="#6B7280" />
                    ) : (
                      <Eye size={20} color="#6B7280" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Gender and Date of Birth Row */}
            <View className="flex-row mb-4" style={{ gap: 12 }}>
              {/* Gender Dropdown */}
              <View className="flex-1">
                <TouchableOpacity
                  className="flex-row items-center border border-gray-300 rounded-2xl px-4 py-4"
                  onPress={() => setShowGenderDropdown(!showGenderDropdown)}
                >
                  <User size={20} color="#6B7280" />
                  <Text className={`flex-1 ml-3 text-base ${signupData.gender ? 'text-black' : 'text-gray-400'}`}>
                    {signupData.gender || "Gender"}
                  </Text>
                  <ChevronDown size={20} color="#6B7280" />
                </TouchableOpacity>

                {showGenderDropdown && (
                  <View className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-2xl z-10 shadow-lg">
                    {["Male", "Female", "Other", "Prefer not to say"].map(
                      (gender) => (
                        <TouchableOpacity
                          key={gender}
                          className="px-4 py-3 border-b border-gray-200 last:border-b-0"
                          onPress={() => {
                            handleInputChange("gender", gender);
                            setShowGenderDropdown(false);
                          }}
                        >
                          <Text className="text-black text-base">{gender}</Text>
                        </TouchableOpacity>
                      )
                    )}
                  </View>
                )}
              </View>

              {/* Date of Birth */}
              <View className="flex-1">
                <TouchableOpacity
                  className="flex-row items-center border border-gray-300 rounded-2xl px-4 py-4"
                  onPress={() => setShowDatePicker(true)}
                >
                  <Calendar size={20} color="#6B7280" />
                  <Text className="flex-1 ml-3 text-black text-base">
                    {formatDate(signupData.dateOfBirth)}
                  </Text>
                </TouchableOpacity>

                {showDatePicker && (
                  <DateTimePicker
                    value={signupData.dateOfBirth}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                    maximumDate={new Date()}
                  />
                )}
              </View>
            </View>

            {/* Location Section - Region, Country, and Button in same line */}
            <View className="mb-6">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-gray-600 text-base font-medium">
                  Location
                </Text>
                <TouchableOpacity
                  onPress={handleClearLocation}
                  disabled={!signupData.region && !signupData.country}
                >
                  <Text className="text-red-500 font-medium text-sm">
                    {signupData.region || signupData.country ? "Clear" : ""}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Region, Country, and Button ALL IN SAME LINE */}
              <View className="flex-row items-center" style={{ gap: 12 }}>
                {/* Region */}
                <View className="flex-1">
                  <Text className="text-gray-600 text-sm mb-1">Region</Text>
                  <View className="flex-row items-center border border-gray-300 rounded-2xl px-4 py-4">
                    <MapPin size={16} color="#6B7280" />
                    <TextInput
                      className="flex-1 ml-2 text-black text-base"
                      placeholder="Region"
                      placeholderTextColor="#9CA3AF"
                      value={signupData.region}
                      onChangeText={(value) =>
                        handleInputChange("region", value)
                      }
                      returnKeyType="next"
                    />
                  </View>
                </View>

                {/* Country */}
                <View className="flex-1">
                  <Text className="text-gray-600 text-sm mb-1">Country</Text>
                  <View className="flex-row items-center border border-gray-300 rounded-2xl px-4 py-4">
                    <MapPin size={16} color="#6B7280" />
                    <TextInput
                      className="flex-1 ml-2 text-black text-base"
                      placeholder="Country"
                      placeholderTextColor="#9CA3AF"
                      value={signupData.country}
                      onChangeText={(value) =>
                        handleInputChange("country", value)
                      }
                      returnKeyType="done"
                      onSubmitEditing={() => Keyboard.dismiss()}
                    />
                  </View>
                </View>

                {/* Get Location Button */}
                <View>
                  <Text className="text-gray-600 text-sm mb-1 opacity-0">
                    Button
                  </Text>
                  <TouchableOpacity
                    className="flex-row items-center justify-center border-2 border-black rounded-xl px-3 py-3"
                    onPress={handleGetLocation}
                    disabled={isGettingLocation}
                    style={{ minWidth: 80 }}
                  >
                    <MapPin size={16} color="#000" />
                    <Text className="ml-1 text-black font-semibold text-sm">
                      {isGettingLocation ? "..." : "Get"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Location Status Display */}
              {signupData.latitude !== null && signupData.longitude !== null ? (
                <View className="mt-3 p-3 bg-green-50 border border-green-200 rounded-xl">
                  <Text className="text-green-800 text-sm text-center">
                    ✓ Location coordinates saved
                  </Text>
                </View>
              ) : (
                <View className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-xl">
                  <Text className="text-gray-600 text-sm text-center">
                    Tap "Get" to automatically detect your location
                  </Text>
                </View>
              )}
            </View>

            {/* Signup Button */}
            <TouchableOpacity
              className={`py-4 rounded-2xl items-center shadow-lg mb-6 ${
                isLoading ? "bg-gray-400" : "bg-black"
              }`}
              onPress={handleSignup}
              disabled={isLoading}
            >
              <Text className="text-white font-semibold text-lg">
                {isLoading ? "Creating Account..." : "Create Account"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Social Signup Divider */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-0.5 bg-gray-300" />
            <Text className="mx-4 text-gray-500 font-medium">
              Or sign up with
            </Text>
            <View className="flex-1 h-0.5 bg-gray-300" />
          </View>

          {/* Social Signup Buttons */}
          <View className="flex-row justify-center space-x-3 mb-8">
            {/* Google Signup */}
            <TouchableOpacity
              className="w-10 h-10 border border-gray-300 rounded-xl items-center justify-center"
              onPress={() => handleSocialSignup("Google")}
            >
              <Icon name="google" size={18} color="#DB4437" />
            </TouchableOpacity>
          </View>

          {/* Login Link */}
          <View className="flex-row justify-center mb-6">
            <Text className="text-gray-600">Already have an account? </Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text className="text-black font-semibold">Log In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signup;