import { FlatList } from 'react-native';
import { View } from 'tamagui';

import StaffReservationButton from '../Buttons/StaffReservationButton';

import { TextWhite } from '~/tamagui.config';
import { GroupedReservations, ReservationWithDetails } from '~/utils/types';

const ByDateReservationsListBox = ({
  reservations,
  startDate,
  endDate,
  handleOnPress,
}: {
  reservations: GroupedReservations;
  startDate: Date;
  endDate: Date;
  handleOnPress: (reservation: ReservationWithDetails) => void;
}) => {
  const startDateString: string = new Date(startDate).toLocaleDateString();
  const endDateString: string = new Date(endDate).toLocaleDateString();

  const isDateBetween = (startDate: Date, endDate: Date, targetDate: Date) => {
    return targetDate >= startDate && targetDate <= endDate;
  };

  const filteredReservations: ReservationWithDetails[] = [];
  for (const dateKey in reservations) {
    const reservationsForDate = reservations[dateKey];
    if (isDateBetween(startDate, endDate, new Date(dateKey))) {
      filteredReservations.push(...reservationsForDate);
    }
  }

  return (
    <>
      <View backgroundColor="$grey" marginVertical={15}>
        <TextWhite>
          {startDateString}- {endDateString}
        </TextWhite>
      </View>
      <FlatList
        data={filteredReservations}
        contentContainerStyle={{ paddingHorizontal: 10, gap: 10 }}
        renderItem={(item) => (
          <StaffReservationButton
            reservation={item.item}
            onPress={() => handleOnPress(item.item)}
          />
        )}
      />
    </>
  );
};

export default ByDateReservationsListBox;
