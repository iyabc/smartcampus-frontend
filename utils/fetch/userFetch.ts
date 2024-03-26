import { BACKEND_URL } from '@env';

export const getCurrentUser = async (id: string, accessToken: string) => {
  const response = await fetch(`${BACKEND_URL}/users/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error('Error fetching user details.');
  }

  const result = await response.json();

  return result;
};
