import React, { useEffect, useRef, useState } from "react";
import styles from "./MyRoom.module.scss";
import className from "classnames/bind";
import { useLazyQuery, useMutation, useSubscription } from "@apollo/client";
import { toast } from "react-toastify";

import { GetServerSideProps, NextPage } from "next";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import { initializeApollo } from "../../../src/config/apolloClient";
import { FIND_MANY_CHAT_MESSAGE_BY_USER } from "src/graphql/query/findManyChatMessageByUser";
import { FIND_MY_INFO_BY_USER } from "src/graphql/query/findMyInfoByUser";
import { CREATE_CHAT_MESSAGE } from "src/graphql/mutation/createChatMessage";
import { UPDATE_CHECKED_CURRUNT_CHAT_MESSAGE_BY_USER } from "src/graphql/mutation/updateCheckedCurrentChatMessageByUser";
import { FIND_MANY_CHAT_ROOM_BY_USER } from "src/graphql/query/findManyChatRoomByUser";
import { FIND_ONE_OFFER } from "src/graphql/query/findOneOffer";
import { SUBSCRIBE_CHAT_MESSAGE } from "src/graphql/subscription/subscribeChatMessage";
import {
  ChatMessageDirection,
  CreateChatMessageMutation,
  FindManyChatMessageByUserQuery,
  FindManyChatRoomByUserQuery,
  FindMyInfoByUserQuery,
  FindOneOfferQuery,
  UpdateCheckedCurrentChatMessageByUserMutation,
} from "src/graphql/generated/graphql";
import OfferModal from "components/OfferModal/OfferModal";
import OfferMore from "components/OfferMore/OfferMore";
import OfferInfo from "components/OfferInfo/OfferInfo";

const cx = className.bind(styles);

type Props = {
  id: number;
  data: any;
};

