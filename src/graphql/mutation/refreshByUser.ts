import { gql } from "../generated";

export const REFRESH_BY_USER = gql(/* GraphQL */ `
  mutation refreshByUser {
    refreshByUser {
      accessToken
      refreshToken
    }
  }
`);
