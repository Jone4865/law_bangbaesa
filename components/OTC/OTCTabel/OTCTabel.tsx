import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./OTCTabel.module.scss";
import className from "classnames/bind";
import { useRouter } from "next/router";
import { useLazyQuery, useMutation } from "@apollo/client";
import { ENTER_CHAT_ROOM } from "../../../src/graphql/mutation/enterChatRoom";
import { toast } from "react-toastify";
import { DELETE_OFFER_BY_USER } from "../../../src/graphql/mutation/deleteOfferByUser";
import { useInView } from "react-intersection-observer";
import moment from "moment";
import Image from "next/image";
import { useCookies } from "react-cookie";
import { FIND_MY_INFO_BY_USER } from "../../../src/graphql/query/findMyInfoByUser";
import {
  DeleteOfferByUserMutation,
  EnterChatRoomMutation,
  FindManyOfferQuery,
  FindMyInfoByUserQuery,
  ReservationStatus,
  TransactionMethod,
  TransactionStatus,
} from "src/graphql/generated/graphql";

const cx = className.bind(styles);

type Props = {
  offerId: number | undefined;
  nowAble: string;
  data: FindManyOfferQuery["findManyOffer"]["offers"];
  kind: "SELL" | "BUY" | undefined;
  coin: string;
  part: "home" | "otc" | "mypage" | "user";
  updateOfferClickHandle: (
    key: "reservation" | "complete",
    id: number,
    reservationState: ReservationStatus,
    transactionStatus: TransactionStatus
  ) => void;
  onScrollHandle: () => void;
  deletehandle: () => void;
  setOfferId: Dispatch<SetStateAction<number | undefined>>;
};

