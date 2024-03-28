import { router } from 'expo-router';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Alert, ToastAndroid } from 'react-native';
import { Form, View, XStack, YStack } from 'tamagui';

import MainButton from '../Buttons/MainButton';
import DateTimePickerBox from '../UI/DateTimePickerBox';
import EquipmentFormModal from '../UI/EquipmentFormModal';
import FormGroup from '../UI/FormGroup';
import SelectModal from '../UI/SelectModal';

import { useFacilities } from '~/contexts/FacilitiesContext';
import { useUser } from '~/contexts/UserContext';
import { addReservation, editReservation } from '~/utils/reservation';
import { getSecureValue } from '~/utils/secureStore';
import { Equipment, Facility, Reservation, ReservationWithDetails } from '~/utils/types';

const AddEditReservationForm = ({
  type,
  reservation,
  onPressBack,
}: {
  type: 'ADD' | 'EDIT';
  reservation?: ReservationWithDetails;
  onPressBack?: Dispatch<SetStateAction<Reservation | undefined>>;
}) => {
  const [facility, setFacility] = useState<Facility | undefined>(undefined);
  const [equipments, setEquipments] = useState<Equipment[] | undefined>(undefined);
  const [startDateTime, setStartDateTime] = useState<Date>(new Date());
  const [endDateTime, setEndDateTime] = useState<Date>(new Date());
  const [isEquipmentFormModalOpen, setEquipmentFormModalOpen] = useState<boolean>(false);

  const { facilities } = useFacilities();
  const { user } = useUser();

  const handleSubmitAdd = async () => {
    const formData: Reservation = {
      userId: user?.id,
      fullName: user?.fullName,
      facilityId: facility?.id || 0,
      department: '',
      purpose: '',
      startDate: startDateTime,
      endDate: endDateTime,
      status: 'PENDING',
      equipments: equipments?.map((equipment: Equipment) => equipment.name) || [],
      equipmentQty: equipments?.map((equipment: Equipment) => Number(equipment.quantity)) || [],
      filingDate: '',
      id: user?.idNum || '',
    };

    try {
      const token = await getSecureValue('accessToken');
      if (token) {
        await addReservation(formData, token);
        ToastAndroid.show(
          `Reservation for facility ${formData.facilityId} added.`,
          ToastAndroid.CENTER
        );
        router.replace('/');
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const handleSubmitEdit = async () => {
    if (!reservation) {
      return;
    }

    const formData: Reservation = {
      userId: user?.id,
      facilityId: facility?.id || 0,
      department: '',
      purpose: '',
      startDate: startDateTime,
      endDate: endDateTime,
      status: reservation.reservation.status,
      equipments: equipments?.map((equipment: Equipment) => equipment.name) || [],
      equipmentQty: equipments?.map((equipment: Equipment) => Number(equipment.quantity)) || [],
      filingDate: reservation?.reservation.filingDate,
    };

    try {
      const token = await getSecureValue('accessToken');
      if (token && reservation.reservation.id) {
        await editReservation(formData, reservation.reservation.id, token);
        ToastAndroid.show(`Reservation edited.`, ToastAndroid.CENTER);
        router.replace('/');
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  useEffect(() => {
    if (type === 'EDIT' && reservation) {
      setFacility({ id: Number(reservation.reservation.id), name: reservation.facilityName });
      setEquipments(
        reservation.reservation.equipments.map((name, index) => ({
          name,
          quantity: reservation.reservation.equipmentQty[index],
        }))
      );
      setStartDateTime(new Date(reservation.reservation.startDate));
      setEndDateTime(new Date(reservation.reservation.endDate));
    }
  }, [reservation, type]);

  return (
    <Form height="100%" gap={10} onSubmit={() => {}}>
      <FormGroup
        label="Full Name"
        onChange={() => {}}
        value={user?.fullName}
        isDisabled
        isRequired
      />
      <FormGroup label="ID Number" onChange={() => {}} value={user?.idNum} isDisabled isRequired />
      <XStack gap={20}>
        <View flex={1}>
          <SelectModal
            label="Facility"
            isRequired={false}
            onChange={setFacility}
            selectedItem={facility}
            items={facilities}
          />
        </View>
        <View flex={1}>
          <EquipmentFormModal
            setEquipments={setEquipments}
            initialEquipments={equipments}
            isOpen={isEquipmentFormModalOpen}
            setIsOpen={setEquipmentFormModalOpen}
          />
        </View>
      </XStack>
      <XStack gap={20}>
        <View flex={1}>
          <DateTimePickerBox
            label="Start"
            setSelectedDate={setStartDateTime}
            isRequired
            date={startDateTime}
          />
        </View>
        <View flex={1}>
          <DateTimePickerBox
            label="End"
            setSelectedDate={setEndDateTime}
            isRequired
            date={endDateTime}
          />
        </View>
      </XStack>
      <YStack marginTop={20} gap={10}>
        <MainButton
          onPress={type === 'ADD' ? handleSubmitAdd : handleSubmitEdit}
          text="Submit"
          textColor="$white"
          backgroundColor="$red"
        />
        {type === 'EDIT' && onPressBack && (
          <MainButton
            onPress={() => onPressBack(undefined)}
            text="Back"
            textColor="$white"
            backgroundColor="$grey"
          />
        )}
      </YStack>
    </Form>
  );
};

export default AddEditReservationForm;
