import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { Text, View } from 'tamagui';

import { ButtonOutlined, ButtonText } from '~/tamagui.config';

type DatePickerBoxProps = {
  label: string;
  setDelectedDate: Dispatch<SetStateAction<Date>>;
  isRequired: boolean;
};

const DateTimePickerBox: FC<DatePickerBoxProps> = ({ label, setDelectedDate, isRequired }) => {
  const [date, setDate] = useState<Date>(new Date());

  const openDatePickHandler = () => {
    DateTimePickerAndroid.open({
      mode: 'date',
      value: date,
      onChange: (event: any, newDate: any) => {
        if (newDate) {
          DateTimePickerAndroid.open({
            mode: 'time',
            value: newDate,
            onChange: (_, newDateTime) => {
              if (newDateTime) {
                setDate(newDateTime);
                setDelectedDate(newDateTime);
              }
            },
          });
        }
      },
    });
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
        onPress={openDatePickHandler}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center">
        <ButtonText color="$black">{formattedDate}</ButtonText>
        <ButtonText color="$black">{formattedTime}</ButtonText>
      </ButtonOutlined>
    </View>
  );
};

export default DateTimePickerBox;
