import React, { useEffect, useState } from "react";
import FastMarquee from "react-fast-marquee";

import styles from "./Marquee.module.scss";
import className from "classnames/bind";
import Image from "next/image";
import { useLazyQuery } from "@apollo/client";
import { FIND_MANY_MARKER_PRICE } from "../../src/graphql/query/findManyMarketPrice";
import { toast } from "react-toastify";
import { FindManyMarketPriceQuery } from "src/graphql/generated/graphql";
const cx = className.bind(styles);

export default function Marquee() {
  const [data, setData] =
    useState<
      FindManyMarketPriceQuery["findManyMarketPrice"]["binanceMarkets"]
    >();

  const [findManyMarketPrice] = useLazyQuery<FindManyMarketPriceQuery>(
    FIND_MANY_MARKER_PRICE,
    {
      onError: (e) => toast.error(e.message ?? `${e}`),
      onCompleted(data) {
        setData(data.findManyMarketPrice.binanceMarkets);
      },
    }
  );

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
                  priority
                  quality={100}
                />
              </div>
              <div>1 {v.code + " = "}</div>
              <div className={cx("price")}>
                {v.krwPrice.toLocaleString()} KRW /
              </div>
              <div className={cx("price")}>
                {" $ "}
                {v.usdPrice.toLocaleString()}
              </div>
              {/* <div className={cx("bottom")}>
                (
                <div className={cx("arrow_wrap")}>
                  {v?.krwPrice !== 0 && (
                    <div
                      className={cx(
                        v?.krwPrice > 0 ? "up_icon_wrap" : "down_icon_wrap"
                      )}
                    >
                      <Image
                        alt="업다운 이미지"
                        src={`/img/marquee/${
                          v?.krwPrice > 0 ? "up" : "down"
                        }.png`}
                        fill
                        priority
                        quality={100}
                      />
                    </div>
                  )}
                  <span
                    className={cx(
                      v?.krwPrice !== 0
                        ? v?.krwPrice > 0
                          ? "orange"
                          : "blue"
                        : null
                    )}
                  >
                    {v?.krwPrice === 0
                      ? "-"
                      : v?.krwPrice?.toString().replace("-", "")}
                  </span>
                </div>
                )
              </div> */}
            </div>
          ))}
      </FastMarquee>
    </div>
  );
}
