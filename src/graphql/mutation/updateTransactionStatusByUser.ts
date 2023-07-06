import { gql } from "../generated";

export const UPDATE_TRANSACTION_STATUS_BY_USER = gql(/* GraphQL */ `
  mutation updateTransactionStatusByUser(
    $updateTransactionStatusByUserId: Int!
  ) {
    updateTransactionStatusByUser(id: $updateTransactionStatusByUserId) {
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
