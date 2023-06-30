import { useEffect, useState } from "react";
import styles from "./CreateOffer.module.scss";
import className from "classnames/bind";
import { useRouter } from "next/router";
import { useLazyQuery, useMutation } from "@apollo/client";
import { CREATE_OFFER_BY_USER } from "../../src/graphql/generated/mutation/createOfferByUser";
import { toast } from "react-toastify";
import Image from "next/image";
import { FIND_MANY_CITY } from "../../src/graphql/generated/query/findManyCity";

const cx = className.bind(styles);

type City = {
  id: number;
  name: string;
};

export default function CreateOffer() {
  const router = useRouter();
  const [coin, setCoin] = useState("비트코인");
  const [kind, setKind] = useState("판매");
  const [location, setLocation] = useState({ id: 1, name: "서울시" });
  const [price, setPrice] = useState<number>();
  const [min, setMin] = useState<number>();
  const [max, setMax] = useState<number>();
  const [time, setTime] = useState<number>();
  const [text, setText] = useState("");
  const [city, setCity] = useState<City[]>();

  const coinArr = ["비트코인", "테더"];
  const kindArr = ["판매", "구매"];

  const handleIncrement = (key: "price" | "time") => {
    if (key === "price") {
      let newValue = price !== undefined ? parseInt(price.toString()) + 1 : 1;
      if (newValue <= 90) {
        setPrice(+newValue.toString());
      }
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
      setTime(isNaN(+v) ? 0 : +v);
    } else {
      setPrice(isNaN(+v) ? 0 : +v);
    }
  };

  const createHandle = () => {
    if (price === undefined || price > 1000001) {
      toast.warn(
        <div>
          가격은 1 ~ 1,000,000KRW
          <br />
          사이로 등록가능합니다
        </div>,
        {
          toastId: 0,
        }
      );
    } else if (min === undefined || min <= 0) {
      toast.warn("최소수량을 입력해주세요"), { toastId: 0 };
    } else if (max === undefined || max <= 0) {
      toast.warn("최대수량을 입력해주세요", { toastId: 0 });
    } else {
      if (time && time <= 90) {
        createOfferByUser({
          variables: {
            coinKind: coin === "비트코인" ? "BTC" : "USDT",
            offerAction: kind === "판매" ? "SELL" : "BUY",
            transactionMethod: "DIRECT",
            cityId: location.id,
            price: price ? +price : 0,
            minAmount: min ? +min : 0,
            maxAmount: max ? +max : 0,
            responseSpeed: time ? +time : 0,
            content: text,
          },
        });
      } else {
        toast.warn("응답시간은 1 ~ 90분 사이로 입력해주세요.", { toastId: 0 });
      }
    }
  };

  const [createOfferByUser] = useMutation(CREATE_OFFER_BY_USER, {
    onError: (e) => toast.error(e.message ?? `${e}`),
    onCompleted(_data) {
      toast.success("오퍼를 생성했습니다.");
      router.back();
    },
  });

  const [findManyCity] = useLazyQuery(FIND_MANY_CITY, {
    onError: (e) => toast.error(e.message ?? `${e}`),
    onCompleted(data) {
      setCity(data.findManyCity);
    },
  });

  useEffect(() => {
    findManyCity({});

    if (Number.isNaN(price)) {
      setPrice(0);
    }
  }, [price]);

  return (
    <div className={cx("container")}>
      <div className={cx("wrap")}>
        <div className={cx("title")}>오퍼 만들기</div>
        <div className={cx("part_wrap")}>
          <div className={cx("sub_title")}>무엇을 하시겠어요?</div>
          <div>
            {kindArr.map((v) => (
              <div key={v} className={cx("align_coin")}>
                <input
                  className={cx("check")}
                  onChange={() => setKind(v)}
                  checked={v === kind}
                  type="checkbox"
                />
                <div>
                  <div>
                    {coin} {v}
                  </div>
                  <div className={cx("sub_text")}>
                    {coin} {kindArr.filter((arr) => arr !== v)} 페이지에 오퍼가
                    게시됩니다
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={cx("part_wrap")}>
          <div className={cx("sub_title")}>암호화폐를 선택하세요</div>
          <div className={cx("top_btns")}>
            {coinArr.map((v, idx) => (
              <div
                key={v}
                className={cx("top_btn", v === coin && "able_top_btn")}
                onClick={() => setCoin(v)}
              >
                <div className={cx("img_wrap")}>
                  <Image
                    alt="코인 이미지"
                    src={`/img/otc/${idx === 0 ? "btc" : "usdt"}.png`}
                    fill
                    priority
                    quality={100}
                  />
                </div>
                <div>{v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={cx("part_wrap")}>
          <div className={cx("sub_title")}>거래수단</div>
          <div className={cx("align")}>
            <input
              className={cx("check")}
              checked
              onChange={() => ""}
              type="checkbox"
            />
            <div>직접</div>
          </div>
        </div>
        <div className={cx("part_wrap")}>
          <div className={cx("sub_title")}>지역</div>
          <div className={cx("location_wrap")}>
            {city?.map((v) => (
              <div key={v.id} style={{ display: "flex" }}>
                <input
                  className={cx("check")}
                  onChange={() => setLocation(v)}
                  checked={location.name === v.name}
                  type="checkbox"
                />
                <div>{v.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={cx("part_wrap")}>
          <div className={cx("sub_title")}>가격</div>
          <div className={cx("price_part_wrap")}>
            <input
              className={cx("input")}
              placeholder="입력하세요.."
              value={
                price && price <= 0
                  ? ""
                  : price && price.toString().replace(/(^0+)/, "")
              }
              onChange={(e) => handleChange("price", e.target.value)}
            />
            <div>KRW</div>
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
          <div className={cx("sub_title")}>거래량</div>
          <div className={cx("space")}>
            <div className={cx("middle_inputs")}>
              <div>최소</div>
              <input
                type="number"
                value={
                  min && min <= 0
                    ? ""
                    : min && min.toString().replace(/(^0+)/, "")
                }
                placeholder="입력하세요.."
                onChange={(e) =>
                  setMin(isNaN(+e.target.value) ? 0 : +e.target.value)
                }
              />
              <div>KRW</div>
            </div>
            <div className={cx("middle_inputs")}>
              <div>최대</div>
              <input
                type="number"
                className={cx("input")}
                placeholder="입력하세요.."
                value={
                  max && max <= 0
                    ? ""
                    : max && max.toString().replace(/(^0+)/, "")
                }
                onChange={(e) =>
                  setMax(isNaN(+e.target.value) ? 0 : +e.target.value)
                }
              />
              <div>KRW</div>
            </div>
          </div>
        </div>
        <div className={cx("part_wrap")}>
          <div className={cx("sub_title")}>평균 응답 속도</div>
          <div className={cx("price_part_wrap")}>
            <input
              className={cx("input")}
              placeholder="입력하세요.."
              value={
                time && time <= 0 ? "" : time?.toString().replace(/(^0+)/, "")
              }
              onChange={(e) => handleChange("time", e.target.value)}
            />
            <div>분</div>
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
        <div className={cx("sub_title")}>오퍼 조건</div>
        <textarea
          className={cx("text_area")}
          placeholder="여기에 조건을 입력하세요..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
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
            오퍼 만들기
          </button>
        </div>
      </div>
    </div>
  );
}
