import { useState, useEffect } from "react";
import styles from "./MyLevel.module.scss";
import className from "classnames/bind";
import { AutoHeightImage } from "components/AutoHeightImage";

const cx = className.bind(styles);

type Props = {
  level: number;
};

export default function MyLevel({ level }: Props) {
  const titleArr = ["휴대폰", "이메일", "신분증"];

  return (
    <div className={cx("wrap")}>
      {titleArr.map((item, idx) => (
        <div key={idx} className={cx("auth_item")}>
          <div className={cx("auth_icon_wrap")}>
            <AutoHeightImage
              className={cx("auth_icon")}
              alt="인증 이미지"
              src={`/img/mypage/${idx + 1}_${level > idx ? "on" : "off"}.png`}
            />
          </div>
          <div className={cx("level_txt")}>{`레벨 ${idx + 1} (필수사항)`}</div>
          <div className={cx("status_box", level > idx && "complete")}>
            <span>{`${item} 인증 ${level > idx ? "완료" : "필요"}`}</span>
            {level > idx && (
              <AutoHeightImage
                src="/img/mypage/check-icon.png"
                className={cx("check_img")}
                alt="체크 아이콘"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
