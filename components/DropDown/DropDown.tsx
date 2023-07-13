import React, { useEffect, useState } from "react";

import styles from "./DropDown.module.scss";
import className from "classnames/bind";
import Image from "next/image";
import { CountryCodeModel } from "src/graphql/generated/graphql";

const cx = className.bind(styles);

type Props = {
  data: CountryCodeModel[] | string[];
  type: "county";
  onChangeHandel: (nowAble: any) => void;
  disable?: boolean;
};

const DropDown = ({ data, type, onChangeHandel, disable }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] =
    useState<CountryCodeModel | undefined>(undefined);

  const toggleDropdown = () => {
    !disable && setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: CountryCodeModel) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (type === "county") {
      onChangeHandel(option.code);
    }
  };

  useEffect(() => {
    if (
      Array.isArray(data) &&
      typeof data[0] === "object" &&
      type === "county"
    ) {
      setSelectedOption(
        (data as CountryCodeModel[]).filter(
          (v: CountryCodeModel) => v.country === "대한민국"
        )[0]
      );
    }
  }, [data]);

  return (
    <div className={cx("container")}>
      <div className={cx("btn_wrap")} onClick={toggleDropdown}>
        <div className={cx("btn")}>
          {selectedOption && (
            <div className={cx("text")}>{selectedOption?.country}</div>
          )}
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
          {(data as CountryCodeModel[])?.map(
            (v: CountryCodeModel, idx: number) => (
              <div
                className={cx("menu_body")}
                onClick={() => handleOptionSelect(v)}
                key={idx}
              >
                {v?.country}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default DropDown;
