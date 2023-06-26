import { gql } from "@apollo/client";

export const UPDATE_OFFER_STATUS_BY_USER = gql`
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
`;
