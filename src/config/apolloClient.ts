import { ApolloClient, ApolloLink, InMemoryCache, split } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { userTokenTypes } from "../recoil/atoms/userToken";
import { SetterOrUpdater } from "recoil";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { WebSocketLink } from "@apollo/client/link/ws";

export const SERVER = process.env.NEXT_PUBLIC_GQL_URL!;
export const SOCKET = process.env.NEXT_PUBLIC_SOCKET_URL!;

function apolloClient(
  state: userTokenTypes,
  setState: SetterOrUpdater<userTokenTypes>
) {
  const enhancedFetch = async (url: RequestInfo, init: RequestInit) => {
    return await fetch(url, {
      ...init,
      headers: {
        ...init.headers,
      },
      credentials: "include",
    });
  };

  const uploadLink = createUploadLink({
    uri: SERVER,
    credentials: "include",
    fetch: enhancedFetch,
  });

  const wsLink =
    typeof window !== "undefined"
      ? new WebSocketLink(
          new SubscriptionClient(SOCKET, {
            reconnect: true,
          })
        )
      : null;

  // const wsLink =
  //   typeof window !== "undefined"
  //     ? new WebSocketLink(
  //         new SubscriptionClient(SOCKET, {
  //           reconnect: true,
  //         })
  //       )
  //     : null;

  const splitLink =
    typeof window !== "undefined" && wsLink != null
      ? split(
          ({ query }) => {
            const def = getMainDefinition(query);
            return (
              def.kind === "OperationDefinition" &&
              def.operation === "subscription"
            );
          },
          wsLink,
          uploadLink
        )
      : uploadLink;

  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        credential: "include",
      },
    });
    return forward(operation);
  });

  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }: any) => {
      const unauthorizedError =
        graphQLErrors &&
        graphQLErrors.find((item: any) => item.message === "Unauthorized");

      if (unauthorizedError) {
        alert("장기간 사용하지 않아 자동 로그아웃되었습니다.");
        setState({
          hasToken: false,
        });
      }

      if (networkError) {
        alert("네트워크 상태가 올바르지 않습니다.");
      }
    }
  );

  const client = new ApolloClient({
    link: ApolloLink.from([authMiddleware, errorLink, splitLink]),
    cache: new InMemoryCache({
      addTypename: false,
    }),
    credentials: "include",
  });

  return client;
}

export default apolloClient;
