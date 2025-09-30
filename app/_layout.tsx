import { Stack } from "expo-router";
import "./global.css";
import { useEffect, useState } from "react";
import LoadingScreen from "./Components/LoadingScreen";
export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true); // always start loading

  const isFirstLaunch = true; // pretend it's first time
  const isLoggedIn = false; // pretend user is not logged in
  useEffect(() => {
    // Simulate a 4-second splash/loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isFirstLaunch ? (
        <Stack.Screen name="(onboarding)/index" />
      ) : !isLoggedIn ? (
        <Stack.Screen name="(auth)/Login" />
      ) : (
        <Stack.Screen name="(tabs)/Home" />
      )}
    </Stack>
  );
}
