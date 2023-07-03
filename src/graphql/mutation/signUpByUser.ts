import { gql } from "../generated";

export const SIGN_UP_BY_USER = gql(/* GraphQL */ `
  mutation signUpByUser(
    $identity: String!
    $password: String!
    $phone: String!
    $hash: String!
    $loginKind: LoginKind!
  ) {
    signUpByUser(
      identity: $identity
      password: $password
      phone: $phone
      hash: $hash
      loginKind: $loginKind
    ) {
      identity
      createdAt
      level
      connectionDate
      phone
    }
  }
`);
