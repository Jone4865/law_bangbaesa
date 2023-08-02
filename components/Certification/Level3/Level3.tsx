import { useState } from "react";
import CertificationStateBar from "../CertificationStateBar/CertificationStateBar";
import styles from "./Level3.module.scss";
import className from "classnames/bind";
import IdCard from "./IdCard/IdCard";
import DriverLicense from "./DriverLicense/DriverLicense";
import PassPort from "./PassPort/PassPort";
import { useRouter } from "next/router";

const cx = className.bind(styles);

export default function Level3() {
  const router = useRouter();
  const kindArr = ["주민등록증", "운전면허증", "여권"];
  const [kind, setKind] = useState<string>("주민등록증");

  const handleUpload = (file: File) => {
    // 파일 업로드 처리 로직 구현
    // console.log("Uploading file:", file);
  };

  return (
    <div className={cx("container")}>
      <div className={cx("wrap")}>
        <CertificationStateBar
          path={router.pathname}
          isReady={router.isReady}
        />
        <div className={cx("title")}>신분증 종류</div>
        <div className={cx("btns_wrap")}>
          {kindArr.map((v, idx) => (
            <div
              onClick={() => setKind(v)}
              className={cx(kind == v ? "able_btn" : "default_btn")}
              key={idx}
            >
              {v}
            </div>
          ))}
        </div>
        {kind === "주민등록증" && <IdCard />}
        {kind === "운전면허증" && <DriverLicense />}
        {kind === "여권" && <PassPort />}
      </div>
    </div>
  );
}
