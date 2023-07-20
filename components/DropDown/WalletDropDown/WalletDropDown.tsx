import React, { useEffect, useState } from "react";

import styles from "./WalletDropDown.module.scss";
import className from "classnames/bind";
import Image from "next/image";
import { WalletAddressKind } from "src/graphql/generated/graphql";

const cx = className.bind(styles);

type Data = {
  name: string;
  value: WalletAddressKind;
};

type Props = {
  data: Data[];
  onChangeHandel: (nowAble: any) => void;
  disable?: boolean;
  defaultValue?: Data;
};

const WalletDropDown = ({
  data,
  onChangeHandel,
  disable,
  defaultValue,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWalletOption, setSelectedWalletOption] =
    useState<Data | undefined>(undefined);

  const toggleDropdown = () => {
    !disable && setIsOpen(!isOpen);
  };

  const handleWalletOptionSelect = (option: Data) => {
    setSelectedWalletOption(option);
    setIsOpen(false);
    onChangeHandel(option.value);
  };

  useEffect(() => {
    selectedWalletOption === undefined && setSelectedWalletOption(data[0]);
    if (defaultValue) {
      setSelectedWalletOption(defaultValue);
    }
  }, [data]);

  return (
    <div className={cx("container")}>
      <div className={cx("btn_wrap")} onClick={toggleDropdown}>
        <div className={cx("btn")}>
          <div className={cx("text")}>
            <div className={cx("wallret_img")}>
              <Image
                alt="토큰 이미지"
                src={`/img/icon/${
                  selectedWalletOption?.name === "메타마스크"
                    ? "metamask"
                    : "imtoken"
                }.png`}
                fill
              />
            </div>
            <div>{selectedWalletOption?.name}</div>
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
          {data.map(
            (v, idx) =>
              v.value !== selectedWalletOption?.value && (
                <div
                  className={cx("menu_body")}
                  onClick={() => handleWalletOptionSelect(v)}
                  key={idx}
                >
                  <div className={cx("wallret_img")}>
                    <Image
                      alt="토큰 이미지"
                      src={`/img/icon/${
                        v.name === "메타마스크" ? "metamask" : "imtoken"
                      }.png`}
                      fill
                    />
                  </div>
                  <div>{v.name}</div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default WalletDropDown;
