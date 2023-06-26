import { gql } from "@apollo/client";

export const UPDATE_CHECKED_CURRUNT_CHAT_MESSAGE_BY_USER = gql`
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
`;
