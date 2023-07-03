import { gql } from "../generated";

export const CREATE_OFFER_BY_USER = gql(/* GraphQL */ `
  mutation createOfferByUser(
    $coinKind: CoinKind!
    $offerAction: OfferAction!
    $transactionMethod: TransactionMethod!
    $cityId: Int!
    $price: Int!
    $minAmount: Int!
    $maxAmount: Int!
    $responseSpeed: Int!
    $content: String!
  ) {
    createOfferByUser(
      coinKind: $coinKind
      offerAction: $offerAction
      transactionMethod: $transactionMethod
      cityId: $cityId
      price: $price
      minAmount: $minAmount
      maxAmount: $maxAmount
      responseSpeed: $responseSpeed
      content: $content
    ) {
      id
      coinKind
      offerAction
      transactionMethod
      price
      minAmount
      maxAmount
      responseSpeed
      content
      createdAt
      reservationStatus
      transactionStatus
    }
  }
`);
