import { gql } from "@apollo/client";

export const SEND_MAIL_AUTH_NUMBER = gql`
  query sendMailAuthNumber($email: String!) {
    sendMailAuthNumber(email: $email)
  }
`;
