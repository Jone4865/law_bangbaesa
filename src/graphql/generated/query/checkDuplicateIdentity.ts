import { gql } from "@apollo/client";

export const CHECK_DUPLICATE_IDENTITY = gql`
  query checkDuplicateIdentity($identity: String!) {
    checkDuplicateIdentity(identity: $identity)
  }
`;
