import { gql } from "../generated";

export const SIGN_IN_BY_SUER = gql(/* GraphQL */ `
  query signInByUser($identity: String!, $password: String!) {
    signInByUser(identity: $identity, password: $password) {
      accessToken
      refreshToken
    }
  }
`);
