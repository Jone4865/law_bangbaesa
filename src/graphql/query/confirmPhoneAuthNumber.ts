import { gql } from "../generated";

export const CONFIRM_PHONE_AUTH_NUMBER = gql(/* GraphQL */ `
  query confirmPhoneAuthNumber(
    $countryCode: String!
    $phone: String!
    $authNumber: String!
    $identity: String
  ) {
    confirmPhoneAuthNumber(
      countryCode: $countryCode
      phone: $phone
      authNumber: $authNumber
      identity: $identity
    )
  }
`);
