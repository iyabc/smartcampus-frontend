import { BACKEND_URL } from '@env';

import { Reservation } from './types';

export const getAllReservations = async (accessToken: string) => {
  const response = await fetch(`${BACKEND_URL}/reservations`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error('Error fetching reservations.');
  }

  const result = await response.json();

  return result;
};

export const getReservation = async (id: string, accessToken: string) => {
  const response = await fetch(`${BACKEND_URL}/reservations/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error('Error fetching reservation details.');
  }

  const result = await response.json();

  return result;
};

export const addReservation = async (reservation: Reservation, accessToken: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(reservation),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'An unknown error occurred');
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const editReservation = async (
  reservation: Reservation,
  id: string,
  accessToken: string
) => {
  try {
    const response = await fetch(`${BACKEND_URL}/reservations/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(reservation),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'An unknown error occurred');
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
