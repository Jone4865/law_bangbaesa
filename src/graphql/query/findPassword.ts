import { gql } from "../generated";

export const FIND_PASSWORD = gql(/* GraphQL */ `
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
`);
