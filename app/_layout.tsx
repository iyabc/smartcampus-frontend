import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as Font from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useCallback } from 'react';
import { useColorScheme } from 'react-native';
import { TamaguiProvider } from 'tamagui';

import { FacilitiesProvider } from '~/contexts/FacilitiesContext';
import { SessionProvider } from '~/contexts/SessionContext';
import { UserProvider } from '~/contexts/UserContext';
import config from '~/tamagui.config';

export default function Layout() {
  const colorScheme = useColorScheme();

  Font.loadAsync({
    Inter: require('../assets/fonts/Inter-Regular.ttf'),
  });

  useCallback(async () => {
    if (Font.isLoaded('Inter')) {
      await SplashScreen.hideAsync();
    }
  }, []);

  if (Font.isLoaded('Inter') && !Font.isLoading) {
    return null;
  }

  return (
    <TamaguiProvider config={config} defaultTheme={colorScheme || ''}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <SessionProvider>
          <UserProvider>
            <FacilitiesProvider>
              <Stack
                screenOptions={{
                  headerShown: false,
                }}
              />
            </FacilitiesProvider>
          </UserProvider>
        </SessionProvider>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
