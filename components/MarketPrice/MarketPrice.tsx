import { useState, useEffect } from "react";
import styles from "./MarketPrice.module.scss";
import className from "classnames/bind";
import { useLazyQuery } from "@apollo/client";
import { FIND_MANY_MARKER_PRICE } from "../../src/graphql/query/findManyMarketPrice";
import { toast } from "react-toastify";
import {
  CoinKind,
  FindManyMarketPriceQuery,
} from "src/graphql/generated/graphql";
import Image from "next/image";

const cx = className.bind(styles);

type Props = {
  type?: "home" | "not_home";
};

export default function MarketPrice({ type = "home" }: Props) {
  const [binanceData, setBinanceData] =
    useState<
      FindManyMarketPriceQuery["findManyMarketPrice"]["binanceMarkets"]
    >();
  const [kimchiData, setKimchiData] =
    useState<
      FindManyMarketPriceQuery["findManyMarketPrice"]["kimchiMarkets"]
    >();
  const [upbitData, setUpbitData] =
    useState<FindManyMarketPriceQuery["findManyMarketPrice"]["upbitMarkets"]>();

  const [usdtData, setUsdtData] =
    useState<FindManyMarketPriceQuery["findManyMarketPrice"]["usdt"]>();

  const [usdData, setUsdData] =
    useState<FindManyMarketPriceQuery["findManyMarketPrice"]["usd"]>();

  const [findManyMarketPrice] = useLazyQuery<FindManyMarketPriceQuery>(
    FIND_MANY_MARKER_PRICE,
    {
      onError: (e) => toast.error(e.message ?? `${e}`),
      onCompleted(data) {
        const newData = data.findManyMarketPrice;
        setUsdData(newData.usd);
        setUsdtData(newData.usdt);
        setBinanceData(
          newData.binanceMarkets.filter(
            (v) =>
              v.code === CoinKind.Btc ||
              v.code === CoinKind.Eth ||
              v.code === CoinKind.Trx
          )
        );
        setKimchiData(
          newData.kimchiMarkets.filter(
            (v) =>
              v.code === CoinKind.Btc ||
              v.code === CoinKind.Eth ||
              v.code === CoinKind.Trx
          )
        );
        setUpbitData(
          newData.upbitMarkets.filter(
            (v) =>
              v.code === CoinKind.Btc ||
              v.code === CoinKind.Eth ||
              v.code === CoinKind.Trx
          )
        );
      },
    }
  );

  useEffect(() => {
    findManyMarketPrice();
  }, []);

  return (
    <div className={cx("container")}>
      <div
        className={cx("market-price-wrap", type === "not_home" && "not_home")}
      >
        <div
          className={cx(
            type === "home" ? "top_container" : "not_home_top_container"
          )}
        >
          <div className={cx("text_wrap")}>
            <div className={cx(type === "home" ? "title" : "not_home_title")}>
              KIMCHI PREMIUM
            </div>
            <div
              className={cx(type === "home" ? "content" : "not_home_content")}
            >
              한국거래소와 해외거래소 시세 한눈에 비교분석!
            </div>
          </div>
          <div className={cx("body")}>
            <div className={cx("coin_container", "tether")}>
              <div className={cx("top_img_wrap")}>
                <div className={cx("top_img")}>
                  <Image alt="테더 이미지" fill src={"/img/marquee/usdt.png"} />
                </div>
                <div className={cx("coin_title")}>tether</div>
              </div>
              <div className={cx("bar")} />
              <div className={cx("top_price")}>
                1 USDT = {usdtData?.krwPrice.toLocaleString()} KRW (
                {usdtData?.changeRate
                  ? usdtData?.changeRate !== 0 && (
                      <div className={cx("up_and_down_img")}>
                        <Image
                          className={cx(
                            usdtData?.changeRate &&
                              usdtData?.changeRate < 0 &&
                              "down_img"
                          )}
                          alt="화살표"
                          src={`/img/marquee/${
                            usdtData?.changeRate &&
                            (usdtData?.changeRate > 0 ? "up" : "down")
                          }.png`}
                          fill
                          quality={100}
                        />
                      </div>
                    )
                  : undefined}
                <span
                  className={cx(
                    usdtData &&
                      (usdtData.changeRate > 0
                        ? "up"
                        : usdtData?.changeRate < 0
                        ? "down"
                        : undefined),
                    usdtData && usdtData.changeRate && "top_left"
                  )}
                >
                  {usdtData?.changeRate
                    ? usdtData?.changeRate > 0
                      ? usdtData?.changeRate
                      : usdtData?.changeRate < 0 && -usdtData?.changeRate
                    : "-"}
                </span>
                )
              </div>
            </div>
            <div className={cx("coin_container", "usd")}>
              <div className={cx("top_img_wrap")}>
                <div className={cx("top_img")}>
                  <Image alt="테더 이미지" fill src={"/img/marquee/usd.png"} />
                </div>
                <div className={cx("coin_title")}>USD</div>
              </div>
              <div className={cx("bar")} />
              <div className={cx("top_price")}>
                1 USDT = {usdData?.krwPrice.toLocaleString()} KRW (
                {usdData?.changeRate
                  ? usdData?.changeRate !== 0 && (
                      <div className={cx("up_and_down_img")}>
                        <Image
                          className={cx(
                            usdData?.changeRate &&
                              usdData?.changeRate < 0 &&
                              "down_img"
                          )}
                          alt="화살표"
                          src={`/img/marquee/${
                            usdData?.changeRate &&
                            (usdData?.changeRate > 0 ? "up" : "down")
                          }.png`}
                          fill
                          quality={100}
                        />
                      </div>
                    )
                  : undefined}
                <span
                  className={cx(
                    usdData &&
                      (usdData.changeRate > 0
                        ? "up"
                        : usdData?.changeRate < 0
                        ? "down"
                        : undefined),
                    usdData && usdData.changeRate && "top_left"
                  )}
                >
                  {usdData?.changeRate
                    ? usdData?.changeRate > 0
                      ? usdData?.changeRate
                      : usdData?.changeRate < 0 && -usdData?.changeRate
                    : "-"}
                </span>
                )
              </div>
            </div>
          </div>
        </div>
        <div
          className={cx(
            type === "home" ? "bottom_container" : "not_home_bottom_container"
          )}
        >
          <div className={cx("title_container")}>
            <div />
            <div className={cx("upbit")}>
              <div className={cx("upbit_img")}>
                <Image
                  alt="업비트 로고"
                  fill
                  src={"/img/marquee/upbit_logo.png"}
                />
              </div>
              <div className={cx("opcaity")}>(기준거래소)</div>
            </div>
            <div className={cx("binance")}>
              <div className={cx("binance_img")}>
                <Image
                  alt="바이낸스 로고"
                  fill
                  src={"/img/marquee/binance_logo.png"}
                />
              </div>
              <div className={cx("opcaity")}>(기준거래소)</div>
            </div>
            <div className={cx("kimchi")}>
              <div className={cx("kimchi_content")}>KIMCHI</div>
              <span className={cx("non_mobile")}>PREMIUM</span>
            </div>
          </div>
          {upbitData?.map((v, idx) => (
            <div key={idx} className={cx("map_container")}>
              <div className={cx("map_coin_container")}>
                <div className={cx("coin_img")}>
                  <Image
                    alt="코인 이미지"
                    fill
                    src={`/img/marquee/${v.code.toLowerCase()}.png`}
                  />
                </div>
                <div>
                  <div>{v.code.toUpperCase()}</div>
                  <span className={cx("non_mobile")}>
                    {v.code === CoinKind.Btc
                      ? "(bitcoin)"
                      : v.code === CoinKind.Eth
                      ? "(ethereum)"
                      : "(TRON)"}
                  </span>
                </div>
              </div>
              <div className={cx("border_left")}>
                <div>{v.krwPrice.toLocaleString()}원</div>
                <div className={cx("left")}>
                  ($ {v.usdPrice.toLocaleString()})
                </div>
              </div>
              <div className={cx("border_left")}>
                <div>
                  $ {binanceData && binanceData[idx].usdPrice.toLocaleString()}
                </div>
                <div className={cx("left")}>
                  ({binanceData && binanceData[idx].krwPrice.toLocaleString()}
                  원)
                </div>
              </div>
              <div className={cx("border_left")}>
                <div
                  className={cx(
                    kimchiData &&
                      (kimchiData[idx].changePrice > 0
                        ? "up"
                        : kimchiData[idx].changePrice < 0
                        ? "down"
                        : undefined)
                  )}
                >
                  {kimchiData &&
                    (kimchiData[idx].changeRate > 0
                      ? "+ " + kimchiData[idx].changeRate
                      : kimchiData[idx].changeRate < 0
                      ? "- " + -kimchiData[idx].changeRate
                      : "-")}
                  {kimchiData && kimchiData[idx].changeRate !== 0 && "%"}
                </div>
                <div className={cx("left")}>
                  (
                  {kimchiData &&
                    (kimchiData[idx].changePrice > 0
                      ? "+" + kimchiData[idx].changePrice.toLocaleString()
                      : kimchiData[idx].changePrice < 0
                      ? "-" + -kimchiData[idx].changePrice.toLocaleString()
                      : "-")}
                  원)
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
