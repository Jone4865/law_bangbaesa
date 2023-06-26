import { gql } from "@apollo/client";

export const FIND_MANY_CITY = gql`
  query findManyCity {
    findManyCity {
      id
      name
    }
  }
`;
