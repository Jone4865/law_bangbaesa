import { gql } from "../generated";

export const UPDATE_OFFER_STATUS_BY_USER = gql(/* GraphQL */ `
  mutation updateOfferStatusByUser($updateOfferStatusByUserId: Int!) {
    updateOfferStatusByUser(id: $updateOfferStatusByUserId) {
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
