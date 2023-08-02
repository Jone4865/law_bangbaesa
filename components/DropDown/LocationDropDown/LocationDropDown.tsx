import React, { useEffect, useState } from "react";

import styles from "./LocationDropDown.module.scss";
import className from "classnames/bind";
import Image from "next/image";
import { FindManyCityQuery } from "src/graphql/generated/graphql";

const cx = className.bind(styles);

type Data = {
  name: string;
  id: number;
};

type Props = {
  data:
    | FindManyCityQuery["findManyCity"]
    | FindManyCityQuery["findManyCity"][0]["districts"]
    | undefined;
  onChangeHandel: (nowAble: any, detail: boolean) => void;
  disable?: boolean;
  detail: boolean;
  defaultValue?: Data | undefined | null;
};

const LocationDropDown = ({
  data,
  onChangeHandel,
  disable,
  detail,
  defaultValue,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] =
    useState<
      | FindManyCityQuery["findManyCity"][0]
      | FindManyCityQuery["findManyCity"][0]["districts"][0]
      | undefined
    >(undefined);

  const toggleDropdown = () => {
    !disable && setIsOpen(!isOpen);
  };
  const handleOptionSelect = (
    option:
      | FindManyCityQuery["findManyCity"][0]
      | FindManyCityQuery["findManyCity"][0]["districts"][0]
  ) => {
    setIsOpen(false);

    onChangeHandel(option, detail);
    setSelectedOption(option);
  };

  useEffect(() => {
    setSelectedOption(undefined);
    setIsOpen(false);
    if (defaultValue) {
      setSelectedOption(defaultValue);
    }
  }, [data, defaultValue]);

  return (
    <div className={cx("container")}>
      <div className={cx("btn_wrap")} onClick={toggleDropdown}>
        <div className={cx("btn")}>
          <div
            onClick={() => setIsOpen(false)}
            className={cx("text", selectedOption === undefined && "gray")}
          >
            <div>{selectedOption ? selectedOption.name : "선택"}</div>
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
          {data &&
            data.map((v, idx: number) => (
              <div
                className={cx("menu_body")}
                onClick={() => handleOptionSelect(v)}
                key={idx}
              >
                <div>{v.name}</div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default LocationDropDown;
