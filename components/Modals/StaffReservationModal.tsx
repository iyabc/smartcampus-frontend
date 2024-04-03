import AntDesign from '@expo/vector-icons/build/AntDesign';
import SimpleLineIcons from '@expo/vector-icons/build/SimpleLineIcons';
import React, { useState } from 'react';
import { Dialog, YStack } from 'tamagui';

import StaffReservationViewForm from '../Forms/StaffReservationViewForm';

import { ReservationWithDetails } from '~/utils/types';

const StaffReservationModal = ({ reservation }: { reservation: ReservationWithDetails }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const startDate = new Date(reservation.reservation.startDate).toLocaleString();
  const endDate = new Date(reservation.reservation.endDate).toLocaleString();

  return (
    <Dialog open={isModalOpen}>
      <Dialog.Trigger>
        <SimpleLineIcons name="options-vertical" size={24} color="black" onPress={showModal} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay key="DialogOverlay" />
        <Dialog.Content
          key="DialogContent"
          backgroundColor="$white"
          borderRadius="$radius.large"
          width="75%"
          paddingVertical={30}>
          <Dialog.Close>
            <YStack alignItems="flex-end" marginBottom={5}>
              <AntDesign name="closecircle" size={24} color="black" onPress={hideModal} />
            </YStack>
          </Dialog.Close>
          <StaffReservationViewForm reservation={reservation} hideModal={hideModal} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export default StaffReservationModal;
