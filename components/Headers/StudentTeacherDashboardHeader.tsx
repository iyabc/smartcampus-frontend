import { Image } from 'expo-image';
import { Text, View, YStack } from 'tamagui';

import { useUser } from '~/contexts/UserContext';
import { tokens } from '~/tamagui.config';

const StudentTeacherDashboardHeader = () => {
  const { user } = useUser();
  const backgroundColor = tokens.color.blue.val;

  return (
    <View>
      <View width="100%" backgroundColor={backgroundColor}>
        <View paddingHorizontal={24}>
          <Image
            source="https://cipsjtikuxepydmaukzr.supabase.co/storage/v1/object/public/assets/logo_horizontal.png"
            style={{
              width: 100,
              height: 100,
            }}
            contentFit="contain"
            transition={1000}
          />
        </View>
        <YStack alignItems="center" gap={10}>
          <View
            backgroundColor="$grey"
            width={100}
            height={100}
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
                width: 80,
                height: 80,
              }}
              contentFit="contain"
              transition={1000}
            />
          </View>
          <Text color="$white" fontSize={18}>
            {user?.email}
          </Text>
        </YStack>
      </View>
      <View
        backgroundColor={backgroundColor}
        height={35}
        borderColor="$colorTransparent"
        borderBottomLeftRadius={45}
        borderBottomRightRadius={45}
        position="relative"
        paddingTop={45}
        marginTop={-1}>
        <View position="absolute" alignItems="center" bottom={-20} width="100%" zIndex={999}>
          <View
            borderRadius="$radius.small"
            backgroundColor="$red"
            paddingHorizontal="$space.medium"
            paddingVertical="$space.small"
            alignSelf="center">
            <Text fontSize="$7" color="$white" fontWeight="bold">
              Reservation Services
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default StudentTeacherDashboardHeader;
