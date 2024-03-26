import { Button, ButtonText } from '~/tamagui.config';

type props = {
  text: string;
  textColor: string;
  backgroundColor: string;
  onPress?: () => void;
  disabled?: boolean;
};

const MainButton: React.FC<props> = ({ text, textColor, backgroundColor, onPress, disabled }) => {
  return (
    <Button
      backgroundColor={backgroundColor}
      onPress={onPress}
      shadowColor="#000"
      shadowOffset={{ height: 2, width: 0 }}
      shadowOpacity={0.25}
      shadowRadius={3.84}
      elevation={2}
      disabled={disabled}>
      <ButtonText color={textColor} fontSize={16}>
        {text}
      </ButtonText>
    </Button>
  );
};

export default MainButton;
