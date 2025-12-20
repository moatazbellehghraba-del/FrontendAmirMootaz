import { gql } from "@apollo/client";

export const GET_CURRENT_CLIENT = gql`
  query GetCurrentClient {
    me {
      _id
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
