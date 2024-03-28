import { View } from 'tamagui';

import AddEditReservationForm from '~/components/Forms/AddEditReservationForm';
import PageHeader from '~/components/Headers/PageHeader';
import PageWrapper from '~/components/UI/PageWrapper';

const AddReservation = () => {
  return (
    <PageWrapper>
      <PageHeader title="Add Reservation Form" />
      <View marginTop={20}>
        <AddEditReservationForm type="ADD" />
      </View>
    </PageWrapper>
  );
};

export default AddReservation;
