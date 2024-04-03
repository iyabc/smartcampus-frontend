import { BACKEND_URL } from '@env';
import { AuthError } from '@supabase/supabase-js';

import { deleteSecureValue } from './secureStore';
import { supabase } from './supabase';
import { UserType } from './types';

const errorHandler = (error: AuthError | null) => {
  if (error) {
    throw new Error(error.message);
  }
};

export const signIn = async (email: string, password: string, role: UserType) => {
  const { data: session, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  errorHandler(error);

  const supabaseId = session.session?.user.id;
  const body = { supabaseId, email, password, role };

  const response = await fetch(`${BACKEND_URL}/auth/sign-in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Error in fetching user.');
  }

  const accessToken = response.headers.get('x-access-token');

  const data = await response.json();

  if (!accessToken) {
    return { data, accessToken: '' };
  }

  return { data, accessToken };
};

export const signUp = async (email: string, password: string, role: UserType) => {
  const { data: session, error } = await supabase.auth.signUp({
    email,
    password,
  });

  errorHandler(error);

  const supabaseId = session.session?.user.id;
  const body = { supabaseId, email, password, role };

  const response = await fetch(`${BACKEND_URL}/auth/sign-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Error registering.');
  }

  const accessToken = response.headers.get('x-access-token');

  const data = await response.json();

  if (!accessToken) {
    return { data, accessToken: '' };
  }

  return { data, accessToken };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  errorHandler(error);

  try {
    await deleteSecureValue('accessToken');
  } catch {
    throw new Error('Access token not found');
  }
};
