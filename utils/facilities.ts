import { BACKEND_URL } from '@env';

export const getAllFacilities = async (accessToken: string) => {
  const response = await fetch(`${BACKEND_URL}/facilities`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error('Error fetching facilities.');
  }

  const facilities = await response.json();

  return facilities;
};

export const getFacility = async (id: number, accessToken: string) => {
  const response = await fetch(`${BACKEND_URL}/facilities/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error('Error fetching facility details.');
  }

  const result = await response.json();

  return result;
};
