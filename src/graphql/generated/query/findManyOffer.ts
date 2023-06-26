import { gql } from "@apollo/client";

export const FIND_MANY_OFFER = gql`
  query findManyOffer(
    $take: Int!
    $skip: Int!
    $coinKind: CoinKind
    $offerAction: OfferAction
    $identity: String
    $isChat: Boolean
  ) {
    findManyOffer(
      take: $take
      skip: $skip
      coinKind: $coinKind
      offerAction: $offerAction
      identity: $identity
      isChat: $isChat
    ) {
      offers {
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
        city {
          id
          name
        }
        identity
        positiveCount
        isNewChatMessage
        connectionDate
      }
      totalCount
    }
  }
`;
