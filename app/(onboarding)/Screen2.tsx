import { View, Text, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const Screen2 = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Screen 2 </Text>
      <Button
        title="Next"
        onPress={() => router.push("/(onboarding)/Screen3")}
      />
    </SafeAreaView>
  );
};

export default Screen2;
