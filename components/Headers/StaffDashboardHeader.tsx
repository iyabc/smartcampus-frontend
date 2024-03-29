import { Image } from 'expo-image';
import { Platform } from 'react-native';
import { View, XStack } from 'tamagui';

import StaffProfileModal from '../Modals/StaffProfileModal';

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
        <StaffProfileModal />
      </XStack>
    </View>
  );
};

export default StaffDashboardHeader;
