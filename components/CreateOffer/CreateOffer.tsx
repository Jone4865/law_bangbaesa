import { useEffect, useState } from "react";
import styles from "./CreateOffer.module.scss";
import className from "classnames/bind";
import { useRouter } from "next/router";
import { useLazyQuery, useMutation } from "@apollo/client";
import { CREATE_OFFER_BY_USER } from "../../src/graphql/mutation/createOfferByUser";
import { toast } from "react-toastify";
import Image from "next/image";
import { FIND_MANY_CITY } from "../../src/graphql/query/findManyCity";
import {
  CoinKind,
  CreateOfferByUserMutation,
  FindManyCityQuery,
  OfferAction,
  WalletAddressKind,
} from "src/graphql/generated/graphql";
import { FIND_ONE_OFFER } from "src/graphql/query/findOneOffer";
import { FIND_MY_INFO_BY_USER } from "src/graphql/query/findMyInfoByUser";
import WalletDropDown from "components/DropDown/WalletDropDown/WalletDropDown";
import LocationDropDown from "components/DropDown/LocationDropDown/LocationDropDown";

const cx = className.bind(styles);

type Data = {
  name: string;
  id: number;
};

export default function CreateOffer() {
  const router = useRouter();
  const [coin, setCoin] = useState<CoinKind[0]>(CoinKind.Usdt);
  const [kind, setKind] = useState("구매");
  const [location, setLocation] = useState<undefined | Data>(undefined);
  const [detailLocation, setDetailLocation] =
    useState<undefined | Data | null>(undefined);
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [min, setMin] = useState<number | undefined>(undefined);
  const [max, setMax] = useState<number | undefined>(undefined);
  const [time, setTime] = useState<number | undefined>(undefined);
  const [text, setText] = useState<string | undefined | null>(undefined);
  const [city, setCity] = useState<FindManyCityQuery["findManyCity"]>();
  const [saveWallet, setSaveWallet] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>("");

  const [walletAddressKind, setWalletAddressKind] = useState(
    WalletAddressKind.MetaMask
  );

  const coinArr = [
    { name: "USDT", coinKind: CoinKind.Usdt },
    { name: "BTC", coinKind: CoinKind.Btc },
    { name: "ETH", coinKind: CoinKind.Eth },
    { name: "TRX", coinKind: CoinKind.Trx },
  ];

  const kindArr = ["구매", "판매"];

  const walletArr = [
    { name: "메타마스크", value: WalletAddressKind.MetaMask },
    { name: "아임토큰", value: WalletAddressKind.ImToken },
  ];

  const handleIncrement = (key: "price" | "time") => {
    if (key === "price") {
      let newValue = price !== undefined ? parseInt(price.toString()) + 1 : 1;
      setPrice(+newValue.toString());
    } else {
      let newValue = time !== undefined ? parseInt(time.toString()) + 1 : 1;
      if (newValue <= 90) {
        setTime(+newValue.toString());
      }
    }
  };

  const handleDecrement = (key: "price" | "time") => {
    if (key === "price") {
      let newValue = price !== undefined ? parseInt(price.toString()) - 1 : 1;
      if (newValue >= 1) {
        setPrice(+newValue.toString());
      }
    } else {
      let newValue = time !== undefined ? parseInt(time.toString()) - 1 : 1;
      if (newValue >= 1) {
        setTime(+newValue.toString());
      }
    }
  };

  const handleChange = (key: string, v: string) => {
    if (key === "time") {
      setTime(isNaN(+v) ? 0 : +v.replace(".", ""));
    } else {
      setPrice(isNaN(+v) ? 0 : +v);
    }
  };

  const changeLocationHandle = (
    v:
      | FindManyCityQuery["findManyCity"][0]
      | FindManyCityQuery["findManyCity"][0]["districts"][0],
    detail: boolean
  ) => {
    if (!detail) {
      setLocation(v);
    } else {
      setDetailLocation(v);
    }
  };

  const changeWallerKindHandle = (nowAble: WalletAddressKind) => {
    setWalletAddressKind(nowAble);
  };

  const createHandle = () => {
    if (!location) {
      toast.warn("지역을 선택해주세요");
    } else if (
      !detailLocation &&
      city?.filter((v) => v.name === location.name)[0].districts.length !== 0
    ) {
      toast.warn("상세지역을 선택해주세요");
    } else if (price === undefined || price > 99999999) {
      toast.warn(
        <div>
          가격은 1 ~ 99,999,999KRW
          <br />
          사이로 등록가능합니다
        </div>,
        {
          toastId: 0,
        }
      );
    } else if (min === undefined || min <= 0) {
      toast.warn("최소거래량을 입력해주세요"), { toastId: 0 };
    } else if (max === undefined || max <= 0) {
      toast.warn("최대거래량을 입력해주세요", { toastId: 0 });
    } else if (max && max > 1000000) {
      toast.warn("최대거래량 1,000,000KRW까지 입력 가능합니다.", {
        toastId: 0,
      });
    } else if (max < min) {
      toast.warn(
        <div>
          최대 거래량을 <br />
          최소 거래량 보다 크게 설정해주세요
        </div>
      );
    } else if (!walletAddress) {
      toast.warn("지갑주소를 입력해주세요");
    } else {
      if (time && time <= 90) {
        createOfferByUser({
          variables: {
            coinKind: coin,
            offerAction: kind === "판매" ? OfferAction.Sell : OfferAction.Buy,
            transactionMethod: "DIRECT",
            cityId: location.id,
            price: +price,
            minAmount: +min,
            maxAmount: +max,
            responseSpeed: +time,
            content: text,
            walletAddress,
            isUseNextTime: saveWallet,
            walletAddressKind,
            districtId: detailLocation?.id,
          },
        });
      } else {
        toast.warn("응답시간은 1 ~ 90분 사이로 입력해주세요.", { toastId: 0 });
      }
    }
  };

  const [createOfferByUser] = useMutation<CreateOfferByUserMutation>(
    CREATE_OFFER_BY_USER,
    {
      onError: (e) => toast.error(e.message ?? `${e}`),
      onCompleted(_data) {
        toast.success("오퍼를 생성했습니다.");
        router.back();
      },
    }
  );

  const [findManyCity] = useLazyQuery<FindManyCityQuery>(FIND_MANY_CITY, {
    onError: (e) => toast.error(e.message ?? `${e}`),
    onCompleted(data) {
      setCity(data.findManyCity);
    },
  });

  const [findMyInfoByUser] = useLazyQuery(FIND_MY_INFO_BY_USER, {
    onError: (e) => toast.error(e.message ?? `${e}`),
    onCompleted(data) {
      if (data.findMyInfoByUser.walletAddress) {
        setSaveWallet(true);
        setWalletAddress(data.findMyInfoByUser.walletAddress);
      }
    },
  });

  const [findOneOffer] = useLazyQuery(FIND_ONE_OFFER, {
    onError: (e) => toast.error(e.message ?? `${e}`),
    onCompleted(data) {
      const newData = data.findOneOffer;
      setPrice(newData.price);
      setMin(newData.minAmount);
      setMax(newData.maxAmount);
      setTime(newData.responseSpeed);
      setText(newData.content);
      setCoin(newData.coinKind);
      setKind(newData.offerAction === "BUY" ? "구매" : "판매");
      setLocation(newData.city);
      setDetailLocation(newData.district);
      setWalletAddressKind(newData.walletAddressKind);
    },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    findMyInfoByUser();
  }, []);

  useEffect(() => {
    findManyCity();
    if (router.pathname.includes("edit-offer") && router.query.id) {
      findOneOffer({
        variables: { findOneOfferId: +router.query.id },
      });
    }
  }, [router.pathname, walletAddress, router.isReady]);

  useEffect(() => {
    if (price && price > 99999999) {
      toast.warn("가격은 99,999,999원 까지 입력가능합니다", { toastId: 0 });
      setPrice(99999999);
    }
    if (time && time > 90) {
      toast.warn("응답 속도는 90분까지 입력가능합니다");
      setTime(90);
    }
  }, [price, time, location]);

  return (
    <div className={cx("container")}>
      <div className={cx("wrap")}>
        <div className={cx("title")}>
          {router.pathname.includes("/edit-offer")
            ? "오퍼 수정하기"
            : "오퍼 만들기"}
        </div>
        <div className={cx("part_wrap")}>
          <div className={cx("sub_title")}>
            무엇을 하시겠어요?<span className={cx("essential")}>*</span>
          </div>
          <div>
            <div className={cx("kind_btns")}>
              {kindArr.map((v) => (
                <div
                  key={v}
                  onClick={() => setKind(v)}
                  className={cx(
                    v === kind ? "able_kind_btn" : "default_kind_btn"
                  )}
                >
                  {v}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={cx("part_wrap")}>
          <div className={cx("sub_title")}>
            암호화폐를 선택하세요
            <span className={cx("essential")}>*</span>
          </div>
          <div className={cx("coin_btns")}>
            {coinArr.map((v) => (
              <div
                key={v.coinKind}
                className={cx(
                  "coin_btn",
                  v.coinKind === coin && "able_coin_btn"
                )}
                onClick={() => setCoin(v.coinKind)}
              >
                <div className={cx("img_wrap")}>
                  <Image
                    alt="코인 이미지"
                    src={`/img/marquee/${v.coinKind.toLowerCase()}.png`}
                    fill
                    priority
                    quality={100}
                  />
                </div>
                <div>{v.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={cx("part_wrap")}>
          <div className={cx("sub_title")}>
            거래수단<span className={cx("essential")}>*</span>
          </div>
          <div>
            <div className={cx("kind_btns")}>
              <div className={cx("able_kind_btn")}>직접</div>
            </div>
          </div>
        </div>
        <div className={cx("part_wrap")}>
          <div className={cx("sub_title")}>
            지역
            <span className={cx("essential")}>*</span>
          </div>
          <div className={cx("location_container")}>
            <div className={cx("location_wrap")}>
              <div className={cx("location_text")}>시/군/구 선택</div>
              <LocationDropDown
                defaultValue={location}
                detail={false}
                data={city ? city : []}
                onChangeHandel={changeLocationHandle}
              />
            </div>
            {location && city?.filter((v) => v.name === location.name) && (
              <div className={cx("location_detail_wrap")}>
                <div className={cx("location_text")}>상세지역 선택</div>
                <LocationDropDown
                  defaultValue={detailLocation}
                  detail
                  data={
                    city
                      ? city.filter((v) => v.name === location.name)[0]
                          .districts
                      : []
                  }
                  onChangeHandel={changeLocationHandle}
                />
              </div>
            )}
          </div>
        </div>
        <div className={cx("part_wrap")}>
          <div className={cx("sub_title")}>
            가격
            <span className={cx("essential")}>*</span>
            <span className={cx("essential_comment")}>
              (가격은 1 ~ 99,999,999원 까지 입력 가능합니다.)
            </span>
          </div>
          <div className={cx("price_part_wrap")}>
            <input
              className={cx("input")}
              placeholder="입력하세요.."
              value={price ? price.toLocaleString() : ""}
              onChange={(e) => setPrice(+e.target.value.replace(/,/g, ""))}
            />
            <div className={cx("margin_content")}>KRW</div>
            <div
              onClick={() => handleDecrement("price")}
              className={cx("btn_img_wrap")}
            >
              <Image
                alt="-"
                src={"/img/otc/minus.png"}
                width={14}
                height={2}
                priority
                quality={100}
              />
            </div>
            <div
              onClick={() => handleIncrement("price")}
              className={cx("btn_img_wrap")}
            >
              <Image
                alt="+"
                src={"/img/otc/plus.png"}
                width={14}
                height={14}
                priority
                quality={100}
              />
            </div>
          </div>
        </div>
        <div className={cx("part_wrap")}>
          <div className={cx("sub_title")}>
            거래량
            <span className={cx("essential")}>*</span>
          </div>
          <div className={cx("space")}>
            <div className={cx("middle_wrap")}>
              <div>
                최소
                <span className={cx("essential_comment")}>
                  (최소금액은 1원 이상 입력 해야합니다.)
                </span>
              </div>
              <div className={cx("middle_inputs")}>
                <input
                  value={min ? min.toLocaleString() : ""}
                  placeholder="입력하세요.."
                  onChange={(e) => setMin(+e.target.value.replace(/,/g, ""))}
                  maxLength={9}
                />
                <div className={cx("price_content")}>KRW</div>
              </div>
            </div>
            <div className={cx("middle_wrap")}>
              <div>
                최대
                <span className={cx("essential_comment")}>
                  (최대금액은 최소금액 보다 커야 합니다.)
                </span>
              </div>
              <div className={cx("middle_inputs")}>
                <input
                  placeholder="입력하세요.."
                  value={max ? max.toLocaleString() : ""}
                  onChange={(e) => setMax(+e.target.value.replace(/,/g, ""))}
                  maxLength={9}
                />
                <div className={cx("price_content")}>KRW</div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("part_wrap")}>
          <div className={cx("sub_title")}>
            평균 응답 속도
            <span className={cx("essential")}>*</span>
            <span className={cx("essential_comment")}>
              (1~90분 까지 입력가능합니다.)
            </span>
          </div>
          <div className={cx("price_part_wrap")}>
            <input
              className={cx("input")}
              placeholder="입력하세요.."
              value={
                time && time <= 0 ? "" : time?.toString().replace(/(^0+)/, "")
              }
              onChange={(e) => handleChange("time", e.target.value)}
            />
            <div className={cx("margin_content")}>분</div>
            <div
              onClick={() => handleDecrement("time")}
              className={cx("btn_img_wrap")}
            >
              <Image
                alt="-"
                src={"/img/otc/minus.png"}
                width={14}
                height={2}
                priority
                quality={100}
              />
            </div>
            <div
              onClick={() => handleIncrement("time")}
              className={cx("btn_img_wrap")}
            >
              <Image
                alt="+"
                src={"/img/otc/plus.png"}
                width={14}
                height={14}
                priority
                quality={100}
              />
            </div>
          </div>
        </div>
        <div className={cx("wallet_title")}>
          <div className={cx("sub_title")}>
            지갑주소 <span className={cx("essential")}>*</span>
          </div>
          <div
            className={cx("wallet_content")}
            onClick={() => router.push("/notice/4")}
          >
            아직 지갑주소가 없으신가요?
          </div>
        </div>
        <div className={cx("wallet_wrap")}>
          <div className={cx("drop_down_wrap")}>
            <WalletDropDown
              defaultValue={
                walletAddressKind === WalletAddressKind.MetaMask
                  ? walletArr[0]
                  : walletArr[1]
              }
              data={walletArr}
              onChangeHandel={changeWallerKindHandle}
            />
          </div>
          <div className={cx("middle_inputs")}>
            <input
              value={walletAddress}
              placeholder="지갑주소를 입력해주세요."
              className={cx("input")}
              onChange={(e) => setWalletAddress(e.target.value)}
            />
          </div>
        </div>
        <div className={cx("save_wallet_wrap")}>
          <input
            className={cx("check")}
            onChange={() => setSaveWallet(!saveWallet)}
            checked={saveWallet}
            type="checkbox"
          />
          <div>다음에도 이 지갑주소 사용하기</div>
        </div>
        <div className={cx("sub_title")}>오퍼 조건</div>
        <textarea
          className={cx("text_area")}
          placeholder="여기에 조건을 입력하세요..."
          value={text ? text : ""}
          onChange={(e) => setText(e.target.value)}
          maxLength={1000}
        />
        <div
          className={cx("text_len_box", text && text?.length >= 1000 && "red")}
        >
          <span>{`${text?.length ?? 0} / 1000`}</span>
        </div>
        <div className={cx("sub_text")}>
          <div className={cx("help_img")}>
            <Image
              fill
              alt="?"
              src={"/img/otc/help.png"}
              priority
              quality={100}
            />
          </div>
          <div>
            오퍼를 조회하는 모든 사람이 조건을 보게 됩니다.
            <br />
            사람들의 이목을 끌 수 있는 내용을 간단명료하게 작성하세요.
          </div>
        </div>
        <div className={cx("bot_btns")}>
          <button className={cx("cancle_btn")} onClick={() => router.back()}>
            취소
          </button>
          <button className={cx("create_btn")} onClick={createHandle}>
            {router.pathname.includes("/edit-offer")
              ? "오퍼 수정하기"
              : "오퍼 만들기"}
          </button>
        </div>
      </div>
    </div>
  );
}
