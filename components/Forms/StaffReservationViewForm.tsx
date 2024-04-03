import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Form, Text, View, XStack, YStack } from 'tamagui';

import MainButton from '../Buttons/MainButton';
import EquipmentFormModal from '../Modals/EquipmentFormModal';
import FormGroup from '../UI/FormGroup';

import { InputOutlined, XStackSpaceBetween } from '~/tamagui.config';
import { cancelReservation, confirmReservation } from '~/utils/reservation';
import { getSecureValue } from '~/utils/secureStore';
import { Equipment, ReservationWithDetails } from '~/utils/types';

const StaffReservationViewForm = ({
  reservation,
  hideModal,
}: {
  reservation: ReservationWithDetails;
  hideModal: () => void;
}) => {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [isEquipmentFormModalOpen, setEquipmentFormModalOpen] = useState<boolean>(false);

  const handleApproveOnPress = async () => {
    const token = await getSecureValue('accessToken');
    const id = reservation.reservation.id;
    if (token && id) {
      await confirmReservation(id, token);
      hideModal();
    }
  };

  const handleCancelOnPress = async () => {
    const token = await getSecureValue('accessToken');
    const id = reservation.reservation.id;
    if (token && id) {
      await cancelReservation(id, token);
      hideModal();
    }
  };

  useEffect(() => {
    if (reservation) {
      setEquipments(
        reservation.reservation.equipments.map((name, index) => ({
          name,
          quantity: reservation.reservation.equipmentQty[index],
        }))
      );
    }
  }, [reservation]);

  return (
    <Form gap={10} onSubmit={() => {}}>
      <View height={400}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 200}>
          <ScrollView contentContainerStyle={{ gap: 10 }}>
            <FormGroup
              label="Full Name"
              onChange={() => {}}
              value={reservation.reservation.fullName}
              isDisabled
              isRequired={false}
            />
            <FormGroup
              label="ID Number"
              onChange={() => {}}
              value={reservation.reservation.userId}
              isDisabled
              isRequired={false}
            />
            <XStackSpaceBetween gap={20} alignItems="center">
              <View flex={1}>
                <FormGroup
                  label="Facility"
                  isRequired={false}
                  onChange={() => {}}
                  value={reservation.facilityName}
                  isDisabled
                />
              </View>
              <View flex={1}>
                <EquipmentFormModal
                  setEquipments={setEquipments}
                  initialEquipments={equipments}
                  isOpen={isEquipmentFormModalOpen}
                  setIsOpen={setEquipmentFormModalOpen}
                  isReadOnly
                />
              </View>
            </XStackSpaceBetween>
            <YStack gap={10}>
              <View>
                <Text marginBottom={5}>Start</Text>
                <InputOutlined
                  value={
                    reservation.reservation.endDate
                      ? new Date(reservation.reservation.endDate).toLocaleString()
                      : ''
                  }
                  readOnly
                  backgroundColor="$colorTransparent"
                  multiline
                  disabled
                />
              </View>
              <View>
                <Text marginBottom={5}>End</Text>
                <InputOutlined
                  value={
                    reservation.reservation.endDate
                      ? new Date(reservation.reservation.endDate).toLocaleString()
                      : ''
                  }
                  readOnly
                  backgroundColor="$colorTransparent"
                  multiline
                  disabled
                />
              </View>
            </YStack>
            {reservation.reservation.professorName && (
              <FormGroup
                label="Professor"
                isRequired={false}
                onChange={() => {}}
                value={reservation.reservation.professorName}
              />
            )}
            {reservation.reservation.classGrade && (
              <FormGroup
                label="Class"
                isRequired={false}
                onChange={() => {}}
                value={reservation.reservation.classGrade}
              />
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      <XStack gap={10} marginTop={20}>
        <View flex={1}>
          <MainButton
            onPress={handleCancelOnPress}
            text="Not Available"
            textColor="$white"
            backgroundColor="$red"
          />
        </View>
        <View flex={1}>
          <MainButton
            onPress={handleApproveOnPress}
            text="Approve"
            textColor="$white"
            backgroundColor="$blue"
          />
        </View>
      </XStack>
    </Form>
  );
};

export default StaffReservationViewForm;
