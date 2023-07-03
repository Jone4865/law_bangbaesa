import { gql } from "../generated";

export const FIND_MANY_CHAT_MESSAGE_BY_USER = gql(/* GraphQL */ `
  query findManyChatMessageByUser(
    $take: Int!
    $chatRoomId: Int!
    $cursorId: Int
    $direction: ChatMessageDirection
  ) {
    findManyChatMessageByUser(
      take: $take
      chatRoomId: $chatRoomId
      cursorId: $cursorId
      direction: $direction
    ) {
      totalCount
      chatMessages {
        id
        message
        createdAt
        sender
        isUnread
      }
      isEnd
    }
  }
`);
