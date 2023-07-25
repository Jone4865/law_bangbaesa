import { gql } from "../generated";

export const FIND_MANY_COUNTRY_CODE = gql(/* GraphQL */ `
  query findManyCountryCode {
    findManyCountryCode {
      name
      native
      phone
      emoji
    }
  }
`);
