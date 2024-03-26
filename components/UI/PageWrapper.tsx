import { Stack } from 'expo-router';
import { ReactNode } from 'react';

import { Container } from '~/tamagui.config';

const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Container paddingHorizontal={10} backgroundColor="$white">
      <Stack.Screen options={{ headerShown: false }} />
      {children}
    </Container>
  );
};

export default PageWrapper;
