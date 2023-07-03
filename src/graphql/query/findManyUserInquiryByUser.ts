import { gql } from "../generated";

export const FIND_MANY_USER_INQUIRY_BY_USER = gql(/* GraphQL */ `
  query findManyUserInquiryByUser($take: Int!, $skip: Int!) {
    findManyUserInquiryByUser(take: $take, skip: $skip) {
      totalCount
      userInquiries {
        id
        title
        content
        reply
        repliedAt
        createdAt
      }
    }
  }
`);
