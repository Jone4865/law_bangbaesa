import { gql } from "@apollo/client";

export const CONFIRM_PHONE_AUTH_NUMBER = gql`
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
`;
