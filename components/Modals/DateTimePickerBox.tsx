import { Dispatch, FC, SetStateAction, useState } from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Text, View } from 'tamagui';

import { ButtonOutlined, ButtonText } from '~/tamagui.config';

type DatePickerBoxProps = {
  label: string;
  date: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  isRequired: boolean;
  mode: 'date' | 'time' | 'datetime' | undefined;
};

const DateTimePickerBox: FC<DatePickerBoxProps> = ({
  label,
  date,
  setSelectedDate,
  isRequired,
  mode,
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

  const formattedDate = `${date.toLocaleDateString()} `;
  const formattedTime = `${date.toLocaleTimeString()}`;

  return (
    <View>
      <Text fontSize="$5" marginBottom={4}>
        <View display={isRequired ? 'block' : 'none'}>
          <Text color="$red">*</Text>
        </View>
        {label}
      </Text>
      <ButtonOutlined
        onPress={showDateTimePicker}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center">
        <ButtonText color="$black">{formattedDate}</ButtonText>
        <ButtonText color="$black">{formattedTime}</ButtonText>
      </ButtonOutlined>
      <DateTimePicker
        isVisible={isDateTimeVisible}
        onConfirm={handleDatePicked}
        onCancel={hideDateTimePicker}
        mode={mode}
      />
    </View>
  );
};

export default DateTimePickerBox;
