import { Dispatch, FC, SetStateAction, useState } from 'react';
import { View, Text } from 'react-native';
import { Select } from 'tamagui';

type SelectBoxProps = {
  label: string;
  items: any[];
  setSelectedItem: Dispatch<SetStateAction<any>>;
};

const SelectBox: FC<SelectBoxProps> = ({ label, items, setSelectedItem }) => {
  const [value, setValue] = useState<{ name: string }>(items[0]);

  const handleOnChange = (newValue: any) => {
    setValue(newValue);
    setSelectedItem(newValue);
  };

  return (
    <View>
      <Text>{label}</Text>
      <Select
        defaultValue={value.name}
        onValueChange={(newValue: string) => handleOnChange(newValue)}>
        <Select.Trigger
          backgroundColor="$colorTransparent"
          borderWidth={1}
          borderColor="$black"
          width="100%"
          borderRadius="$radius.medium">
          <Select.Value color="$black">{value.name}</Select.Value>
        </Select.Trigger>
        <Select.Content>
          <Select.ScrollUpButton />
          <Select.Viewport>
            <Select.Group>
              <Select.Label />
              {items.map((item: { name: string }, index: number) => (
                <Select.Item index={index} key={index} value={item.name}>
                  <Select.ItemText>{item.name}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton />
        </Select.Content>
      </Select>
    </View>
  );
};

export default SelectBox;
