import React, { useEffect, useState } from "react";

import styles from "./CountryDropDown.module.scss";
import className from "classnames/bind";
import Image from "next/image";
import { CountryCodeModel } from "src/graphql/generated/graphql";

const cx = className.bind(styles);

type Props = {
  data: CountryCodeModel[] | string[];
  onChangeHandel: (nowAble: any) => void;
  disable?: boolean;
};

const CountryDropDown = ({ data, onChangeHandel, disable }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] =
    useState<CountryCodeModel | undefined>(undefined);

  const toggleDropdown = () => {
    !disable && setIsOpen(!isOpen);
  };
  const handleOptionSelect = (option: CountryCodeModel) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChangeHandel(option.phone);
  };

  useEffect(() => {
    setSelectedOption(
      (data as CountryCodeModel[]).filter(
        (v: CountryCodeModel) => v.code === "KR"
      )[0]
    );
  }, [data]);

  return (
    <div className={cx("container", disable && "gray")}>
      <div className={cx("btn_wrap")} onClick={toggleDropdown}>
        <div className={cx("btn")}>
          <div onClick={() => setIsOpen(false)} className={cx("text")}>
            <div className={cx("country_img")}>
              <Image
                fill
                alt="ss"
                src={`https://flagcdn.com/${selectedOption?.code.toLocaleLowerCase()}.svg`}
              />
            </div>
            <div>+ {selectedOption?.phone}</div>
          </div>
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
                <div className={cx("country_img")}>
                  <Image
                    fill
                    alt="ss"
                    src={`https://flagcdn.com/${v?.code.toLocaleLowerCase()}.svg`}
                  />
                </div>
                <div>+ {v.phone}</div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default CountryDropDown;
