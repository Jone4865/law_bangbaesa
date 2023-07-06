import { gql } from "../generated";

export const UPDATE_RESERVATION_STATUS_BY_USER = gql(/* GraphQL */ `
  mutation updateReservationStatusByUser(
    $updateReservationStatusByUserId: Int!
  ) {
    updateReservationStatusByUser(id: $updateReservationStatusByUserId) {
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
