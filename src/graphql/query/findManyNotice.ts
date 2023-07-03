import { gql } from "../generated";

export const FIND_MANY_NOTICE = gql(/* GraphQL */ `
  query findManyNotice(
    $take: Int!
    $skip: Int!
    $searchText: String!
    $searchKind: NoticeSearchKind
  ) {
    findManyNotice(
      take: $take
      skip: $skip
      searchText: $searchText
      searchKind: $searchKind
    ) {
      totalCount
      notices {
        id
        title
        content
        createdAt
        hits
      }
    }
  }
`);
