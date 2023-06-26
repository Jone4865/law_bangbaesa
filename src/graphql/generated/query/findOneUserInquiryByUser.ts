import { gql } from "@apollo/client";

export const FIND_ONE_USER_INQUIRY_BY_USER = gql`
  query findOneUserInquiryByUser($findOneUserInquiryByUserId: Float!) {
    findOneUserInquiryByUser(id: $findOneUserInquiryByUserId) {
      id
      title
      content
      reply
      repliedAt
      createdAt
    }
  }
`;
