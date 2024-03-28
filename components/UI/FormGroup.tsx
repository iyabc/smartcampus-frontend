import { Dispatch, SetStateAction } from 'react';
import { KeyboardTypeOptions } from 'react-native';
import { YStack, Text, View } from 'tamagui';

import { InputOutlined } from '~/tamagui.config';

const FormGroup = ({
  label,
  value,
  isRequired,
  onChange,
  type,
  isDisabled,
}: {
  label: string;
  value?: any;
  isRequired: boolean;
  onChange: Dispatch<SetStateAction<any>>;
  type?: KeyboardTypeOptions | undefined;
  isDisabled?: boolean;
}) => {
  return (
    <YStack>
      <Text fontSize="$5" marginBottom={4}>
        <View display={isRequired ? 'block' : 'none'}>
          <Text color="$red">*</Text>
        </View>
        {label}
      </Text>
      <InputOutlined
        onChangeText={onChange}
        height={40}
        value={value}
        keyboardType={type}
        readOnly={isDisabled}
        variant={isDisabled ? 'disabled' : 'primary'}
      />
    </YStack>
  );
};

export default FormGroup;
