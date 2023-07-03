import { gql } from "../generated";

export const UPDATE_PHPONE_NUMBER_BY_USER = gql(/* GraphQL */ `
  mutation updatePhoneNumberByUser($hash: String!, $phone: String!) {
    updatePhoneNumberByUser(hash: $hash, phone: $phone) {
      identity
      createdAt
      level
      connectionDate
      phone
    }
  }
`);
