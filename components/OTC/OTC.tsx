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
import { UPDATE_OFFER_STATUS_BY_USER } from "../../src/graphql/mutation/updateOfferStatusByUser";
import { useCookies } from "react-cookie";
import { FIND_MY_INFO_BY_USER } from "../../src/graphql/query/findMyInfoByUser";
import {
  CoinKind,
  FindManyOfferQuery,
  FindMyInfoByUserQuery,
  OfferAction,
} from "src/graphql/generated/graphql";

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
  partKind = OfferAction.Buy,
  refetch,
  part = "otc",
  nickName = undefined,
  isChat = false,
  setTotalOffer,
}: Props) {
  const btns = ["구매", "판매", "USDT", "BTC"];
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
    });
  };

  const updateOfferClickHandle = (
    key: string,
    id: number,
    progress?: boolean
  ) => {
    if (key === "progress") {
      updateOfferStatusByUser({ variables: { updateOfferStatusByUserId: id } });
    } else {
      if (progress && progress) {
        updateOfferStatusByUser({
          variables: { updateOfferStatusByUserId: id },
        });
      } else {
        toast.warn("예약중인 오퍼가 아닙니다.");
      }
    }
  };

  const onClickCreate = () => {
    if (cookies.nickName) {
      findMyInfoByUser({
        onCompleted(data) {
          const mylevel = data.findMyInfoByUser.level;
          if (mylevel < 3) {
            router.push(`certification/level${mylevel + 1}`);
            toast.warn("다음단계의 인증이 필요합니다");
          } else {
            router.push("/create-offer");
          }
        },
        fetchPolicy: "no-cache",
      });
    } else {
      router.push("sign-in");
      toast.warn("로그인이 필요한 서비스입니다.");
    }
  };

  const onClickHandle = (v: any, key: string) => {
    if (key === "kind") {
      setKind(v);
      setCurrent(1);
      setSkip(0);
      findManyOffer({
        variables: {
          take,
          skip,
          offerAction: partKind
            ? partKind
            : v !== "sell"
            ? OfferAction.Buy
            : OfferAction.Sell,
          coinKind: coin,
        },
      });
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
          coinKind: v === "BTC" ? CoinKind.Btc : CoinKind.Usdt,
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

  const [findManyOffer] = useLazyQuery(FIND_MANY_OFFER, {
    onError: (e) => toast.error(e?.message ?? `${e}`),
    onCompleted(data) {
      setTotalCount(data.findManyOffer.totalCount);
      setData(data.findManyOffer.offers);
    },
    fetchPolicy: "no-cache",
  });

  const [updateOfferStatusByUser] = useMutation(UPDATE_OFFER_STATUS_BY_USER, {
    onError: (e) => toast.error(e.message ?? `${e}`),
    onCompleted(_v) {
      toast.success("해당 오퍼의 상태를 변경했습니다.");
      findManyOffer({ variables: { take, skip, identity: cookies.nickName } });
    },
  });

  useEffect(() => {
    setTotalOffer && setTotalOffer(totalCount);
    if (router.pathname === "/otc") {
      findManyOffer({
        variables: {
          isChat: false,
          identity: undefined,
          take,
          skip,
          offerAction: kind === "buy" ? OfferAction.Buy : OfferAction.Sell,
          coinKind: coin === "BTC" ? CoinKind.Btc : CoinKind.Usdt,
        },
      });
    }
  }, [take, skip, totalCount, current]);

  useEffect(() => {
    if (router.pathname !== "/otc") {
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
  }, [coinKind, partKind, isChat, nickName, refetch, data?.length]);

  return (
    <div className={cx(part === "otc" ? "container" : undefined)}>
      {part === "otc" && (
        <>
          <TopImage imageName={"1"} />
        </>
      )}
      <div className={cx("wrap")}>
        <div className={cx(part === "otc" ? "middle_wrap" : "none")}>
          <div className={cx("middle_top")}>
            <div>
              <div className={cx("middle_title")}>OTC Market</div>
              <div className={cx("img_wrap")}>
                <Image
                  alt="otc 이미지"
                  src={"/img/otc/1.png"}
                  fill
                  priority
                  quality={100}
                />
              </div>
            </div>
            <div className={cx("content_wrap", "padding")}>
              <div>Over The Counter</div>
              <div className={cx("content_top")}>
                OTC(Over-The-Counter) 마켓은 일반적으로
                <br className={cx("mobile_br")} /> 중앙 집중식 거래소와 달리
                <br className={cx("pc_br")} /> 주식, 채권, 암호화폐 및 기타
                <br className={cx("mobile_br")} />
                금융자산을 거래하는 분산형 거래 플랫폼입니다.
              </div>
              <div className={cx("content_bottom")}>
                OTC 마켓은 중앙화 방식의 주문 대신에 탈중앙화 방식인
                <br className={cx("mobile_br")} /> 개인간 직접거래를
                <br className={cx("pc_br")} /> 허용하며, 판매자 및 구매자들이
                서로
                <br className={cx("mobile_br")} /> 직거래를 체결할 수 있도록
                돕습니다.
                <br className={cx("mobile_br")} />
                <br className={cx("pc_br")} /> 이는 일반적으로 대량 거래, 대기업
                및 기관 투자자,
                <br /> 또는 특정 자산에 대한 액세스를 원하는 사람들에게
                <br className={cx("mobile_br")} /> 인기가 있습니다.
              </div>
            </div>
          </div>
          <div className={cx("middle_bottom")}>
            <div className={cx("content_wrap", "align_right")}>
              <div>방배사는,</div>
              <div className={cx("content_top")}>
                투자자가 대량 거래를 신속하게 체결할 수 있는
                <br className={cx("mobile_br")} /> 플랫폼을 제공합니다.
                <br className={cx("pc_br")} /> 이는 주식 시장에 큰 영향을
                <br className={cx("mobile_br")} /> 줄 수 있는 거래를 조용히
                처리하거나,
                <br className={cx("pc_br")} /> 큰 규모의 주식이나
                <br className={cx("mobile_br")} /> 암호화폐를 구매 또는 판매할
                때 특히 유용합니다.
              </div>
              <div className={cx("content_bottom")}>
                방배사에서 개인간 맞춤화 된 계약을 맺어보세요.
              </div>
            </div>
            <div className={cx("img_wrap")}>
              <Image
                alt="otc 이미지"
                src={"/img/otc/2.png"}
                fill
                priority
                quality={100}
              />
            </div>
          </div>
        </div>
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
                  {!partKind && "OTC Offer"}
                </div>
                <div className={cx("bottom_body")}>
                  {part === "otc" && (
                    <div className="flex">
                      {btns.map(
                        (btn, idx) =>
                          idx < 2 && (
                            <div
                              key={btn}
                              onClick={() =>
                                onClickHandle(
                                  btn === "구매" ? "buy" : "sell",
                                  "kind"
                                )
                              }
                              className={cx(
                                btn === "구매"
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
                          )
                      )}
                    </div>
                  )}
                  {part === "otc" && (
                    <>
                      <div
                        className={cx("coin_btns")}
                        onClick={() =>
                          onClickHandle(
                            coin === "USDT" ? "BTC" : "USDT",
                            "coin"
                          )
                        }
                      >
                        <div
                          className={cx(
                            kind === "buy" ? "orange" : "blue",
                            "toggle-circle",
                            coin === "BTC" && "toggle--checked"
                          )}
                        >
                          {coin !== "BTC" ? "USDT" : "BTC"}
                        </div>
                        {btns.map(
                          (btn, idx) => idx > 1 && <div key={btn}>{btn}</div>
                        )}
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
              part={part}
              data={data ? data : []}
              kind={partKind ? partKind : kind === "buy" ? "BUY" : "SELL"}
              coin={coin}
              nowAble={nowAble}
              updateOfferClickHandle={updateOfferClickHandle}
              onScrollHandle={scrollHandle}
              deletehandle={deletehandle}
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
          <div onClick={onClickCreate} className={cx("mobile_create")}>
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
