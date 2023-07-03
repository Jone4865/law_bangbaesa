import { gql } from "../generated";

export const VERIFY_ORIGIN_PASSWORD_BY_USER = gql(/* GraphQL */ `
  query verifyOriginPasswordByUser($password: String!) {
    verifyOriginPasswordByUser(password: $password)
  }
`);
