import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./OTCTabel.module.scss";
import className from "classnames/bind";
import { useRouter } from "next/router";
import { useLazyQuery, useMutation } from "@apollo/client";
import { ENTER_CHAT_ROOM } from "../../../src/graphql/mutation/enterChatRoom";
import { toast } from "react-toastify";
import { DELETE_OFFER_BY_USER } from "../../../src/graphql/mutation/deleteOfferByUser";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { useCookies } from "react-cookie";
import { FIND_MY_INFO_BY_USER } from "../../../src/graphql/query/findMyInfoByUser";
import {
  DeleteOfferByUserMutation,
  EnterChatRoomMutation,
  FindManyOfferQuery,
  FindMyInfoByUserQuery,
  OfferAction,
  ReservationStatus,
  TransactionStatus,
  WalletAddressKind,
} from "src/graphql/generated/graphql";
import { convertConnectionDate } from "utils/convertConnectionDate";

const cx = className.bind(styles);

type Props = {
  offerId: number | undefined;
  nowAble: string;
  data: FindManyOfferQuery["findManyOffer"]["offers"];
  kind: OfferAction.Sell | OfferAction.Buy | undefined;
  coin: string;
  part: "home" | "otc" | "mypage" | "user";
  isChat: boolean;
  updateOfferClickHandle: (
    key: "reservation" | "complete",
    id: number,
    reservationState: ReservationStatus,
    transactionStatus: TransactionStatus,
    walletAddress: string,
    walletAddressKind: WalletAddressKind
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
  isChat,
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

  const onClickMore = (
    id: number,
    kind: "delete" | "reservation" | "complete"
  ) => {
    setOfferId(id);
    setMoreKind(kind);
  };

  const onClickMoreAction = (
    reservationStatus: ReservationStatus,
    transactionStatus: TransactionStatus,
    walletAddress: string,
    walletAddressKind: WalletAddressKind
  ) => {
    if (moreKind === "delete") {
      deleteOfferByUser({ variables: { deleteOfferByUserId: offerId } });
    } else {
      if (transactionStatus === TransactionStatus.Complete) {
        deleteOfferByUser({
          variables: { deleteOfferByUserId: offerId },
          onCompleted(_data) {
            deletehandle();
          },
        });
      }
      updateOfferClickHandle(
        moreKind === "complete" ? "complete" : "reservation",
        offerId ? offerId : 0,
        reservationStatus,
        transactionStatus,
        walletAddress,
        walletAddressKind
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
          {part === "otc" && <div>코인</div>}
          <div className={cx("seller")}>
            {kind === "SELL" ? "구매자" : "판매자"}
          </div>
          {part === "otc" && <div>거래성사량</div>}
          <div
            className={cx(part === "home" ? "location" : "not_home_location")}
          >
            거래장소
          </div>
          <div
            className={cx(
              part === "home" ? "min_and_max" : "not_home_min_and_max"
            )}
          >
            Min/Max
          </div>
          {part === "otc" && (
            <div className={cx("respon_speed")}>평균응답속도</div>
          )}
          <div className={cx("price")}>가격</div>
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
                    : part === "home"
                    ? "map_wrap"
                    : "not_home_map_wrap"
                )}
                key={idx}
              >
                <div className={cx(part !== "home" ? "body" : "home_body")}>
                  {part !== "home" && (
                    <div className={cx("not_home_coin")}>
                      <div className={cx("coin_img")}>
                        <Image
                          alt="코인 이미지"
                          src={`/img/marquee/${v.coinKind.toLowerCase()}.png`}
                          fill
                        />
                      </div>
                      <div className={cx("center")}>
                        {v.coinKind.toUpperCase()}
                      </div>
                    </div>
                  )}
                  <div className={cx("seller", part !== "home" && "center")}>
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
                    {
                      <div
                        className={cx(
                          part === "home"
                            ? "img_container"
                            : "not_home_img_container"
                        )}
                      >
                        <div className={cx("coin_img")}>
                          <Image
                            alt="코인 이미지"
                            src={`/img/marquee/${v.coinKind.toLowerCase()}.png`}
                            fill
                          />
                        </div>
                        <div>{v.coinKind.toUpperCase()}</div>
                        <div className={cx("trust_img")}>
                          <Image
                            alt="코인 이미지"
                            src={`/img/icon/trust.png`}
                            fill
                          />
                        </div>
                        <div>{v.offerCompleteCount}</div>
                      </div>
                    }
                  </div>
                  {part !== "home" && (
                    <div className={cx("not_home_coin")}>
                      <div className={cx("not_home_trust_img")}>
                        <Image
                          alt="코인 이미지"
                          src={`/img/icon/trust.png`}
                          fill
                        />
                      </div>
                      <div className={cx("center")}>{v.offerCompleteCount}</div>
                    </div>
                  )}
                  <div
                    className={cx(
                      part === "home"
                        ? v.district
                          ? "with_district"
                          : "none_district"
                        : "not_home_district"
                    )}
                  >
                    <div>{v.city?.name}</div>
                    <div className={cx("distric_text")}>{v.district?.name}</div>
                  </div>
                  <div
                    className={cx(
                      part === "home" ? "only_mobile" : "not_home_only_mobile"
                    )}
                  >
                    <div
                      className={cx(
                        part === "home" ? "mobile_body" : "not_home_mobile_body"
                      )}
                    >
                      <div>{v.minAmount.toLocaleString()}</div>
                      <div className={cx("gray")}>KRW</div>
                      <div>/{v.maxAmount.toLocaleString()}</div>
                      <div className={cx("gray")}>KRW</div>
                    </div>
                    <div className={cx("mobile_price")}>
                      <div>{v.price.toLocaleString()}</div>
                      <div className={cx("gray_right")}>KRW</div>
                    </div>
                  </div>
                  <div
                    className={cx(
                      part === "home" ? "only_pc" : "not_home_only_pc"
                    )}
                  >
                    <div
                      className={cx(
                        part === "home"
                          ? "min_and_max_bottom"
                          : "not_home_min_and_max_bottom"
                      )}
                    >
                      <div>
                        {v.minAmount.toLocaleString()}
                        <span className={cx("gray")}>KRW</span>/
                      </div>
                      <div>
                        {v.maxAmount.toLocaleString()}
                        <span className={cx("gray")}>KRW</span>
                      </div>
                    </div>

                    <div
                      className={cx(
                        part === "home"
                          ? "min_and_max_content"
                          : "not_home_min_and_max_content"
                      )}
                    >
                      {(router.pathname !== "/mypage" || isChat) && (
                        <>
                          <div>
                            최근 접속 :{" "}
                            {convertConnectionDate(v.connectionDate)}
                          </div>
                          <div className={cx("stick")} />
                        </>
                      )}
                      <div className={cx("min_and_max_wrap")}>
                        {(router.pathname !== "/mypage" || isChat) && (
                          <span className={cx("none_mobile")}>
                            평균응답속도 :
                          </span>
                        )}
                        <span>{v.responseSpeed}분 미만</span>
                      </div>
                    </div>
                  </div>
                  {router.pathname === "/mypage" && isChat && (
                    <div className={cx("gray", "my_ischat")}>
                      최근 접속 : {convertConnectionDate(v.connectionDate)}
                    </div>
                  )}
                  {part !== "home" && (
                    <div className={cx("resphone_speed_body")}>
                      {v.responseSpeed}분 미만
                    </div>
                  )}
                  <div className={cx("btns_wrap")}>
                    <div
                      className={cx(
                        part === "home" ? "right_price" : "not_home_right_price"
                      )}
                    >
                      {v.price.toLocaleString()}
                      <div className={cx("gray_right")}>KRW</div>
                    </div>
                    {(router.pathname !== "/mypage" || isChat) && (
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
                            v.transactionStatus,
                            v.walletAddress,
                            v.walletAddressKind
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
              {nowAble === "my" && router.pathname === "/mypage" && !isChat && (
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
                      <div className={cx("reservation_btns")}>
                        <div
                          className={cx(
                            v.reservationStatus === ReservationStatus.None &&
                              "able"
                          )}
                        >
                          오픈
                        </div>
                        <div className={cx("bar")} />
                        <div
                          className={cx(
                            v.reservationStatus ===
                              ReservationStatus.Progress && "able"
                          )}
                        >
                          예약중
                        </div>
                      </div>
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