const Room: NextPage<Props> = ({ id, data }) => {
  const [infoVisible, setInfoVisible] = useState(true);
  const [roomList, setRoomList] =
    useState<
      FindManyChatRoomByUserQuery["findManyChatRoomByUser"]["chatRooms"]
    >();
  const [scroll, setScroll] = useState(false);
  const [first, setFirst] = useState(true);
  const [take] = useState(10);
  const [datas, setDatas] = useState<any[]>([]);
  const [offerData, setOfferData] =
    useState<FindOneOfferQuery["findOneOffer"]>();
  const [myNickName, setMyNickName] = useState("");
  const [offerId] = useState<number | undefined>(0);
  const [unreadView, setUnreadView] = useState(true);
  const [offerModalVisible, setOfferModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [subscriptTexts, setSubscriptTexts] = useState<any[]>();
  const router = useRouter();

  const divRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [prevRef, prevView] = useInView({
    threshold: 1,
  });
  const [nextRef, nextView] = useInView({
    threshold: 1,
  });

  const isMobile = useMediaQuery({
    query: "(max-width: 759px)",
  });

  const disableScroll = () => {
    document.body.style.overflow = "hidden";
  };

  const enableScroll = () => {
    document.body.style.overflow = "auto";
  };

  const scrollToBottom = () => {
    if (containerRef.current) {
      const scrollElement = containerRef.current;
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  };

  const isScrollAtBottom = (element: HTMLDivElement) => {
    const { scrollTop, scrollHeight, clientHeight } = element;
    return scrollTop + clientHeight >= scrollHeight;
  };

  const onClickRoomId = (id: number) => {
    router.replace(`/mychat/${router.query.offerId}/${id}`);
  };

  const onSubmitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message !== "") {
      createChatMessage({
        variables: { chatRoomId: id, message },
      }).then(({ data }) => {
        setMessage("");
        updateCheckedCurrentChatMessageByUser({
          variables: {
            chatRoomId: id,
            chatMessageId: subscriptTexts
              ? subscriptTexts[subscriptTexts?.length - 1]?.id
              : data
              ? data.createChatMessage.chatMessage.id
              : 0,
          },
          fetchPolicy: "no-cache",
          onCompleted: () => {
            findManyChatMessageByUser({
              variables: {
                take: 10,
                chatRoomId: +id,
                direction: ChatMessageDirection.Prev,
                cursorId: null,
              },
              fetchPolicy: "no-cache",
            }).then(({ data }) => {
              setDatas(data ? data.findManyChatMessageByUser.chatMessages : []);
              divRef.current && divRef.current.focus();
            });
          },
        });
      });
    }
  };

  const onClickSubText = () => {
    setUnreadView(false);
    updateCheckedCurrentChatMessageByUser({
      variables: {
        chatRoomId: id,
        chatMessageId: subscriptTexts
          ? subscriptTexts[subscriptTexts?.length - 1]?.id
          : 0,
      },
      fetchPolicy: "no-cache",
      onCompleted(_updateData) {
        findManyChatMessageByUser({
          variables: {
            take,
            chatRoomId: +id,
            direction: ChatMessageDirection.Prev,
            cursorId: null,
          },
          fetchPolicy: "no-cache",
        }).then(({ data }) => {
          setDatas(data ? data.findManyChatMessageByUser.chatMessages : []);
          setSubscriptTexts(undefined);
          divRef.current && divRef.current.focus();
        });
      },
    });
  };

  const [findManyChatMessageByUser] =
    useLazyQuery<FindManyChatMessageByUserQuery>(
      FIND_MANY_CHAT_MESSAGE_BY_USER,
      {
        onError: (e) => toast.error(e.message ?? `${e}`),
        fetchPolicy: "no-cache",
      }
    );

  const [findMyInfoByUser] = useLazyQuery<FindMyInfoByUserQuery>(
    FIND_MY_INFO_BY_USER,
    {
      onError: (e) => toast.error(e.message ?? `${e}`),
      onCompleted: (data) => {
        setMyNickName(data.findMyInfoByUser.identity);
      },
    }
  );

  const [createChatMessage] = useMutation<CreateChatMessageMutation>(
    CREATE_CHAT_MESSAGE,
    {
      onError: (e) => toast.error(e.message ?? `${e}`),
      fetchPolicy: "no-cache",
    }
  );

  const [updateCheckedCurrentChatMessageByUser] =
    useMutation<UpdateCheckedCurrentChatMessageByUserMutation>(
      UPDATE_CHECKED_CURRUNT_CHAT_MESSAGE_BY_USER,
      {
        onError: (e) => toast.error(e.message ?? `${e}`),
        fetchPolicy: "no-cache",
      }
    );

  const [findManyChatRoomByUser] = useLazyQuery<FindManyChatRoomByUserQuery>(
    FIND_MANY_CHAT_ROOM_BY_USER,
    {
      onError: (e) => toast.error(e.message ?? `${e}`),
      onCompleted(data) {
        setRoomList(data.findManyChatRoomByUser.chatRooms);
      },
      fetchPolicy: "no-cache",
    }
  );

  const [findOneOffer] = useLazyQuery(FIND_ONE_OFFER, {
    onError: (e) => toast.error(e.message ?? `${e}`),
    onCompleted(data) {
      setOfferData(data.findOneOffer);
    },
    fetchPolicy: "no-cache",
  });

  useSubscription(SUBSCRIBE_CHAT_MESSAGE, {
    variables: {
      chatRoomId: id,
    },
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.data && router.query.id) {
        const newData = subscriptionData.data.subscribeChatMessage.chatMessage;
        setDatas((prev) => [...prev, newData]);
        if (newData.sender !== myNickName && !scroll && datas.length > 10) {
          setSubscriptTexts((prev) => [prev, newData]);
        }
        updateCheckedCurrentChatMessageByUser({
          variables: {
            chatRoomId: +router.query.id,
            chatMessageId: newData.id,
          },
        });
      }
    },
    fetchPolicy: "no-cache",
    onError: (e) => toast.error(e.message !== "접근 권한이 없습니다" ?? `${e}`),
  });

  useEffect(() => {
    if (isMobile) {
      setInfoVisible(false);
    } else {
      setInfoVisible(true);
    }
    if (containerRef.current && first) {
      scrollToBottom();
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isMobile, datas]);

  useEffect(() => {
    if (datas.length > 1 && prevView && !nextView) {
      setUnreadView(false);
      findManyChatMessageByUser({
        variables: {
          take,
          chatRoomId: id,
          cursorId: datas[0]?.id,
          direction: ChatMessageDirection.Prev,
        },
        fetchPolicy: "no-cache",
      }).then(({ data }) => {
        setFirst(false);
        setDatas((prev) =>
          data ? [...data.findManyChatMessageByUser.chatMessages, ...prev] : []
        );
        containerRef.current?.scrollTo({
          top: data
            ? data.findManyChatMessageByUser.chatMessages?.length * 64
            : 0,
        });
      });
    }
  }, [prevView]);

  useEffect(() => {
    setSubscriptTexts(undefined);
    if (datas.length > 1 && nextView && !prevView) {
      if (datas.length > 15) {
        setUnreadView(false);
      }
      findManyChatMessageByUser({
        variables: {
          take,
          chatRoomId: id,
          cursorId: datas[datas?.length - 1]?.id,
          direction: ChatMessageDirection.Next,
        },
        fetchPolicy: "no-cache",
      }).then(({ data }) => {
        setDatas((prev) =>
          data ? [...prev, ...data.findManyChatMessageByUser.chatMessages] : []
        );
      });
    }
  }, [nextView]);

  useEffect(() => {
    if (scroll) {
      setSubscriptTexts(undefined);
    }
    const scrollElement = containerRef.current;
    if (scrollElement) {
      const handleScroll = () => {
        if (isScrollAtBottom(scrollElement)) {
          setScroll(true);
        } else {
          setScroll(false);
        }
      };

      scrollElement.addEventListener("scroll", handleScroll);

      return () => {
        scrollElement.removeEventListener("scroll", handleScroll);
      };
    }
  }, [scroll]);

  useEffect(() => {
    if (offerModalVisible) {
      disableScroll();
    } else {
      enableScroll();
    }
  }, [offerModalVisible]);

  useEffect(() => {
    setDatas([]);
    setMessage("");
    setUnreadView(true);
    setSubscriptTexts(undefined);
    if (router.query.offerId) {
      findOneOffer({ variables: { findOneOfferId: +router.query.offerId } });
    }

    findManyChatRoomByUser({
      variables: { take: 10, offerId },
    });
    findMyInfoByUser();
    setSubscriptTexts(undefined);
    setDatas(data);
    divRef.current && divRef.current.focus();
  }, [id, data]);

  return (
    <div className={cx("container")}>
      <OfferInfo
        offerData={offerData}
        type={"my"}
        setOfferModalVisible={setOfferModalVisible}
      />
      {offerModalVisible && (
        <OfferModal
          offerData={offerData}
          setOfferModalVisible={setOfferModalVisible}
        />
      )}

      <div className={cx("wrap")}>
        <div className={cx("mobile")}>
          {infoVisible && <OfferMore offerData={offerData} />}
          <div
            onClick={() => {
              setInfoVisible((prev) => !prev);
            }}
            className={cx("mobile_wrap")}
          >
            <span>상세정보</span>
            <div className={cx(infoVisible ? "arrow_wrap_down" : "arrow_wrap")}>
              <Image
                alt="화살표"
                src={"/img/chat/arrow.png"}
                fill
                priority
                quality={100}
              />
            </div>
          </div>
        </div>
        <div className={cx("bottom_wrap")}>
          <div className={cx("right_container")}>
            <div className={cx("many_offer_container")}>
              <div className={cx("able_chat")}>
                <div className={cx("room_list")}>
                  {
                    roomList?.filter(
                      (v) => router.query.id && v.id === +router.query.id
                    )[0].otherIdentity
                  }
                </div>
              </div>
              {roomList?.map(
                (v) =>
                  router.query.id &&
                  v.id !== +router.query.id && (
                    <div
                      key={v.id}
                      className={cx("disable_chat")}
                      onClick={() => onClickRoomId(v.id)}
                    >
                      <div className={cx("room_list")}>{v.otherIdentity}</div>
                      {v.isUnread && <div className={cx("dot")} />}
                    </div>
                  )
              )}
            </div>
            <div className={cx("right_wrap")}>
              <div ref={containerRef} className={cx("chat_container")}>
                <div ref={prevRef} />
                {datas?.map((v, idx, array) => (
                  <div key={idx}>
                    {v?.isUnread && !array[idx - 1]?.isUnread && unreadView && (
                      <div
                        tabIndex={0}
                        ref={(el) => scroll && el?.focus()}
                        className={cx("unread")}
                      >
                        여기까지 읽었습니다.
                      </div>
                    )}
                    <div
                      className={cx(
                        v.sender === myNickName
                          ? "my_message_container"
                          : "message_container"
                      )}
                    >
                      {v.sender !== myNickName && (
                        <div className={cx("account_wrap")}>
                          {datas[idx - 1]?.sender !== v.sender && (
                            <Image
                              alt="프로필"
                              src={"/img/chat/account.png"}
                              fill
                              quality={100}
                              className={cx("img")}
                            />
                          )}
                        </div>
                      )}
                      <div className={cx("body")}>
                        {datas[idx - 1]?.sender !== v.sender && (
                          <>
                            <div className={cx("chat_nickname")}>
                              {v.sender}
                            </div>
                            <div
                              className={cx(
                                v.sender === myNickName ? "right" : "left"
                              )}
                            />
                          </>
                        )}
                        <div
                          className={cx(
                            v.sender === myNickName
                              ? "message_orange"
                              : "message_blue"
                          )}
                        >
                          {v.message}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div tabIndex={1} ref={divRef} />
                <div ref={nextRef} />
              </div>
              {subscriptTexts && (
                <div onClick={onClickSubText} className={cx("pop_up")}>
                  <span>
                    {subscriptTexts[subscriptTexts?.length - 1]?.sender}
                  </span>
                  <div>
                    {subscriptTexts[subscriptTexts?.length - 1]?.message}
                  </div>
                </div>
              )}
              <form onSubmit={onSubmitHandle} className={cx("form_wrap")}>
                <div className={cx("input_nickname")}>
                  {offerData?.identity}
                </div>
                <input
                  disabled={offerData?.transactionStatus === "COMPLETE"}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={cx("input")}
                  placeholder="메세지를 입력하세요"
                  ref={inputRef}
                />
                <button className={cx("btn")}>전송</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const id = Number(context.query.id ?? "0");
  const apolloClient = initializeApollo({ headers: context.req.headers });
  try {
    const { data } = await apolloClient.query({
      query: FIND_MANY_CHAT_MESSAGE_BY_USER,
      variables: {
        take: 10,
        chatRoomId: id,
        cursorId: null,
        direction: ChatMessageDirection.Next,
      },
      fetchPolicy: "no-cache",
    });

    if (data.findManyChatMessageByUser.chatMessages.length < 8) {
      const { data: newData } = await apolloClient.query({
        query: FIND_MANY_CHAT_MESSAGE_BY_USER,
        variables: {
          take: 10,
          chatRoomId: id,
          cursorId: null,
          direction: ChatMessageDirection.Prev,
        },
        fetchPolicy: "no-cache",
      });

      return {
        props: {
          id,
          data: newData.findManyChatMessageByUser.chatMessages,
        },
      };
    }

    return {
      props: {
        id,
        data: data.findManyChatMessageByUser.chatMessages,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default Room;
