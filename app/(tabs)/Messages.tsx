import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
const Messages = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text>Messages</Text>
      </View>
    </SafeAreaView>
  );
};

export default Messages;
