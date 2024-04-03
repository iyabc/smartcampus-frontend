import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { Text, View } from 'tamagui';

import StaffReservationButton from '../Buttons/StaffReservationButton';
import StaffDashboardHeader from '../Headers/StaffDashboardHeader';

import { Container } from '~/tamagui.config';
import { getFacility } from '~/utils/facilities';
import { getAllReservations } from '~/utils/reservation';
import { getSecureValue } from '~/utils/secureStore';
import { Facility, Reservation, ReservationWithDetails } from '~/utils/types';

const StaffDashboard = () => {
  const [selectedReservation, setSelectedReservation] = useState<
    ReservationWithDetails | undefined
  >(undefined);
  const [searchText, setSearchText] = useState<string>('');
  const [reservations, setReservations] = useState<ReservationWithDetails[]>([]);
  const [shownReservations, setShownReservations] = useState<ReservationWithDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | undefined>(undefined);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | undefined>(undefined);
  const [selectedFacility, setSelectedFacility] = useState<Facility | undefined>(undefined);

  const handleOnPress = (reservation: ReservationWithDetails) => {
    setSelectedReservation(reservation);
  };

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      try {
        const token = await getSecureValue('accessToken');
        if (!token) {
          throw new Error('Access token not found');
        }

        const fetchedReservations = await getAllReservations(token);
        const reservationsWithDetailsPromises = fetchedReservations.map(
          async (reservation: Reservation) => {
            const facility = await getFacility(reservation.facilityId, token);
            return { reservation, facilityName: facility.name };
          }
        );

        const reservationsWithDetails = await Promise.all(reservationsWithDetailsPromises);
        setReservations(reservationsWithDetails);
        setShownReservations(reservationsWithDetails);
      } catch (error: any) {
        setIsError(true);
        Alert.alert('Error fetching reservations.');
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  useEffect(() => {
    if (!selectedStartDate && !selectedEndDate && !selectedFacility) {
      setShownReservations(reservations);
    }
  }, [selectedStartDate, selectedEndDate, selectedFacility]);

  if (isError) {
    router.replace('/');
  }

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Container padding={0} backgroundColor="$blue">
      <Container padding={0} backgroundColor="$white" justifyContent="flex-start">
        <StaffDashboardHeader />
        <View paddingTop={10} paddingHorizontal="$space.large">
          {/* <YStack gap={20}>
            <XStack justifyContent="space-between">
              <StaffDashboardFilterModal
                selectedStartDate={selectedStartDate}
                selectedEndDate={selectedEndDate}
                setSelectedStartDate={setSelectedStartDate}
                setSelectedEndDate={setSelectedEndDate}
                selectedFacility={selectedFacility}
                setSelectedFacility={setSelectedFacility}
                reservations={shownReservations}
                setReservations={setShownReservations}
              />
              <Ionicons name="notifications" size={24} color={tokens.color.black.val} />
            </XStack>
            <InputOutlined
              placeholder="Search reservations"
              value={searchText}
              onChangeText={(query: string) => setSearchText(query)}
              variant="primary"
            />
          </YStack> */}
        </View>
        <Container justifyContent="flex-start" alignItems="stretch" padding={0}>
          <FlatList
            data={shownReservations}
            contentContainerStyle={{ paddingHorizontal: 10, gap: 10 }}
            renderItem={(item) => (
              <StaffReservationButton
                reservation={item.item}
                onPress={() => handleOnPress(item.item)}
              />
            )}
          />
        </Container>
      </Container>
    </Container>
  );
};

export default StaffDashboard;
