import { gql } from "../generated";

export const CHECK_DUPLICATE_IDENTITY = gql(/* GraphQL */ `
  query checkDuplicateIdentity($identity: String!) {
    checkDuplicateIdentity(identity: $identity)
  }
`);
