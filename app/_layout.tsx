import { Stack } from "expo-router";
import "./global.css";

export default function RootLayout() {
  const isFirstLaunch = true; // pretend it's first time
  const isLoggedIn = false; // pretend user is not logged in

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
