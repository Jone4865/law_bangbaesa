import { gql } from "../generated";

export const FIND_MANY_BANNER = gql(/* GraphQL */ `
  query findManyBanner {
    findManyBanner {
      id
      index
      pcFileName
      mobileFileName
      arrowColor
      dotColor
      path
      createdAt
    }
  }
`);
