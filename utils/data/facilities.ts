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
