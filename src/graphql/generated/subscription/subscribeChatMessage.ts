import { gql } from "@apollo/client";

export const SUBSCRIBE_CHAT_MESSAGE = gql`
  subscription Subscription($chatRoomId: Int!) {
    subscribeChatMessage(chatRoomId: $chatRoomId) {
      chatMessage {
        id
        message
        createdAt
        sender
      }
      totalCount
    }
  }
`;
