import { AntDesign } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Dialog, Text, View, YStack } from 'tamagui';

import MainButton from '../Buttons/MainButton';

import { useUser } from '~/contexts/UserContext';
import { tokens } from '~/tamagui.config';
import { signOut } from '~/utils/auth';
import { deleteSecureValue } from '~/utils/secureStore';

const StaffProfileModal = () => {
  const { user, changeUser } = useUser();

  const handleLogout = () => {
    signOut();
    deleteSecureValue('accessToken');
    deleteSecureValue('userId');
    changeUser(undefined);
    router.replace('/');
  };

  return (
    <Dialog>
      <Dialog.Trigger>
        <View
          backgroundColor="$grey"
          width={35}
          height={35}
          borderRadius={50}
          position="relative"
          overflow="hidden"
          alignItems="center"
          justifyContent="flex-end"
          alignSelf="center">
          <Image
            source={{
              uri: 'https://cipsjtikuxepydmaukzr.supabase.co/storage/v1/object/public/assets/person_placeholder.png?t=2024-03-10T03%3A53%3A13.330Z',
            }}
            style={{
              width: 25,
              height: 25,
            }}
            contentFit="contain"
            transition={1000}
          />
        </View>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay key="DialogOverlay" />
        <Dialog.Content
          key="DialogContent"
          backgroundColor="$blue"
          borderRadius="$radius.large"
          width="75%"
          paddingVertical={30}>
          <Dialog.Close alignSelf="flex-end">
            <AntDesign name="closecircle" size={24} color={tokens.color.white.val} />
          </Dialog.Close>
          <YStack marginVertical={35} alignItems="center" gap={15}>
            <View
              backgroundColor="$grey"
              width={150}
              height={150}
              borderRadius="$radius.full"
              position="relative"
              overflow="hidden"
              alignItems="center"
              justifyContent="flex-end"
              alignSelf="center">
              <Image
                source={{
                  uri: 'https://cipsjtikuxepydmaukzr.supabase.co/storage/v1/object/public/assets/person_placeholder.png?t=2024-03-10T03%3A53%3A13.330Z',
                }}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '80%',
                }}
                contentFit="contain"
                transition={1000}
              />
            </View>
            <Text color="$white" fontSize="$6">
              {user?.username}
            </Text>
          </YStack>
          <MainButton
            text="Logout"
            textColor="$white"
            backgroundColor="$red"
            onPress={handleLogout}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export default StaffProfileModal;
