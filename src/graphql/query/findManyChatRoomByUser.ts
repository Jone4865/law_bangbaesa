import { gql } from "../generated";

export const FIND_MANY_CHAT_ROOM_BY_USER = gql(/* GraphQL */ `
  query findManyChatRoomByUser($take: Int!) {
    findManyChatRoomByUser(take: $take) {
      totalCount
      chatRooms {
        id
        createdAt
        otherIdentity
        offerId
        isNewChatMessage
        isUnread
      }
    }
  }
`);
