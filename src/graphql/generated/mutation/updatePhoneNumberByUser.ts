import { gql } from "@apollo/client";

export const UPDATE_PHPONE_NUMBER_BY_USER = gql`
  mutation updatePhoneNumberByUser($hash: String!, $phone: String!) {
    updatePhoneNumberByUser(hash: $hash, phone: $phone) {
      id
      identity
      createdAt
      level
      connectionDate
      phone
    }
  }
`;
