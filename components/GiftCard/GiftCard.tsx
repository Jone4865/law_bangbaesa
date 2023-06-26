import { useState, useEffect, FormEvent } from "react";
import GetGiftCard from "../Body/GetGiftCard/GetGiftCard";
import styles from "./GiftCard.module.scss";
import className from "classnames/bind";
import TopImage from "../TopImage/TopImage";
import moment from "moment";

const cx = className.bind(styles);

export default function GiftCard() {
  const [searchText, setSearchText] = useState("");

  const onSubmitHandle = (e: FormEvent<HTMLFormElement>) => {
    setSearchText("");
    e.preventDefault();
  };

  return (
    <div className={cx("container")}>
      <TopImage imageName="2" />
      <div className={cx("wrap")}>
        <div className={cx("body")}>
          <div className={cx("title")}>
            <div>상품권 시세</div>
            <div className={cx("date")}>
              {moment(new Date()).format("YYYY-MM-DD")} 기준
            </div>
          </div>
          <div className={cx("content")}>
            아래의 가격표는 수량, 권종, 상품권의 상태등의 따라
            <br className={cx("mobile")} /> 변경될 수 있습니다.
          </div>
          <form className={cx("form_wrap")} onSubmit={onSubmitHandle}>
            <div>상품권 검색</div>
            <div className={cx("form_body")}>
              <input
                placeholder="상품명을 입력하세요."
                className={cx("input")}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button className={cx("btn")}>검색</button>
            </div>
          </form>
          <div className={cx("part_title")}>백화점 상품권</div>
          <GetGiftCard searchText={searchText} />
        </div>
      </div>
    </div>
  );
}
