import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Eye, EyeOff, Mail, Lock, User, Phone, Check, X } from 'lucide-react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

// Interface for signup data
interface SignupData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

// Interface for password requirements
interface PasswordRequirements {
  hasUpperCase: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
  hasMinLength: boolean;
}

const { width } = Dimensions.get('window');

const Signup = () => {
  const router = useRouter();
  const [signupData, setSignupData] = useState<SignupData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState<PasswordRequirements>({
    hasUpperCase: false,
    hasNumber: false,
    hasSymbol: false,
    hasMinLength: false
  });

  // Calculate logo size to match login screen (80% of screen width)
  const logoSize = width * 0.5;

  // Check password requirements
  const checkPasswordRequirements = (password: string) => {
    setPasswordRequirements({
      hasUpperCase: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSymbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      hasMinLength: password.length >= 6
    });
  };

  // Handle input changes
  const handleInputChange = (field: keyof SignupData, value: string) => {
    setSignupData(prev => ({
      ...prev,
      [field]: value
    }));

    // Check password requirements when password field changes
    if (field === 'password') {
      checkPasswordRequirements(value);
    }
  };

  // Handle signup submission
  const handleSignup = async () => {
    // Validation
    if (!signupData.fullName || !signupData.email || !signupData.phone || !signupData.password || !signupData.confirmPassword) {
      console.log('❌ Please fill in all fields');
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      console.log('❌ Passwords do not match');
      return;
    }

    // Check if all password requirements are met
    const allRequirementsMet = Object.values(passwordRequirements).every(requirement => requirement);
    if (!allRequirementsMet) {
      console.log('❌ Password does not meet all requirements');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      console.log('📤 Signup data being sent to server:', {
        fullName: signupData.fullName,
        email: signupData.email,
        phone: signupData.phone,
        password: signupData.password,
        timestamp: new Date().toISOString()
      });
      
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful signup response
      const mockResponse = {
        success: true,
        user: {
          id: '67890',
          fullName: signupData.fullName,
          email: signupData.email,
          phone: signupData.phone,
          token: 'mock-jwt-token-signup'
        },
        message: 'Account created successfully!'
      };
      
      console.log('✅ Signup successful! Server response:', mockResponse);
      console.log('📝 User registered:', mockResponse.user);
      console.log('🔐 Auth token:', mockResponse.user.token);
      
      // Clear form after successful "signup"
      setSignupData({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
      });
      
      // Reset password requirements
      setPasswordRequirements({
        hasUpperCase: false,
        hasNumber: false,
        hasSymbol: false,
        hasMinLength: false
      });
      
      console.log('🔄 Form cleared. User can now login.');
      
    } catch (error) {
      console.log('❌ Signup error:', error);
      console.log('🚫 Would show error message to user here');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle social signup
  const handleSocialSignup = (provider: string) => {
    console.log(`🔗 ${provider} signup clicked`);
    console.log(`📤 Would redirect to ${provider} OAuth flow`);
    console.log(`🔄 Would handle ${provider} authentication callback`);
  };

  // Handle login navigation
  const handleLogin = () => {
    console.log('🔐 Navigating to Login page');
    router.push('/(auth)/Login');
  };

  // Requirement item component
  const RequirementItem = ({ met, text }: { met: boolean; text: string }) => (
    <View className="flex-row items-center mb-1">
      {met ? (
        <Check size={14} color="#10B981" />
      ) : (
        <X size={14} color="#EF4444" />
      )}
      <Text className={`ml-2 text-xs ${met ? 'text-green-600' : 'text-red-600'}`}>
        {text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 px-4 justify-center">
          
          {/* Logo - Same size as login screen */}
          <View className="items-center mb-4">
            <Image 
              source={require('../../assets/images/logopng.png')}
              style={{ 
                width: logoSize, 
                height: logoSize 
              }}
              resizeMode="contain"
            />
          </View>

          {/* Header */}
          <View className="items-center mb-8">
            <Text className="text-4xl font-black text-black mb-2">Create Account</Text>
            <Text className="text-lg text-gray-600 text-center">
              Join us and discover amazing beauty services
            </Text>
          </View>

          {/* Signup Form */}
          <View className="mb-6">
            {/* Full Name Input */}
            <View className="flex-row items-center border border-gray-300 rounded-2xl px-4 py-4 mb-4">
              <User size={20} color="#6B7280" />
              <TextInput
                className="flex-1 ml-3 text-black text-lg"
                placeholder="Full Name"
                placeholderTextColor="#9CA3AF"
                value={signupData.fullName}
                onChangeText={(value) => handleInputChange('fullName', value)}
                autoCapitalize="words"
                autoComplete="name"
                textContentType="name"
              />
            </View>

            {/* Email Input */}
            <View className="flex-row items-center border border-gray-300 rounded-2xl px-4 py-4 mb-4">
              <Mail size={20} color="#6B7280" />
              <TextInput
                className="flex-1 ml-3 text-black text-lg"
                placeholder="Email Address"
                placeholderTextColor="#9CA3AF"
                value={signupData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                textContentType="emailAddress"
              />
            </View>

            {/* Phone Input */}
            <View className="flex-row items-center border border-gray-300 rounded-2xl px-4 py-4 mb-4">
              <Phone size={20} color="#6B7280" />
              <TextInput
                className="flex-1 ml-3 text-black text-lg"
                placeholder="Phone Number"
                placeholderTextColor="#9CA3AF"
                value={signupData.phone}
                onChangeText={(value) => handleInputChange('phone', value)}
                keyboardType="phone-pad"
                autoComplete="tel"
                textContentType="telephoneNumber"
              />
            </View>

            {/* Password Input - FIXED FOR iOS AUTOFILL */}
            <View className="flex-row items-center border border-gray-300 rounded-2xl px-4 py-4 mb-3">
              <Lock size={20} color="#6B7280" />
              <TextInput
                className="flex-1 ml-3 text-black text-lg"
                placeholder="Password"
                placeholderTextColor="#9CA3AF"
                value={signupData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoComplete="password"
                textContentType="newPassword"
                passwordRules={Platform.OS === 'ios' ? "minlength: 6; required: lower; required: upper; required: digit; required: [-];" : undefined}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff size={20} color="#6B7280" />
                ) : (
                  <Eye size={20} color="#6B7280" />
                )}
              </TouchableOpacity>
            </View>

            {/* Password Requirements - Only show after user starts typing */}
            {signupData.password.length > 0 && (
              <View className="mb-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
                <Text className="text-gray-600 text-sm font-medium mb-2">Password must contain:</Text>
                <RequirementItem 
                  met={passwordRequirements.hasUpperCase} 
                  text="At least one uppercase letter (A-Z)" 
                />
                <RequirementItem 
                  met={passwordRequirements.hasNumber} 
                  text="At least one number (0-9)" 
                />
                <RequirementItem 
                  met={passwordRequirements.hasSymbol} 
                  text="At least one symbol (!@#$% etc.)" 
                />
                <RequirementItem 
                  met={passwordRequirements.hasMinLength} 
                  text="At least 6 characters" 
                />
              </View>
            )}

            {/* Confirm Password Input - FIXED FOR iOS AUTOFILL */}
            <View className="flex-row items-center border border-gray-300 rounded-2xl px-4 py-4 mb-6">
              <Lock size={20} color="#6B7280" />
              <TextInput
                className="flex-1 ml-3 text-black text-lg"
                placeholder="Confirm Password"
                placeholderTextColor="#9CA3AF"
                value={signupData.confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                autoComplete="password"
                textContentType="newPassword"
                passwordRules={Platform.OS === 'ios' ? "minlength: 6; required: lower; required: upper; required: digit; required: [-];" : undefined}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? (
                  <EyeOff size={20} color="#6B7280" />
                ) : (
                  <Eye size={20} color="#6B7280" />
                )}
              </TouchableOpacity>
            </View>

            {/* Password Match Indicator */}
            {signupData.password.length > 0 && signupData.confirmPassword.length > 0 && (
              <View className="mb-4 flex-row items-center justify-center">
                {signupData.password === signupData.confirmPassword ? (
                  <View className="flex-row items-center">
                    <Check size={16} color="#10B981" />
                    <Text className="ml-2 text-green-600 text-sm">Passwords match</Text>
                  </View>
                ) : (
                  <View className="flex-row items-center">
                    <X size={16} color="#EF4444" />
                    <Text className="ml-2 text-red-600 text-sm">Passwords do not match</Text>
                  </View>
                )}
              </View>
            )}

            {/* Sign Up Button */}
            <TouchableOpacity 
              className={`py-4 rounded-2xl items-center shadow-lg mb-6 ${
                isLoading ? 'bg-gray-400' : 'bg-black'
              }`}
              onPress={handleSignup}
              disabled={isLoading}
            >
              <Text className="text-white font-semibold text-lg">
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Text>
            </TouchableOpacity>

            {/* Current Form Data Display */}
            <View className="bg-gray-50 p-4 rounded-2xl mb-4 border border-gray-200">
              <Text className="text-gray-600 text-sm font-medium mb-2">Current Form Data:</Text>
              <Text className="text-black text-xs">Name: {signupData.fullName || 'Not entered'}</Text>
              <Text className="text-black text-xs">Email: {signupData.email || 'Not entered'}</Text>
              <Text className="text-black text-xs">Phone: {signupData.phone || 'Not entered'}</Text>
              <Text className="text-black text-xs">Password: {signupData.password ? '••••••••' : 'Not entered'}</Text>
              <Text className="text-black text-xs">Confirm: {signupData.confirmPassword ? '••••••••' : 'Not entered'}</Text>
            </View>
          </View>

          {/* Social Signup Divider */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-0.5 bg-gray-300" />
            <Text className="mx-4 text-gray-500 font-medium">Or sign up with</Text>
            <View className="flex-1 h-0.5 bg-gray-300" />
          </View>

          {/* Social Signup Buttons */}
          <View className="flex-row justify-center space-x-3 mb-8">
            {/* Google Signup */}
            <TouchableOpacity 
              className="w-10 h-10 border border-gray-300 rounded-xl items-center justify-center"
              onPress={() => handleSocialSignup('Google')}
            >
              <Icon name="google" size={18} color="#DB4437" />
            </TouchableOpacity>

            {/* Facebook Signup */}
            <TouchableOpacity 
              className="w-10 h-10 border border-gray-300 rounded-xl items-center justify-center"
              onPress={() => handleSocialSignup('Facebook')}
            >
              <Icon name="facebook" size={18} color="#1877F2" />
            </TouchableOpacity>
          </View>

          {/* Login Link */}
          <View className="flex-row justify-center">
            <Text className="text-gray-600">Already have an account? </Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text className="text-black font-semibold">Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;