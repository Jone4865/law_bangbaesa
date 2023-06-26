import { useState, useEffect } from "react";
import styles from "./MarketPrice.module.scss";
import className from "classnames/bind";
import { useLazyQuery } from "@apollo/client";
import { FIND_MANY_MARKER_PRICE } from "../../src/graphql/generated/query/findManyMarketPrice";
import { toast } from "react-toastify";

const cx = className.bind(styles);

type Data = {
  code: string;
  timestamp: string;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  closePrice: number;
  tradeTime: number;
  changePrice: number;
  changeRate: number;
};

export default function MarketPrice() {
  const [binanceData, setBinanceData] = useState<Data[]>();
  const [kimchi, setKimchiData] = useState<Data[]>();
  const [upbitData, setUpbitData] = useState<Data[]>();

  const [findManyMarketPrice] = useLazyQuery(FIND_MANY_MARKER_PRICE, {
    onError: (e) => toast.error(e.message ?? `${e}`),
    onCompleted(data) {
      setBinanceData(data.findManyMarketPrice.binance);
      setKimchiData(data.findManyMarketPrice.kimchi);
      setUpbitData(data.findManyMarketPrice.upbit);
    },
  });

  useEffect(() => {
    findManyMarketPrice();
  }, []);

  return (
    <div className={cx("container")}>
      <div className={cx("wrap")}></div>
    </div>
  );
}
