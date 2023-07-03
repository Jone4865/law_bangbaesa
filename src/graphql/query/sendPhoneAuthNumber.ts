import { gql } from "../generated";

export const SEND_PHONE_AUTH_NUMBER = gql(/* GraphQL */ `
  query sendPhoneAuthNumber($phone: String!) {
    sendPhoneAuthNumber(phone: $phone)
  }
`);
