import { gql } from "../generated";

export const FIND_MANY_CHAT_ROOM_BY_USER = gql(/* GraphQL */ `
  query FindManyChatRoomByUser($take: Int!, $cursorId: Int, $offerId: Int) {
    findManyChatRoomByUser(
      take: $take
      cursorId: $cursorId
      offerId: $offerId
    ) {
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
