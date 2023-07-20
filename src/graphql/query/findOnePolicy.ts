import { gql } from "../generated";

export const FIND_ONE_POLICY = gql(/* GraphQL */ `
  query findOnePolicy($findOnePolicyId: Int, $policyKind: PolicyKind) {
    findOnePolicy(id: $findOnePolicyId, policyKind: $policyKind) {
      id
      policyKind
      title
      content
      createdAt
      updatedAt
    }
  }
`);
