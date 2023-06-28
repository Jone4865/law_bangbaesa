import { gql } from "@apollo/client";

export const REFRESH_BY_USER = gql`
  mutation refreshByUser {
    refreshByUser {
      accessToken
      refreshToken
    }
  }
`;
