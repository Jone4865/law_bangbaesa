import { gql } from "../generated";

export const FIND_MANY_MARKER_PRICE = gql(/* GraphQL */ `
  query findManyMarketPrice {
    findManyMarketPrice {
      upbitMarkets {
        code
        timestamp
        krwPrice
        usdPrice
      }
      binanceMarkets {
        code
        timestamp
        krwPrice
        usdPrice
      }
      kimchiMarkets {
        code
        timestamp
        changePrice
        changeRate
      }
    }
  }
`);
