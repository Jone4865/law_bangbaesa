import { useState, useEffect } from "react";
import Item from "./Item/Item";
import Solution from "./Solution/Solution";
import { useMediaQuery } from "react-responsive";

import Download_Part from "./Download_Part/Download_Part";
import GetGiftCard from "./GetGiftCard/GetGiftCard";
import OTC from "../OTC/OTC";
import styles from "./Body.module.scss";

import className from "classnames/bind";
import { useRouter } from "next/router";
import TopImage from "../TopImage/TopImage";
import Marquee from "../Marquee/Marquee";
import { CoinKind, OfferAction } from "src/graphql/generated/graphql";
import CarouselPart from "components/CarouselPart/CarouselPart";
import MarketPrice from "components/MarketPrice/MarketPrice";
import { toast } from "react-toastify";

const cx = className.bind(styles);

export default function Body() {
  const router = useRouter();
  const coins = [
    { name: "USDT", code: CoinKind.Usdt },
    { name: "BTC", code: CoinKind.Btc },
    // { name: "ETH", code: CoinKind.Eth },
    // { name: "TRX", code: CoinKind.Trx },
  ];
  const [buyCoinKind, setBuyCoinKind] = useState<CoinKind>(CoinKind.Usdt);
  const [sellCoinKind, setSellCoinKind] = useState<CoinKind>(CoinKind.Usdt);
  const [kind, setKind] = useState<OfferAction>(OfferAction.Buy);
  const [middle, setMiddle] = useState(false);
  const isMiddle = useMediaQuery({
    query: "(min-width: 1300px) and (max-width: 10000px)",
  });

  const titles = [
    <>상품권 시세</>,
    <>
      <p>고객맞춤 서비스</p>
    </>,
    <>방배사 솔루션</>,
  ];

  const contents = [
    <>
      <p>아래의 가격표는 수량, 권종, 상품권의</p>
      <p>상태등의 따라 변경될 수 있습니다.</p>
    </>,
    <>
      방배사는 기업을 대상으로 한 상품권 판매 온라인 광고에 <br /> 최적화된
      통합마케팅 서비스를 제공합니다.
    </>,
    <>
      방배사는 기업상품권 판매대행 서비스를 위해
      <br />
      다양한 마케팅 솔루션을 보유하고 있습니다.
    </>,
  ];

  useEffect(() => {
    if (isMiddle) {
      setMiddle(true);
      setKind(OfferAction.Buy);
    } else {
      setMiddle(false);
      setKind(OfferAction.Buy);
    }
    toast.warn("dwadbawkbdkjwadbwakbkdbawkjbdkwakjdbwabkdkjawkbj");
  }, [isMiddle]);

  return (
    <div className={cx("container")}>
      {/* <div className={cx("carousel_wrap")}>
        <CarouselPart />
      </div> */}
      <TopImage imageName={"1"} />
      <Marquee />
      {/* <MarketPrice /> */}

      <div className={cx("OTC_top")}>
        <div className={cx("OTC_top_wrap")}>
          <span>P2P</span>
        </div>
      </div>
      <div className={cx("OTC_container")}>
        <div className={cx("OTC_body")}>
          <div className={cx("OTC_wrap")}>
            <div className={cx("OTC_title")}>
              <div className={cx("only_pc")}>팝니다</div>
              <div className={cx("non_pc")}>
                <div
                  onClick={() => setKind(OfferAction.Buy)}
                  className={cx(kind === "BUY" ? "able_buy" : "default")}
                >
                  팝니다
                </div>
                <div
                  onClick={() => setKind(OfferAction.Sell)}
                  className={cx(kind === "SELL" ? "able_sell" : "default")}
                >
                  삽니다
                </div>
              </div>
              <div className={cx("coin_btns")}>
                {coins.map((v, idx) => (
                  <div
                    className={cx(
                      buyCoinKind === v.code
                        ? isMiddle
                          ? "able_sell_btn"
                          : kind !== OfferAction.Buy
                          ? "able_buy_btn"
                          : "able_sell_btn"
                        : "default_btn"
                    )}
                    onClick={() => setBuyCoinKind(v.code)}
                    key={idx}
                  >
                    {v.code}
                  </div>
                ))}
              </div>
              {/* <div
                className={cx("more_coin")}
                onClick={() => router.push("/p2p/buy")}
              >
                다른 코인 보기
              </div> */}
            </div>
            <OTC
              partKind={kind}
              part="home"
              coinKind={buyCoinKind}
              nowAble=""
            />
          </div>
          <div className={cx("only_pc")}>
            <div className={cx("only_pc_body")}>
              <div>삽니다</div>
              <div className={cx("coin_btns")}>
                {coins.map((v, idx) => (
                  <div
                    className={cx(
                      sellCoinKind === v.code ? "able_buy_btn" : "default_btn"
                    )}
                    onClick={() => setSellCoinKind(v.code)}
                    key={idx}
                  >
                    {v.code}
                  </div>
                ))}
              </div>
              {/* <div
                className={cx("more_coin")}
                onClick={() => router.push("/p2p/sell")}
              >
                다른 코인 보기
              </div> */}
            </div>
            <OTC
              partKind={OfferAction.Sell}
              part="home"
              coinKind={sellCoinKind}
              nowAble=""
            />
          </div>
        </div>
      </div>
      <div className={cx("giftcard_container")}>
        <div className={cx("giftcard_wrap")}>
          <div className={cx("giftcard_title")}>상품권 시세</div>
          <div className={cx("giftcard_content")}>
            아래의 가격표는 수량, 권종, 상품권의 상태등의 따라
            <br className={cx("mobile")} /> 변경될 수 있습니다.
          </div>
          <div
            className={cx("show_more")}
            onClick={() => router.push("gift-card")}
          >
            전체 보기
          </div>
          <GetGiftCard count={4} searchText="" />
        </div>
      </div>
      <Item
        title={titles[1]}
        content={contents[1]}
        img_name={middle ? "bg4" : "bg4_m"}
        item_name="service"
      />
      <Solution title={titles[2]} content={contents[2]} />
      <Download_Part />
    </div>
  );
}
