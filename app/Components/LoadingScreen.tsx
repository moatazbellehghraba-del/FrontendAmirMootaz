import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BeautyApp</Text>
      <ActivityIndicator
        size="large"
        color="#E91E63"
        style={{ marginTop: 20 }}
      />
      <Text style={styles.subtitle}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: { fontSize: 32, fontWeight: "bold", color: "#E91E63" },
  subtitle: { marginTop: 10, fontSize: 16, color: "#555" },
});
