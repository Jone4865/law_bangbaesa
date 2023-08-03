import { useState, useEffect } from "react";
import styles from "./OfferModal.module.scss";
import className from "classnames/bind";
import { FindOneOfferOutput } from "src/graphql/generated/graphql";

const cx = className.bind(styles);

type Props = {
  offerData: FindOneOfferOutput | undefined;
  setOfferModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function OfferModal({ offerData, setOfferModalVisible }: Props) {
  const onClickClose = () => {
    setOfferModalVisible(false);
  };

  useEffect(() => {}, [offerData]);

  return (
    <div onClick={onClickClose} className={cx("container")}>
      <div onClick={(e) => e.stopPropagation()} className={cx("wrap")}>
        <div className={cx("top")}>
          <div>오퍼 조건</div>
          <div className={cx("btn")} onClick={onClickClose}>
            닫기
          </div>
        </div>
        <div className={cx("body")}>{offerData?.content}</div>
      </div>
    </div>
  );
}
