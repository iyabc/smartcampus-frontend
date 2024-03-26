import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Text, View, XStack, YStack } from 'tamagui';

import { tokens } from '~/tamagui.config';

const PageHeader = ({ title }: { title: string }) => {
  return (
    <YStack>
      <XStack alignItems="center" justifyContent="space-between" paddingVertical={15}>
        <Image
          source={{
            uri: 'https://cipsjtikuxepydmaukzr.supabase.co/storage/v1/object/public/assets/logo_horizontal.png',
          }}
          style={{
            width: 120,
            height: 50,
          }}
          contentFit="contain"
          transition={1000}
        />
        <Link href="/dashboard/">
          <Ionicons name="caret-back-circle" size={30} color={tokens.color.red.val} />
        </Link>
      </XStack>
      <View backgroundColor="$blue" paddingHorizontal={12} paddingVertical={10}>
        <Text color="$white" fontSize="$6" fontWeight="600">
          {title}
        </Text>
      </View>
    </YStack>
  );
};

export default PageHeader;
