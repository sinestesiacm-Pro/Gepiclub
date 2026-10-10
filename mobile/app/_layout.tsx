import { useFonts } from 'expo-font';
import { DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform, StatusBar as RNStatusBar } from 'react-native';
import 'react-native-reanimated';

import { AuthProvider } from '@/context/AuthContext';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading keeps tabs present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Configure Android status bar color to seamlessly match white header
  useEffect(() => {
    if (Platform.OS === 'android') {
      RNStatusBar.setBackgroundColor('#FFFFFF');
      RNStatusBar.setBarStyle('dark-content');
      RNStatusBar.setTranslucent(false);
    }
  }, []);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <ThemeProvider value={DefaultTheme}>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#F8FAFC' },
            animation: 'slide_from_right',
            animationDuration: 220,
          }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="auth/login"
            options={{
              presentation: 'modal',
              animation: 'fade_from_bottom',
              animationDuration: 240,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="service/[id]"
            options={{
              headerShown: false,
              animation: 'slide_from_right',
              animationDuration: 220,
            }}
          />
          <Stack.Screen
            name="checkout/index"
            options={{
              headerShown: false,
              animation: 'slide_from_right',
              animationDuration: 220,
            }}
          />
          <Stack.Screen
            name="checkout/success"
            options={{
              headerShown: false,
              presentation: 'modal',
              animation: 'fade_from_bottom',
              animationDuration: 240,
            }}
          />
          <Stack.Screen
            name="marketplace"
            options={{
              headerShown: false,
              animation: 'slide_from_right',
              animationDuration: 220,
            }}
          />
          <Stack.Screen name="modal" options={{ presentation: 'modal', animation: 'fade_from_bottom' }} />
        </Stack>
      </ThemeProvider>
    </AuthProvider>
  );
}
