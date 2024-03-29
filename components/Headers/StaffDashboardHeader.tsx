import { Image } from 'expo-image';
import { Platform } from 'react-native';
import { View, XStack } from 'tamagui';

const StaffDashboardHeader = () => {
  return (
    <View
      backgroundColor="$blue"
      borderBottomLeftRadius={30}
      borderBottomRightRadius={30}
      paddingTop={Platform.OS === 'android' ? 20 : 0}>
      <XStack
        justifyContent="space-between"
        alignItems="center"
        paddingHorizontal={24}
        paddingTop={5}
        paddingBottom={10}>
        <Image
          source="https://cipsjtikuxepydmaukzr.supabase.co/storage/v1/object/public/assets/logo_horizontal.png"
          style={{
            width: 100,
            height: 70,
          }}
          contentFit="contain"
          transition={1000}
        />
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
      </XStack>
    </View>
  );
};

export default StaffDashboardHeader;
