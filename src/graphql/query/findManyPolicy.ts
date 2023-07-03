import { gql } from "../generated";

export const FIND_MANY_POLICY = gql(/* GraphQL */ `
  query findManyPolicy($take: Int!) {
    findManyPolicy(take: $take) {
      totalCount
      policies {
        id
        policyKind
        title
        content
        createdAt
        updatedAt
      }
    }
  }
`);
