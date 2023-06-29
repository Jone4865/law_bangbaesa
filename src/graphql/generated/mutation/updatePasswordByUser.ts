import { gql } from "@apollo/client";

export const UPDATE_PASSWORD_BY_USER = gql`
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
`;
