import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Screen1 = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Screen 1</Text>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to BeautyApp!</Text>
        <Text style={styles.subtitle}>
          Discover nearby salons, book appointments, and connect with
          professionals.
        </Text>

        <Button
          title="Next"
          onPress={() => router.push("/(onboarding)/Screen2")}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default Screen1;
