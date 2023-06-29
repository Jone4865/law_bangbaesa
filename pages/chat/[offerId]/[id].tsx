import React, { useEffect, useRef, useState } from "react";
import styles from "../Room.module.scss";
import className from "classnames/bind";
import { useLazyQuery, useMutation, useSubscription } from "@apollo/client";
import { toast } from "react-toastify";
import { SUBSCRIBE_CHAT_MESSAGE } from "../../../src/graphql/generated/subscription/subscribeChatMessage";
import { GetServerSideProps, NextPage } from "next";
import { FIND_MANY_CHAT_MESSAGE_BY_USER } from "../../../src/graphql/generated/query/findManyChatMessageByUser";
import { FIND_MY_INFO_BY_USER } from "../../../src/graphql/generated/query/findMyInfoByUser";
import { useInView } from "react-intersection-observer";
import { CREATE_CHAT_MESSAGE } from "../../../src/graphql/generated/mutation/createChatMessage";
import { UPDATE_CHECKED_CURRUNT_CHAT_MESSAGE_BY_USER } from "../../../src/graphql/generated/mutation/updateCheckedCurrentChatMessageByUser";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import { FIND_ONE_OFFER } from "../../../src/graphql/generated/query/findOneOffer";
import { initializeApollo } from "../../../src/config/apolloClient";

const cx = className.bind(styles);

type Props = {
  id: number;
  data: Data[];
};

type Data = {
  id: number;
  createdAt: string;
  message: string;
  sender: string;
  isUnread: boolean;
};

type OfferData = {
  offerAction: string;
  identity: string;
  city: {
    name: string;
  };
  minAmount: number;
  maxAmount: number;
  responseSpeed: number;
  price: number;
};

type subscriptText = {
  id: number;
  createdAt: string;
  message: string;
  sender: string;
  isUnread: boolean;
};

