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
import { useCookies } from "react-cookie";
import { FIND_MY_INFO_BY_USER } from "../../src/graphql/query/findMyInfoByUser";
import {
  CoinKind,
  FindManyOfferQuery,
  FindMyInfoByUserQuery,
  OfferAction,
  ReservationStatus,
  TransactionStatus,
  WalletAddressKind,
} from "src/graphql/generated/graphql";
import { UPDATE_RESERVATION_STATUS_BY_USER } from "../../src/graphql/mutation/updateReservationStatusByUser";
import { UPDATE_TRANSACTION_STATUS_BY_USER } from "src/graphql/mutation/updateTransactionStatusByUser";
import { CREATE_OFFER_BY_USER } from "src/graphql/mutation/createOfferByUser";
import MarketPrice from "components/MarketPrice/MarketPrice";

const cx = className.bind(styles);

type Props = {
  part: "home" | "otc" | "mypage" | "user";
  nowAble: string;
  partKind?: OfferAction;
  coinKind?: CoinKind;
  nickName?: string | undefined;
  isChat?: boolean;
  refetch?: boolean;
  handleRefetch?: () => void;
};

export default function OTC({
  nowAble,
  coinKind,
  partKind,
  refetch,
  part = "otc",
  nickName = undefined,
  isChat = false,
  handleRefetch,
}: Props) {
  const offerStateBtns = ["팝니다", "삽니다"];
  const coinBtns = [
    { name: "USDT", coinKind: CoinKind.Usdt },
    { name: "BTC", coinKind: CoinKind.Btc },
    { name: "ETH", coinKind: CoinKind.Eth },
    { name: "TRX", coinKind: CoinKind.Trx },
  ];
  const [take] = useState(10);
  const [skip, setSkip] = useState(0);
  const [current, setCurrent] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [data, setData] = useState<
    FindManyOfferQuery["findManyOffer"]["offers"]
  >([]);

  const [kind, setKind] = useState<OfferAction>(OfferAction.Buy);
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
    transactionStatus: TransactionStatus,
    walletAddress: string,
    walletAddressKind: WalletAddressKind
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
        findMyInfoByUser({
          onCompleted(myInfo) {
            createOfferByUser({
              variables: {
                ...data.filter((v) => v.id === id)[0],
                cityId: data.filter((v) => v.id === id)[0].city.id,
                isUseNextTime: myInfo.findMyInfoByUser.walletAddress
                  ? true
                  : false,
                walletAddress,
                walletAddressKind,
                content: data.filter((v) => v.id === id)[0].content
                  ? data.filter((v) => v.id === id)[0].content
                  : undefined,
              },
            });
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
    }
  };

  const onClickHandle = (v: any, key: string) => {
    if (key === "kind") {
      setKind(v);
      setCoin(CoinKind.Usdt);
      setSkip(0);
    } else {
      setCoin(v);
      setCurrent(1);
      setSkip(0);
      findManyOffer({
        variables: {
          take,
          skip,
          offerAction: partKind,
          coinKind: v,
        },
      });
    }
  };

  const deletehandle = () => {
    findManyOffer({
      variables: {
        isChat,
        identity: isChat ? undefined : nickName,
        take: part === "home" ? 4 : take,
        skip,
        offerAction: part === "mypage" ? partKind : undefined,
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
        if (handleRefetch) {
          handleRefetch();
        }
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
        if (handleRefetch) {
          handleRefetch();
        }
      },
    }
  );

  useEffect(() => {
    if (router.pathname.includes("/p2p")) {
      const path = router.pathname.split("/")[1];
      setKind(path === "buy" ? OfferAction.Buy : OfferAction.Sell);
    }
  }, []);

  useEffect(() => {
    if (router.pathname.includes("/p2p")) {
      findManyOffer({
        variables: {
          isChat: false,
          identity: undefined,
          take,
          skip,
          offerAction:
            kind === OfferAction.Buy ? OfferAction.Buy : OfferAction.Sell,
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
          identity: isChat ? undefined : nickName,
          take: part === "home" ? 4 : take,
          skip,
          offerAction: partKind,
          coinKind: part === "mypage" || part === "user" ? undefined : coinKind,
        },
        fetchPolicy: "no-cache",
      });
    }
  }, [coinKind, partKind, isChat, nickName, refetch, data?.length, kind, part]);

  return (
    <div className={cx(part === "otc" ? "container" : undefined)}>
      {part === "otc" && (
        <>
          <TopImage imageName={"1"} />
          <MarketPrice type="not_home" />
        </>
      )}

      <div className={cx("wrap")}>
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
                  {part === "otc" && (
                    <div className={cx("btns_container")}>
                      <div className={cx("btns_wrap")}>
                        {offerStateBtns.map((btn) => (
                          <div
                            key={btn}
                            onClick={() =>
                              onClickHandle(
                                btn === "팝니다"
                                  ? OfferAction.Sell
                                  : OfferAction.Buy,
                                "kind"
                              )
                            }
                            className={cx(
                              btn === "팝니다"
                                ? kind === OfferAction.Sell
                                  ? `able_sell`
                                  : "default_kind"
                                : kind === OfferAction.Buy
                                ? "able_buy"
                                : "default_kind"
                            )}
                          >
                            {btn}
                          </div>
                        ))}
                      </div>
                      <div className={cx("coin_btns")}>
                        {coinBtns.map((v) => (
                          <div
                            className={cx(
                              "coin_btn",
                              coin === v.coinKind &&
                                v.coinKind.toLocaleLowerCase()
                            )}
                            key={v.coinKind}
                            onClick={() => onClickHandle(v.coinKind, "coin")}
                          >
                            <div className={cx("coin_img_wrap")}>
                              <Image
                                fill
                                alt="코인 이미지"
                                src={`/img/marquee/${v.coinKind.toLocaleLowerCase()}.png`}
                              />
                            </div>
                            {v.name}
                          </div>
                        ))}
                      </div>
                      <div
                        className={cx(
                          "non_mobile",
                          kind === OfferAction.Sell
                            ? "create_orange"
                            : "create_blue"
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
                    </div>
                  )}
                </div>
              </>
            )}
            <OTCTabel
              offerId={offerId}
              part={part}
              data={data ? data : []}
              kind={partKind ? partKind : kind}
              coin={coin}
              nowAble={nowAble}
              updateOfferClickHandle={updateOfferClickHandle}
              onScrollHandle={scrollHandle}
              deletehandle={deletehandle}
              setOfferId={setOfferId}
              isChat={isChat}
            />
          </div>
          {part === "otc" && data.length !== 0 && (
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
                hideFirstLastPages
              />
            </div>
          )}
        </div>

        {part === "otc" && (
          <div
            onClick={onClickCreate}
            className={cx(
              kind === OfferAction.Buy
                ? "mobile_buy_create"
                : "mobile_sell_create"
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
