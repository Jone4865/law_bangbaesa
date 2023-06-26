import Image from "next/image";
import styles from "./TopImage.module.scss";
import className from "classnames/bind";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const cx = className.bind(styles);

type Props = {
  imageName: string;
};

export default function TopImage({ imageName }: Props) {
  const [middle, setMiddle] = useState(false);

  const isMiddle = useMediaQuery({
    query: "(min-width: 1300px) and (max-width: 1920px)",
  });

  useEffect(() => {
    if (isMiddle) {
      setMiddle(true);
    } else {
      setMiddle(false);
    }
  }, [isMiddle]);

  return (
    <div className={cx("container")}>
      <div className={cx("wrap")}>
        <div className={cx("bg_wrap")}>
          <Image
            fill
            alt="탑이미지"
            priority
            quality={100}
            src={`/img/top_image/bg/${
              middle ? imageName : imageName + "_m"
            }.png`}
          />
        </div>
        <div className={cx("img_wrap")}>
          <Image
            fill
            alt="탑이미지"
            priority
            quality={100}
            src={`/img/top_image/img/${
              middle ? imageName : imageName + "_m"
            }.png`}
          />
        </div>
      </div>
    </div>
  );
}
