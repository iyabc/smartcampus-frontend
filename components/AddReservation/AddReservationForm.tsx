import { router } from 'expo-router';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Alert, ToastAndroid } from 'react-native';
import { Form, View, XStack } from 'tamagui';

import MainButton from '../Buttons/MainButton';
import DateTimePickerBox from '../UI/DateTimePickerBox';
import EquipmentFormModal from '../UI/EquipmentFormModal';
import FormGroup from '../UI/FormGroup';
import SelectModal from '../UI/SelectModal';

import { useFacilities } from '~/contexts/FacilitiesContext';
import { useUser } from '~/contexts/UserContext';
import { addReservation } from '~/utils/reservation';
import { getSecureValue } from '~/utils/secureStore';
import { Equipment, Facility, Reservation } from '~/utils/types';

const AddReservationForm = () => {
  const [name, setName] = useState<string>('');
  const [idNum, setIdnum] = useState<string>('');
  const [facility, setFacility] = useState<Facility | undefined>(undefined);
  const [equipments, setEquipments] = useState<Equipment[] | undefined>(undefined);
  const [startDateTime, setStartDateTime] = useState<Date>(new Date());
  const [endDateTime, setEndDateTime] = useState<Date>(new Date());
  const [isEquipmentFormModalOpen, setEquipmentFormModalOpen] = useState<boolean>(false);

  const { facilities } = useFacilities();
  const { user } = useUser();

  const handleSubmit = async () => {
    const formData: Reservation = {
      userId: user?.id || '',
      fullName: name,
      idNum,
      facilityId: facility?.id || 0,
      department: '',
      purpose: '',
      startDate: startDateTime,
      endDate: endDateTime,
      status: 'PENDING',
      equipments: equipments?.map((equipment: Equipment) => equipment.name) || [],
      equipmentQty: equipments?.map((equipment: Equipment) => Number(equipment.quantity)) || [],
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

  const handleChange =
    <T extends string | Date>(setter: Dispatch<SetStateAction<T>>) =>
    (value: T) => {
      setter(value);
    };

  return (
    <Form onSubmit={handleSubmit} height="100%" gap={10}>
      <FormGroup label="Full Name" onChange={handleChange(setName)} isRequired />
      <FormGroup label="ID Number" onChange={handleChange(setIdnum)} isRequired />
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
      <MainButton onPress={handleSubmit} text="Submit" textColor="$white" backgroundColor="$red" />
    </Form>
  );
};

export default AddReservationForm;
