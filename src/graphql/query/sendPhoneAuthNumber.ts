import { gql } from "../generated";

export const SEND_PHONE_AUTH_NUMBER = gql(/* GraphQL */ `
  query sendPhoneAuthNumber($countryCode: String!, $phone: String!) {
    sendPhoneAuthNumber(countryCode: $countryCode, phone: $phone)
  }
`);
