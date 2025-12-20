import { AuthContext } from "@/context/AuthContext";
import {
  RESEND_VerifyEmail,
  VERIFY_EMAIL,
  VerifyUdatedEmail,
} from "@/graphql/auth/mutations/auth";
import { useMutation } from "@apollo/client/react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Clock, Mail, Phone } from "lucide-react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView } from "react-native-safe-area-context";
import { GET_CURRENT_CLIENT } from "../../graphql/auth/queries/auth";
import { client } from "@/apollo/client";
// Interface for verify email response - FIXED
interface VerficationEmailOfclientResponse {
  verifyUpdatedEmail: {
    success: string;
    message: string;
  };
}
interface VerifyEmailResponse {
  verifyEmail: {
    accessToken: string;
    refreshToken: string;
  };
}
interface ResendEmailResponse {
  resendVerifyEmail: {
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
  };
}
const { width } = Dimensions.get("window");

const Verification = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const email = (params.email as string) || "";
  const operation = (params.operation as string) || "signup";

  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef<Array<TextInput | null>>([]);

  // Calculate logo size
  const logoSize = width * 0.4;

  // Countdown timer for resend code
  useEffect(() => {
    let interval: number; // Changed from NodeJS.Timeout to number for React Native

    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000) as unknown as number; // Cast the return value to number
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer, canResend]);

  // Handle code input
  const handleCodeChange = (text: string, index: number) => {
    if (text.length > 1) {
      text = text[text.length - 1];
    }

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (index === 5 && text) {
      const fullCode = newCode.join("");
      if (fullCode.length === 6) {
        verifyCode(fullCode);
      }
    }
  };

  // Handle backspace
  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  // FIXED: Use VerifyEmailResponse interface instead of RegisterResponse
  const [resendVerifyEmail] =
    useMutation<VerifyEmailResponse>(RESEND_VerifyEmail);
  const [verifyEmail, { loading }] =
    useMutation<VerifyEmailResponse>(VERIFY_EMAIL);
  // now verify For the email update
  const [verifyUpdatedEmail] =
    useMutation<VerficationEmailOfclientResponse>(VerifyUdatedEmail);
  // Verify the code
  const { login: authLogin } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
  const verifyCode = async (verificationCode: string) => {
    if (verificationCode.length !== 6) {
      Alert.alert("Error", "Please enter the 6-digit verification code");
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implement actual verification API call
      console.log("Verifying code:", verificationCode);
      console.log("Email:", email);

      // Simulate API call
      // FIXED: Pass variables correctly - NOT wrapped in "input" object
      if (operation === "signup") {
        const res = await verifyEmail({
          variables: {
            email: email,
            code: verificationCode, // Use the string verificationCode, not the array
          },
        });
        // FIXED: Access verifyEmail, not register
        const tokens = res.data?.verifyEmail;
        if (!tokens) {
          Alert.alert("Error", "No Tokens returned from server");
          return;
        }
        // Save Tokens securely
        await SecureStore.setItemAsync("accessToken", tokens.accessToken);
        await SecureStore.setItemAsync("refreshToken", tokens.refreshToken);
        const { data } = await client.query<CurrentClientResponse>({
          query: GET_CURRENT_CLIENT,
          fetchPolicy: "network-only",
        });
        console.log("value of data", data);
        if (data?.me) {
          await SecureStore.setItemAsync(
            "currentUser",
            JSON.stringify(data.me)
          );
        }
        Alert.alert("Success", "Account created successfully!");
        if (!data || !data.me) {
          Alert.alert("Error", "Failed to load user profile");
          return;
        }

        // For demo purposes, accept any code starting with '1
        await authLogin(tokens.accessToken, tokens.refreshToken, data.me);
        router.push("/(tabs)/Home");
      } else if (operation === "update-email") {
        const res = await verifyUpdatedEmail({
          variables: {
            email: email,
            code: verificationCode, // Use the string verificationCode , not the array
          },
        });
        await logout();
        router.dismissAll();
        router.replace("/(auth)/Login");
        console.log(res);
      }
    } catch (error: any) {
      console.log("Verification error:", error);
      Alert.alert("Error", "Verification failed. Please try again.");
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  // Resend verification code
  const handleResendCode = async () => {
    if (!canResend) return;

    setIsLoading(true);

    try {
      // TODO: Implement actual resend code API call
      console.log("Resending verification code to:", email);

      const res = await resendVerifyEmail({ variables: { email: email } });

      Alert.alert(
        "Code Sent",
        "A new verification code has been sent to your email"
      );

      // Reset timer
      setTimer(60);
      setCanResend(false);
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (error) {
      Alert.alert("Error", "Failed to resend code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle back navigation
  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 px-6 py-8">
          {/* Back Button */}
          <TouchableOpacity className="mb-6" onPress={handleBack}>
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>

          {/* Logo */}
          <View className="items-center mb-8">
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
          <View className="items-center mb-10">
            <Text className="text-3xl font-black text-black mb-3">
              Verify Your {operation === "signup" ? "Account" : "Email"}
            </Text>
            <Text className="text-lg text-gray-600 text-center mb-6">
              Enter the 6-digit code sent to your email or phone
            </Text>

            {/* Email/Phone Display */}
            <View className="bg-blue-50 p-4 rounded-2xl w-full">
              <View className="flex-row items-center mb-3">
                <Mail size={20} color="#3B82F6" />
                <Text className="ml-3 text-blue-800 font-medium">Email:</Text>
                <Text className="ml-2 text-black font-semibold">
                  {email || "Not provided"}
                </Text>
              </View>
            </View>
          </View>

          {/* Verification Code Input */}
          <View className="mb-10">
            <Text className="text-gray-600 text-lg font-medium mb-6 text-center">
              Enter Verification Code
            </Text>

            <View className="flex-row justify-between mb-8">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <View
                  key={index}
                  className={`w-14 h-14 rounded-xl border-2 items-center justify-center ${
                    code[index]
                      ? "border-black bg-black"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  <TextInput
                    ref={(ref) => {
                      inputRefs.current[index] = ref;
                    }}
                    className="text-2xl font-bold text-center text-white w-full h-full"
                    value={code[index]}
                    onChangeText={(text) => handleCodeChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    keyboardType="number-pad"
                    maxLength={1}
                    selectTextOnFocus
                    editable={!isLoading}
                  />
                </View>
              ))}
            </View>

            {/* Verify Button */}
            <TouchableOpacity
              className={`py-4 rounded-2xl items-center shadow-lg mb-6 ${
                isLoading || code.join("").length !== 6
                  ? "bg-gray-400"
                  : "bg-black"
              }`}
              onPress={() => verifyCode(code.join(""))}
              disabled={isLoading || code.join("").length !== 6}
            >
              <Text className="text-white font-semibold text-lg">
                {isLoading
                  ? "Verifying..."
                  : operation === "signup"
                  ? "Verify Account"
                  : "Verify Email"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Resend Code Section */}
          <View className="items-center">
            <Text className="text-gray-600 text-center mb-4">
              Didn't receive the code?
            </Text>

            <TouchableOpacity
              className={`py-3 px-6 rounded-xl items-center ${
                canResend ? "bg-black" : "bg-gray-300"
              }`}
              onPress={handleResendCode}
              disabled={!canResend || isLoading}
            >
              <View className="flex-row items-center">
                <Clock size={18} color={canResend ? "#FFFFFF" : "#9CA3AF"} />
                <Text
                  className={`ml-2 font-semibold ${
                    canResend ? "text-white" : "text-gray-500"
                  }`}
                >
                  {canResend ? "Resend Code" : `Resend in ${timer}s`}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Verification;
