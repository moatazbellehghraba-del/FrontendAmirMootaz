import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      accessToken
      refreshToken
    }
  }
`;
export const VERIFY_EMAIL = gql`
  mutation VerifyEmail($email: String!, $code: String!) {
    verifyEmail(email: $email, code: $code) {
      accessToken
      refreshToken
    }
  }
`;
export const REGISTER = gql`
  mutation Register($input: CreateClientInput!) {
    register(input: $input) {
      message
    }
  }
`;
// old register funcion
// export const REGISTER = gql`
//   mutation Register($input: CreateClientInput!) {
//     register(input: $input) {
//       accessToken
//       refreshToken
//     }
//   }
// `;
export const REFRESH_TOKEN = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      accessToken
    }
  }
`;
