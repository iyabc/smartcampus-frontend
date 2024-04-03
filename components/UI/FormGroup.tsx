import { Dispatch, SetStateAction } from 'react';
import { KeyboardTypeOptions } from 'react-native';
import { YStack, Text } from 'tamagui';

import { InputOutlined } from '~/tamagui.config';

const FormGroup = ({
  label,
  value,
  isRequired,
  onChange,
  type,
  isDisabled,
  isMultiline,
}: {
  label: string;
  value?: any;
  isRequired: boolean;
  onChange: Dispatch<SetStateAction<any>>;
  type?: KeyboardTypeOptions | undefined;
  isDisabled?: boolean;
  isMultiline?: boolean;
}) => {
  return (
    <YStack>
      <Text fontSize="$5" marginBottom={4}>
        {isRequired && <Text color="$red">*</Text>}
        {label}
      </Text>
      <InputOutlined
        onChangeText={onChange}
        height={40}
        value={value}
        keyboardType={type}
        readOnly={isDisabled}
        variant={isDisabled ? 'disabled' : 'primary'}
        multiline={isMultiline}
      />
    </YStack>
  );
};

export default FormGroup;
