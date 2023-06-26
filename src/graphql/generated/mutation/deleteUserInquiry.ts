import { gql } from "@apollo/client";

export const DLETE_USET_INQUIRY = gql`
  mutation deleteUserInquiry($deleteUserInquiryId: ID!) {
    deleteUserInquiry(id: $deleteUserInquiryId)
  }
`;
