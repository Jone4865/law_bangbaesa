import { gql } from "../generated";

export const CREATE_PASSPORT = gql(/* GraphQL */ `
  mutation createPassport(
    $name: String!
    $passportNumber: String!
    $issueDate: String!
    $expirationDate: String!
    $birth: String!
  ) {
    createPassport(
      name: $name
      passportNumber: $passportNumber
      issueDate: $issueDate
      expirationDate: $expirationDate
      birth: $birth
    ) {
      id
      name
      passportNumber
      issueDate
      expirationDate
      birth
    }
  }
`);
