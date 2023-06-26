import { gql } from "@apollo/client";

export const FIND_PASSWORD = gql`
  query findPassword(
    $identity: String!
    $hash: String!
    $phone: String!
    $newPassword: String!
  ) {
    findPassword(
      identity: $identity
      hash: $hash
      phone: $phone
      newPassword: $newPassword
    )
  }
`;
