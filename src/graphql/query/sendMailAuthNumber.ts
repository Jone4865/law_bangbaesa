import { gql } from "../generated";

export const SEND_MAIL_AUTH_NUMBER = gql(/* GraphQL */ `
  query sendMailAuthNumber($email: String!) {
    sendMailAuthNumber(email: $email)
  }
`);
