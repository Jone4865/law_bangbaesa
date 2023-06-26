import { useRouter } from "next/router";
import CertificationStateBar from "../CertificationStateBar/CertificationStateBar";
import styles from "./Level4.module.scss";
import className from "classnames/bind";

const cx = className.bind(styles);

export default function Level4() {
  const router = useRouter();
  return (
    <div className={cx("container")}>
      <div className={cx("wrap")}>
        <CertificationStateBar />
        <div className={cx("title")}>주소인증</div>
        <div>
          <div className={cx("circle_wrap")}>
            <div className={cx("circle")}>!</div>
          </div>
          <div className={cx("content")}>
            주소지 인증은 현재 점검 중입니다.
            <br />
            점검 완료 후 신속히 복구 하겠습니다.
          </div>
        </div>
        <button className={cx("btn")} onClick={() => router.back()}>
          뒤로가기
        </button>
      </div>
    </div>
  );
}
