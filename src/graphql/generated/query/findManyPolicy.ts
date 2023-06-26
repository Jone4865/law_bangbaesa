import { gql } from "@apollo/client";

export const FIND_MANY_POLICY = gql`
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
`;
