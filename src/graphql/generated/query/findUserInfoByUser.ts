import { gql } from "@apollo/client";

export const FIND_USER_INFO_BY_USER = gql`
  query findUserInfoByUser($identity: String!) {
    findUserInfoByUser(identity: $identity) {
      identity
      level
      connectionDate
      positiveFeedbackCount
      negativeFeedbackCount
    }
  }
`;
