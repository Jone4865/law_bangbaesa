import { gql } from "../generated";

export const FIND_ONE_USER_INQUIRY_BY_USER = gql(/* GraphQL */ `
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
`);
