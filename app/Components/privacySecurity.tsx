import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Switch,
  Alert,
  TextInput,
  Modal,
  TouchableOpacity,
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
  X,
  Star,
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

const DELETION_REASONS = [
  { id: "1", label: "I found a better alternative" },
  { id: "2", label: "I'm not using the app anymore" },
  { id: "3", label: "Privacy concerns" },
  { id: "4", label: "Too many notifications" },
  { id: "5", label: "The app is too complicated" },
  { id: "6", label: "Technical issues" },
  { id: "7", label: "Other" },
];

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

  // Delete account modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteStep, setDeleteStep] = useState<"reason" | "rating" | "confirm" | "password">("reason");
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [otherReason, setOtherReason] = useState("");
  const [appRating, setAppRating] = useState(0);
  const [additionalFeedback, setAdditionalFeedback] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [showDeletePassword, setShowDeletePassword] = useState(false);

  const handleSave = () => {
    Alert.alert("Success", "Your privacy settings have been updated!");
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
    setDeleteStep("reason");
    setSelectedReason("");
    setOtherReason("");
    setAppRating(0);
    setAdditionalFeedback("");
    setDeletePassword("");
  };

  const handleNextStep = () => {
    if (deleteStep === "reason") {
      if (!selectedReason) {
        Alert.alert("Error", "Please select a reason for deleting your account.");
        return;
      }
      if (selectedReason === "7" && !otherReason.trim()) {
        Alert.alert("Error", "Please provide a reason.");
        return;
      }
      setDeleteStep("rating");
    } else if (deleteStep === "rating") {
      setDeleteStep("confirm");
    }
  };

  const handleConfirmDeletion = () => {
    // Here you would call your API to delete the account
    console.log({
      reason: selectedReason === "7" ? otherReason : DELETION_REASONS.find(r => r.id === selectedReason)?.label,
      rating: appRating,
      feedback: additionalFeedback,
    });
    
    setShowDeleteModal(false);
    Alert.alert(
      "Account Suspension Scheduled",
      "Your account will be suspended for 15 days. If you don't log in within this period, it will be permanently deleted. You can cancel this anytime by logging in.",
      [
        {
          text: "OK",
          onPress: () => {
            // Navigate to login or logout
            console.log("Account deletion initiated");
          },
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
    <Pressable
      className="flex-row items-center justify-between py-4 active:bg-gray-50 px-4"
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
      })}
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
    </Pressable>
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
            <View className="w-10" />
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
                {"\u2022"} Use a strong, unique password
              </Text>
              <Text className="text-blue-600 text-xs">
                {"\u2022"} Enable two-factor authentication
              </Text>
              <Text className="text-blue-600 text-xs">
                {"\u2022"} Review your privacy settings regularly
              </Text>
              <Text className="text-blue-600 text-xs">
                {"\u2022"} Log out from shared devices
              </Text>
              <Text className="text-blue-600 text-xs">
                {"\u2022"} Update your password every 3 months
              </Text>
            </View>
          </View>
        </View>

        {/* App Version */}
        <View className="items-center pb-8">
          <Text className="text-gray-400 text-xs">Last updated: Today at 14:30</Text>
        </View>
      </ScrollView>

      {/* Delete Account Modal - FIXED VERSION */}
      <Modal
        visible={showDeleteModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl" style={{ height: '85%' }}>
            {/* Header */}
            <View className="flex-row items-center justify-between px-6 pt-6 pb-4 border-b border-gray-200">
              <Text className="text-xl font-bold text-black">
                {deleteStep === "reason" && "Why are you leaving?"}
                {deleteStep === "rating" && "Rate Your Experience"}
                {deleteStep === "confirm" && "Confirm Deletion"}
              </Text>
              <TouchableOpacity onPress={() => setShowDeleteModal(false)}>
                <X size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Scrollable Content */}
            <ScrollView 
              className="flex-1 px-6 py-4"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            >
              {/* Step 1: Reason Selection */}
              {deleteStep === "reason" && (
                <View>
                  <Text className="text-gray-600 text-sm mb-4">
                    We're sorry to see you go. Please let us know why you're deleting your account:
                  </Text>
                  
                  {DELETION_REASONS.map((reason) => (
                    <Pressable
                      key={reason.id}
                      onPress={() => setSelectedReason(reason.id)}
                      className={`border rounded-xl p-4 mb-3 ${
                        selectedReason === reason.id
                          ? "border-black bg-gray-50"
                          : "border-gray-300 bg-white"
                      }`}
                      style={({ pressed }) => ({
                        opacity: pressed ? 0.7 : 1,
                      })}
                    >
                      <View className="flex-row items-center justify-between">
                        <Text className={`text-base ${
                          selectedReason === reason.id
                            ? "font-semibold text-black"
                            : "text-gray-700"
                        }`}>
                          {reason.label}
                        </Text>
                        <View className={`w-5 h-5 rounded-full border-2 ${
                          selectedReason === reason.id
                            ? "border-black bg-black"
                            : "border-gray-300"
                        } items-center justify-center`}>
                          {selectedReason === reason.id && (
                            <View className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </View>
                      </View>
                    </Pressable>
                  ))}

                  {selectedReason === "7" && (
                    <View className="mt-2">
                      <TextInput
                        className="bg-white border border-gray-300 rounded-xl px-4 py-4 text-base text-black"
                        value={otherReason}
                        onChangeText={setOtherReason}
                        placeholder="Please tell us more..."
                        placeholderTextColor="#9CA3AF"
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                      />
                    </View>
                  )}
                </View>
              )}

              {/* Step 2: Rating */}
              {deleteStep === "rating" && (
                <View>
                  <Text className="text-gray-600 text-sm mb-6">
                    Before you go, would you mind rating your experience with our app?
                  </Text>
                  
                  <View className="items-center mb-6">
                    <View className="flex-row gap-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Pressable
                          key={star}
                          onPress={() => setAppRating(star)}
                          style={({ pressed }) => ({
                            opacity: pressed ? 0.7 : 1,
                          })}
                        >
                          <Star
                            size={40}
                            color={star <= appRating ? "#FCD34D" : "#D1D5DB"}
                            fill={star <= appRating ? "#FCD34D" : "none"}
                          />
                        </Pressable>
                      ))}
                    </View>
                    {appRating > 0 && (
                      <Text className="text-gray-600 text-sm mt-3">
                        {appRating === 1 && "Poor"}
                        {appRating === 2 && "Fair"}
                        {appRating === 3 && "Good"}
                        {appRating === 4 && "Very Good"}
                        {appRating === 5 && "Excellent"}
                      </Text>
                    )}
                  </View>

                  <Text className="text-gray-600 text-sm font-medium mb-2">
                    Additional Feedback (Optional)
                  </Text>
                  <TextInput
                    className="bg-white border border-gray-300 rounded-xl px-4 py-4 text-base text-black mb-4"
                    value={additionalFeedback}
                    onChangeText={setAdditionalFeedback}
                    placeholder="Tell us what we could improve..."
                    placeholderTextColor="#9CA3AF"
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                </View>
              )}

              {/* Step 3: Confirmation */}
              {deleteStep === "confirm" && (
                <View>
                  <View className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
                    <Text className="text-orange-800 font-semibold text-base mb-2">
                      ⚠️ Important Information
                    </Text>
                    <Text className="text-orange-700 text-sm leading-6">
                      Your account will be suspended for 15 days. During this period:{"\n\n"}
                      {"\u2022"} You can cancel deletion by logging back in{"\n"}
                      {"\u2022"} Your data will be preserved{"\n"}
                      {"\u2022"} After 15 days, your account will be permanently deleted{"\n"}
                      {"\u2022"} Once deleted, this action cannot be undone
                    </Text>
                  </View>

                  <View className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4">
                    <Text className="text-gray-700 font-semibold text-sm mb-2">
                      What will be deleted:
                    </Text>
                    <Text className="text-gray-600 text-sm leading-6">
                      {"\u2022"} Your profile and personal information{"\n"}
                      {"\u2022"} All your bookings and history{"\n"}
                      {"\u2022"} Saved preferences and settings{"\n"}
                      {"\u2022"} Messages and conversations
                    </Text>
                  </View>

                  <Text className="text-gray-600 text-sm text-center">
                    Are you sure you want to proceed with account deletion?
                  </Text>
                </View>
              )}
            </ScrollView>

            {/* Footer Buttons - Fixed at bottom */}
            <View className="px-6 py-4 border-t border-gray-200 bg-white">
              <View className="flex-row gap-3">
                <Pressable
                  onPress={() => {
                    if (deleteStep === "reason") {
                      setShowDeleteModal(false);
                    } else if (deleteStep === "rating") {
                      setDeleteStep("reason");
                    } else {
                      setDeleteStep("rating");
                    }
                  }}
                  className="flex-1 bg-gray-100 rounded-xl py-4 items-center"
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.7 : 1,
                  })}
                >
                  <Text className="text-black font-semibold text-base">
                    {deleteStep === "reason" ? "Cancel" : "Back"}
                  </Text>
                </Pressable>
                
                <Pressable
                  onPress={() => {
                    if (deleteStep === "confirm") {
                      handleConfirmDeletion();
                    } else {
                      handleNextStep();
                    }
                  }}
                  className={`flex-1 rounded-xl py-4 items-center ${
                    deleteStep === "confirm" ? "bg-red-600" : "bg-black"
                  }`}
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.7 : 1,
                  })}
                >
                  <Text className="text-white font-semibold text-base">
                    {deleteStep === "confirm" ? "Delete Account" : "Continue"}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PrivacySecurityScreen;