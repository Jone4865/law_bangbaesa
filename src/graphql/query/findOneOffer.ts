import { gql } from "../generated";

export const FIND_ONE_OFFER = gql(/* GraphQL */ `
  query QufindOneOfferery($findOneOfferId: Int!) {
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
      identity
      isNewChatMessage
      district {
        id
        name
      }
    }
  }
`);
