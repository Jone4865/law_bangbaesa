import { gql } from "@apollo/client";

export const DELETE_OFFER_BY_USER = gql`
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
      reservationStatus
      transactionStatus
    }
  }
`;
