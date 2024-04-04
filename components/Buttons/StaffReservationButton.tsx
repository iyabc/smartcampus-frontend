import { ButtonText, Text, View, XStack, YStack } from 'tamagui';

import StaffReservationModal from '../Modals/StaffReservationModal';

import { Button } from '~/tamagui.config';
import { ReservationWithDetails } from '~/utils/types';

const StaffReservationButton = ({
  reservation,
  onPress,
}: {
  reservation: ReservationWithDetails;
  onPress: () => void;
}) => {
  const startDate = new Date(reservation.reservation.startDate).toLocaleTimeString();
  const endDate = new Date(reservation.reservation.endDate).toLocaleTimeString();
  const status = reservation.reservation.status;

  return (
    <Button
      key={reservation.reservation.id}
      onPress={onPress}
      borderBottomWidth={1}
      borderColor="$grey"
      borderRadius={0}>
      <XStack justifyContent="space-between" width="85%">
        <YStack>
          <Text>{reservation.reservation.userId}</Text>
          <Text>{reservation.facilityName}</Text>
          <Text>
            {startDate} - {endDate}
          </Text>
          {reservation.reservation.classGrade && <Text>{reservation.reservation.classGrade}</Text>}
          {reservation.reservation.professorName && (
            <Text>{reservation.reservation.professorName}</Text>
          )}
          <XStack alignItems="center" gap={7} padding={4} marginTop={5}>
            <View
              backgroundColor={
                status === 'CONFIRMED' ? 'green' : status === 'CANCELLED' ? '$red' : '$grey'
              }
              height={10}
              width={10}
              borderRadius="$radius.full"
            />
            <ButtonText color="$black">{status}</ButtonText>
          </XStack>
        </YStack>
        <StaffReservationModal reservation={reservation} />
      </XStack>
    </Button>
  );
};

export default StaffReservationButton;
