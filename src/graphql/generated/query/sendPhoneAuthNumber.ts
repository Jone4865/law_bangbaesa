import { gql } from "@apollo/client";

export const SEND_PHONE_AUTH_NUMBER = gql`
  query sendPhoneAuthNumber($phone: String!) {
    sendPhoneAuthNumber(phone: $phone)
  }
`;
