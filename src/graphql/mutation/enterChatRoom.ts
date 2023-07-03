import { gql } from "../generated";

export const ENTER_CHAT_ROOM = gql(/* GraphQL */ `
  mutation enterChatRoom($offerId: Int!) {
    enterChatRoom(offerId: $offerId) {
      id
      createdAt
    }
  }
`);
