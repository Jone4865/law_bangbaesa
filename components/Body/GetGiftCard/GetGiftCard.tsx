import React, { useEffect, useState } from "react";
import styles from "./GetGiftCard.module.scss";
import className from "classnames/bind";
import Content_Part from "../Item/Content_Part/Content_Part";
import Image from "next/image";
import useInterval from "../../../public/hooks 10-47-17-443/useInterval/useInterval";

const cx = className.bind(styles);

type Props = {
  title: React.ReactNode;
  content: React.ReactNode;
  logo_color: "white" | "orange";
};

type Data = {
  name: string;
  buyPercentage: number;
  sellPercentage: number;
  originBuyPrice: number;
  originSellPrice: number;
};

export default function GetGiftCard({ title, content, logo_color }: Props) {
  const [data, setData] = useState<Data[]>();
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

      const newData: Data[] = gift_data?.data?.map((v: any) => {
        const originBuyPrice = Math.round(
          (+v?.split("\n\t\t\t\t\t\t")[3]?.split("(")[0]?.replaceAll(",", "") /
            (100 -
              parseFloat(
                v.split("\n\t\t\t\t\t\t")[3]?.split("(")[1].replaceAll("%)", "")
              ))) *
            100
        );
        const originSellPrice = Math.round(
          (+v?.split("\n\t\t\t\t\t\t")[3]?.split("(")[0]?.replaceAll(",", "") /
            (100 -
              parseFloat(
                v.split("\n\t\t\t\t\t\t")[3]?.split("(")[1].replaceAll("%)", "")
              ))) *
            100
        );

        return {
          name: v.split("\n\t\t\t\t\t\t")[1],
          originBuyPrice: isNaN(originBuyPrice) ? 0 : originBuyPrice,
          buyPercentage: parseFloat(
            v
              ?.split("\n\t\t\t\t\t\t")[2]
              ?.split("(")[1]
              ?.split("%)")
              ?.toString()
          ),
          originSellPrice: isNaN(originSellPrice) ? 0 : originSellPrice,
          sellPercentage: parseFloat(
            v.split("\n\t\t\t\t\t\t")[3]?.split("(")[1].replaceAll("%)", "")
          ),
        };
      });
      setData(newData);
    })();
  }, [getData]);

  return (
    <div className={cx("container")}>
      <div className={cx("wrap")}>
        <div className={cx("title_wrap")}>
          <Content_Part
            title={title}
            content={content}
            logo_color={logo_color}
          />
          <div className={cx("image_wrap")}>
            <div className={cx("image")}>
              <Image
                fill
                src="/img/GiftCard/img.png"
                alt="상품권 파트 이미지"
              />
            </div>
          </div>
        </div>
        <div className={cx("card_container")}>
          <div className={cx("card_title")}>
            <span className={cx("name")}>상품권 명</span>
            <span className={cx("buy")}>매입가</span>
            <span className={cx("sell")}>판매가</span>
          </div>
          <div className={cx("map")}>
            {data?.map(
              (item, index) =>
                item.name && (
                  <div key={index} className={cx("map_item")}>
                    <span className={cx("map_name")}>{item?.name}</span>
                    <div className={cx("map_buy")}>
                      <span className={cx("buy_price")}>
                        {item?.originBuyPrice -
                          (item?.originBuyPrice / 100) *
                            (item?.buyPercentage + 0.5) <
                        0
                          ? 0
                          : (
                              item?.originBuyPrice -
                              (item?.originBuyPrice / 100) *
                                (item?.buyPercentage + 0.5)
                            ).toLocaleString()}
                        &nbsp;
                      </span>
                      <span className={cx("percent")}>
                        (
                        {item.buyPercentage + 0.5 > 100
                          ? 100
                          : item.buyPercentage + 0.5}
                        %)
                      </span>
                    </div>
                    <div className={cx("map_sell")}>
                      <span className={cx("sell_price")}>
                        {(
                          item?.originSellPrice -
                          (item?.originSellPrice / 100) *
                            (item?.sellPercentage + 0.5)
                        ).toLocaleString()}
                        &nbsp;
                      </span>
                      <span className={cx("percent")}>
                        (
                        {item?.sellPercentage + 0.5 > 100
                          ? 100
                          : item?.sellPercentage + 0.5}
                        %)
                      </span>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
