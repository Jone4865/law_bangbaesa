import { useState, useEffect } from "react";
import styles from "./MyLevel.module.scss";
import className from "classnames/bind";
import Image from "next/image";

const cx = className.bind(styles);

type Props = {
  level: number;
};

export default function MyLevel({ level }: Props) {
  const titleArr = ["전화번호", "이메일주소", "신분증", "주소"];
  const contentArr = [
    <div key={1}></div>,
    <div key={2} className={cx("content")}>
      이메일 주소를 인증해 더욱 다양한
      <br />
      기능을 이용하고 계정 보안 수준을
      <br />
      높이세요
    </div>,
    <div key={3} className={cx("content")}>
      신분증을 인증해 더욱 다양한
      <br />
      기능을 이용하고 계정 보안 수준을
      <br />
      높이세요
    </div>,
    <div key={4} className={cx("content")}>
      거주지 주소를 인증해 더욱 다양한
      <br />
      기능을 이용하고 계정 보안 수준을
      <br />
      높이세요
    </div>,
  ];
  return (
    <div className={cx("container")}>
      <div className={cx("wrap")}>
        {titleArr.map((item, idx) => (
          <div key={idx} className={cx(level > idx ? "able" : "default")}>
            <div className={cx("img_wrap")}>
              <Image
                alt="인증아이콘"
                src={`/img/mypage/${idx + 1}${
                  level > idx ? "_on" : "_off"
                }.png`}
                fill
                priority
                quality={100}
              />
            </div>
            <div>
              <div className={cx("title_container")}>
                <div
                  className={cx(level > idx ? "able_check" : "default_check")}
                />
                <div className={cx("title_wrap")}>
                  <div>{item}</div>
                  <div>
                    {level > idx
                      ? idx !== 2
                        ? "가 인증되었습니다"
                        : "이 인증되었습니다"
                      : idx !== 3
                      ? "인증이 필요합니다"
                      : "가 미인증 되었습니다"}
                  </div>
                </div>
              </div>
              {level > idx ? (
                <div className={cx("content")}>
                  {item}
                  {idx !== 2 ? "가 인증되었습니다" : "이 인증되었습니다"}
                </div>
              ) : (
                <div>{level <= idx && contentArr[idx]}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
