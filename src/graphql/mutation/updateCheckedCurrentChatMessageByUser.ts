import { gql } from "../generated";

export const UPDATE_CHECKED_CURRUNT_CHAT_MESSAGE_BY_USER = gql(/* GraphQL */ `
  mutation updateCheckedCurrentChatMessageByUser(
    $chatRoomId: Int!
    $chatMessageId: Int!
  ) {
    updateCheckedCurrentChatMessageByUser(
      chatRoomId: $chatRoomId
      chatMessageId: $chatMessageId
    ) {
      id
      createdAt
    }
  }
`);
