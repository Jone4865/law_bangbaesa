import { gql } from "@apollo/client";

export const UPDATE_USER_INQUIRY_ID = gql`
  mutation updateUserInquiryId(
    $updateUserInquiryId: ID!
    $title: String!
    $content: String!
  ) {
    updateUserInquiry(
      id: $updateUserInquiryId
      title: $title
      content: $content
    )
  }
`;
