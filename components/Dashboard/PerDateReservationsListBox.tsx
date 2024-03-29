import { FlatList } from 'react-native';
import { Text, View, XStack, YStack } from 'tamagui';

import { Button, TextWhite } from '~/tamagui.config';
import { GroupedReservations, ReservationWithDetails } from '~/utils/types';

const PerDateReservationsListBox = ({
  reservations,
  date,
  handleOnPress,
}: {
  reservations: GroupedReservations;
  date: Date;
  handleOnPress: (reservation: ReservationWithDetails) => void;
}) => {
  const dateString: string = new Date(date).toLocaleDateString();

  const reservationsForSelectedDate = reservations[dateString] || [];

  return (
    <>
      <View backgroundColor="$grey" marginVertical={15}>
        <TextWhite>{dateString}</TextWhite>
      </View>
      <FlatList
        data={reservationsForSelectedDate}
        contentContainerStyle={{ paddingHorizontal: 10, gap: 10 }}
        renderItem={(item) => (
          <ReservationCard
            reservation={{
              reservation: {
                department: item.item.reservation.department,
                endDate: item.item.reservation.endDate,
                equipmentQty: item.item.reservation.equipmentQty,
                equipments: item.item.reservation.equipments,
                facilityId: item.item.reservation.facilityId,
                filingDate: item.item.reservation.filingDate,
                id: item.item.reservation.id,
                purpose: item.item.reservation.purpose,
                startDate: item.item.reservation.startDate,
                status: item.item.reservation.status,
                userId: item.item.reservation.userId,
                fullName: item.item.reservation.fullName,
                professorName: item.item.reservation.professorName,
                classGrade: item.item.reservation.classGrade,
              },
              facilityName: item.item.facilityName,
            }}
            onPress={() => handleOnPress(item.item)}
          />
        )}
      />
    </>
  );
};

export default PerDateReservationsListBox;

const ReservationCard = ({
  reservation,
  onPress,
}: {
  reservation: ReservationWithDetails;
  onPress: () => void;
}) => {
  const startDate = new Date(reservation.reservation.startDate).toLocaleTimeString();
  const endDate = new Date(reservation.reservation.endDate).toLocaleTimeString();

  return (
    <Button
      key={reservation.reservation.id}
      onPress={onPress}
      borderBottomWidth={1}
      borderColor="$grey"
      borderRadius={0}>
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
      </YStack>
    </Button>
  );
};
