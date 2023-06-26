import React, { useEffect, useState } from "react";
import styles from "./GetGiftCard.module.scss";
import className from "classnames/bind";
import useInterval from "../../../public/hooks 10-47-17-443/useInterval/useInterval";
import * as crypto from "crypto-js";

const cx = className.bind(styles);

type Data = {
  name: string;
  originPrice: number;
  buyPercent: number;
  sellPercent: number;
};

type Props = {
  searchText: string;
};

export default function GetGiftCard({ searchText }: Props) {
  const [data, setData] = useState<Data[]>();
  const [newData, setNewData] = useState<Data[]>();

  const [getData, setGetData] = useState(false);
  useInterval(() => setGetData(!getData), 72000);

  //get 요청
  useEffect(() => {
    (async () => {
      const gift_data = await (
        await fetch("/api/getData", {
          method: "GET",
        })
      ).json();

      const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY
        ? process.env.NEXT_PUBLIC_SECRET_KEY
        : "";

      const bytes = crypto.AES.decrypt(gift_data.data, secretKey);
      const originData = bytes.toString(crypto.enc.Utf8).split("| ");

      const newData: Data[] = originData?.map((v: string) => {
        const name = v.split("\t")[1];
        const buyPrice = +v
          .split("\t")[2]
          .split("(")[0]
          .trim()
          .replaceAll(",", "");
        const originBuyPercent = +v
          .split("\t")[2]
          .split("(")[1]
          .replaceAll("%)", "");

        const sellPercent = +v
          .split("\t")[3]
          .split("(")[1]
          .replaceAll("%)", "");

        return {
          name,
          originPrice: buyPrice / (1 - originBuyPercent / 100),
          buyPercent: originBuyPercent + 0.5,
          sellPercent: sellPercent + 0.5,
        };
      });

      setData(newData);
      setNewData(newData);
    })();
  }, [getData]);

  useEffect(() => {
    const newData = data?.filter((v) =>
      v.name.replaceAll(" ", "").includes(searchText.replaceAll(" ", ""))
    );
    if (data?.length !== 0) {
      setNewData(newData);
    }
  }, [searchText]);

  return (
    <div className={cx("container")}>
      <div className={cx("wrap")}>
        <div className={cx("top")}>
          <div className={cx("top_left")}>
            <div className={cx("type")}>상품권 명</div>
            <div className={cx("origin_price")}>액면가</div>
          </div>
          <div className={cx("buy_price")}>매입가</div>
          <div className={cx("sell_price")}>판매가</div>
        </div>
        <div className={cx("map_container")}>
          {newData?.map((v) => (
            <div className={cx("map_wrap")} key={v.name}>
              <div className={cx("map_type")}>
                {v.name.trim() === "롯데호텔10만원면세점 불가"
                  ? "롯데호텔 (10만원권) 면세점 불가"
                  : v.name.trim()}
              </div>
              <div className={cx("map_origin_price")}>
                <span className={cx("mobile")}>액면가 :</span>
                {v.originPrice.toLocaleString()}원
              </div>
              <div className={cx("map_buy_price")}>
                <span className={cx("mobile")}>매입</span>
                {(
                  v.originPrice -
                  (v.originPrice / 100) * v.sellPercent
                ).toLocaleString()}
                <span className={cx("black")}>({v.sellPercent}%)</span>
              </div>
              <div className={cx("map_sell_price")}>
                <span className={cx("mobile")}>판매</span>
                {(
                  v.originPrice -
                  (v.originPrice / 100) * v.buyPercent
                ).toLocaleString()}
                <span className={cx("black")}>({v.buyPercent}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
