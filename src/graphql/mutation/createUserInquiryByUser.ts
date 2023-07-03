import { gql } from "../generated";

export const CREATE_USER_INQUIRY_BY_USER = gql(/* GraphQL */ `
  mutation createUserInquiryByUser($title: String!, $content: String!) {
    createUserInquiryByUser(title: $title, content: $content) {
      id
      title
      content
      reply
      repliedAt
      createdAt
    }
  }
`);