export default function OTCTabel({
  offerId,
  nowAble = "like",
  part = "otc",
  data,
  coin,
  kind,
  updateOfferClickHandle,
  onScrollHandle,
  deletehandle,
  setOfferId,
}: Props) {
  const router = useRouter();
  const [cookies] = useCookies(["nickName"]);

  const [onData, setOnData] = useState(false);
  const [moreKind, setMoreKind] =
    useState<"delete" | "reservation" | "complete" | undefined>(undefined);
  const [nextRef, nextView] = useInView({
    threshold: 1,
  });

  const convertConnectionDate = (date: string) => {
    const connectionDate = moment(date);
    const currentDate = moment();

    const minutesDiff = Math.abs(connectionDate.diff(currentDate, "minutes"));

    if (minutesDiff < 60) {
      return `${minutesDiff}분 전`;
    }

    const hourDiff = Math.abs(connectionDate.diff(currentDate, "hours"));

    if (hourDiff < 24) {
      return `${hourDiff}시간 전`;
    }

    const dayDiff = Math.abs(connectionDate.diff(currentDate, "days"));

    return `${dayDiff}일 전`;
  };

  const onClickMore = (
    id: number,
    kind: "delete" | "reservation" | "complete"
  ) => {
    setOfferId(id);
    setMoreKind(kind);
  };

  const onClickMoreAction = (
    reservationStatus: ReservationStatus,
    transactionStatus: TransactionStatus
  ) => {
    if (moreKind === "delete") {
      deleteOfferByUser({ variables: { deleteOfferByUserId: offerId } });
    } else {
      if (transactionStatus === TransactionStatus.Complete) {
        deleteOfferByUser({ variables: { deleteOfferByUserId: offerId } });
      }
      updateOfferClickHandle(
        moreKind === "complete" ? "complete" : "reservation",
        offerId ? offerId : 0,
        reservationStatus,
        transactionStatus
      );
    }
  };

  const onClickEditHandle = (offerId: number) => {
    router.push(`/edit-offer/${offerId}`);
  };

  const enterChatHandle = (id: number, identity: string) => {
    if (cookies.nickName) {
      findMyInfoByUser({
        onCompleted(data) {
          const myLevel = data.findMyInfoByUser.level;
          if (myLevel < 3) {
            router.push(`/certification/level${myLevel + 1}`);
            toast.warn("다음단계의 인증이 필요합니다");
          } else {
            enterChatRoom({
              variables: { offerId: +id },
              onCompleted(v) {
                cookies.nickName !== identity
                  ? router.push(`/chat/${id}/${v.enterChatRoom.id}`)
                  : router.push(`/mychat/${id}/${v.enterChatRoom.id}`);
              },
            });
          }
        },
      });
    } else {
      router.replace("/sign-in");
      toast.warn("로그인이 필요한 서비스입니다", { toastId: 0 });
    }
  };

  const [enterChatRoom] = useMutation<EnterChatRoomMutation>(ENTER_CHAT_ROOM, {
    onError: (e) => toast.error(e.message ?? `${e}`),
  });

  const [findMyInfoByUser] = useLazyQuery<FindMyInfoByUserQuery>(
    FIND_MY_INFO_BY_USER,
    {
      onError: (e) => toast.error(e.message ?? `${e}`),
      fetchPolicy: "no-cache",
    }
  );

  const [deleteOfferByUser] = useMutation<DeleteOfferByUserMutation>(
    DELETE_OFFER_BY_USER,
    {
      onError: (e) => toast.error(e.message ?? `${e}`),
      onCompleted(_v) {
        toast.success("해당 오퍼를 삭제했습니다.");
        deletehandle();
      },
    }
  );

  useEffect(() => {
    if (data?.length === 0) {
      setOnData(false);
    } else {
      setOnData(true);
    }
  }, [data, coin, kind, nowAble]);

  useEffect(() => {
    if (data?.length >= 10) {
      onScrollHandle();
    }
  }, [nextView]);

  return (
    <div className={cx("container")}>
      <div className={cx("wrap")}>
        <div
          className={cx(
            part === "otc" ? "top" : part === "home" ? "home_top" : "none"
          )}
        >
          <div className={cx("seller")}>
            {kind === "BUY" ? "구매자" : "판매자"}
          </div>
          <div>거래수단</div>
          <div>Min/Max</div>
          <div>평균 응답 속도</div>
          <div className={cx("price")}>{coin}당 가격</div>
        </div>
        {onData ? (
          data?.map((v, idx) => (
            <div key={v.id} className={cx("map_container")}>
              <div
                className={cx(
                  v.transactionStatus === TransactionStatus.Complete &&
                    router.pathname === "/mypage" &&
                    nowAble === "my"
                    ? "complete_wrap"
                    : "map_wrap"
                )}
                key={idx}
              >
                <div className={cx(part === "otc" ? "body" : "home_body")}>
                  <div className={cx("seller")}>
                    <div
                      onClick={() =>
                        cookies.nickName !== v.identity &&
                        router.push(`/user/${v.identity}`)
                      }
                      className={cx(
                        cookies.nickName !== v.identity
                          ? "default_id"
                          : "mypage_id"
                      )}
                    >
                      {v.identity}
                    </div>
                    {(router.pathname === "/user/[id]" ||
                      nowAble === "like" ||
                      router.pathname === "/") && (
                      <div className={cx("thumbs")}>
                        <div className={cx("thumb_wrap")}>
                          <Image
                            src={"/img/otc/thumb.png"}
                            alt="엄지척"
                            fill
                            priority
                            quality={100}
                          />
                        </div>{" "}
                        {v.positiveCount}
                      </div>
                    )}
                    {nowAble !== "my" && (
                      <div className={cx("log", "mobile_none")}>
                        최근 접속 : {convertConnectionDate(v.connectionDate)}
                      </div>
                    )}
                  </div>
                  <div className={cx("mobile_flex")}>
                    <div>{v.city?.name}/</div>
                    <div>{v.transactionMethod === "DIRECT" ? "직접" : ""}</div>
                  </div>
                  <div className={cx("mobile_none")}>
                    <div>
                      {v.minAmount.toLocaleString()}
                      <span className={cx("gray")}>KRW</span>/
                    </div>
                    <div>
                      {v.maxAmount.toLocaleString()}
                      <span className={cx("gray")}>KRW</span>
                    </div>
                  </div>
                  <div className={cx("time")}>{v.responseSpeed}분 미만</div>
                  <div className={cx("btns_wrap")}>
                    <div className={cx("right_price")}>
                      {v.price.toLocaleString()}
                      <span className={cx("gray_right")}>KRW</span>
                    </div>
                    {(router.pathname === "/user/[id]" ||
                      nowAble === "like" ||
                      router.pathname === "/") && (
                      <div className={cx("right_btns")}>
                        <button
                          disabled={
                            v.identity === cookies.nickName ||
                            v.reservationStatus === ReservationStatus.Progress
                          }
                          className={cx(
                            kind === "BUY" ? "chat_orange" : "chat_blue"
                          )}
                          onClick={() => enterChatHandle(v.id, v.identity)}
                        >
                          {v.reservationStatus === ReservationStatus.Progress
                            ? v.transactionStatus === TransactionStatus.Progress
                              ? "예약중"
                              : "거래완료"
                            : "채팅하기"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {nowAble !== "my" ? (
                  <div className={cx("mobile")}>
                    <div className={cx("mobile_top_body")}>
                      <div className={cx("mobile_top")}>
                        <div>
                          {v.minAmount.toLocaleString()}
                          <span className={cx("gray")}>KRW</span>/
                        </div>
                        <div>
                          {v.maxAmount.toLocaleString()}
                          <span className={cx("gray")}>KRW</span>
                        </div>
                      </div>
                    </div>
                    <div className={cx("right_price")}>
                      {v.price.toLocaleString()}
                      <span className={cx("gray_right")}>KRW</span>
                    </div>
                    <div className={cx("mobile_body")}>
                      <div className={cx("log")}>
                        최근 접속 : {convertConnectionDate(v.connectionDate)}
                      </div>
                      <div className={cx("right_btns")}>
                        <button
                          disabled={
                            v.identity === cookies.nickName ||
                            v.reservationStatus === ReservationStatus.Progress
                          }
                          className={cx(
                            kind === "BUY" ? "chat_orange" : "chat_blue"
                          )}
                          onClick={() => enterChatHandle(v.id, v.identity)}
                        >
                          {v.reservationStatus === ReservationStatus.Progress
                            ? v.transactionStatus === TransactionStatus.Progress
                              ? "예약중"
                              : "거래완료"
                            : "채팅하기"}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={cx("my_mobile")}>
                    <div className={cx("my_mobile_top_body")}>
                      <div className={cx("my_mobile_top")}>
                        <div>
                          {v.minAmount.toLocaleString()}
                          <span className={cx("gray")}>KRW</span>/
                        </div>
                        <div>
                          {v.maxAmount.toLocaleString()}
                          <span className={cx("gray")}>KRW</span>
                        </div>
                      </div>
                    </div>
                    <div className={cx("right_price")}>
                      {v.price.toLocaleString()}
                      <span className={cx("gray_right")}>KRW</span>
                    </div>
                    {router.pathname === "/user/[id]" && (
                      <div className={cx("mobile_body")}>
                        <div />
                        <div className={cx("right_btns")}>
                          {v.reservationStatus === ReservationStatus.Progress &&
                            v.transactionStatus !==
                              TransactionStatus.Complete && (
                              <div className={cx("reservation_btn")}>
                                예약중
                              </div>
                            )}
                          <button
                            disabled={
                              v.transactionStatus ===
                                TransactionStatus.Complete ||
                              v.identity === cookies.nickName
                            }
                            className={cx(
                              kind === "BUY" ? "chat_orange" : "chat_blue"
                            )}
                            onClick={() => enterChatHandle(v.id, v.identity)}
                          >
                            채팅하기
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {v.id === offerId && (
                <div className={cx("more_container")}>
                  <div className={cx("more_wrap")}>
                    <div className={cx("answer")}>
                      {moreKind === "complete"
                        ? v.transactionStatus === TransactionStatus.Complete
                          ? "재등록 하시겠습니까?"
                          : "거래완료로 변경하시겠습니까?"
                        : moreKind === "delete"
                        ? "삭제하시겠습니까?"
                        : v.reservationStatus === ReservationStatus.None
                        ? "예약중으로 변경하시겠습니까?"
                        : "판매상태로 변경하시겠습니까?"}
                    </div>
                    <div className={cx("more_btns")}>
                      <div
                        className={cx(
                          "more",
                          moreKind !== "delete" ? "blue" : "red"
                        )}
                        onClick={() =>
                          onClickMoreAction(
                            v.reservationStatus,
                            v.transactionStatus
                          )
                        }
                      >
                        {moreKind !== "delete" ? "변경" : "삭제"}
                      </div>
                      <div
                        className={cx("cancle")}
                        onClick={() => setOfferId(undefined)}
                      >
                        취소
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {nowAble === "my" && router.pathname === "/mypage" && (
                <>
                  <div
                    className={cx(
                      v.transactionStatus === TransactionStatus.Progress
                        ? "my_offer_wrap"
                        : "disable"
                    )}
                  >
                    <div
                      onClick={() =>
                        v.transactionStatus !== TransactionStatus.Complete &&
                        onClickMore(v.id, "reservation")
                      }
                      className={cx(
                        "border",
                        v.transactionStatus !== TransactionStatus.Complete &&
                          "pointer"
                      )}
                    >
                      {v.transactionStatus !== TransactionStatus.Complete && (
                        <div className={cx("toggle_wrap")}>
                          <div
                            className={cx(
                              v.reservationStatus === ReservationStatus.None &&
                                "toggle_open"
                            )}
                          >
                            오픈
                          </div>
                          <div
                            className={cx(
                              v.reservationStatus ===
                                ReservationStatus.Progress &&
                                "toggle_reservation"
                            )}
                          >
                            예약중
                          </div>
                        </div>
                      )}
                    </div>
                    <div
                      className={cx("circle_wrap")}
                      onClick={() => enterChatHandle(v.id, v.identity)}
                    >
                      <div className={cx("chat")}>채팅확인</div>
                      <div>
                        {v.isNewChatMessage && <div className={cx("circle")} />}
                      </div>
                    </div>
                    <div
                      onClick={() => onClickMore(v.id, "complete")}
                      className={cx("border", "pointer")}
                    >
                      {v.transactionStatus === "PROGRESS" ? (
                        "거래완료"
                      ) : (
                        <span className={cx("blue")}>재등록</span>
                      )}
                    </div>
                    <button
                      disabled={
                        v.transactionStatus == TransactionStatus.Complete
                      }
                      className={cx("edit_btn")}
                      onClick={() => onClickEditHandle(v.id)}
                    >
                      수정
                    </button>
                    <div
                      className={cx("red")}
                      onClick={() => onClickMore(v.id, "delete")}
                    >
                      삭제
                    </div>
                  </div>
                </>
              )}
              {router.pathname !== "/" && !router.pathname.includes("/p2p") && (
                <div ref={nextRef} />
              )}
            </div>
          ))
        ) : (
          <div className={cx("none_data_wrap")}>
            <div className={cx("none_data_img")}>
              <Image
                alt="느낌표"
                src={"/img/mypage/warning.png"}
                fill
                priority
                quality={100}
              />
            </div>
            <span>아직 거래를 하지 않았습니다.</span>
          </div>
        )}
      </div>
    </div>
  );
}
