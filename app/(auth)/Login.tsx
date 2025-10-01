import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

// Interface for login data
interface LoginData {
  email: string;
  password: string;
}

const { width } = Dimensions.get('window');

const Login = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Calculate logo size to match loading screen (80% of screen width)
  const logoSize = width * 0.5;

  // Handle input changes
  const handleInputChange = (field: keyof LoginData, value: string) => {
    setLoginData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle login submission
  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      console.log('❌ Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      console.log('📤 Login data being sent to server:', {
        email: loginData.email,
        password: loginData.password,
        timestamp: new Date().toISOString()
      });
      
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful login response
      const mockResponse = {
        success: true,
        user: {
          id: '12345',
          email: loginData.email,
          name: 'John Doe',
          token: 'mock-jwt-token-here'
        },
        message: 'Login successful!'
      };
      
      console.log('✅ Login successful! Server response:', mockResponse);
      console.log('📝 User data:', mockResponse.user);
      console.log('🔐 Auth token:', mockResponse.user.token);
      
      // Clear form after successful "login"
      setLoginData({
        email: '',
        password: ''
      });
      
      console.log('🔄 Form cleared. Ready for next login attempt.');
      
    } catch (error) {
      console.log('❌ Login error:', error);
      // Simulate error response
      console.log('🚫 Would show error message to user here');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle social login
  const handleSocialLogin = (provider: string) => {
    console.log(`🔗 ${provider} login clicked`);
    console.log(`📤 Would redirect to ${provider} OAuth flow`);
    console.log(`🔄 Would handle ${provider} authentication callback`);
  };

  // Handle forgot password
  const handleForgotPassword = () => {
    console.log('🔑 Forgot password flow initiated');
    console.log('📧 Would send password reset email to:', loginData.email || 'user@example.com');
    console.log('🔄 Would navigate to password reset screen');
  };

  // Handle sign up navigation
  const handleSignUp = () => {
    console.log('📝 Navigating to Sign Up page');
    router.push('/(auth)/Signup');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 px-4 justify-center">
          
          {/* Logo - Same size as loading screen */}
          <View className="items-center mb-2">
            <Image 
              source={require('../../assets/images/logopng.png')}
              style={{ 
                width: logoSize, 
                height: logoSize 
              }}
              resizeMode="contain"
            />
          </View>

          {/* Header - Reduced margin */}
          <View className="items-center mb-8">
            <Text className="text-4xl font-black text-black mb-2">Welcome Back</Text>
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
                onChangeText={(value) => handleInputChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
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
                onChangeText={(value) => handleInputChange('password', value)}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoComplete="password"
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
                isLoading ? 'bg-gray-400' : 'bg-black'
              }`}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text className="text-white font-semibold text-lg">
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Text>
            </TouchableOpacity>

            {/* Current Form Data Display */}
            <View className="bg-gray-50 p-4 rounded-2xl mb-4 border border-gray-200">
              <Text className="text-gray-600 text-sm font-medium mb-2">Current Form Data:</Text>
              <Text className="text-black text-xs">Email: {loginData.email || 'Not entered'}</Text>
              <Text className="text-black text-xs">Password: {loginData.password ? '••••••••' : 'Not entered'}</Text>
            </View>
          </View>

          {/* Social Login Divider */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-0.5 bg-gray-300" />
            <Text className="mx-4 text-gray-500 font-medium">Or continue with</Text>
            <View className="flex-1 h-0.5 bg-gray-300" />
          </View>

          {/* Social Login Buttons */}
          <View className="flex-row justify-center space-x-3 mb-8">
            {/* Google Login */}
            <TouchableOpacity 
              className="w-10 h-10 border border-gray-300 rounded-xl items-center justify-center"
              onPress={() => handleSocialLogin('Google')}
            >
              <Icon name="google" size={18} color="#DB4437" />
            </TouchableOpacity>

            {/* Facebook Login */}
            <TouchableOpacity 
              className="w-10 h-10 border border-gray-300 rounded-xl items-center justify-center"
              onPress={() => handleSocialLogin('Facebook')}
            >
              <Icon name="facebook" size={18} color="#1877F2" />
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <View className="flex-row justify-center">
            <Text className="text-gray-600">Don't have an account? </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text className="text-black font-semibold">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;