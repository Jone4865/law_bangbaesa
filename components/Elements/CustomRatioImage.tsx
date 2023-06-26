import Image from "next/image";
import styles from "./CustomRatioImage.module.scss";
import className from "classnames/bind";

interface Props {
  src: string;
  ratio1: number;
  ratio2: number;
}

const cx = className.bind(styles);

function CustomRatioImage({ src, ratio1, ratio2 }: Props) {
  return (
    <div
      className={cx("custom-ratio-image")}
      style={{
        paddingTop: `calc(100% / ${ratio1} * ${ratio2})`,
      }}
    >
      <Image
        className={cx("image")}
        src={src}
        alt={"이벤트 이미지"}
        fill
        quality={100}
        style={{ objectFit: "contain" }}
        priority
      />
    </div>
  );
}

export default CustomRatioImage;
