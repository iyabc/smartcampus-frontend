import { View } from 'tamagui';

import AddReservationForm from '~/components/AddReservation/AddReservationForm';
import PageHeader from '~/components/Headers/PageHeader';
import PageWrapper from '~/components/UI/PageWrapper';

const AddReservation = () => {
  return (
    <PageWrapper>
      <PageHeader title="Add Reservation Form" />
      <View marginTop={20}>
        <AddReservationForm />
      </View>
    </PageWrapper>
  );
};

export default AddReservation;
