import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Form, ScrollView, View } from 'tamagui';

import MainButton from '../Buttons/MainButton';
import DateTimePickerBox from '../Modals/DateTimePickerBox';
import EquipmentFormModal from '../Modals/EquipmentFormModal';
import SelectModal from '../Modals/SelectModal';
import FormGroup from '../UI/FormGroup';

import { useFacilities } from '~/contexts/FacilitiesContext';
import { useUser } from '~/contexts/UserContext';
import { XStackSpaceBetween } from '~/tamagui.config';
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
  onPressBack?: () => void;
}) => {
  const [facility, setFacility] = useState<Facility>();
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [startDateTime, setStartDateTime] = useState<Date | undefined>(undefined);
  const [endDateTime, setEndDateTime] = useState<Date | undefined>(undefined);
  const [professorName, setProfessorName] = useState<string>('');
  const [classGrade, setClassGrade] = useState<string>('');
  const [isEquipmentFormModalOpen, setEquipmentFormModalOpen] = useState<boolean>(false);
  const { facilities } = useFacilities();
  const { user } = useUser();

  const handleSubmit = async () => {
    if (!startDateTime || !endDateTime) {
      return;
    }

    let formData: Reservation = {
      userId: user?.id || '',
      facilityId: facility?.id || 0,
      department: '',
      purpose: '',
      startDate: startDateTime,
      endDate: endDateTime,
      equipments: equipments?.map((equipment) => equipment.name),
      equipmentQty: equipments?.map((equipment) => Number(equipment.quantity)),
      professorName: user?.role === 'STUDENT' ? professorName : undefined,
      classGrade: user?.role === 'TEACHER' ? classGrade : undefined,
    };

    if (type === 'ADD') {
      formData = {
        ...formData,
        fullName: user?.fullName || '',
        id: user?.idNum || '',
      };
    }

    try {
      const token = await getSecureValue('accessToken');
      if (token) {
        if (type === 'ADD') {
          await addReservation(formData, token);
        } else if (type === 'EDIT' && reservation?.reservation.id) {
          await editReservation(formData, reservation.reservation.id, token);
        }
        router.replace('/');
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  useEffect(() => {
    if (type === 'EDIT' && reservation) {
      setFacility({ id: reservation.reservation.facilityId, name: reservation.facilityName });
      setEquipments(
        reservation.reservation.equipments.map((name, index) => ({
          name,
          quantity: reservation.reservation.equipmentQty[index],
        }))
      );
      setStartDateTime(new Date(reservation.reservation.startDate));
      setEndDateTime(new Date(reservation.reservation.endDate));
      if (reservation.reservation.professorName) {
        setProfessorName(reservation.reservation.professorName);
      }
      if (reservation.reservation.classGrade) {
        setClassGrade(reservation.reservation.classGrade);
      }
    }
  }, [reservation, type]);

  return (
    <Form height="100%" gap={10} onSubmit={() => {}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 200}>
        <ScrollView contentContainerStyle={{ gap: 10 }}>
          <FormGroup
            label="Full Name"
            onChange={() => {}}
            value={user?.fullName}
            isDisabled
            isRequired
          />
          <FormGroup
            label="ID Number"
            onChange={() => {}}
            value={user?.idNum}
            isDisabled
            isRequired
          />
          <XStackSpaceBetween gap={20} alignItems="center">
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
                isReadOnly={false}
              />
            </View>
          </XStackSpaceBetween>
          <XStackSpaceBetween gap={20}>
            <View flex={1}>
              <DateTimePickerBox
                label="Start"
                setSelectedDate={setStartDateTime}
                isRequired
                date={startDateTime}
                mode="datetime"
                minimumDate={new Date()}
                maximumDate={endDateTime && endDateTime}
              />
            </View>
            <View flex={1}>
              <DateTimePickerBox
                label="End"
                setSelectedDate={setEndDateTime}
                isRequired
                date={endDateTime}
                mode="datetime"
                minimumDate={startDateTime && startDateTime}
              />
            </View>
          </XStackSpaceBetween>
          <FormGroup
            label={
              user?.role === 'STUDENT'
                ? "Professor's Name"
                : 'Class Grade and Section (e.g 12 Section)'
            }
            value={user?.role === 'STUDENT' ? professorName : classGrade}
            onChange={(value: string) =>
              user?.role === 'STUDENT' ? setProfessorName(value) : setClassGrade(value)
            }
            isRequired
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <View marginTop={20} flexDirection="column" gap={10}>
        <MainButton
          onPress={handleSubmit}
          text={type === 'ADD' ? 'Submit' : 'Save Changes'}
          textColor="$white"
          backgroundColor="$red"
        />
        {type === 'EDIT' && onPressBack && (
          <MainButton
            onPress={onPressBack}
            text="Back"
            textColor="$white"
            backgroundColor="$grey"
          />
        )}
      </View>
    </Form>
  );
};

export default AddEditReservationForm;
