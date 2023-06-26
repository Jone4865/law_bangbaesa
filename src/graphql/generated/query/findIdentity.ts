import { gql } from "@apollo/client";

export const FIND_IDENTITY = gql`
  query findIdentity($hash: String!, $phone: String!) {
    findIdentity(hash: $hash, phone: $phone)
  }
`;
