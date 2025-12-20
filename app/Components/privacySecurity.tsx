// app/privacy-security.tsx
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
  UserX,
  Download,
  Trash2,
  BellOff,
  Smartphone,
  Globe,
  Save,
  Mail,
  Key,
  EyeOff,
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
    profileVisibility: "public",
    showOnlineStatus: true,
    readReceipts: true,
    twoFactorAuth: false,
    dataSharing: false,
    marketingEmails: false,
    locationServices: true,
  });

  const [securitySettings, setSecuritySettings] = useState({
    biometricLogin: true,
    autoLock: "immediate",
    sessionTimeout: "30min",
  });

  // Password change states
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Email change states
  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [emailData, setEmailData] = useState({
    currentEmail: currentUser?.email ?? "",
    newEmail: "",
    confirmEmail: "",
  });
  const [showEmailPassword, setShowEmailPassword] = useState(false);

  const handleSave = () => {
    Alert.alert("Success", "Your privacy settings have been updated!");
  };

  const handleExportData = () => {
    Alert.alert(
      "Export Data",
      "Your data export will be prepared and sent to your email."
    );
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

    //  API call
    const res = await updateClient({
      variables: { input: { password: passwordData.newPassword } },
    });
    Alert.alert("Password changed");
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
    console.log("this the reponse of update email of the client ", res);
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

  const PasswordField = ({
    label,
    value,
    onChangeText,
    placeholder,
    showPassword,
    onToggleVisibility,
    fieldKey,
  }: {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    showPassword: boolean;
    onToggleVisibility: () => void;
    fieldKey: string;
  }) => (
    <View className="mb-4">
      <Text className="text-gray-600 text-sm font-medium mb-2">{label}</Text>
      <View className="relative">
        <TextInput
          className="bg-white border border-gray-300 rounded-2xl px-4 py-4 text-base text-black"
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={!showPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity
          className="absolute right-4 top-4"
          onPress={onToggleVisibility}
        >
          {showPassword ? (
            <Eye size={20} color="#666" />
          ) : (
            <EyeOff size={20} color="#666" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  const EmailField = ({
    label,
    value,
    onChangeText,
    placeholder,
    editable = true,
    keyboardType = "default",
  }: {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    editable?: boolean;
    keyboardType?: "default" | "email-address";
  }) => (
    <View className="mb-4">
      <Text className="text-gray-600 text-sm font-medium mb-2">{label}</Text>
      <TextInput
        className="bg-white border border-gray-300 rounded-2xl px-4 py-4 text-base text-black"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        editable={editable}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
    </View>
  );

  const SettingSection = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <View className="mb-8">
      <Text className="text-xl font-light text-black mb-5">{title}</Text>
      <View className="bg-gray-50 rounded-3xl p-2 border border-gray-200">
        {children}
      </View>
    </View>
  );

  const SwitchSetting = ({
    icon: Icon,
    title,
    subtitle,
    value,
    onValueChange,
  }: {
    icon: React.ComponentType<{ size: number; color: string }>;
    title: string;
    subtitle: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
  }) => (
    <View className="flex-row items-center justify-between py-4 px-2">
      <View className="flex-row items-center flex-1">
        <View className="w-12 h-12 bg-gray-50 rounded-xl items-center justify-center mr-4 border border-gray-100">
          <Icon size={20} color="#000" />
        </View>
        <View className="flex-1">
          <Text className="text-black font-medium text-base">{title}</Text>
          <Text className="text-gray-500 text-sm mt-1">{subtitle}</Text>
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#e5e5e5", true: "#000" }}
        thumbColor={value ? "#fff" : "#f4f4f5"}
      />
    </View>
  );

  const RadioSetting = ({
    icon: Icon,
    title,
    subtitle,
    value,
    currentValue,
    onPress,
  }: {
    icon: React.ComponentType<{ size: number; color: string }>;
    title: string;
    subtitle: string;
    value: string;
    currentValue: string;
    onPress: (value: string) => void;
  }) => (
    <TouchableOpacity
      className="flex-row items-center justify-between py-4 px-2 active:bg-gray-100 rounded-xl"
      onPress={() => onPress(value)}
    >
      <View className="flex-row items-center flex-1">
        <View className="w-12 h-12 bg-gray-50 rounded-xl items-center justify-center mr-4 border border-gray-100">
          <Icon size={20} color="#000" />
        </View>
        <View className="flex-1">
          <Text className="text-black font-medium text-base">{title}</Text>
          <Text className="text-gray-500 text-sm mt-1">{subtitle}</Text>
        </View>
      </View>
      <View
        className={`w-6 h-6 rounded-full border-2 ${
          currentValue === value ? "bg-black border-black" : "border-gray-300"
        }`}
      >
        {currentValue === value && (
          <View className="w-2 h-2 bg-white rounded-full m-auto" />
        )}
      </View>
    </TouchableOpacity>
  );

  const ActionButton = ({
    icon: Icon,
    title,
    subtitle,
    color = "text-black",
    onPress,
  }: {
    icon: React.ComponentType<{ size: number; color: string }>;
    title: string;
    subtitle: string;
    color?: string;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      className="flex-row items-center py-4 px-2 active:bg-gray-100 rounded-xl"
      onPress={onPress}
    >
      <View className="w-12 h-12 bg-gray-50 rounded-xl items-center justify-center mr-4 border border-gray-100">
        <Icon size={20} color={color.includes("red") ? "#dc2626" : "#000"} />
      </View>
      <View className="flex-1">
        <Text className={`font-medium text-base ${color}`}>{title}</Text>
        <Text className="text-gray-500 text-sm mt-1">{subtitle}</Text>
      </View>
      <ChevronLeft size={20} color="#9CA3AF" className="rotate-180" />
    </TouchableOpacity>
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
                onPress={() => router.back()}
              >
                <ChevronLeft size={22} color="#000" />
              </TouchableOpacity>
              <View>
                <Text className="text-3xl font-light text-black mb-1">
                  Privacy & Security
                </Text>
                <Text className="text-gray-400 text-base">
                  Control your privacy settings
                </Text>
              </View>
            </View>
            <TouchableOpacity
              className="w-12 h-12 bg-black rounded-2xl items-center justify-center"
              onPress={handleSave}
            >
              <Save size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Account Security */}
        <View className="px-6">
          <SettingSection title="Account Security">
            <ActionButton
              icon={Key}
              title="Change Password"
              subtitle="Update your password regularly"
              onPress={() => setShowChangePassword(true)}
            />
            <View className="border-b border-gray-200 mx-4" />
            <ActionButton
              icon={Mail}
              title="Change Email"
              subtitle="Update your email address"
              onPress={() => setShowChangeEmail(true)}
            />

            <View className="border-b border-gray-200 mx-4" />
            <SwitchSetting
              icon={Lock}
              title="Biometric Login"
              subtitle="Use fingerprint or face ID to log in"
              value={securitySettings.biometricLogin}
              onValueChange={(value) =>
                setSecuritySettings((prev) => ({
                  ...prev,
                  biometricLogin: value,
                }))
              }
            />
          </SettingSection>

          {/* Change Password Modal */}
          {showChangePassword && (
            <View className="mb-8 bg-white rounded-3xl p-6 border border-gray-200">
              <View className="flex-row items-center justify-between mb-6">
                <Text className="text-xl font-light text-black">
                  Change Password
                </Text>
                <TouchableOpacity onPress={() => setShowChangePassword(false)}>
                  <Text className="text-gray-500 text-base">Cancel</Text>
                </TouchableOpacity>
              </View>

              <PasswordField
                label="New Password"
                value={passwordData.newPassword}
                onChangeText={(text) =>
                  setPasswordData((prev) => ({ ...prev, newPassword: text }))
                }
                placeholder="Enter new password"
                showPassword={showPasswords.new}
                onToggleVisibility={() =>
                  setShowPasswords((prev) => ({ ...prev, new: !prev.new }))
                }
                fieldKey="new"
              />

              <PasswordField
                label="Confirm New Password"
                value={passwordData.confirmPassword}
                onChangeText={(text) =>
                  setPasswordData((prev) => ({
                    ...prev,
                    confirmPassword: text,
                  }))
                }
                placeholder="Confirm new password"
                showPassword={showPasswords.confirm}
                onToggleVisibility={() =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    confirm: !prev.confirm,
                  }))
                }
                fieldKey="confirm"
              />

              <TouchableOpacity
                className="bg-black rounded-2xl py-4 items-center mt-4"
                onPress={handleChangePassword}
              >
                <Text className="text-white font-medium text-base">
                  Update Password
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Change Email Modal */}
          {showChangeEmail && (
            <View className="mb-8 bg-white rounded-3xl p-6 border border-gray-200">
              <View className="flex-row items-center justify-between mb-6">
                <Text className="text-xl font-light text-black">
                  Change Email Address
                </Text>
                <TouchableOpacity onPress={() => setShowChangeEmail(false)}>
                  <Text className="text-gray-500 text-base">Cancel</Text>
                </TouchableOpacity>
              </View>

              <EmailField
                label="Current Email"
                value={emailData.currentEmail}
                onChangeText={() => {}}
                placeholder="Current email"
                editable={false}
              />

              <EmailField
                label="New Email"
                value={emailData.newEmail}
                onChangeText={(text) =>
                  setEmailData((prev) => ({ ...prev, newEmail: text }))
                }
                placeholder="Enter new email address"
                keyboardType="email-address"
              />

              <EmailField
                label="Confirm New Email"
                value={emailData.confirmEmail}
                onChangeText={(text) =>
                  setEmailData((prev) => ({ ...prev, confirmEmail: text }))
                }
                placeholder="Confirm new email address"
                keyboardType="email-address"
              />

              <TouchableOpacity
                className="bg-black rounded-2xl py-4 items-center mt-4"
                onPress={handleChangeEmail}
              >
                <Text className="text-white font-medium text-base">
                  Update Email
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <SettingSection title="Communication">
            <SwitchSetting
              icon={BellOff}
              title="Read Receipts"
              subtitle="Let others see when you've read their messages"
              value={privacySettings.readReceipts}
              onValueChange={(value) =>
                setPrivacySettings((prev) => ({ ...prev, readReceipts: value }))
              }
            />

            <View className="border-b border-gray-200 mx-4" />
            <SwitchSetting
              icon={Smartphone}
              title="Marketing Emails"
              subtitle="Receive updates and promotions"
              value={privacySettings.marketingEmails}
              onValueChange={(value) =>
                setPrivacySettings((prev) => ({
                  ...prev,
                  marketingEmails: value,
                }))
              }
            />
          </SettingSection>

          <SettingSection title="Data & Privacy">
            <ActionButton
              icon={Trash2}
              title="Delete Account"
              subtitle="Permanently delete your account and data"
              color="text-red-600"
              onPress={handleDeleteAccount}
            />
          </SettingSection>
        </View>

        {/* Security Tips */}
        <View className="px-6 mb-8">
          <View className="bg-blue-50 rounded-2xl p-5 border border-blue-200">
            <Text className="text-blue-800 font-medium text-sm mb-2">
              Security Tips
            </Text>
            <View className="space-y-2">
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

        {/* Last Updated */}
        <View className="items-center pb-10">
          <Text className="text-gray-400 text-sm font-medium">
            Last updated: Today at 14:30
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacySecurityScreen;
