import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Eye, EyeOff, Mail, Lock } from "lucide-react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useMutation } from "@apollo/client/react";
import * as SecureStore from "expo-secure-store";
import { LOGIN } from "../../graphql/auth/mutations/auth";
import { client } from "@/apollo/client";
import { GET_CURRENT_CLIENT } from "../../graphql/auth/queries/auth";
import { AuthContext } from "@/context/AuthContext";

// Interface for login data
interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  login: {
    accessToken: string;
    refreshToken: string;
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

const { width } = Dimensions.get("window");

const Login = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const [login, { loading }] = useMutation<LoginResponse>(LOGIN);

  // Calculate logo size to match loading screen (80% of screen width)
  const logoSize = width * 0.5;

  // Handle input changes
  const handleInputChange = (field: keyof LoginData, value: string) => {
    setLoginData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle login submission
  const { login: authLogin } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      Alert.alert("Please fill all fields");
      return;
    }

    try {
      const response = await login({
        variables: {
          email: loginData.email,
          password: loginData.password,
        },
      });

      const tokens = response.data?.login;

      if (!tokens) {
        Alert.alert("Login failed");
        return;
      }

      await SecureStore.setItemAsync("accessToken", tokens.accessToken);
      await SecureStore.setItemAsync("refreshToken", tokens.refreshToken);
      // 3️⃣ Fetch current client using the access token
      const { data } = await client.query<CurrentClientResponse>({
        query: GET_CURRENT_CLIENT,
        fetchPolicy: "network-only",
      });
      console.log("value of data", data);
      if (data?.me) {
        await SecureStore.setItemAsync("currentUser", JSON.stringify(data.me));
      }

      Alert.alert("Success!", "You are logged in");
      // 2️⃣ Save everything in context
      if (!data || !data.me) {
        Alert.alert("Error", "Failed to load user profile");
        return;
      }
      await authLogin(tokens.accessToken, tokens.refreshToken, data.me);
      router.replace("/(tabs)/Home");
    } catch (error: any) {
      console.log(error);
      Alert.alert("Error", error.message);
    }
  };

  // Handle social login
  const handleSocialLogin = (provider: string) => {};

  // Handle forgot password
  const handleForgotPassword = () => {};

  // Handle sign up navigation
  const handleSignUp = () => {
    router.navigate("/(auth)/Signup");
    console.log("gooo");
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ 
            flexGrow: 1,
            paddingHorizontal: 16,
            justifyContent: 'center'
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo - Same size as loading screen */}
          <View className="items-center mb-2">
            <Image
              source={require("../../assets/images/logopng.png")}
              style={{
                width: logoSize,
                height: logoSize,
              }}
              resizeMode="contain"
            />
          </View>

          {/* Header - Reduced margin */}
          <View className="items-center mb-8">
            <Text className="text-4xl font-black text-black mb-2">
              Welcome Back
            </Text>
            <Text className="text-lg text-gray-600 text-center">
              Sign in to continue your beauty journey
            </Text>
          </View>

          {/* Login Form */}
          <View className="mb-6">
            {/* Email Input */}
            <View className="flex-row items-center border border-gray-300 rounded-2xl px-4 py-4 mb-4">
              <Mail size={20} color="#6B7280" />
              <TextInput
                className="flex-1 ml-3 text-black text-lg"
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                value={loginData.email}
                onChangeText={(value) => handleInputChange("email", value)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                returnKeyType="next"
              />
            </View>

            {/* Password Input */}
            <View className="flex-row items-center border border-gray-300 rounded-2xl px-4 py-4 mb-4">
              <Lock size={20} color="#6B7280" />
              <TextInput
                className="flex-1 ml-3 text-black text-lg"
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                value={loginData.password}
                onChangeText={(value) => handleInputChange("password", value)}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoComplete="password"
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff size={20} color="#6B7280" />
                ) : (
                  <Eye size={20} color="#6B7280" />
                )}
              </TouchableOpacity>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity
              className="items-end mb-6"
              onPress={handleForgotPassword}
            >
              <Text className="text-black font-semibold">Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              className={`py-4 rounded-2xl items-center shadow-lg mb-6 ${
                loading ? "bg-gray-400" : "bg-black"
              }`}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text className="text-white font-semibold text-lg">
                {loading ? "Signing In..." : "Sign In"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Social Login Divider */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-0.5 bg-gray-300" />
            <Text className="mx-4 text-gray-500 font-medium">
              Or continue with
            </Text>
            <View className="flex-1 h-0.5 bg-gray-300" />
          </View>

          {/* Social Login Buttons */}
          <View className="flex-row justify-center space-x-3 mb-8">
            {/* Google Login */}
            <TouchableOpacity
              className="w-10 h-10 border border-gray-300 rounded-xl items-center justify-center"
              onPress={() => handleSocialLogin("Google")}
            >
              <Icon name="google" size={18} color="#DB4437" />
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <View className="flex-row justify-center mb-6">
            <Text className="text-gray-600">Don't have an account? </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text className="text-black font-semibold">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;