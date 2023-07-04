import Image from "next/image";
import styles from "./SideStatus.module.scss";
import className from "classnames/bind";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";

const cx = className.bind(styles);

type Props = {
  level: number;
  mobile: boolean;
  setMobileMore?: Dispatch<SetStateAction<boolean>>;
};

export default function SideStatus({ level, mobile, setMobileMore }: Props) {
  const arr = ["휴대폰 인증", "이메일 인증", "신분증 인증", "주소지 인증"];
  const router = useRouter();
  return (
    <div className={cx(!mobile ? "container" : "mobile_container")}>
      <div className={cx("mobile")}>
        <div />
        <div>
          {router.pathname === "/mypage" ? "나의 인증상태" : "인증상태"}
        </div>
        <div
          onClick={() => setMobileMore && setMobileMore(false)}
          className={cx("close_wrap")}
        >
          <Image
            alt="닫기"
            src={"/img/mypage/close.png"}
            fill
            priority
            quality={100}
          />
        </div>
      </div>
      <div className={cx("wrap")}>
        <div className={cx("body")}>
          {arr.map((item, idx) => (
            <div key={item} className="flex">
              <div className={cx("arr_container")}>
                <div
                  className={cx(level > idx ? "able_check" : "default_check")}
                />
                <div className={cx("line_wrap")}>
                  {idx !== 3 && <div className={cx("line")} />}
                </div>
              </div>
              <div className={cx("level_body")}>
                <div className={cx("level_title")}>
                  <div>레벨 {idx + 1}</div>
                  <div>{idx === 3 ? "(선택사항)" : "(필수 사항)"}</div>
                </div>
                <div className={cx("level_text")}>
                  <div
                    className={cx(
                      level > idx ? "able_level_text" : "default_level_text"
                    )}
                  >
                    {level > idx ? `${item} 완료` : `${item}`}
                  </div>
                </div>
                {idx === 2 && (
                  <div>
                    <div className={cx("bullet_wrap")}>
                      <div className={cx("bullet")} /> 거래/송금 한도
                      <br />
                      1,000,000KRW 까지
                      <br />
                      오퍼 등록 가능
                      <br />
                    </div>
                    <div className={cx("bullet_wrap")}>
                      <div className={cx("bullet")} /> 거래자간 채팅 가능
                    </div>
                  </div>
                )}
                {idx === 3 && (
                  <div className={cx("bullet_wrap")}>
                    <div className={cx("bullet")} />
                    <div>거래금액 무제한</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
