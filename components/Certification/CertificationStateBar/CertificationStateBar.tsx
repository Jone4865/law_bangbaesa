import { useLazyQuery } from "@apollo/client";
import styles from "./CertificationStateBar.module.scss";
import className from "classnames/bind";
import { FIND_MY_INFO_BY_USER } from "../../../src/graphql/generated/query/findMyInfoByUser";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Image from "next/image";

const cx = className.bind(styles);

export default function CertificationStateBar() {
  const arrs = ["휴대폰 인증", "이메일 인증", "신분증 인증", "주소 인증"];

  const [level, setLevel] = useState(1);

  const [findMyInfoByUser] = useLazyQuery(FIND_MY_INFO_BY_USER, {
    onError: (e) => toast.error(e.message ?? `${e}`),
    onCompleted(data) {
      setLevel(data.findMyInfoByUser.level);
    },
  });

  useEffect(() => {
    findMyInfoByUser();
  }, []);

  return (
    <div className={cx("container")}>
      <div className={cx("wrap")}>
        {arrs.map((arr, idx) => (
          <div className={cx("body")} key={idx}>
            <div className={cx(idx + 1 <= level ? "ableBox" : "defaultBox")}>
              <div
                className={cx(idx + 1 <= level ? "able_level" : "notyet_level")}
              >
                레벨 {level}
              </div>
              <div className={cx("img_wrap")}>
                <Image
                  fill
                  alt="인증 아이콘"
                  src={`/img/Certification/${
                    idx + 1 <= level ? "success" : "notyet"
                  }/${idx + 1}.png`}
                  priority
                  quality={100}
                />
              </div>
              <div>{arr}</div>
              <div>
                {idx + 1 <= level ? (
                  <span className={cx("done")}>완료</span>
                ) : (
                  <span>미완료</span>
                )}
              </div>
            </div>
            {idx !== 3 && <div className={cx("line")} />}
          </div>
        ))}
      </div>
    </div>
  );
}
