import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import React, { useCallback } from 'react';
import { useColorScheme } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { TamaguiProvider } from 'tamagui';

import { FacilitiesProvider } from '~/contexts/FacilitiesContext';
import { SessionProvider } from '~/contexts/SessionContext';
import { UserProvider } from '~/contexts/UserContext';
import config from '~/tamagui.config';

export default function Layout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded, fontError] = useFonts({
    Inter: require('../assets/fonts/Inter-Regular.ttf'),
  });

  useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <RootSiblingParent>
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
    </RootSiblingParent>
  );
}
