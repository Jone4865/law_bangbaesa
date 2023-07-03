import { gql } from "../generated";

export const FIND_IDENTITY = gql(/* GraphQL */ `
  query findIdentity($hash: String!, $phone: String!) {
    findIdentity(hash: $hash, phone: $phone)
  }
`);
