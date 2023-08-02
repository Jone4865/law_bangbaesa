import { useLazyQuery } from "@apollo/client";
import styles from "./CertificationStateBar.module.scss";
import className from "classnames/bind";
import { FIND_MY_INFO_BY_USER } from "../../../src/graphql/query/findMyInfoByUser";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FindMyInfoByUserQuery } from "src/graphql/generated/graphql";
import { AutoHeightImage } from "components/AutoHeightImage";

const cx = className.bind(styles);

type Props = {
  path: string;
  isReady?: boolean;
};

export default function CertificationStateBar({ path, isReady }: Props) {
  const arrs = ["휴대폰 인증", "이메일 인증", "신분증 인증"];

  const [level, setLevel] = useState(1);

  const [findMyInfoByUser] = useLazyQuery<FindMyInfoByUserQuery>(
    FIND_MY_INFO_BY_USER,
    {
      onError: (e) => toast.error(e.message ?? `${e}`),
      onCompleted(data) {
        setLevel(data.findMyInfoByUser.level);
        console.log(data.findMyInfoByUser.level);
      },
      fetchPolicy: "no-cache",
    }
  );

  useEffect(() => {
    findMyInfoByUser();
  }, [path, findMyInfoByUser, isReady]);

  useEffect(() => {
    console.log(level);
  }, [level]);

  return (
    <div className={cx("container")}>
      <div className={cx("wrap")}>
        <div className={cx("line")} />
        {arrs.map((arr, idx) => (
          <div className={cx("body")} key={idx}>
            <div className={cx(idx + 1 <= level ? "ableBox" : "defaultBox")}>
              <div
                className={cx(idx + 1 <= level ? "able_level" : "notyet_level")}
              >
                레벨 {idx + 1}
              </div>
              <div className={cx("img_circle")}>
                {idx + 1 <= level && (
                  <AutoHeightImage
                    src="/img/mypage/check_on.png"
                    width={15}
                    className={cx("check")}
                  />
                )}
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
              </div>
              <div className={cx("text_wrap")}>
                <div className={cx(idx + 1 <= level && "done")}>
                  {arr}
                  {idx + 1 <= level ? " 완료" : " 필요"}
                </div>
              </div>
            </div>
            {/* {idx !== 2 && <div className={cx("line")} />} */}
          </div>
        ))}
      </div>
    </div>
  );
}
