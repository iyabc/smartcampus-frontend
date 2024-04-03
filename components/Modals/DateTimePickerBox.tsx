import { Dispatch, FC, SetStateAction, useState } from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Text, View } from 'tamagui';

import { ButtonOutlined, ButtonText } from '~/tamagui.config';

type DatePickerBoxProps = {
  label: string;
  date: Date | undefined;
  setSelectedDate: Dispatch<SetStateAction<Date | undefined>>;
  isRequired: boolean;
  mode: 'date' | 'time' | 'datetime' | undefined;
  minimumDate?: Date | undefined;
  maximumDate?: Date | undefined;
};

const DateTimePickerBox: FC<DatePickerBoxProps> = ({
  label,
  date,
  setSelectedDate,
  isRequired,
  mode,
  minimumDate,
  maximumDate,
}) => {
  const [isDateTimeVisible, setIsDateTimeVisible] = useState(false);

  const showDateTimePicker = () => {
    setIsDateTimeVisible(true);
  };

  const hideDateTimePicker = () => {
    setIsDateTimeVisible(false);
  };

  const handleDatePicked = (date: Date) => {
    setSelectedDate(date);
    hideDateTimePicker();
  };

  // const formattedDate = date !== undefined ? `${date.toLocaleDateString()} ` : '';
  // const formattedTime = date !== undefined ? `${date.toLocaleTimeString()}` : '';

  return (
    <View>
      <Text fontSize="$5" marginBottom={4}>
        {isRequired && <Text color="$red">*</Text>}
        {label}
      </Text>
      <ButtonOutlined
        onPress={showDateTimePicker}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center">
        <ButtonText color="$black">{date ? date.toDateString() : ''}</ButtonText>
        <ButtonText color="$black">{date ? date.toTimeString() : ''}</ButtonText>
      </ButtonOutlined>
      <DateTimePicker
        isVisible={isDateTimeVisible}
        onConfirm={handleDatePicked}
        onCancel={hideDateTimePicker}
        mode={mode}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
      />
    </View>
  );
};

export default DateTimePickerBox;
