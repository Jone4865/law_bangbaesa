import { gql } from "@apollo/client";

export const FIND_MANY_CHAT_ROOM_BY_USER = gql`
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
`;
