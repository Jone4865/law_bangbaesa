import { gql } from "@apollo/client";

export const CREATE_CHAT_MESSAGE = gql`
  mutation createChatMessage($chatRoomId: Int!, $message: String!) {
    createChatMessage(chatRoomId: $chatRoomId, message: $message) {
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
