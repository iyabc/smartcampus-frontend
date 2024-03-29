import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Text, View, XStack, YStack, createAlertDialogScope } from 'tamagui';

import PerDateReservationsListBox from '../Dashboard/PerDateReservationsListBox';
import StaffDashboardHeader from '../Headers/StaffDashboardHeader';
import DateTimePickerBox from '../Modals/DateTimePickerBox';

import { useUser } from '~/contexts/UserContext';
import { Container, InputOutlined, tokens } from '~/tamagui.config';
import { getFacility } from '~/utils/facilities';
import { getAllReservations } from '~/utils/reservation';
import { getSecureValue } from '~/utils/secureStore';
import { GroupedReservations, Reservation, ReservationWithDetails } from '~/utils/types';

const StaffDashboard = () => {
  const { user } = useUser();
  const [selectedReservation, setSelectedReservation] = useState<
    ReservationWithDetails | undefined
  >(undefined);
  const [searchText, setSearchText] = useState<string>('');
  const [reservations, setReservations] = useState<GroupedReservations>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

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
        const groupedReservations = groupReservationsByDate(reservationsWithDetails);
        setReservations(groupedReservations);
      } catch (error: any) {
        setIsError(true);
        Alert.alert('Error fetching reservations.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchReservations();
    }
  }, [user]);

  const groupReservationsByDate = (fetchedReservations: ReservationWithDetails[]) => {
    const groupedReservations: { [key: string]: ReservationWithDetails[] } = {};
    fetchedReservations.forEach((reservation: ReservationWithDetails) => {
      const startDate = new Date(reservation.reservation.startDate).toLocaleDateString();
      if (!groupedReservations[startDate]) {
        groupedReservations[startDate] = [];
      }
      groupedReservations[startDate].push(reservation);
    });
    return groupedReservations;
  };

  const handleOnPress = (reservation: ReservationWithDetails) => {
    setSelectedReservation(reservation);
  };

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
          <YStack gap={20}>
            <XStack justifyContent="space-between">
              <Ionicons name="filter" size={24} color={tokens.color.black.val} />
              <Ionicons name="notifications" size={24} color={tokens.color.black.val} />
            </XStack>
            <InputOutlined
              placeholder="Search reservations"
              value={searchText}
              onChangeText={(query: string) => setSearchText(query)}
              variant="primary"
            />
            <DateTimePickerBox
              label="Select Date"
              date={selectedDate ? selectedDate : new Date()}
              setSelectedDate={setSelectedDate}
              isRequired={false}
              mode="date"
            />
          </YStack>
        </View>
        <Container justifyContent="flex-start" alignItems="stretch" padding={0}>
          <PerDateReservationsListBox
            date={selectedDate}
            reservations={reservations}
            handleOnPress={handleOnPress}
          />
        </Container>
      </Container>
    </Container>
  );
};

export default StaffDashboard;
