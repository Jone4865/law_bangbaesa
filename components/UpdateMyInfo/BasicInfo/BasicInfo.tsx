import { useState, useEffect, Dispatch, SetStateAction } from "react";
import styles from "./BasicInfo.module.scss";
import className from "classnames/bind";
import Image from "next/image";
import { toast } from "react-toastify";
import IdCard from "./IdCard/IdCard";
import PassPort from "./PassPort/PassPort";
import DriveCard from "./DriveCard/DriveCard";
import { FindMyInfoByUserQuery } from "src/graphql/generated/graphql";
import { useRouter } from "next/router";

const cx = className.bind(styles);

type Props = {
  myInfo: FindMyInfoByUserQuery["findMyInfoByUser"] | undefined;
  setNowAble: Dispatch<SetStateAction<string>>;
};

export default function BasicInfo({ myInfo, setNowAble }: Props) {
  const router = useRouter();

  const [kind, setKind] =
    useState<"주민등록증" | "여권" | "운전면허증">("주민등록증");

  const onClickChangeHandle = () => {
    toast.warn(
      <div>
        본인인증 정보 변경은 현재 점검 중입니다.
        <br />
        점검 완료 후 신속히 복구 하겠습니다.
      </div>,
      { toastId: 0 }
    );
  };

  useEffect(() => {
    if (myInfo?.driverLicense) {
      setKind("운전면허증");
    } else if (myInfo?.idCard) {
      setKind("주민등록증");
    } else if (myInfo?.passport) {
      setKind("여권");
    }
  }, [myInfo]);

  return (
    <div className={cx("container")}>
      <div>
        <div className={cx("body")}>
          <div className={cx("left_title")}>
            <div className={cx("img_wrap")}>
              <Image
                alt="계정 정보 이미지"
                fill
                src={"/img/mypage/account.png"}
                priority
                quality={100}
              />
            </div>
            <div>계정정보</div>
          </div>
          <div className={cx("full")}>
            <div className={cx("title")}>아이디</div>
            <div className={cx("view_text")}>{myInfo?.identity}</div>
            <div className={cx("title")}>비밀번호</div>
            <div className="flex">
              <div className={cx("view_text")}>************</div>
              <button
                onClick={() => setNowAble("비밀번호 변경")}
                className={cx("btn")}
              >
                변경
              </button>
            </div>
          </div>
        </div>
        <div className={cx("body")}>
          <div className={cx("left_title")}>
            <div className={cx("img_wrap")}>
              <Image
                alt="계정 정보 이미지"
                fill
                src={"/img/mypage/certification.png"}
                priority
                quality={100}
              />
            </div>
            <div>본인인증 정보</div>
          </div>
          <div className={cx("full")}>
            <div className={cx("title")}>휴대폰 번호</div>
            <div className="flex">
              <div className={cx("country_code")}>82</div>
              <div className={cx("view_text")}>{myInfo?.phone}</div>
              <button className={cx("btn")} onClick={onClickChangeHandle}>
                변경
              </button>
            </div>
            <div className={cx("title")}>이메일 주소</div>
            <div className="flex">
              <div className={cx("view_text")}>
                <div>
                  {myInfo?.emailAuth?.email
                    ? myInfo?.emailAuth?.email
                    : "이메일 미인증"}
                </div>
              </div>
              <button
                className={cx("btn")}
                onClick={() =>
                  myInfo?.emailAuth?.email
                    ? onClickChangeHandle
                    : router.push(
                        `/certification/level${
                          myInfo?.level ? myInfo?.level + 1 : 2
                        }`
                      )
                }
              >
                {myInfo?.emailAuth?.email ? "변경" : "인증"}
              </button>
            </div>
          </div>
        </div>
        <div className={cx("body")}>
          <div className={cx("left_title")}>
            <div className={cx("img_wrap")}>
              <Image
                alt="계정 정보 이미지"
                fill
                src={"/img/mypage/identification.png"}
                priority
                quality={100}
              />
            </div>
            <div>신분증 정보</div>
          </div>
          {kind === "주민등록증" && (
            <IdCard
              myInfo={myInfo}
              onClickChangeHandle={onClickChangeHandle}
              kind={kind}
            />
          )}
          {kind === "여권" && (
            <PassPort
              kind={kind}
              myInfo={myInfo}
              onClickChangeHandle={onClickChangeHandle}
            />
          )}
          {kind === "운전면허증" && (
            <DriveCard
              kind={kind}
              myInfo={myInfo}
              onClickChangeHandle={onClickChangeHandle}
            />
          )}
        </div>
      </div>
    </div>
  );
}
