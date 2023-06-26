import { gql } from "@apollo/client";

export const CREATE_PASSPORT = gql`
  mutation createPassport(
    $passportNumber: String!
    $issueDate: String!
    $expirationDate: String!
  ) {
    createPassport(
      passportNumber: $passportNumber
      issueDate: $issueDate
      expirationDate: $expirationDate
    ) {
      id
      passportNumber
      issueDate
      expirationDate
    }
  }
`;
