import { useState, useEffect } from "react";
import styles from "./MarketPrice.module.scss";
import className from "classnames/bind";
import { useLazyQuery } from "@apollo/client";
import { FIND_MANY_MARKER_PRICE } from "../../src/graphql/query/findManyMarketPrice";
import { toast } from "react-toastify";
import { FindManyMarketPriceQuery } from "src/graphql/generated/graphql";
import Image from "next/image";

const cx = className.bind(styles);

export default function MarketPrice() {
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
        setBinanceData(data.findManyMarketPrice.binanceMarkets);
        setKimchiData(data.findManyMarketPrice.kimchiMarkets);
        setUpbitData(data.findManyMarketPrice.upbitMarkets);
      },
    }
  );

  useEffect(() => {
    findManyMarketPrice();
  }, []);

  return (
    <div className={cx("container")}>
      <div className={cx("top")}>
        <div className={cx("kimchi_shape_wrap")}>
          <div className={cx("kimchi_shape")}>KIMCHIPREMIUM</div>
          <div className={cx("kimchi_right")} />
        </div>
        <div>
          한국거래소와 해외거래소 시세
          <br />
          한눈에 비교분석!
        </div>
      </div>
      <div className={cx("top_coin_container")}>
        <div className={cx("top_coin_wrap")}>
          <div className={cx("top_coin_img")}>
            <div>
              <Image alt="usdt" src={"/img/marquee/usdt.png"} fill />
            </div>
          </div>
          <div>1 USDT = {usdtData?.krwPrice.toLocaleString()} KRW (</div>
          <div className={cx("arrow_wrap")}>
            {usdtData?.changeRate === 0 || !usdtData?.changeRate ? (
              "-"
            ) : (
              <Image
                alt="arrow"
                src={
                  usdtData?.changeRate > 1
                    ? "/img/marquee/up.png"
                    : "/img/marquee/down.png"
                }
                fill
              />
            )}
          </div>
          <p className={cx("top_coin_percente")}>
            {usdtData?.changeRate !== 0 && usdtData?.changeRate}
          </p>
          )
        </div>
        <div className={cx("top_coin_wrap")}>
          <div className={cx("top_coin_img")}>
            <div>
              <Image alt="usdt" src={"/img/marquee/usd.png"} fill />
            </div>
          </div>
          <div>1 USDT = {usdData?.krwPrice.toLocaleString()} KRW (</div>
          <div className={cx("arrow_wrap")}>
            {usdData?.changeRate === 0 || !usdData?.changeRate ? (
              "-"
            ) : (
              <Image
                alt="arrow"
                src={
                  usdData?.changeRate > 1
                    ? "/img/marquee/up.png"
                    : "/img/marquee/down.png"
                }
                fill
              />
            )}
          </div>
          <p className={cx("top_coin_percente")}>
            {usdData?.changeRate !== 0 && usdData?.changeRate}
          </p>
          )
        </div>
      </div>
      <div className={cx("bottom_wrap")}>
        <div />
        <div>
          <div>UPbit</div>
          <div>(기준거래소)</div>
        </div>
        <div>
          <div>BINANCE</div>
          <div>(비교거래소)</div>
        </div>
        <div>
          <div>Kimchi Premium</div>
          <div className={cx("kimchi")}>
            <div>하나</div>
            <div>두울</div>
          </div>
        </div>
      </div>
      <div className={cx("coin_wrap")}>
        <div>
          {binanceData?.map((v) => (
            <div key={v.code} className={cx("coin_name_wrap")}>
              <div className={cx("coin_img")}>
                <Image
                  fill
                  alt="코인 이미지"
                  src={`/img/marquee/${v.code.toLowerCase()}.png`}
                />
              </div>
              <div className={cx("coin_name")}>{v.code}</div>
            </div>
          ))}
        </div>
        <div>
          {upbitData?.map((v) => (
            <div key={v.code} className={cx("upbit_coin")}>
              <div>{v.krwPrice.toLocaleString()} 원</div>
              <div>($ {v.usdPrice.toLocaleString()})</div>
            </div>
          ))}
        </div>
        <div>
          {binanceData?.map((v) => (
            <div key={v.code} className={cx("binance_coin")}>
              <div>{v.krwPrice.toLocaleString()} 원</div>
              <div>($ {v.usdPrice.toLocaleString()})</div>
            </div>
          ))}
        </div>
        <div>
          {kimchiData?.map((v) => (
            <div key={v.code} className={cx("kimchi_coin")}>
              <div>
                {v.changeRate === 0
                  ? "0"
                  : v.changeRate > 0
                  ? "+" + v.changeRate
                  : "-" + v.changeRate}{" "}
                %
              </div>
              <div>
                (
                {v.changePrice === 0
                  ? "0"
                  : v.changePrice > 0
                  ? "+" + v.changePrice.toLocaleString()
                  : "-" + v.changePrice.toLocaleString()}{" "}
                원)
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
