import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList } from 'react-native';
import { ButtonText, ScrollView, View, XStack, YStack } from 'tamagui';

import StaffReservationButton from '../Buttons/StaffReservationButton';
import StaffDashboardHeader from '../Headers/StaffDashboardHeader';

import { Button, ButtonPill, Container, InputOutlined } from '~/tamagui.config';
import { getFacility } from '~/utils/facilities';
import { getAllReservations } from '~/utils/reservation';
import { getSecureValue } from '~/utils/secureStore';
import { Facility, Reservation, ReservationWithDetails } from '~/utils/types';

const ButtonPillFilter = ({
  text,
  color,
  bg,
  statusColor,
  onPress,
}: {
  text: string;
  color: string;
  bg: string;
  statusColor: string;
  onPress: () => void;
}) => {
  return (
    <ButtonPill bg={`${bg}`} onPress={onPress}>
      <View backgroundColor={`${statusColor}`} height={10} width={10} borderRadius="$radius.full" />
      <ButtonText color={`${color}`}>{text}</ButtonText>
    </ButtonPill>
  );
};

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

  const handlePillFilterPress = (type: string) => {
    const filtered = reservations.filter((reservation: ReservationWithDetails) => {
      return reservation.reservation.status?.toLowerCase() === type;
    });

    setShownReservations(filtered);
  };

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

  useEffect(() => {
    fetchReservations();
  }, []);

  useEffect(() => {
    if (!selectedStartDate && !selectedEndDate && !selectedFacility) {
      setShownReservations(reservations);
    }
  }, [selectedStartDate, selectedEndDate, selectedFacility]);

  useEffect(() => {
    const loweredSearchText = searchText.toLowerCase();
    const filtered = reservations.filter((reservation: ReservationWithDetails) => {
      return (
        reservation.facilityName.toLowerCase().includes(loweredSearchText) ||
        reservation.reservation.classGrade?.toLowerCase().includes(loweredSearchText) ||
        reservation.reservation.status?.toLowerCase().includes(loweredSearchText) ||
        reservation.reservation.department?.toLowerCase().includes(loweredSearchText) ||
        reservation.reservation.fullName?.toLowerCase().includes(loweredSearchText) ||
        reservation.reservation.userId?.toLowerCase().includes(loweredSearchText)
      );
    });

    setShownReservations(filtered);
  }, [searchText]);

  if (isError) {
    router.replace('/');
  }

  return (
    <Container padding={0} backgroundColor="$blue">
      <Container padding={0} backgroundColor="$white" justifyContent="flex-start">
        <StaffDashboardHeader />
        <View paddingTop={10} paddingHorizontal="$space.large">
          <YStack gap={20}>
            <InputOutlined
              placeholder="Search reservations"
              value={searchText}
              onChangeText={(query: string) => setSearchText(query)}
              variant="primary"
            />
            <ScrollView
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}>
              <XStack gap={5} padding={4}>
                <ButtonPillFilter
                  text="Confirmed"
                  color="black"
                  bg="white"
                  statusColor="green"
                  onPress={() => handlePillFilterPress('confirmed')}
                />
                <ButtonPillFilter
                  text="Cancelled"
                  color="black"
                  bg="white"
                  statusColor="red"
                  onPress={() => handlePillFilterPress('cancelled')}
                />
                <ButtonPillFilter
                  text="Pending"
                  color="black"
                  bg="white"
                  statusColor="grey"
                  onPress={() => handlePillFilterPress('pending')}
                />
                <Button bg="$blue" paddingHorizontal={30} onPress={fetchReservations}>
                  <ButtonText>Reset</ButtonText>
                </Button>
              </XStack>
            </ScrollView>
          </YStack>
        </View>
        {loading ? (
          <View marginTop={50}>
            <ActivityIndicator />
          </View>
        ) : (
          <Container justifyContent="flex-start" alignItems="stretch" padding={0} marginTop={20}>
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
        )}
      </Container>
    </Container>
  );
};

export default StaffDashboard;
