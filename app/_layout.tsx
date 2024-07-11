import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar, ActivityIndicator, Platform } from "react-native";
import Colors from "@/constants/Colors";
import { AuthProvider, useAuth } from "@/context/AuthContext";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export function InitialLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const { token, initialized } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (!initialized) return;

    const inAuthGroup = segments[0] === "(authenticated)";

    if (token && !inAuthGroup) {
      // setTimeout required to NOT have an error on iPhone
      if (Platform.OS === "ios") {
        setTimeout(() => {
          router.replace("/(authenticated)/(drawer)/(tabs)/home");
        }, 1);
      } else {
        setImmediate(() => {
          router.replace("/(authenticated)/(drawer)/(tabs)/home");
        });
      }
    } else if (!token && inAuthGroup) {
      if (Platform.OS === "ios") {
        setTimeout(() => {
          router.replace("/");
        }, 1);
      } else {
        setImmediate(() => {
          router.replace("/");
        });
      }
    }
  }, [token, initialized]);

  if (!loaded || !initialized) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="register"
          options={{
            title: "Create Account",
            headerBackTitle: "Login",
          }}
        />
        <Stack.Screen
          name="privacy"
          options={{ title: "Privacy Policy", presentation: "modal" }}
        />
        <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}
