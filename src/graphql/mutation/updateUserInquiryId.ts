import { gql } from "../generated";

export const UPDATE_USER_INQUIRY_ID = gql(/* GraphQL */ `
  mutation updateUserInquiry(
    $updateUserInquiryId: Int!
    $title: String!
    $content: String!
  ) {
    updateUserInquiry(
      id: $updateUserInquiryId
      title: $title
      content: $content
    )
  }
`);
