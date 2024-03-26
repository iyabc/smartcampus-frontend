import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { Dispatch, FC, SetStateAction } from 'react';
import { Button, ButtonText, Dialog, ScrollView, Text, View, YStack } from 'tamagui';

import { ButtonOutlined } from '~/tamagui.config';

type SelectModalProps = {
  label: string;
  items: any[];
  selectedItem: any;
  isRequired: boolean;
  onChange: Dispatch<SetStateAction<any>>;
};

const SelectModal: FC<SelectModalProps> = ({
  label,
  items,
  selectedItem,
  isRequired,
  onChange,
}) => {
  return (
    <Dialog>
      <Dialog.Trigger>
        <YStack>
          <Text fontSize="$5" marginBottom={4}>
            <View display={isRequired ? 'block' : 'none'}>
              <Text color="$red">*</Text>
            </View>
            {label}
          </Text>
          <ButtonOutlined height={40} paddingHorizontal={20}>
            <ButtonText color="$black">{selectedItem?.name}</ButtonText>
          </ButtonOutlined>
        </YStack>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay key="DialogOverlay" />
        <Dialog.Content backgroundColor="$white" borderRadius="$radius.large" key="DialogContent">
          <Dialog.Close alignSelf="flex-end">
            <AntDesign name="closecircle" size={24} color="red" />
          </Dialog.Close>
          <Dialog.Title fontSize="$7" color="$black" alignSelf="center">
            <FontAwesome5 name="door-open" size={18} color="black" />
            {label}
          </Dialog.Title>
          <View height={200}>
            <ScrollView>
              {items.map((item: any, index: number) => (
                <Dialog.Close displayWhenAdapted asChild key={index} onPress={() => onChange(item)}>
                  <Button
                    theme="active"
                    aria-label="Close"
                    borderColor="gray"
                    backgroundColor="$white">
                    <Text>{item.name}</Text>
                  </Button>
                </Dialog.Close>
              ))}
            </ScrollView>
          </View>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export default SelectModal;
