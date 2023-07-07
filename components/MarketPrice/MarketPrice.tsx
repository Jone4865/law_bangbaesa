import { useState, useEffect } from "react";
import styles from "./MarketPrice.module.scss";
import className from "classnames/bind";
import { useLazyQuery } from "@apollo/client";
import { FIND_MANY_MARKER_PRICE } from "../../src/graphql/query/findManyMarketPrice";
import { toast } from "react-toastify";
import { FindManyMarketPriceQuery } from "src/graphql/generated/graphql";

const cx = className.bind(styles);

export default function MarketPrice() {
  const [binanceData, setBinanceData] =
    useState<FindManyMarketPriceQuery["findManyMarketPrice"]["binance"]>();
  const [kimchiData, setKimchiData] =
    useState<FindManyMarketPriceQuery["findManyMarketPrice"]["kimchi"]>();
  const [upbitData, setUpbitData] =
    useState<FindManyMarketPriceQuery["findManyMarketPrice"]["upbit"]>();

  const [findManyMarketPrice] = useLazyQuery<FindManyMarketPriceQuery>(
    FIND_MANY_MARKER_PRICE,
    {
      onError: (e) => toast.error(e.message ?? `${e}`),
      onCompleted(data) {
        setBinanceData(data.findManyMarketPrice.binance);
        setKimchiData(data.findManyMarketPrice.kimchi);
        setUpbitData(data.findManyMarketPrice.upbit);
      },
    }
  );

  useEffect(() => {
    findManyMarketPrice();
  }, []);

  return (
    <div className={cx("container")}>
      <div style={{ display: "flex" }}>
        <div>
          {upbitData?.map((v, idx) => (
            <div key={idx}>{v.code}</div>
          ))}
        </div>
        <div>
          {binanceData?.map((v, idx) => (
            <div key={idx}>{v.code}</div>
          ))}
        </div>
        <div>
          {kimchiData?.map((v, idx) => (
            <div key={idx}>{v.code}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
