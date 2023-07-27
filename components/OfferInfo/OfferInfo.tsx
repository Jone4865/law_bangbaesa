import { useEffect } from "react";
import styles from "./OfferInfo.module.scss";
import className from "classnames/bind";
import { FindOneOfferOutput, OfferAction } from "src/graphql/generated/graphql";
import Image from "next/image";

const cx = className.bind(styles);

type Props = {
  offerData: FindOneOfferOutput | undefined;
  type: "my" | "other";
  setOfferModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function OfferInfo({
  offerData,
  type,
  setOfferModalVisible,
}: Props) {
  useEffect(() => {}, [offerData]);

  return (
    <div className={cx("container")}>
      <div className={cx("nickname_container")}>
        {type === "other" ? (
          <div className={cx("nickname_wrap")}>
            <div className={cx("nickname")}>{offerData?.identity}</div>
            님과 채팅하기
          </div>
        ) : (
          <div className={cx("nickname")}>채팅확인</div>
        )}
      </div>
      <div className={cx("wrap")}>
        <div
          className={cx(
            "title",
            offerData?.offerAction === OfferAction.Buy ? "orange" : "blue"
          )}
        >
          {offerData?.offerAction === OfferAction.Buy ? "구매" : "판매"}{" "}
        </div>
        <div className={cx("body")}>
          <div className={cx("align")}>
            <div className={cx("width")}>코인</div>
            <div className={cx("flex")}>
              <div className={cx("img_wrap")}>
                <Image
                  fill
                  alt="코인 이미지"
                  src={`/img/marquee/${offerData?.coinKind?.toLowerCase()}.png`}
                />
              </div>
              <div>{offerData?.coinKind?.toUpperCase()}</div>
            </div>
          </div>
          <div className={cx("align")}>
            <div className={cx("width")}>
              {offerData?.offerAction === OfferAction.Buy ? "구매자" : "판매자"}
            </div>
            <div>{offerData?.identity}</div>
          </div>
          <div className={cx("align")}>
            <div className={cx("width")}>거래성사량</div>
            <div className={cx("flex")}>
              <div className={cx("img_wrap")}>
                <Image fill alt="코인 이미지" src={`/img/icon/trust.png`} />
              </div>
              <div>{offerData?.offerCompleteCount}</div>
            </div>
          </div>
          <div className={cx("align")}>
            <div className={cx("width")}>거래수단</div>
            <div>{offerData?.city?.name}/직접</div>
          </div>
          <div className={cx("align")}>
            <div className={cx("width")}>Min/Max</div>
            <div>
              <div className={cx("flex")}>
                <div>{offerData?.minAmount?.toLocaleString()}</div>
                <div className={cx("gray")}>KRW</div>/
              </div>
              <div className={cx("flex")}>
                <div>{offerData?.maxAmount?.toLocaleString()}</div>
                <div className={cx("gray")}>KRW</div>
              </div>
            </div>
          </div>
          <div className={cx("align")}>
            <div className={cx("width")}>평균응답속도</div>
            <div>{offerData?.responseSpeed}분 미만</div>
          </div>
          <div className={cx("align")}>
            <div className={cx("width")}>가격</div>
            <div className={cx("flex")}>
              <div className={cx("price")}>
                {offerData?.price?.toLocaleString()}
              </div>
              <div className={cx("gray")}>KRW</div>
            </div>
          </div>
          <div className={cx("content")}>오퍼조건</div>
          <div
            onClick={() => setOfferModalVisible(true)}
            className={cx(
              "btn",
              offerData?.offerAction === OfferAction.Buy ? "orange" : "blue"
            )}
          >
            상세보기
          </div>
        </div>
      </div>
    </div>
  );
}
