import { gql } from "../generated";

export const CREATE_OFFER_BY_USER = gql(/* GraphQL */ `
  mutation Mutation(
    $coinKind: CoinKind!
    $offerAction: OfferAction!
    $transactionMethod: TransactionMethod!
    $cityId: Int!
    $price: Int!
    $minAmount: Int!
    $maxAmount: Int!
    $responseSpeed: Int!
    $isUseNextTime: Boolean!
    $walletAddressKind: WalletAddressKind!
    $walletAddress: String!
    $districtId: Int
    $content: String
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
      isUseNextTime: $isUseNextTime
      walletAddressKind: $walletAddressKind
      walletAddress: $walletAddress
      districtId: $districtId
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
      walletAddressKind
      walletAddress
      reservationStatus
      transactionStatus
    }
  }
`);
