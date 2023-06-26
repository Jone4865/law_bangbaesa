import React, { Dispatch, SetStateAction, useState } from "react";

import styles from "./SearchDropDown.module.scss";
import className from "classnames/bind";
import Image from "next/image";

const cx = className.bind(styles);

type Option = "제목" | "내용";

type Props = {
  setKind: Dispatch<SetStateAction<"title" | "content">>;
};

const SearchDropDown = ({ setKind }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("제목");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setKind(option === "제목" ? "title" : "content");
  };

  return (
    <div className={cx("container")}>
      <div className={cx("btn")} onClick={toggleDropdown}>
        <span>{selectedOption || "제목"}</span>
        <Image
          alt="화살표"
          src={"/img/inquiry/arrow_b.png"}
          width={16.7}
          height={8.8}
          className={cx(isOpen ? "img" : "img_rotate")}
          priority
          quality={100}
        />
      </div>
      {isOpen && (
        <div className={cx("more")}>
          {selectedOption !== "제목" && (
            <div onClick={() => handleOptionSelect("제목")}>제목</div>
          )}
          {selectedOption !== "내용" && (
            <div onClick={() => handleOptionSelect("내용")}>내용</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDropDown;
