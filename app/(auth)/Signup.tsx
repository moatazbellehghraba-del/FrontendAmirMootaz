import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
const Signup = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text>Signup</Text>
        <Button title="Login" onPress={() => router.push("/(auth)/Login")} />
      </View>
    </SafeAreaView>
  );
};

export default Signup;
