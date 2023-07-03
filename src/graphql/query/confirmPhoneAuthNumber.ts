import { gql } from "../generated";

export const CONFIRM_PHONE_AUTH_NUMBER = gql(/* GraphQL */ `
  query confirmPhoneAuthNumber(
    $phone: String!
    $authNumber: String!
    $identity: String
  ) {
    confirmPhoneAuthNumber(
      phone: $phone
      authNumber: $authNumber
      identity: $identity
    )
  }
`);
