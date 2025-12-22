import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  ChevronLeft,
  Shield,
  Lock,
  Eye,
  EyeOff,
  Trash2,
  BellOff,
  Smartphone,
  ChevronDown,
  ChevronUp,
} from "lucide-react-native";
import { useMutation } from "@apollo/client/react";
import {
  UpdateClientData,
  UpdateClientEmail,
} from "@/graphql/auth/mutations/auth";
import { AuthContext } from "@/context/AuthContext";

interface VerficationEmailOfclientResponse {
  verifyUpdatedEmail: {
    success: string;
    message: string;
  };
}

interface CurrentUpadatePassword {
  firstName: string;
  email: string;
}

const PrivacySecurityScreen = () => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  const [privacySettings, setPrivacySettings] = useState({
    readReceipts: true,
    marketingEmails: false,
  });

  const [securitySettings, setSecuritySettings] = useState({
    biometricLogin: true,
  });

  // Toggle states for expandable sections
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showChangeEmail, setShowChangeEmail] = useState(false);

  // Password change states
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    new: false,
    confirm: false,
  });

  // Email change states
  const [emailData, setEmailData] = useState({
    currentEmail: currentUser?.email ?? "",
    newEmail: "",
    confirmEmail: "",
  });

  const handleSave = () => {
    Alert.alert("Success", "Your privacy settings have been updated!");
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => console.log("Account deletion initiated"),
        },
      ]
    );
  };

  const [updateClient] = useMutation<CurrentUpadatePassword>(UpdateClientData);
  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      Alert.alert("Error", "New passwords do not match.");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long.");
      return;
    }

    const res = await updateClient({
      variables: { input: { password: passwordData.newPassword } },
    });
    Alert.alert("Success", "Password changed successfully");
    setShowChangePassword(false);
    setPasswordData({
      newPassword: "",
      confirmPassword: "",
    });
  };

  const [updateClientEmail] =
    useMutation<VerficationEmailOfclientResponse>(UpdateClientEmail);
  const handleChangeEmail = async () => {
    if (emailData.newEmail !== emailData.confirmEmail) {
      Alert.alert("Error", "Email addresses do not match.");
      return;
    }

    if (!emailData.newEmail.includes("@")) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    const res = await updateClientEmail({
      variables: {
        ClientId: currentUser?._id,
        email: emailData.newEmail,
      },
    });
    
    router.push({
      pathname: "/(auth)/Verification",
      params: { email: emailData.newEmail, operation: "update-email" },
    });
    setShowChangeEmail(false);
    setEmailData((prev) => ({
      ...prev,
      newEmail: "",
      confirmEmail: "",
    }));
  };

  const SettingItem = ({
    icon: Icon,
    title,
    subtitle,
    onPress,
    isSwitch = false,
    switchValue,
    onSwitchChange,
    showExpand = false,
    isExpanded = false,
  }: {
    icon: React.ComponentType<{ size: number; color: string }>;
    title: string;
    subtitle: string;
    onPress?: () => void;
    isSwitch?: boolean;
    switchValue?: boolean;
    onSwitchChange?: (value: boolean) => void;
    showExpand?: boolean;
    isExpanded?: boolean;
  }) => (
    <TouchableOpacity
      className="flex-row items-center justify-between py-4 active:bg-gray-50 px-4"
      onPress={onPress}
      activeOpacity={0.7}
      disabled={isSwitch}
    >
      <View className="flex-row items-center flex-1">
        <View className="w-11 h-11 bg-gray-100 rounded-xl items-center justify-center mr-4">
          <Icon size={20} color="#000" />
        </View>
        <View className="flex-1">
          <Text className="text-black font-semibold text-base">{title}</Text>
          <Text className="text-gray-500 text-sm mt-0.5">{subtitle}</Text>
        </View>
      </View>

      {isSwitch ? (
        <Switch
          value={!!switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: "#e5e5e5", true: "#000" }}
          thumbColor={switchValue ? "#fff" : "#f4f4f5"}
        />
      ) : showExpand ? (
        isExpanded ? (
          <ChevronUp size={20} color="#000" />
        ) : (
          <ChevronDown size={20} color="#000" />
        )
      ) : (
        <ChevronLeft size={20} color="#9CA3AF" className="rotate-180" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Header */}
        <View className="px-6 pt-8 pb-6">
          <View className="flex-row items-center justify-between mb-6">
            <TouchableOpacity 
              className="w-10 h-10 items-center justify-center bg-gray-100 rounded-xl"
              onPress={() => router.back()}
              activeOpacity={0.7}
            >
              <ChevronLeft size={22} color="#000" />
            </TouchableOpacity>
            <View>
              <Text className="text-3xl font-bold text-black">Privacy & Security</Text>
            </View>
            <View className="w-10" /> {/* Spacer for alignment */}
          </View>
        </View>

        {/* Account Security Section */}
        <View className="px-6 mb-6">
          <Text className="text-lg font-bold text-black mb-4 px-2">
            Account Security
          </Text>
          <View className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            {/* Change Password Button with Expandable Section */}
            <>
              <SettingItem
                icon={Lock}
                title="Change Password"
                subtitle="Update your password regularly"
                onPress={() => setShowChangePassword(!showChangePassword)}
                showExpand={true}
                isExpanded={showChangePassword}
              />
              {showChangePassword && (
                <View className="px-4 pb-4 border-t border-gray-100">
                  <View className="pt-4">
                    <View className="mb-4">
                      <Text className="text-gray-600 text-sm font-medium mb-2">New Password</Text>
                      <View className="relative">
                        <TextInput
                          className="bg-white border border-gray-300 rounded-2xl px-4 py-4 text-base text-black"
                          value={passwordData.newPassword}
                          onChangeText={(text) =>
                            setPasswordData((prev) => ({ ...prev, newPassword: text }))
                          }
                          placeholder="Enter new password"
                          placeholderTextColor="#9CA3AF"
                          secureTextEntry={!showPasswords.new}
                          autoCapitalize="none"
                        />
                        <TouchableOpacity
                          className="absolute right-4 top-4"
                          onPress={() =>
                            setShowPasswords((prev) => ({ ...prev, new: !prev.new }))
                          }
                        >
                          {showPasswords.new ? (
                            <Eye size={20} color="#666" />
                          ) : (
                            <EyeOff size={20} color="#666" />
                          )}
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View className="mb-4">
                      <Text className="text-gray-600 text-sm font-medium mb-2">Confirm New Password</Text>
                      <View className="relative">
                        <TextInput
                          className="bg-white border border-gray-300 rounded-2xl px-4 py-4 text-base text-black"
                          value={passwordData.confirmPassword}
                          onChangeText={(text) =>
                            setPasswordData((prev) => ({
                              ...prev,
                              confirmPassword: text,
                            }))
                          }
                          placeholder="Confirm new password"
                          placeholderTextColor="#9CA3AF"
                          secureTextEntry={!showPasswords.confirm}
                          autoCapitalize="none"
                        />
                        <TouchableOpacity
                          className="absolute right-4 top-4"
                          onPress={() =>
                            setShowPasswords((prev) => ({
                              ...prev,
                              confirm: !prev.confirm,
                            }))
                          }
                        >
                          {showPasswords.confirm ? (
                            <Eye size={20} color="#666" />
                          ) : (
                            <EyeOff size={20} color="#666" />
                          )}
                        </TouchableOpacity>
                      </View>
                    </View>

                    <TouchableOpacity
                      className="bg-black rounded-2xl py-4 items-center"
                      onPress={handleChangePassword}
                    >
                      <Text className="text-white font-medium text-base">
                        Update Password
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </>

            <View className="h-px bg-gray-100 ml-20" />

            {/* Change Email Button with Expandable Section */}
            <>
              <SettingItem
                icon={Shield}
                title="Change Email"
                subtitle="Update your email address"
                onPress={() => setShowChangeEmail(!showChangeEmail)}
                showExpand={true}
                isExpanded={showChangeEmail}
              />
              {showChangeEmail && (
                <View className="px-4 pb-4 border-t border-gray-100">
                  <View className="pt-4">
                    <View className="mb-4">
                      <Text className="text-gray-600 text-sm font-medium mb-2">Current Email</Text>
                      <TextInput
                        className="bg-gray-100 border border-gray-300 rounded-2xl px-4 py-4 text-base text-gray-500"
                        value={emailData.currentEmail}
                        editable={false}
                      />
                    </View>

                    <View className="mb-4">
                      <Text className="text-gray-600 text-sm font-medium mb-2">New Email</Text>
                      <TextInput
                        className="bg-white border border-gray-300 rounded-2xl px-4 py-4 text-base text-black"
                        value={emailData.newEmail}
                        onChangeText={(text) =>
                          setEmailData((prev) => ({ ...prev, newEmail: text }))
                        }
                        placeholder="Enter new email address"
                        placeholderTextColor="#9CA3AF"
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                    </View>

                    <View className="mb-4">
                      <Text className="text-gray-600 text-sm font-medium mb-2">Confirm New Email</Text>
                      <TextInput
                        className="bg-white border border-gray-300 rounded-2xl px-4 py-4 text-base text-black"
                        value={emailData.confirmEmail}
                        onChangeText={(text) =>
                          setEmailData((prev) => ({ ...prev, confirmEmail: text }))
                        }
                        placeholder="Confirm new email address"
                        placeholderTextColor="#9CA3AF"
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                    </View>

                    <TouchableOpacity
                      className="bg-black rounded-2xl py-4 items-center"
                      onPress={handleChangeEmail}
                    >
                      <Text className="text-white font-medium text-base">
                        Update Email
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </>

            <View className="h-px bg-gray-100 ml-20" />
            
            <SettingItem
              icon={Lock}
              title="Biometric Login"
              subtitle="Use fingerprint or face ID to log in"
              isSwitch={true}
              switchValue={securitySettings.biometricLogin}
              onSwitchChange={(value) =>
                setSecuritySettings((prev) => ({
                  ...prev,
                  biometricLogin: value,
                }))
              }
            />
          </View>
        </View>

        {/* Communication Section */}
        <View className="px-6 mb-6">
          <Text className="text-lg font-bold text-black mb-4 px-2">
            Communication
          </Text>
          <View className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <SettingItem
              icon={BellOff}
              title="Read Receipts"
              subtitle="Let others see when you've read their messages"
              isSwitch={true}
              switchValue={privacySettings.readReceipts}
              onSwitchChange={(value) =>
                setPrivacySettings((prev) => ({ ...prev, readReceipts: value }))
              }
            />
            <View className="h-px bg-gray-100 ml-20" />
            <SettingItem
              icon={Smartphone}
              title="Marketing Emails"
              subtitle="Receive updates and promotions"
              isSwitch={true}
              switchValue={privacySettings.marketingEmails}
              onSwitchChange={(value) =>
                setPrivacySettings((prev) => ({
                  ...prev,
                  marketingEmails: value,
                }))
              }
            />
          </View>
        </View>

        {/* Data & Privacy Section */}
        <View className="px-6 mb-8">
          <Text className="text-lg font-bold text-black mb-4 px-2">
            Data & Privacy
          </Text>
          <View className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <SettingItem
              icon={Trash2}
              title="Delete Account"
              subtitle="Permanently delete your account and data"
              onPress={handleDeleteAccount}
            />
          </View>
        </View>

        {/* Security Tips */}
        <View className="px-6 mb-8">
          <View className="bg-blue-50 rounded-2xl p-5 border border-blue-200">
            <Text className="text-blue-800 font-medium text-sm mb-2">
              Security Tips
            </Text>
            <View className="space-y-1">
              <Text className="text-blue-600 text-xs">
                • Use a strong, unique password
              </Text>
              <Text className="text-blue-600 text-xs">
                • Enable two-factor authentication
              </Text>
              <Text className="text-blue-600 text-xs">
                • Review your privacy settings regularly
              </Text>
              <Text className="text-blue-600 text-xs">
                • Log out from shared devices
              </Text>
              <Text className="text-blue-600 text-xs">
                • Update your password every 3 months
              </Text>
            </View>
          </View>
        </View>

        {/* App Version */}
        <View className="items-center pb-8">
          <Text className="text-gray-400 text-xs">Last updated: Today at 14:30</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacySecurityScreen;