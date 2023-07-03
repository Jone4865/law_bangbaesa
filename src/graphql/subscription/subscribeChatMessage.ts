import { gql } from "../generated";

export const SUBSCRIBE_CHAT_MESSAGE = gql(/* GraphQL */ `
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
`);
