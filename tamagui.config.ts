import { createInterFont } from '@tamagui/font-inter';
import { createMedia } from '@tamagui/react-native-media-driver';
import { shorthands } from '@tamagui/shorthands';
import { themes } from '@tamagui/themes';
import {
  createTamagui,
  styled,
  SizableText,
  H1,
  YStack,
  createTokens,
  Input,
  Select,
} from 'tamagui';

export const tokens = createTokens({
  size: {
    small: 20,
    medium: 30,
    true: 30, // note true = 30 just like medium, your default size token
    large: 40,
  },
  space: {
    small: 10,
    medium: 20,
    true: 20, // same goes for space and other token categories
    large: 30,
  },
  color: {
    black: '#28282B',
    white: '#f2f2f2',
    red: '#EC1F28',
    blue: '#2E416A',
    grey: '#555555',
  },
  icon: {
    small: 16,
    medium: 24,
    large: 32,
  },
  radius: {
    small: 4,
    medium: 8,
    large: 12,
    xlarge: 16,
    full: 999,
  },
  zIndex: {
    small: 16,
    medium: 24,
    large: 32,
  },
});

const headingFont = createInterFont();
const bodyFont = createInterFont();

export const Container = styled(YStack, {
  flex: 1,
  padding: 24,
  backgroundColor: tokens.color.white,
});

export const Main = styled(YStack, {
  flex: 1,
});

export const Title = styled(H1, {
  color: '#000',
  size: '$12',
});

export const Subtitle = styled(SizableText, {
  color: '#38434D',
  size: '$9',
});

export const Button = styled(YStack, {
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: tokens.radius.medium,
  paddingHorizontal: 4,
  paddingVertical: 12,
  flexDirection: 'row',
  gap: 10,
});

export const ButtonOutlined = styled(YStack, {
  borderWidth: 1,
  backgroundColor: '$colorTransparent',
  borderRadius: '$radius.medium',
  borderColor: '$black',
  paddingHorizontal: 4,
  paddingVertical: 8,
});

export const TextInputBottomBorder = styled(Input, {
  backgroundColor: 'transparent',
  borderWidth: 0,
  borderBottomWidth: 1,
  borderColor: tokens.color.white,
  color: tokens.color.white,
  paddingHorizontal: 0,
});

export const InputOutlined = styled(Input, {
  borderWidth: 1,
  backgroundColor: '$colorTransparent',
  borderRadius: '$radius.medium',
  color: '$black',
});

export const SelectTriggerOutlined = styled(Select.Trigger, {
  borderWidth: 1,
  backgroundColor: '$colorTransparent',
  borderRadius: '$radius.medium',
});

export const ButtonText = styled(SizableText, {
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: '600',
  textAlign: 'center',
});

const config = createTamagui({
  light: {
    color: {
      background: 'gray',
      text: 'black',
    },
  },
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  shorthands,
  fonts: {
    body: bodyFont,
    heading: headingFont,
  },
  themes,
  tokens,
  media: createMedia({
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  }),
});

type AppConfig = typeof config;

// Enable auto-completion of props shorthand (ex: jc="center") for Tamagui templates.
// Docs: https://tamagui.dev/docs/core/configuration

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;
