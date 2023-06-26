import { gql } from "@apollo/client";

export const TOGGLE_FEEDBACK_BY_USER = gql`
  mutation toggleFeedbackByUser(
    $feedbackKind: FeedbackKind!
    $receiverIdentity: String!
  ) {
    toggleFeedbackByUser(
      feedbackKind: $feedbackKind
      receiverIdentity: $receiverIdentity
    ) {
      id
      feedbackKind
      createdAt
    }
  }
`;
