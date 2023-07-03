import { gql } from "../generated";

export const CREATE_CHAT_MESSAGE = gql(/* GraphQL */ `
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
`);
