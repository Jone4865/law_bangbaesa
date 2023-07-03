import { gql } from "../generated";

export const FIND_USER_INFO_BY_USER = gql(/* GraphQL */ `
  query findUserInfoByUser($identity: String!) {
    findUserInfoByUser(identity: $identity) {
      identity
      level
      connectionDate
      positiveFeedbackCount
      negativeFeedbackCount
    }
  }
`);
