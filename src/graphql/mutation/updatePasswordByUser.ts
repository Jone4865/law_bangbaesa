import { gql } from "../generated";

export const UPDATE_PASSWORD_BY_USER = gql(/* GraphQL */ `
  mutation updatePasswordByUser(
    $originPassword: String!
    $newPassword: String!
  ) {
    updatePasswordByUser(
      originPassword: $originPassword
      newPassword: $newPassword
    ) {
      identity
      createdAt
      level
      connectionDate
      phone
    }
  }
`);
