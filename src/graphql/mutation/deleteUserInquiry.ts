import { gql } from "../generated";

export const DLETE_USET_INQUIRY = gql(/* GraphQL */ `
  mutation deleteUserInquiry($deleteUserInquiryId: Int!) {
    deleteUserInquiry(id: $deleteUserInquiryId)
  }
`);
