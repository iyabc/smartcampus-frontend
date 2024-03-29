import Ionicons from '@expo/vector-icons/build/Ionicons';

import StaffDashboardHeader from '../Headers/StaffDashboardHeader';

import { Container, tokens } from '~/tamagui.config';

const StaffDashboard = () => {
  return (
    <Container padding={0} backgroundColor="$blue">
      <Container padding={0} marginTop={10} backgroundColor="$white">
        <StaffDashboardHeader />

        <Ionicons name="notifications" size={24} color={tokens.color.white.val} />
      </Container>
    </Container>
  );
};

export default StaffDashboard;
