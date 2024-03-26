import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { Alert, AppState } from 'react-native';

import Dashboard from './Dashboard';
import HomeScreen from './HomeScreen';

import { useFacilities } from '~/contexts/FacilitiesContext';
import { useSession } from '~/contexts/SessionContext';
import { useUser } from '~/contexts/UserContext';
import { getAllFacilities } from '~/utils/data/facilities';
import { getCurrentUser } from '~/utils/fetch/userFetch';
import { getSecureValue } from '~/utils/secureStore';
import { supabase } from '~/utils/supabase';
import { UserFull, Facility } from '~/utils/types';

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const Index = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserFull | undefined>(undefined);
  const [facilities, setFacilities] = useState<Facility[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { changeSession } = useSession();
  const { changeFacilities } = useFacilities();
  const { changeUser } = useUser();

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const token = await getSecureValue('accessToken');
      const userId = await getSecureValue('userId');
      if (token === null || userId === null) {
        return;
      }
      const fetchedUser = await getCurrentUser(userId, token);
      const fetchedFacilities = await getAllFacilities(token);

      if (!fetchedUser || !fetchedFacilities) {
        return;
      }

      setUser(fetchedUser);
      setFacilities(fetchedFacilities);
    } catch (error: any) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    changeSession(session);
    changeFacilities(facilities);
    changeUser(user);
  }, [session, facilities, user]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      fetchDetails();
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      fetchDetails();
    });
  }, []);

  return (
    <>
      {session && session.user && user ? (
        <Dashboard currentUser={user} />
      ) : (
        <HomeScreen loading={loading} />
      )}
    </>
  );
};

export default Index;
