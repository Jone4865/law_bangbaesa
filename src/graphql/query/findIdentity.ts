import { gql } from "../generated";

export const FIND_IDENTITY = gql(/* GraphQL */ `
  query findIdentity($hash: String!, $countryCode: String!, $phone: String!) {
    findIdentity(hash: $hash, countryCode: $countryCode, phone: $phone)
  }
`);
