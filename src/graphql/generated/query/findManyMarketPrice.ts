import { gql } from "@apollo/client";

export const FIND_MANY_MARKER_PRICE = gql`
  query findManyMarketPrice {
    findManyMarketPrice {
      binance {
        code
        timestamp
        openPrice
        highPrice
        lowPrice
        closePrice
        tradeTime
        changePrice
        changeRate
      }
      kimchi {
        code
        timestamp
        openPrice
        highPrice
        lowPrice
        closePrice
        tradeTime
        changePrice
        changeRate
      }
      upbit {
        code
        timestamp
        openPrice
        highPrice
        lowPrice
        closePrice
        tradeTime
        changePrice
        changeRate
      }
    }
  }
`;