const Room: NextPage<Props> = ({ id, data }) => {
  const isMobile = useMediaQuery({
    query: "(max-width: 759px)",
  });
  const router = useRouter();
  const [take] = useState(10);
  const [datas, setDatas] = useState<Data[] | subscriptText[]>([]);
  const [offerData, setOfferData] = useState<OfferData>();
  const [myNickName, setMyNickName] = useState("");
  const [unreadView, setUnreadView] = useState(true);
  const divRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [subscriptTexts, setSubscriptTexts] = useState<subscriptText[]>();

  const [prevRef, prevView] = useInView({
    threshold: 1,
  });
  const [nextRef, nextView] = useInView({
    threshold: 1,
  });
  const [message, setMessage] = useState("");

  const [infoVisible, setInfoVisible] = useState(true);

  const [scroll, setScroll] = useState(false);

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
              : data.createChatMessage.chatMessage.id,
          },
          fetchPolicy: "no-cache",
          onCompleted: () => {
            findManyChatMessageByUser({
              variables: {
                take: 10,
                chatRoomId: +id,
                direction: "PREV",
                cursorId: null,
              },
              fetchPolicy: "no-cache",
            }).then(({ data }) => {
              setDatas(data.findManyChatMessageByUser.chatMessages);
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
      onCompleted(_updateData) {
        findManyChatMessageByUser({
          variables: {
            take,
            chatRoomId: +id,
            direction: "PREV",
            cursorId: null,
          },
          fetchPolicy: "no-cache",
        }).then(({ data }) => {
          setDatas(data.findManyChatMessageByUser.chatMessages);
          setSubscriptTexts(undefined);
          divRef.current && divRef.current.focus();
        });
      },
    });
  };

  const [findManyChatMessageByUser] = useLazyQuery(
    FIND_MANY_CHAT_MESSAGE_BY_USER,
    {
      onError: (e) => toast.error(e.message ?? `${e}`),
      fetchPolicy: "no-cache",
    }
  );

  const [findMyInfoByUser] = useLazyQuery(FIND_MY_INFO_BY_USER, {
    onError: (e) => toast.error(e.message ?? `${e}`),
    onCompleted: (data) => {
      setMyNickName(data.findMyInfoByUser.identity);
    },
    fetchPolicy: "no-cache",
  });

  const [createChatMessage] = useMutation(CREATE_CHAT_MESSAGE, {
    onError: (e) => toast.error(e.message ?? `${e}`),
    fetchPolicy: "no-cache",
  });

  const [updateCheckedCurrentChatMessageByUser] = useMutation(
    UPDATE_CHECKED_CURRUNT_CHAT_MESSAGE_BY_USER,
    {
      onError: (e) => toast.error(e.message ?? `${e}`),
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
      setDatas((prev) => [...prev, newData]);
      const newData = subscriptionData.data.subscribeChatMessage.chatMessage;
      if (newData.sender !== myNickName && !scroll && datas.length > 10) {
        setSubscriptTexts((prev) => [prev, newData]);
      }
    },
    fetchPolicy: "no-cache",
    onError: (e) => toast.error(e.message ?? `${e}`),
  });

  useEffect(() => {
    if (isMobile) {
      setInfoVisible(false);
    } else {
      setInfoVisible(true);
    }
    if (containerRef.current && scroll) {
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
          direction: "PREV",
        },
        fetchPolicy: "no-cache",
      }).then(({ data }) => {
        setDatas((prev) => [
          ...data.findManyChatMessageByUser.chatMessages,
          ...prev,
        ]);
        containerRef.current?.scrollTo({
          top: data.findManyChatMessageByUser.chatMessages?.length * 64,
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
          direction: "NEXT",
        },
        fetchPolicy: "no-cache",
      }).then(({ data }) => {
        setDatas((prev) => [
          ...prev,
          ...data.findManyChatMessageByUser.chatMessages,
        ]);
      });
    }
  }, [nextView]);

  useEffect(() => {
    if (scroll) {
      setSubscriptTexts(undefined);
      setUnreadView(false);
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
    findOneOffer({
      variables: {
        findOneOfferId: id,
      },
    });
  }, []);

  useEffect(() => {
    setDatas([]);
    setMessage("");
    setUnreadView(true);
    setSubscriptTexts(undefined);

    findMyInfoByUser();
    setSubscriptTexts(undefined);
    setDatas(data);
    divRef.current && divRef.current.focus();
  }, [id, data]);

  return (
    <div className={cx("container")}>
      <div className={cx("wrap")}>
        <div className={cx("top_wrap")}>
          <div className={cx("title")}>채팅하기</div>
          <div className={cx("mobile")}>
            <div
              onClick={() => {
                setInfoVisible((prev) => !prev);
              }}
              className={cx("mobile_wrap")}
            >
              <span>{infoVisible ? "접기" : "펼치기"}</span>
              <div
                className={cx(infoVisible ? "arrow_wrap_down" : "arrow_wrap")}
              >
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
        </div>
        {infoVisible && (
          <div className={cx("offer_wrap")}>
            <div className={cx("kind")}>
              {offerData?.offerAction === "SELL" ? "판매" : "구매"}
            </div>
            <div className={cx("nickname")}>{offerData?.identity}</div>
            <div className={cx("location")}>{offerData?.city.name} / 직접</div>
            <div className={cx("min_and_max")}>
              {offerData?.minAmount?.toLocaleString()}{" "}
              <span className={cx("gray")}>KRW</span> /{" "}
              {offerData?.maxAmount?.toLocaleString()}{" "}
              <span className={cx("gray")}>KRW</span>
            </div>
            <div className={cx("minute")}>
              {offerData?.responseSpeed}분 미만
            </div>
            <div className={cx("price")}>
              {offerData?.price?.toLocaleString()}{" "}
              <span className={cx("price_gray")}>KRW</span>
            </div>
          </div>
        )}
        <div className={cx("bottom_wrap")}>
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
                          <div className={cx("chat_nickname")}>{v.sender}</div>
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
                <div>{subscriptTexts[subscriptTexts?.length - 1]?.message}</div>
              </div>
            )}
            <form onSubmit={onSubmitHandle} className={cx("form_wrap")}>
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={cx("input")}
                ref={inputRef}
              />
              <button className={cx("btn")}>전송</button>
            </form>
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
        direction: "NEXT",
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
          direction: "PREV",
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
