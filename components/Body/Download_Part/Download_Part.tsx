import { toast } from "react-toastify";
import styles from "./Download_Part.module.scss";
import className from "classnames/bind";
import Image from "next/image";

const cx = className.bind(styles);

export default function Download_Part() {
  const onClickHandle = () => {
    toast.warn("아직 준비중입니다 !", { toastId: 1 });
  };
  return (
    <div className={cx("container")}>
      <div className={cx("wrap")}>
        <div>방배사를 편리하게 이용해보세요!</div>
        <div className={cx("img_wrap")}>
          <div onClick={onClickHandle} className={cx("img")}>
            <Image
              alt="앱스토어"
              quality={100}
              fill
              src={"/img/Download_part/app.webp"}
              priority
            />
          </div>
          <div onClick={onClickHandle} className={cx("img", "margin_left")}>
            <Image
              quality={100}
              alt="앱스토어"
              fill
              src={"/img/Download_part/google.webp"}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
