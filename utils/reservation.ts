import { BACKEND_URL } from '@env';

import { Reservation } from './types';

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

    const data = await response.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};
