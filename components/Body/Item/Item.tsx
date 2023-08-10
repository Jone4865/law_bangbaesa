import styles from "./Item.module.scss";
import className from "classnames/bind";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const cx = className.bind(styles);

type Props = {
  title: React.ReactNode;
  content: React.ReactNode;
  img_name: string;
  item_name?: string;
};

export default function Item({ title, content, img_name, item_name }: Props) {
  const router = useRouter();
  return (
    <div className={cx("container", router.pathname === "/" && "back_color")}>
      <div className={cx("content_wrap")}>
        <div className={cx("title")}>{title}</div>
        <div className={cx("content")}>{content}</div>
      </div>
      <div className={cx(`image_${item_name}`)}>
        <Image
          src={`/img/body/${img_name}.png`}
          fill
          alt="바디 이미지"
          priority
          quality={100}
        />
      </div>
    </div>
  );
}
