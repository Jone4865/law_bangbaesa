import { gql } from "../generated";

export const UPDATE_PHPONE_NUMBER_BY_USER = gql(/* GraphQL */ `
  mutation updatePhoneNumberByUser(
    $hash: String!
    $countryCode: String!
    $phone: String!
  ) {
    updatePhoneNumberByUser(
      hash: $hash
      countryCode: $countryCode
      phone: $phone
    ) {
      identity
      createdAt
      walletAddress
      level
      connectionDate
      countryCode
      phone
    }
  }
`);
