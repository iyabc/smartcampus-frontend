import { FontAwesome } from '@expo/vector-icons';
import { Href, router } from 'expo-router';
import React from 'react';

import { Button, ButtonText } from '~/tamagui.config';

type ButtonWithIconProps = {
  iconName: keyof typeof FontAwesome.glyphMap;
  text: string;
  color: string;
  href: Href<string>;
};

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({ iconName, text, color, href }) => {
  return (
    <Button
      onPress={() => router.navigate(href)}
      borderWidth={3}
      borderColor={color}
      paddingHorizontal="$large">
      <FontAwesome name={iconName} size={20} color={color} />
      <ButtonText color={color} fontSize={20} fontWeight="bold" flex={1}>
        {text}
      </ButtonText>
    </Button>
  );
};

export default ButtonWithIcon;
