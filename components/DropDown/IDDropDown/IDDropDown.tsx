import React, { Dispatch, SetStateAction, useState } from "react";

import styles from "./IDDropDown.module.scss";
import className from "classnames/bind";
import Image from "next/image";

const cx = className.bind(styles);

type Option = "주민등록증" | "운전면허증" | "여권";

type Props = {
  setKind: Dispatch<SetStateAction<"주민등록증" | "운전면허증" | "여권">>;
};

const IDDropDown = ({ setKind }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("주민등록증");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setKind(option);
  };

  return (
    <div className={cx("container")}>
      <div className={cx("btn_wrap")} onClick={toggleDropdown}>
        <div className={cx("btn")}>
          <div>{selectedOption || "주민등록증"}</div>
          <div className={cx(!isOpen ? "img_wrap" : "arrow_rotate")}>
            <Image
              alt="화살표"
              src={"/img/level3/arrow.png"}
              fill
              quality={100}
              priority
            />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className={cx("menu")}>
          {selectedOption !== "주민등록증" && (
            <div onClick={() => handleOptionSelect("주민등록증")}>
              주민등록증
            </div>
          )}
          {selectedOption !== "운전면허증" && (
            <div onClick={() => handleOptionSelect("운전면허증")}>
              운전면허증
            </div>
          )}
          {selectedOption !== "여권" && (
            <div onClick={() => handleOptionSelect("여권")}>여권</div>
          )}
        </div>
      )}
    </div>
  );
};

export default IDDropDown;
