import { View, Text, Button } from "react-native";
import React, { useReducer } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
const Screen3 = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text>Screen3</Text>
        <Button title="Next" onPress={() => router.push("/(auth)/Login")} />
      </View>
    </SafeAreaView>
  );
};

export default Screen3;
