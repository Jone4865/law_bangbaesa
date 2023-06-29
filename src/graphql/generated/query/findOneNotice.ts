import { gql } from "@apollo/client";

export const FIND_ONE_NOTICE = gql`
  query findOneNotice($findOneNoticeId: Int!) {
    findOneNotice(id: $findOneNoticeId) {
      id
      title
      content
      createdAt
      hits
    }
  }
`;
