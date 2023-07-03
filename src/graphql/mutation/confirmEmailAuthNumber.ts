import { gql } from "../generated";

export const CONFIRM_EMAIL_AUTH_NUMBER = gql(/* GraphQL */ `
  mutation confirmEmailAuthNumber($email: String!, $authNumber: String!) {
    confirmEmailAuthNumber(email: $email, authNumber: $authNumber) {
      id
      email
      createdAt
    }
  }
`);
