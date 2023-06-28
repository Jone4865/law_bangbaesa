import { useState, useEffect } from "react";
import styles from "./OTCTabel.module.scss";
import className from "classnames/bind";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { ENTER_CHAT_ROOM } from "../../../src/graphql/generated/mutation/enterChatRoom";
import { toast } from "react-toastify";
import { DELETE_OFFER_BY_USER } from "../../../src/graphql/generated/mutation/deleteOfferByUser";
import { useInView } from "react-intersection-observer";
import moment from "moment";
import Image from "next/image";
import { useCookies } from "react-cookie";

const cx = className.bind(styles);

type Data = {
  id: number;
  coinKind: "BITCOIN" | "TETHER";
  offerAction: "BUY" | "SELL";
  transactionMethod: "DIRECT";
  price: number;
  minAmount: number;
  maxAmount: number;
  responseSpeed: number;
  content: string;
  createdAt: string;
  reservationStatus: "NONE" | "PROGRESS";
  transactionStatus: "PROGRESS" | "COMPLETE";
  city: {
    id: number;
    name: string;
  };
  identity: string;
  positiveCount: number;
  connectionDate: string;
  isNewChatMessage: boolean;
};

type Props = {
  nowAble: string;
  data: Data[];
  kind: "SELL" | "BUY" | undefined;
  coin: string;
  part: "home" | "otc" | "mypage" | "user";
  updateOfferClickHandle: (key: string, id: number, progress?: boolean) => void;
  onScrollHandle: () => void;
};

export default function OTCTabel({
  nowAble = "like",
  part = "otc",
  data,
  coin,
  kind = "BUY",
  updateOfferClickHandle,
  onScrollHandle,
}: Props) {
  const router = useRouter();
  const [cookies] = useCookies(["nickName"]);
  const [nextRef, nextView] = useInView({
    threshold: 1,
  });

  const onClickDelete = (id: number) => {
    deleteOfferByUser({ variables: { id } });
  };

  const enterChatHandle = (id: number) => {
    enterChatRoom({
      variables: { offerId: +id },
      onCompleted(v) {
        router.pathname !== "/mypage"
          ? router.push(`/chat/${id}/${v.enterChatRoom.id}`)
          : router.push(`/mychat/${v.enterChatRoom.id}`);
      },
    });
  };

  const [enterChatRoom] = useMutation(ENTER_CHAT_ROOM, {
    onError: (e) => toast.error(e.message ?? `${e}`),
  });

  const [deleteOfferByUser] = useMutation(DELETE_OFFER_BY_USER, {
    onError: (e) => toast.error(e.message ?? `${e}`),
    onCompleted(v) {
      toast.success("해당 오퍼를 삭제했습니다.");
    },
  });

  useEffect(() => {}, [data, coin, kind, nowAble]);

  useEffect(() => {
    onScrollHandle();
    if (data.length >= 10) {
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
          <div className={cx("seller")}>판매자</div>
          <div>거래수단</div>
          <div>Min/Max</div>
          <div>평균 응답 속도</div>
          <div className={cx("price")}>{coin}당 가격</div>
        </div>
        {data.length !== 0 ? (
          data?.map((v, idx) => (
            <div key={v.id} className={cx("map_container")}>
              <div className={cx("map_wrap")} key={idx}>
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
                      nowAble === "like") && (
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
                        최근 접속 :{" "}
                        {moment(v.connectionDate).format("mm" + "분 전")}
                      </div>
                    )}
                  </div>
                  <div className={cx("mobile_flex")}>
                    <div>{v.city?.name}/</div>
                    <div>{v.transactionMethod === "DIRECT" ? "직접" : ""}</div>
                  </div>
                  <div className={cx("mobile_none")}>
                    <div>
                      {v.minAmount}
                      <span className={cx("gray")}>KRW</span>/
                    </div>
                    <div>
                      {v.maxAmount}
                      <span className={cx("gray")}>KRW</span>
                    </div>
                  </div>
                  <div className={cx("time")}>{v.responseSpeed}분 미만</div>
                  <div className={cx("btns_wrap")}>
                    <div className={cx("right_price")}>
                      {v.price}
                      <span className={cx("gray_right")}>KRW</span>
                    </div>
                    {(router.pathname === "/user/[id]" ||
                      nowAble === "like") && (
                      <div className="flex">
                        {v.reservationStatus && part === "otc" && (
                          <div className={cx("reservation_btn")}>예약중</div>
                        )}
                        <button
                          className={cx(
                            kind === "BUY" ? "chat_orange" : "chat_blue"
                          )}
                          onClick={() => enterChatHandle(v.id)}
                        >
                          채팅하기
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                {nowAble !== "my" && (
                  <div className={cx("mobile")}>
                    <div className={cx("mobile_body")}>
                      <div className="flex">
                        <div>
                          {v.minAmount}
                          <span className={cx("gray")}>KRW</span>/
                        </div>
                        <div>
                          {v.maxAmount}
                          <span className={cx("gray")}>KRW</span>
                        </div>
                      </div>
                      <div className={cx("right_price")}>
                        {v.price}
                        <span className={cx("gray_right")}>KRW</span>
                      </div>
                    </div>
                    <div className={cx("mobile_body")}>
                      <div className={cx("log")}>최근 접속</div>
                      <div className="flex">
                        {v.reservationStatus && part === "otc" && (
                          <div className={cx("reservation_btn")}>예약중</div>
                        )}
                        <button
                          className={cx(
                            kind === "BUY" ? "chat_orange" : "chat_blue"
                          )}
                          onClick={() => enterChatHandle(v.id)}
                        >
                          채팅하기
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {nowAble === "my" && router.pathname === "/mypage" && (
                <>
                  <div className={cx("my_offer_wrap")}>
                    <div
                      onClick={() =>
                        v.reservationStatus === "NONE" &&
                        updateOfferClickHandle("progress", v.id)
                      }
                      className={cx(
                        "border",
                        v.reservationStatus === "NONE" && "pointer"
                      )}
                    >
                      {v.reservationStatus === "NONE" ? (
                        <span>
                          예약중으로 <br className={cx("mobile")} />
                          변경
                        </span>
                      ) : (
                        <span
                          className={cx(
                            v.transactionStatus === "PROGRESS" && "grin"
                          )}
                        >
                          {v.transactionStatus === "PROGRESS" ? "예약중" : "-"}
                        </span>
                      )}
                    </div>
                    <div
                      onClick={() =>
                        v.transactionStatus === "PROGRESS" &&
                        updateOfferClickHandle(
                          "transaction",
                          v.id,
                          v.reservationStatus === "NONE" ? false : true
                        )
                      }
                      className={cx(
                        "border",
                        v.transactionStatus === "PROGRESS" && "pointer"
                      )}
                    >
                      {v.transactionStatus === "PROGRESS" ? (
                        "거래완료"
                      ) : (
                        <span className={cx("blue")}>거래완료</span>
                      )}
                    </div>
                    <div
                      className={cx("circle_wrap")}
                      onClick={() => enterChatHandle(v.id)}
                    >
                      <div className={cx("chat")}>채팅확인</div>
                      <div>
                        {v.isNewChatMessage && <div className={cx("circle")} />}
                      </div>
                    </div>
                    <div
                      className={cx("red")}
                      onClick={() => onClickDelete(v.id)}
                    >
                      삭제
                    </div>
                  </div>
                </>
              )}
              {router.pathname !== "/" && router.pathname !== "/otc" && (
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
