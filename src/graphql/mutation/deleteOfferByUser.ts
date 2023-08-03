import { gql } from "../generated";

export const DELETE_OFFER_BY_USER = gql(/* GraphQL */ `
  mutation deleteOfferByUser($deleteOfferByUserId: Int!) {
    deleteOfferByUser(id: $deleteOfferByUserId) {
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
