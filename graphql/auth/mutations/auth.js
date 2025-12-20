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
export const UpdateClientEmail = gql`
  mutation UpdateClientEmail($ClientId: String!, $email: String!) {
    updateClientEmail(ClientId: $ClientId, email: $email) {
      success
      message
    }
  }
`;
export const VerifyUdatedEmail = gql`
  mutation VerifyUpdatedEmail($email: String!, $code: String!) {
    verifyUpdatedEmail(email: $email, code: $code) {
      success
      message
    }
  }
`;
export const UpdateClientData = gql`
  mutation UpdateClient($input: UpdateClientInput!) {
    updateClient(updateClientInput: $input) {
      firstName
      lastName
      phoneNumber
      email
      gender
      dateOfBirth
      profilePhoto
      location {
        lat
        long
      }
      region
      country
      loyaltyPoints
      favorites
      bookings {
        _id
        date
        service
      }
      createdAt
      reviews {
        _id
        rating
        comment
      }
    }
  }
`;
export const RESEND_VerifyEmail = gql`
  mutation ResendVerifyEmail($email: String!) {
    resendVerifyEmail(email: $email) {
      message
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
