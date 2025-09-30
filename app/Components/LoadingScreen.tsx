import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Animated,
  useColorScheme,
} from "react-native";
import { useEffect, useRef } from "react";

export default function LoadingScreen({ message = "Loading..." }) {
  const colorScheme = useColorScheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // Pulse animation for loader
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colorScheme === "dark" ? "#1a1a1a" : "#fff",
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      color: "#E91E63",
      marginBottom: 8,
    },
    subtitle: {
      marginTop: 16,
      fontSize: 16,
      color: colorScheme === "dark" ? "#ccc" : "#666",
      fontStyle: "italic",
    },
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.title}>BeautyApp</Text>
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <ActivityIndicator size="large" color="#E91E63" />
        </Animated.View>
        <Text style={styles.subtitle}>{message}</Text>
      </Animated.View>
    </View>
  );
}
