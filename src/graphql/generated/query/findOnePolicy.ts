import { gql } from "@apollo/client";

export const FIND_ONE_POLICY = gql`
  query findOnePolicy($findOnePolicyId: ID, $policyKind: PolicyKind) {
    findOnePolicy(id: $findOnePolicyId, policyKind: $policyKind)
  }
`;
