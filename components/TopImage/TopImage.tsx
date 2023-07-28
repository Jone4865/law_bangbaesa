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
  const [middle, setMiddle] = useState(true);

  const isMiddle = useMediaQuery({
    query: "(min-width: 759px) and (max-width: 10000px)",
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
            src={`/img/top_image/bg/${imageName}.png?v=1231`}
          />
        </div>
        <div className={cx("img_wrap")}>
          <Image
            fill
            objectFit="contain"
            alt="탑이미지"
            priority
            quality={100}
            src={`/img/top_image/img/${
              middle ? imageName : imageName + "_m"
            }.png?v=3131`}
          />
        </div>
      </div>
    </div>
  );
}
