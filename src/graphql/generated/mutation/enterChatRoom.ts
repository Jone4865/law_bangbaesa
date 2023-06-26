import { gql } from "@apollo/client";

export const ENTER_CHAT_ROOM = gql`
  mutation enterChatRoom($offerId: Int!) {
    enterChatRoom(offerId: $offerId) {
      id
      createdAt
    }
  }
`;
