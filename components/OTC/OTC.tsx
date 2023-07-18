import { useState, useEffect, Dispatch, SetStateAction } from "react";
import router from "next/router";
import styles from "./OTC.module.scss";
import className from "classnames/bind";
import Pagination from "react-js-pagination";
import OTCTabel from "./OTCTabel/OTCTabel";
import { useLazyQuery, useMutation } from "@apollo/client";
import { FIND_MANY_OFFER } from "../../src/graphql/query/findManyOffer";
import { toast } from "react-toastify";
import TopImage from "../TopImage/TopImage";
import Image from "next/image";
import Marquee from "../Marquee/Marquee";
import { useCookies } from "react-cookie";
import { FIND_MY_INFO_BY_USER } from "../../src/graphql/query/findMyInfoByUser";
import {
  CoinKind,
  FindManyOfferQuery,
  FindMyInfoByUserQuery,
  OfferAction,
  ReservationStatus,
  TransactionStatus,
} from "src/graphql/generated/graphql";
import { UPDATE_RESERVATION_STATUS_BY_USER } from "../../src/graphql/mutation/updateReservationStatusByUser";
import { UPDATE_TRANSACTION_STATUS_BY_USER } from "src/graphql/mutation/updateTransactionStatusByUser";
import { CREATE_OFFER_BY_USER } from "src/graphql/mutation/createOfferByUser";

const cx = className.bind(styles);

type Props = {
  part: "home" | "otc" | "mypage" | "user";
  nowAble: string;
  partKind?: OfferAction;
  coinKind?: CoinKind;
  nickName?: string | undefined;
  isChat?: boolean;
  refetch?: boolean;
  setTotalOffer?: Dispatch<SetStateAction<number>>;
};

