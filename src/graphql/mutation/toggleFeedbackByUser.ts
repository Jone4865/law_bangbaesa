import { gql } from "../generated";

export const TOGGLE_FEEDBACK_BY_USER = gql(/* GraphQL */ `
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
`);
