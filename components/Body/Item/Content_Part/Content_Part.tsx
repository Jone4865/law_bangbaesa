import styles from "./Content_Part.module.scss";
import className from "classnames/bind";
import Image from "next/image";

const cx = className.bind(styles);

type Props = {
  title: React.ReactNode;
  content: React.ReactNode;
  logo_color: "white" | "orange";
};

export default function Content_Part({ title, content, logo_color }: Props) {
  return (
    <div
      className={cx(
        logo_color === "white" ? "container_white" : "container_orange"
      )}
    >
      <div className={cx("logo")}>
        <Image
          fill
          alt="바디 로고"
          src={`/img/logo/logo_${logo_color}.png`}
          priority
          quality={100}
        />
      </div>
      <div className={cx("title")}>{title}</div>
      <div className={cx("content")}>{content}</div>
    </div>
  );
}
