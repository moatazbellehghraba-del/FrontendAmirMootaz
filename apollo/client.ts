import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import API_URL from '../config/api';

import {
  getAccessToken,
  getRefreshToken,
  saveTokens,
  deleteTokens,
} from '../utils/secureStore';

import { REFRESH_TOKEN } from '../graphql/auth/mutations/auth';

// -------------------------
// TYPES FOR REFRESH TOKEN
// -------------------------
interface RefreshTokenResponse {
  refreshToken: {
    accessToken: string;
    refreshToken: string;
  };
}

// -------------------------
// REFRESH CLIENT (NO AUTH)
// -------------------------
const refreshClient = new ApolloClient({
  link: createHttpLink({ uri: API_URL.dev }),
  cache: new InMemoryCache(),
});

// -------------------------
// MAIN HTTP LINK
// -------------------------
const httpLink = createHttpLink({
  uri: API_URL.dev,
});

// -------------------------
// AUTH LINK (ADDS TOKEN + REFRESH LOGIC)
// -------------------------
const authLink = setContext(async (_, { headers }) => {
  let accessToken = await getAccessToken();

  // -------------------------
  // If NO access token → try refresh
  // -------------------------
  if (!accessToken) {
    const refresh = await getRefreshToken();

    if (refresh) {
      try {
        const result = await refreshClient.mutate<RefreshTokenResponse>({
          mutation: REFRESH_TOKEN,
          variables: { refreshToken: refresh },
        });

        const newTokens = result.data?.refreshToken;

        if (newTokens?.accessToken && newTokens?.refreshToken) {
          await saveTokens(newTokens.accessToken, newTokens.refreshToken);

          accessToken = newTokens.accessToken;
        } else {
          accessToken = null;
          await deleteTokens();
        }
      } catch (error) {
        console.log('Refresh failed:', error);
        accessToken = null;
        await deleteTokens();
      }
    }
  }

  // -------------------------
  // RETURN HEADERS
  // -------------------------
  return {
    headers: {
      ...headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

// -------------------------
// MAIN CLIENT
// -------------------------
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
