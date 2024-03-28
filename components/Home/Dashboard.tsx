import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { YStack } from 'tamagui';

import { Container, tokens } from '../../tamagui.config';

import ButtonWithIcon from '~/components/Buttons/ButtonWithIcon';
import MainButton from '~/components/Buttons/MainButton';
import StudentTeacherHeader from '~/components/Headers/StudentTeacherHeader';
import { useUser } from '~/contexts/UserContext';
import { signOut } from '~/utils/auth';
import { deleteSecureValue } from '~/utils/secureStore';
import { UserFull } from '~/utils/types';

const Dashboard = ({ currentUser }: { currentUser: UserFull }) => {
  const { changeUser } = useUser();
  const iconColor: string = tokens.color.red.val;

  const handleLogout = () => {
    signOut();
    deleteSecureValue('accessToken');
    deleteSecureValue('userId');
    changeUser(undefined);
    router.replace('/');
  };

  useEffect(() => {
    changeUser(currentUser);
  }, [currentUser]);

  return (
    <Container padding={0} backgroundColor="$blue">
      <Container padding={0} marginTop={10} backgroundColor="$white">
        <StudentTeacherHeader />
        <Container marginTop={22} justifyContent="space-around">
          <YStack gap={14} alignItems="center">
            <ButtonWithIcon
              iconName="plus"
              text="Add Reservation"
              color={iconColor}
              href="/add-reservation"
            />
            <ButtonWithIcon
              iconName="eye"
              text="View Reservation"
              color={iconColor}
              href="/view-edit-reservation"
            />
          </YStack>
          <MainButton
            text="Logout"
            textColor="$white"
            backgroundColor="$grey"
            onPress={handleLogout}
          />
        </Container>
      </Container>
    </Container>
  );
};

export default Dashboard;
