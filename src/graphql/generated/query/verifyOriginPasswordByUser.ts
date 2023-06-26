import { gql } from "@apollo/client";

export const VERIFY_ORIGIN_PASSWORD_BY_USER = gql`
  query verifyOriginPasswordByUser($password: String!) {
    verifyOriginPasswordByUser(password: $password)
  }
`;
