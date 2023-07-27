import { FindOneOfferOutput } from "src/graphql/generated/graphql";
import styles from "./OfferMore.module.scss";
import className from "classnames/bind";
import Image from "next/image";
import { convertConnectionDate } from "utils/convertConnectionDate";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

const cx = className.bind(styles);

type Props = {
  offerData: FindOneOfferOutput | undefined;
};

export default function OfferMore({ offerData }: Props) {
  const router = useRouter();
  const [cookies] = useCookies(["nickName"]);
  return (
    <div className={cx("container")}>
      <div className={cx("btn")}>오퍼조건 보기</div>
      <div className={cx("align")}>
        <div
          onClick={() =>
            cookies.nickName !== offerData?.identity &&
            router.push(`/user/${offerData?.identity}`)
          }
          className={cx(
            "nickname",
            cookies.nickName !== offerData?.identity && "pointer"
          )}
        >
          {offerData?.identity}
        </div>
        <div>
          {offerData?.city?.name} {offerData?.district?.name}
        </div>
      </div>
      <div className={cx("align")}>
        <div className={cx("flex")}>
          <div>{offerData?.minAmount?.toLocaleString()}</div>
          <div className={cx("gray")}>KRW</div>/
          <div>{offerData?.maxAmount?.toLocaleString()}</div>
          <div className={cx("gray")}>KRW</div>
        </div>
        <div className={cx("flex")}>
          <div className={cx("price")}>
            {offerData?.price?.toLocaleString()}
          </div>
          <div className={cx("price_gray")}>KRW</div>
        </div>
      </div>
      <div className={cx("flex")}>
        <div className={cx("img_wrap")}>
          <Image
            alt="코인 이미지"
            src={`/img/marquee/${offerData?.coinKind?.toLowerCase()}.png`}
            fill
          />
        </div>
        <div>{offerData?.coinKind?.toUpperCase()}</div>
        <div className={cx("trust_img_wrap")}>
          <Image alt="하트 이미지" src={`/img/icon/trust.png`} fill />
        </div>
        <div>{offerData?.offerCompleteCount}</div>
      </div>
      <div className={cx("bottom")}>
        <div>최근접속 : {convertConnectionDate(offerData?.connectionDate)}</div>
        <div className={cx("bar")} />
        <div>{offerData?.responseSpeed}분 미만</div>
      </div>
    </div>
  );
}
