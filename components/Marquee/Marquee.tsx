import React, { useEffect, useState } from "react";
import FastMarquee from "react-fast-marquee";

import styles from "./Marquee.module.scss";
import className from "classnames/bind";
import Image from "next/image";
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

export default function Marquee() {
  const [data, setData] = useState<Data[]>();

  const [findManyMarketPrice] = useLazyQuery(FIND_MANY_MARKER_PRICE, {
    onError: (e) => toast.error(e.message ?? `${e}`),
    onCompleted(data) {
      setData(data.findManyMarketPrice.binance);
    },
  });

  console.log(data && data[0].closePrice.toLocaleString());

  useEffect(() => {
    findManyMarketPrice();
  }, []);

  return (
    <div className={cx("container")}>
      <FastMarquee speed={50} gradient={false}>
        {data &&
          data.map((v) => (
            <div key={v.code} className={cx("wrap")}>
              <div className={cx("img_wrap")}>
                <Image
                  alt="코인 아이콘"
                  fill
                  src={`/img/marquee/${v.code.toLowerCase()}.png`}
                />
              </div>
              <div>1 {v.code + " = "}</div>
              <div className={cx("price")}>
                {v.closePrice.toLocaleString()} KRW
              </div>
              <div className={cx("bottom")}>
                (
                <div className={cx("arrow_wrap")}>
                  {v?.changeRate !== 0 && (
                    <div
                      className={cx(
                        v?.changeRate > 0 ? "up_icon_wrap" : "down_icon_wrap"
                      )}
                    >
                      <Image
                        alt="업다운 이미지"
                        src={`/img/marquee/${
                          v?.changeRate > 0 ? "up" : "down"
                        }.png`}
                        fill
                      />
                    </div>
                  )}
                  <span
                    className={cx(
                      v?.changeRate !== 0
                        ? v?.changeRate > 0
                          ? "orange"
                          : "blue"
                        : null
                    )}
                  >
                    {v?.changeRate === 0
                      ? "-"
                      : v?.changeRate?.toString().replace("-", "")}
                  </span>
                </div>
                )
              </div>
            </div>
          ))}
      </FastMarquee>
    </div>
  );
}
