import Image from "next/image";
import { classNames } from "utils/classNames";
import styles from "./AutoHeightImage.module.scss";
import className from "classnames/bind";

const cx = className.bind(styles);

interface Props {
  className?: string;
  src?: string;
  alt?: string;
  layout?: "fixed" | "intrinsic" | "fill" | "responsive";
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  borderRadius?: number;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  width?: number;
  height?: number;
  blurDataURL?: string | null;
  onClick?: () => void;
  id?: string;
}

function AutoHeightImage({
  className,
  src = "",
  alt = "이미지",
  layout = "fill",
  objectFit = "cover",
  borderRadius,
  borderTopLeftRadius,
  borderTopRightRadius,
  width = undefined,
  height = undefined,
  blurDataURL = undefined,
  onClick,
  id,
}: Props) {
  return (
    <div
      className={classNames(className, cx("auto-height-image"))}
      onClick={onClick}
      style={{
        width,
        height,
        borderRadius,
        borderTopLeftRadius,
        borderTopRightRadius,
      }}
      id={id}
    >
      <Image
        src={`${src}?v=1231`}
        alt={alt}
        layout={layout}
        objectFit={objectFit}
        style={{ borderRadius }}
        priority={true}
        quality={100}
        placeholder={blurDataURL ? "blur" : undefined}
        blurDataURL={blurDataURL ?? undefined}
      />
    </div>
  );
}

export default AutoHeightImage;
