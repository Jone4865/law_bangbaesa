import { gql } from "../generated";

export const FIND_MANY_CITY = gql(/* GraphQL */ `
  query findManyCity {
    findManyCity {
      id
      name
    }
  }
`);
