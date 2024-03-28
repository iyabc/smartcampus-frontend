import { AntDesign, FontAwesome5, FontAwesome, Entypo } from '@expo/vector-icons';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Dialog, ScrollView, Text, View, YStack, XStack, ButtonText } from 'tamagui';

import FormGroup from './FormGroup';
import MainButton from '../Buttons/MainButton';

import { ButtonOutlined, InputOutlined, tokens } from '~/tamagui.config';
import { Equipment } from '~/utils/types';

const EquipmentFormModal = ({
  initialEquipments,
  setEquipments,
  isOpen,
  setIsOpen,
}: {
  initialEquipments: Equipment[] | undefined;
  setEquipments: Dispatch<SetStateAction<Equipment[]>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [equipmentInputs, setEquipmentInputs] = useState<Equipment[] | undefined>(
    initialEquipments
  );
  const [currentEquipmentName, setCurrentEquipmentName] = useState<string>('');
  const [currentEquipmentQuantity, setCurrentEquipmentQuantity] = useState<number>(0);

  useEffect(() => {
    setEquipmentInputs(initialEquipments);
  }, [initialEquipments]);

  const addEquipmentInput = () => {
    if (currentEquipmentQuantity.toString().includes('.') || isNaN(currentEquipmentQuantity)) {
      Alert.alert('Quantity can only be a whole number.');
      return;
    }

    const currentEquipment: Equipment = {
      name: currentEquipmentName,
      quantity: currentEquipmentQuantity,
    };

    if (
      !currentEquipmentName ||
      currentEquipmentName.length === 0 ||
      currentEquipmentQuantity <= 0
    ) {
      Alert.alert('Required Fields', 'Equipment name and quantity are required.');
      return;
    }

    const isDuplicateName = equipmentInputs?.some(
      (equipment) => equipment.name.toLowerCase() === currentEquipmentName.toLowerCase()
    );

    if (isDuplicateName) {
      Alert.alert('Duplicate Name', 'An equipment with this name already exists.');
      return;
    }

    setCurrentEquipmentName('');
    setCurrentEquipmentQuantity(0);

    setEquipmentInputs((equipmentInputs) => [...(equipmentInputs || []), currentEquipment]);
  };

  const deleteEquipmentInput = (indexToDelete: number) => {
    setEquipmentInputs((currentEquipmentInputs) => {
      return currentEquipmentInputs?.filter((_, index) => index !== indexToDelete) || [];
    });
  };

  const handleSubmitOnPress = () => {
    if (initialEquipments === equipmentInputs && equipmentInputs && equipmentInputs?.length > 0) {
      Alert.alert('No Equipment Added', 'Please add at least one equipment before submitting.');
    } else if (equipmentInputs && equipmentInputs.length > 0) {
      setEquipments(equipmentInputs);
      handleModalClose();
    } else {
      Alert.alert('No Equipment Added', 'Please add at least one equipment before submitting.');
    }
  };

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen}>
      <Dialog.Trigger onPress={handleModalOpen}>
        <YStack>
          <Text fontSize="$5" marginBottom={4}>
            Equipment
          </Text>
          <ButtonOutlined height={40} paddingHorizontal={20}>
            <ButtonText color="$black">
              {equipmentInputs && equipmentInputs.length > 0 && equipmentInputs[0].name}
            </ButtonText>
          </ButtonOutlined>
        </YStack>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay key="DialogOverlay" />
        <Dialog.Content
          backgroundColor="$white"
          borderRadius="$radius.large"
          key="DialogContent"
          width="90%">
          <Dialog.Close alignSelf="flex-end">
            <AntDesign
              name="closecircle"
              size={24}
              color={tokens.color.grey.val}
              onPress={handleModalClose}
            />
          </Dialog.Close>
          <Dialog.Title fontSize="$7" color="$black" alignSelf="center">
            <FontAwesome5 name="toolbox" size={24} color="black" />
            Equipment
          </Dialog.Title>
          <ScrollView height="50%" paddingHorizontal={10}>
            <XStack gap={10} alignItems="center" marginBottom={20}>
              <View flex={1}>
                <FormGroup
                  label="Name"
                  value={currentEquipmentName}
                  onChange={(value: string) => setCurrentEquipmentName(value)}
                  isRequired
                  isDisabled={false}
                />
              </View>
              <View flex={1}>
                <FormGroup
                  label="Quantity"
                  value={currentEquipmentQuantity.toString()}
                  onChange={(value: number) => setCurrentEquipmentQuantity(value)}
                  type="number-pad"
                  isRequired
                  isDisabled={false}
                />
              </View>
              <View marginTop={25} alignItems="center">
                <Entypo
                  name="circle-with-plus"
                  size={24}
                  color="green"
                  onPress={addEquipmentInput}
                />
              </View>
            </XStack>
            {equipmentInputs &&
              equipmentInputs.map((equipment: Equipment, index: number) => (
                <XStack
                  gap={20}
                  key={index}
                  alignItems="center"
                  justifyContent="center"
                  marginBottom={20}>
                  <View flex={1}>
                    <InputOutlined value={equipment.name} variant="disabled" readOnly />
                  </View>
                  <View flex={1}>
                    <InputOutlined
                      value={equipment.quantity.toString()}
                      variant="disabled"
                      readOnly
                    />
                  </View>
                  <View>
                    <FontAwesome
                      name="minus-circle"
                      size={24}
                      color={tokens.color.red.val}
                      onPress={() => deleteEquipmentInput(index)}
                    />
                  </View>
                </XStack>
              ))}
          </ScrollView>
          <XStack gap={10}>
            <View flex={1}>
              <MainButton
                text="Cancel"
                textColor="$white"
                backgroundColor="$grey"
                onPress={handleModalClose}
              />
            </View>
            <View flex={1}>
              <MainButton
                text="Submit"
                textColor="$white"
                backgroundColor="$red"
                onPress={handleSubmitOnPress}
              />
            </View>
          </XStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export default EquipmentFormModal;
