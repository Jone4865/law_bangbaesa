import { gql } from "@apollo/client";

export const CONFIRM_EMAIL_AUTH_NUMBER = gql`
  mutation confirmEmailAuthNumber($email: String!, $authNumber: String!) {
    confirmEmailAuthNumber(email: $email, authNumber: $authNumber) {
      id
      email
      createdAt
    }
  }
`;
