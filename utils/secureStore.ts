import * as SecureStore from 'expo-secure-store';
const CURRENT_USER = "currentUser";
export const saveTokens = async (accessToken: string | null, refreshToken: string | null) => {
  await SecureStore.setItemAsync("accessToken", accessToken ?? "");
  await SecureStore.setItemAsync("refreshToken", refreshToken ?? "");
};
export const saveCurrentUser = async (user: any) => {
  await SecureStore.setItemAsync(CURRENT_USER, JSON.stringify(user));
};
export const getCurrentUser = async (): Promise<any | null> => {
  const data = await SecureStore.getItemAsync(CURRENT_USER);
  return data ? JSON.parse(data) : null;
};
export const getAccessToken = async (): Promise<string | null> =>
  await SecureStore.getItemAsync("accessToken");

export const getRefreshToken = async (): Promise<string | null> =>
  await SecureStore.getItemAsync("refreshToken");

export const deleteTokens = async () => {
  await SecureStore.deleteItemAsync("accessToken");
  await SecureStore.deleteItemAsync("refreshToken");
   
};
export const deleteCurrentUser = async () => {
  await SecureStore.deleteItemAsync(CURRENT_USER);
};