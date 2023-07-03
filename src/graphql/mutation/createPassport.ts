import { gql } from "../generated";

export const CREATE_PASSPORT = gql(/* GraphQL */ `
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
`);
