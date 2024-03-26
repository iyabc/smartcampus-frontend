import { Session } from '@supabase/supabase-js';
import { Alert } from 'react-native';

import { supabase } from './supabase';

export const getProfile = async (session: Session | null) => {
  try {
    if (!session?.user) throw new Error('No user on the session!');

    const { data, error, status } = await supabase
      .from('User')
      .select(`username, email`)
      .eq('id', session.user.id)
      .single();
    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      return { username: data.username, email: data.email };
    }
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert(error.message);
    }
  } finally {
    return;
  }
};
