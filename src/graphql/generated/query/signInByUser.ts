import { gql } from "@apollo/client";

export const SIGN_IN_BY_SUER = gql`
  query signInByUser($identity: String!, $password: String!) {
    signInByUser(identity: $identity, password: $password) {
      accessToken
      refreshToken
    }
  }
`;
