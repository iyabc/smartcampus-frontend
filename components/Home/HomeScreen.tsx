import { Image } from 'expo-image';
import { useState } from 'react';
import { ActivityIndicator, useWindowDimensions } from 'react-native';
import { Main, YStack, View } from 'tamagui';

import MainButton from '~/components/Buttons/MainButton';
import LoginForm from '~/components/LoginForm';
import { Container } from '~/tamagui.config';
import { UserType } from '~/utils/types';

const HomeScreen = ({ loading }: { loading: boolean }) => {
  const { width } = useWindowDimensions();
  const [userType, setUserType] = useState<UserType | undefined>(undefined);

  const maxLogoWidth = width < 425 ? 250 : 350;

  return (
    <Container alignItems="center" padding={0} backgroundColor="$blue">
      {/* <Video
        source={{
          uri: 'https://cipsjtikuxepydmaukzr.supabase.co/storage/v1/object/public/assets/home_vid.mp4',
        }}
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay
        isMuted
        style={{ flex: 1, width: '100%', height: '100%', opacity: 0.5 }}
      /> */}
      <Main
        position="absolute"
        gap={40}
        paddingHorizontal={24}
        width={width < 425 ? '90%' : 425}
        height="100%">
        <View flex={1.3} justifyContent="flex-end" alignItems="center">
          <Image
            source={{
              uri: 'https://cipsjtikuxepydmaukzr.supabase.co/storage/v1/object/public/assets/logo_vertical.png',
            }}
            style={{
              width: maxLogoWidth,
              height: maxLogoWidth,
            }}
            contentFit="contain"
            transition={1000}
          />
        </View>
        <View flex={1}>
          {!loading ? (
            <YStack gap={14}>
              {!userType ? (
                <>
                  <MainButton
                    text="Student"
                    textColor="$white"
                    backgroundColor="$red"
                    onPress={() => setUserType('STUDENT')}
                  />
                  <MainButton
                    text="Teacher"
                    textColor="$white"
                    backgroundColor="$blue"
                    onPress={() => setUserType('TEACHER')}
                  />
                  <MainButton
                    text="Staff"
                    textColor="$white"
                    backgroundColor="$grey"
                    onPress={() => setUserType('STAFF')}
                  />
                </>
              ) : (
                <LoginForm displayType={userType} onBackToHome={() => setUserType(undefined)} />
              )}
            </YStack>
          ) : (
            <ActivityIndicator />
          )}
        </View>
      </Main>
    </Container>
  );
};

export default HomeScreen;
