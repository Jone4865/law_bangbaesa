import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
  split,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { userTokenTypes } from "../recoil/atoms/userToken";
import { SetterOrUpdater } from "recoil";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { WebSocketLink } from "@apollo/client/link/ws";
import { IncomingHttpHeaders } from "http";
import { useMemo } from "react";

export const SERVER = process.env.NEXT_PUBLIC_GQL_URL!;
export const SOCKET = process.env.NEXT_PUBLIC_SOCKET_URL!;
export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

function createApolloClient(headers: IncomingHttpHeaders | null = null) {
  const cookie = headers?.cookie ?? "";
  const enhancedFetch = async (url: RequestInfo, init: RequestInit) => {
    return await fetch(url, {
      ...init,
      headers: {
        ...init.headers,
        Cookie: cookie,
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
        cookie: cookie,
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
      }

      if (networkError) {
        alert("네트워크 상태가 올바르지 않습니다.");
      }
    }
  );

  return new ApolloClient({
    link: ApolloLink.from([authMiddleware, errorLink, splitLink]),
    cache: new InMemoryCache({
      addTypename: false,
    }),
    credentials: "include",
  });
}

interface InitApollo {
  headers?: IncomingHttpHeaders | null;
  initialState?: NormalizedCacheObject | null;
}

export function initializeApollo({
  headers = null,
  initialState = null,
}: InitApollo) {
  const _apolloClient = apolloClient ?? createApolloClient(headers);

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  if (typeof window === "undefined") return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(
    () => initializeApollo({ initialState: state }),
    [state]
  );
  return store;
}
