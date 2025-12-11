// app/_layout.tsx
import { Stack } from "expo-router";
import "./global.css";
import { useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "./Components/LoadingScreen";
import { client } from "@/apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { AuthProvider, AuthContext } from "@/context/AuthContext";

const InnerLayout = () => {
  const { userToken, loading } = useContext(AuthContext);
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  // Check if onboarding was completed
  useEffect(() => {
    const checkFirstLaunch = async () => {
      const launched = await AsyncStorage.getItem("hasLaunched");
      if (!launched) {
        await AsyncStorage.setItem("hasLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    };
    checkFirstLaunch();
  }, []);

  // ✅ Wait until token check and first launch check are done
  if (loading || isFirstLaunch === null) return <LoadingScreen />;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isFirstLaunch ? (
        <Stack.Screen name="(onboarding)/index" />
      ) : userToken ? (
        <Stack.Screen name="(tabs)" />
      ) : (
        <Stack.Screen name="(auth)/Login" />
      )}
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <InnerLayout />
      </AuthProvider>
    </ApolloProvider>
  );
}
