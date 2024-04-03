import Ionicons from '@expo/vector-icons/build/Ionicons';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { Alert } from 'react-native';
import { Dialog, View, XStack, YStack } from 'tamagui';

import DateTimePickerBox from './DateTimePickerBox';
import SelectModal from './SelectModal';
import MainButton from '../Buttons/MainButton';

import { useFacilities } from '~/contexts/FacilitiesContext';
import { tokens } from '~/tamagui.config';
import { Facility, ReservationWithDetails } from '~/utils/types';

type StaffDashboardFilterModalProps = {
  selectedStartDate: Date | undefined;
  selectedEndDate: Date | undefined;
  setSelectedStartDate: Dispatch<SetStateAction<Date | undefined>>;
  setSelectedEndDate: Dispatch<SetStateAction<Date | undefined>>;
  selectedFacility: Facility | undefined;
  setSelectedFacility: Dispatch<SetStateAction<Facility | undefined>>;
  reservations: ReservationWithDetails[];
  setReservations: Dispatch<SetStateAction<ReservationWithDetails[]>>;
};

const StaffDashboardFilterModal: FC<StaffDashboardFilterModalProps> = ({
  selectedStartDate,
  selectedEndDate,
  setSelectedStartDate,
  setSelectedEndDate,
  selectedFacility,
  setSelectedFacility,
  reservations,
  setReservations,
}) => {
  const { facilities } = useFacilities();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const handleFilterButtonOnPress = () => {
    if (!selectedStartDate && !selectedEndDate && !selectedFacility) {
      Alert.alert('No filter selected.');
      return;
    }

    const filteredReservations = reservations.filter((reservation: ReservationWithDetails) => {
      const reservationStart = new Date(reservation.reservation.startDate);
      const reservationEnd = new Date(reservation.reservation.endDate);

      if (selectedStartDate && selectedEndDate && selectedFacility) {
        return (
          reservationStart >= selectedStartDate &&
          reservationEnd <= selectedEndDate &&
          selectedFacility.id === Number(reservation.reservation.facilityId)
        );
      }

      if (selectedStartDate && selectedEndDate && !selectedFacility) {
        return reservationStart >= selectedStartDate && reservationEnd <= selectedEndDate;
      }

      if (selectedFacility && !selectedStartDate && !selectedEndDate) {
        return selectedFacility.id === Number(reservation.reservation.facilityId);
      }

      return true;
    });

    setReservations(filteredReservations);
    hideModal();
  };

  const handleResetOnClick = () => {
    setSelectedStartDate(undefined);
    setSelectedEndDate(undefined);
    setSelectedFacility(undefined);
    hideModal();
  };

  return (
    <Dialog open={isModalVisible}>
      <Dialog.Trigger>
        <Ionicons name="filter" size={24} color={tokens.color.black.val} onPress={showModal} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay key="DialogOverlay" />
        <Dialog.Content
          key="DialogContent"
          backgroundColor="$white"
          borderRadius="$radius.large"
          width="75%"
          paddingVertical={30}>
          <YStack gap={10} marginBottom={20}>
            <XStack justifyContent="space-between" gap={10}>
              <View flex={1}>
                <DateTimePickerBox
                  label="Start Date"
                  date={selectedStartDate && selectedStartDate}
                  setSelectedDate={setSelectedStartDate}
                  isRequired={false}
                  mode="date"
                  maximumDate={selectedEndDate && selectedEndDate}
                />
              </View>
              <View flex={1}>
                <DateTimePickerBox
                  label="End Date"
                  date={selectedEndDate && selectedEndDate}
                  setSelectedDate={setSelectedEndDate}
                  isRequired={false}
                  mode="date"
                  minimumDate={selectedStartDate && selectedStartDate}
                />
              </View>
            </XStack>
            <SelectModal
              label="Facility"
              items={facilities}
              selectedItem={selectedFacility && selectedFacility}
              isRequired={false}
              onChange={setSelectedFacility}
            />
          </YStack>
          <YStack gap={10}>
            <MainButton
              text="Filter"
              textColor="$white"
              backgroundColor="$blue"
              onPress={handleFilterButtonOnPress}
            />
            <MainButton
              text="Reset"
              textColor="$white"
              backgroundColor="$red"
              onPress={handleResetOnClick}
            />
            <MainButton
              text="Cancel"
              textColor="$white"
              backgroundColor="$grey"
              onPress={hideModal}
            />
          </YStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export default StaffDashboardFilterModal;