export default function OTC({
  nowAble,
  coinKind,
  partKind,
  refetch,
  part = "otc",
  nickName = undefined,
  isChat = false,
  setTotalOffer,
}: Props) {
  const offerStateBtns = ["팝니다", "삽니다"];
  const coinBtns = [
    { name: "USDT", coinKind: CoinKind.Usdt },
    { name: "BTC", coinKind: CoinKind.Btc },
    // { name: "ETH", coinKind: CoinKind.Eth },
    // { name: "TRX", coinKind: CoinKind.Trx },
  ];
  const [take] = useState(10);
  const [skip, setSkip] = useState(0);
  const [current, setCurrent] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [data, setData] = useState<
    FindManyOfferQuery["findManyOffer"]["offers"]
  >([]);
  const [kind, setKind] = useState<"sell" | "buy">("buy");
  const [coin, setCoin] = useState<CoinKind>(CoinKind.Usdt);
  const [cookies] = useCookies(["nickName"]);
  const [offerId, setOfferId] = useState<number | undefined>(undefined);

  const handlePagination = (e: number) => {
    setSkip((e - 1) * take);
    setCurrent(e);
  };

  const scrollHandle = () => {
    findManyOffer({
      variables: {
        isChat,
        identity: isChat ? undefined : nickName,
        take: data?.length + 10,
        skip: data?.length,
        offerAction:
          router.pathname === "/mypage" && !isChat
            ? undefined
            : partKind
            ? partKind
            : OfferAction.Buy,
        coinKind: part === "mypage" || part === "user" ? undefined : coinKind,
      },
      onCompleted(onData) {
        if (onData.findManyOffer.totalCount > data.length) {
          setData((prev) => [...prev, ...onData.findManyOffer.offers]);
        }
      },
      fetchPolicy: "no-cache",
    });
  };

  const updateOfferClickHandle = (
    key: "reservation" | "complete",
    id: number,
    reservationState: ReservationStatus,
    transactionStatus: TransactionStatus
  ) => {
    if (key === "complete") {
      if (transactionStatus === TransactionStatus.Progress) {
        if (reservationState === ReservationStatus.None) {
          updateReservationStatusByUser({
            variables: { updateReservationStatusByUserId: id },
          });
        }
        updateTransactionStatusByUser({
          variables: { updateTransactionStatusByUserId: id },
        });
      } else {
        createOfferByUser({
          variables: {
            ...data.filter((v) => v.id === id)[0],
            cityId: data.filter((v) => v.id === id)[0].city.id,
          },
        });
      }
    } else {
      updateReservationStatusByUser({
        variables: { updateReservationStatusByUserId: id },
      });
    }
  };

  const onClickCreate = () => {
    if (cookies.nickName) {
      findMyInfoByUser({
        onCompleted(data) {
          const mylevel = data.findMyInfoByUser.level;
          if (mylevel < 3) {
            router.push(`/certification/level${mylevel + 1}`);
            toast.warn("다음단계의 인증이 필요합니다");
          } else {
            router.push("/create-offer");
          }
        },
        fetchPolicy: "no-cache",
      });
    } else {
      router.push("/sign-in");
      toast.warn("로그인이 필요한 서비스입니다.");
    }
  };

  const onClickHandle = (v: any, key: string) => {
    if (key === "kind") {
      router.push(v === "buy" ? "/p2p/buy" : "/p2p/sell");
      setKind(v);
      setCoin(CoinKind.Usdt);
    } else {
      setCoin(v);
      setCurrent(1);
      setSkip(0);
      findManyOffer({
        variables: {
          take,
          skip,
          offerAction: partKind
            ? partKind
            : kind === "buy"
            ? OfferAction.Buy
            : OfferAction.Sell,
          coinKind: v,
        },
      });
    }
  };

  const deletehandle = () => {
    findManyOffer({
      variables: {
        isChat,
        identity:
          router.pathname === "/mypage" && isChat ? undefined : nickName,
        take: part === "home" ? 4 : take,
        skip,
        offerAction:
          router.pathname === "/mypage" && !isChat ? undefined : partKind,
        coinKind: part === "mypage" || part === "user" ? undefined : coinKind,
      },
    });
  };

  const [findMyInfoByUser] = useLazyQuery<FindMyInfoByUserQuery>(
    FIND_MY_INFO_BY_USER,
    {
      onError: (e) => toast.error(e.message ?? `${e}`),
    }
  );

  const [createOfferByUser] = useMutation(CREATE_OFFER_BY_USER, {
    onError: (e) => toast.error(e.message ?? `${e}`),
    onCompleted() {
      toast.success("오퍼를 재등록했습니다.");
    },
  });

  const [findManyOffer] = useLazyQuery(FIND_MANY_OFFER, {
    onError: (e) => toast.error(e?.message ?? `${e}`),
    onCompleted(data) {
      setTotalCount(data.findManyOffer.totalCount);
      setData(data.findManyOffer.offers);
    },
    fetchPolicy: "no-cache",
  });

  const [updateReservationStatusByUser] = useMutation(
    UPDATE_RESERVATION_STATUS_BY_USER,
    {
      onError: (e) => toast.error(e.message ?? `${e}`),
      onCompleted(_v) {
        toast.success("해당 오퍼의 상태를 변경했습니다.", { toastId: 0 });
        findManyOffer({
          variables: { take, skip, identity: cookies.nickName },
        });
        setOfferId(undefined);
      },
    }
  );

  const [updateTransactionStatusByUser] = useMutation(
    UPDATE_TRANSACTION_STATUS_BY_USER,
    {
      onError: (e) => toast.error(e.message ?? `${e}`),
      onCompleted(_v) {
        toast.success("해당 오퍼의 상태를 변경했습니다.", { toastId: 0 });
        findManyOffer({
          variables: { take, skip, identity: cookies.nickName },
        });
        setOfferId(undefined);
      },
    }
  );

  useEffect(() => {
    setTotalOffer && setTotalOffer(totalCount);
    if (router.pathname.includes("/p2p")) {
      findManyOffer({
        variables: {
          isChat: false,
          identity: undefined,
          take,
          skip,
          offerAction: kind === "buy" ? OfferAction.Buy : OfferAction.Sell,
          coinKind: coin,
        },
      });
    }
  }, [take, skip, totalCount, current, kind]);

  useEffect(() => {
    if (!router.pathname.includes("/p2p")) {
      findManyOffer({
        variables: {
          isChat,
          identity:
            router.pathname === "/mypage" && isChat ? undefined : nickName,
          take: part === "home" ? 4 : take,
          skip,
          offerAction:
            router.pathname === "/mypage" && !isChat ? undefined : partKind,
          coinKind: part === "mypage" || part === "user" ? undefined : coinKind,
        },
        fetchPolicy: "no-cache",
      });
    }
  }, [coinKind, partKind, isChat, nickName, refetch, data?.length, kind]);

  return (
    <div className={cx(part === "otc" ? "container" : undefined)}>
      {part === "otc" && (
        <>
          <TopImage imageName={"1"} />
        </>
      )}
      <div className={cx("wrap")}>
        {part === "otc" && (
          <div style={{ border: "solid 1px #dcdcdc" }}>
            <Marquee />
          </div>
        )}
        <div className={cx(part === "otc" ? "bottom_container" : "full")}>
          <div
            className={cx(part === "otc" ? "bottom_wrap" : "other_bottom_wrap")}
          >
            {part === "otc" && (
              <>
                <div className={cx("bottom_title")}>
                  {!partKind && "P2P Offer"}
                </div>
                <div className={cx("bottom_body")}>
                  <div>
                    {part === "otc" && (
                      <div className={cx("btns_wrap")}>
                        {offerStateBtns.map((btn, idx) => (
                          <div
                            key={btn}
                            onClick={() =>
                              onClickHandle(
                                btn === "팝니다" ? "buy" : "sell",
                                "kind"
                              )
                            }
                            className={cx(
                              btn === "팝니다"
                                ? kind === "buy"
                                  ? `able_buy`
                                  : "default_kind"
                                : kind === "sell"
                                ? "able_sell"
                                : "default_kind"
                            )}
                          >
                            {btn}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {part === "otc" && (
                    <>
                      <div className={cx("coin_btns")}>
                        {coinBtns.map((v) => (
                          <div
                            className={cx(
                              coin === v.coinKind
                                ? kind !== "buy"
                                  ? "able_buy_btn"
                                  : "able_sell_btn"
                                : "default_btn"
                            )}
                            key={v.coinKind}
                            onClick={() => onClickHandle(v.coinKind, "coin")}
                          >
                            {v.name}
                          </div>
                        ))}
                      </div>
                      <div
                        className={cx(
                          "non_mobile",
                          kind === "buy" ? "create_orange" : "create_blue"
                        )}
                        onClick={onClickCreate}
                      >
                        <div>오퍼 만들기</div>
                        <div className={cx("arrow_img")}>
                          <Image
                            alt="화살표"
                            src={"/img/mypage/arrow.png"}
                            fill
                            priority
                            quality={100}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
            <OTCTabel
              offerId={offerId}
              part={part}
              data={data ? data : []}
              kind={
                partKind
                  ? partKind
                  : kind === "buy"
                  ? OfferAction.Buy
                  : OfferAction.Sell
              }
              coin={coin}
              nowAble={nowAble}
              updateOfferClickHandle={updateOfferClickHandle}
              onScrollHandle={scrollHandle}
              deletehandle={deletehandle}
              setOfferId={setOfferId}
            />
          </div>
          {part === "otc" && (
            <div className={cx("pagenation_wrap")}>
              <Pagination
                activePage={current}
                itemsCountPerPage={take}
                totalItemsCount={totalCount}
                pageRangeDisplayed={10}
                onChange={handlePagination}
                activeClass={cx("able_number")}
                itemClass={cx("default_number")}
                prevPageText={
                  <div className={cx(totalCount !== 0 ? "left_arrow" : "none")}>
                    <Image
                      alt="화살표"
                      src={"/img/inquiry/arrow_b.png"}
                      width={15}
                      height={9.5}
                      priority
                      quality={100}
                    />
                  </div>
                }
                nextPageText={
                  <div
                    className={cx(totalCount !== 0 ? "right_arrow" : "none")}
                  >
                    <Image
                      alt="화살표"
                      src={"/img/inquiry/arrow_b.png"}
                      width={15}
                      height={9.5}
                      priority
                      quality={100}
                    />
                  </div>
                }
                lastPageText={""}
                firstPageText={""}
              />
            </div>
          )}
        </div>

        {part === "otc" && (
          <div
            onClick={onClickCreate}
            className={cx(
              kind === "buy" ? "mobile_buy_create" : "mobile_sell_create"
            )}
          >
            <div>오퍼 만들기</div>
            <div className={cx("arrow_wrap")}>
              <Image fill alt="화살표" src={"/img/mypage/arrow.png"} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
