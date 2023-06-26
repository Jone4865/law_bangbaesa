import styles from "./Image_Part.module.scss";
import className from "classnames/bind";
import Image from "next/image";
import React from "react";

const cx = className.bind(styles);

type Props = {
  title: string;
  content: React.ReactNode;
  img_num: string;
};

export default function Image_Part({ title, content, img_num }: Props) {
  return (
    <div className={cx("image_wrap")}>
      <Image
        src={`/img/solution/bg${img_num}.png`}
        fill
        alt="바디 이미지"
        quality={100}
        priority
      />
      <div className={cx("text_wrap")}>
        <span className={cx("title")}>{title}</span>
        <span className={cx("content")}>{content}</span>
      </div>
    </div>
  );
}
