import * as SecureStore from 'expo-secure-store';

export const saveSecureValue = async (key: string, value: any) => {
  await SecureStore.setItemAsync(key, value);
};

export const getSecureValue = async (key: string) => {
  const value = await SecureStore.getItemAsync(key);
  if (value) {
    return value;
  }

  return null;
};

export const deleteSecureValue = async (key: string) => {
  await SecureStore.deleteItemAsync(key);
};
