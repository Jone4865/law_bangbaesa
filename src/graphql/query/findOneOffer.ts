import { gql } from "../generated";

export const FIND_ONE_OFFER = gql(/* GraphQL */ `
  query findOneOffer($findOneOfferId: Int!) {
    findOneOffer(id: $findOneOfferId) {
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
      city {
        id
        name
      }
      district {
        id
        name
      }
      identity
      isNewChatMessage
      offerCompleteCount
    }
  }
`);
