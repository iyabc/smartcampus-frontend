import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList } from 'react-native';
import { View } from 'tamagui';

import AddEditReservationForm from '~/components/Forms/AddEditReservationForm';
import PageHeader from '~/components/Headers/PageHeader';
import PageWrapper from '~/components/UI/PageWrapper';
import { useUser } from '~/contexts/UserContext';
import {
  InputOutlined,
  ReservationCardButton,
  TextWhite,
  XStackSpaceBetween,
} from '~/tamagui.config';
import { getFacility } from '~/utils/facilities';
import { getSecureValue } from '~/utils/secureStore';
import { Reservation, ReservationWithDetails } from '~/utils/types';

const ReservationCard = ({
  reservation,
  onPress,
}: {
  reservation: ReservationWithDetails;
  onPress: () => void;
}) => {
  const { user } = useUser();

  const startDate = new Date(reservation.reservation.startDate).toLocaleString();
  const endDate = new Date(reservation.reservation.endDate).toLocaleString();

  return (
    <ReservationCardButton key={reservation.reservation.id} onPress={onPress}>
      <XStackSpaceBetween>
        <TextWhite>Name</TextWhite>
        <TextWhite>{user?.fullName}</TextWhite>
      </XStackSpaceBetween>
      <XStackSpaceBetween>
        <TextWhite>Facility</TextWhite>
        <TextWhite>{reservation.facilityName}</TextWhite>
      </XStackSpaceBetween>
      <XStackSpaceBetween>
        <TextWhite>Start</TextWhite>
        <TextWhite>{startDate}</TextWhite>
      </XStackSpaceBetween>
      <XStackSpaceBetween>
        <TextWhite>End</TextWhite>
        <TextWhite>{endDate}</TextWhite>
      </XStackSpaceBetween>
    </ReservationCardButton>
  );
};

const ViewEditReservation = () => {
  const { user } = useUser();
  const [selectedReservation, setSelectedReservation] = useState<
    ReservationWithDetails | undefined
  >(undefined);
  const [searchText, setSearchText] = useState<string>('');
  const [shownReservations, setShownReservations] = useState<ReservationWithDetails[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<ReservationWithDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchFacility = async (id: number) => {
    try {
      const token = await getSecureValue('accessToken');
      if (token) {
        const fetchedFacility = await getFacility(id, token);
        return fetchedFacility;
      }
    } catch (error: any) {
      Alert.alert(error.message);
      return null;
    }
  };

  const handleOnPress = (reservation: ReservationWithDetails) => {
    setSelectedReservation(reservation);
  };

  useEffect(() => {
    setLoading(true);
    if (!user) {
      setLoading(false);
      return;
    }

    if (searchText === '') {
      setFilteredReservations(shownReservations);
      setLoading(false);
      return;
    }

    const loweredSearchText = searchText.toLowerCase();

    const filtered =
      shownReservations &&
      shownReservations.filter((reservation: ReservationWithDetails) => {
        const startDate = new Date(reservation.reservation.startDate).toLocaleString();
        const endDate = new Date(reservation.reservation.endDate).toLocaleString();

        return (
          reservation.facilityName.toLowerCase().includes(loweredSearchText) ||
          startDate.toLowerCase().includes(searchText) ||
          endDate.toLowerCase().includes(searchText)
        );
      });

    setFilteredReservations(filtered);
    setLoading(false);
  }, [searchText]);

  useEffect(() => {
    try {
      setLoading(true);

      if (!user) {
        setLoading(false);
        return;
      }
      const fetchDetails = async () => {
        const reservationsWithDetailsPromises = user.Reservation.map(
          async (reservation: Reservation) => {
            const facility = await fetchFacility(reservation.facilityId);
            return { reservation, facilityName: facility.name };
          }
        );

        const reservationsWithDetails = await Promise.all(reservationsWithDetailsPromises);
        setShownReservations(reservationsWithDetails);
        setFilteredReservations(reservationsWithDetails);
      };

      fetchDetails();
    } catch (error: any) {
      Alert.alert('Error fetching facility details.');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <PageWrapper>
      <PageHeader title="Edit Reservation" />
      {!selectedReservation && (
        <InputOutlined
          placeholder="Search reservations"
          value={searchText}
          onChangeText={(query: string) => setSearchText(query)}
          variant="primary"
          margin={10}
        />
      )}
      {!loading ? (
        !selectedReservation ? (
          <FlatList
            data={filteredReservations}
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
                  },
                  facilityName: item.item.facilityName,
                }}
                onPress={() => handleOnPress(item.item)}
              />
            )}
          />
        ) : (
          selectedReservation && (
            <AddEditReservationForm
              type="EDIT"
              reservation={selectedReservation}
              onPressBack={() => setSelectedReservation(undefined)}
            />
          )
        )
      ) : (
        <View>
          <ActivityIndicator />
        </View>
      )}
    </PageWrapper>
  );
};

export default ViewEditReservation;
