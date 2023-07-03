import { gql } from "../generated";

export const FIND_ONE_NOTICE = gql(/* GraphQL */ `
  query findOneNotice($findOneNoticeId: Int!) {
    findOneNotice(id: $findOneNoticeId) {
      id
      title
      content
      createdAt
      hits
    }
  }
`);
