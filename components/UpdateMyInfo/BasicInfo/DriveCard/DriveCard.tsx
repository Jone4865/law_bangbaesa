import { useEffect } from "react";
import styles from "./DriveCard.module.scss";
import className from "classnames/bind";
import { FindMyInfoByUserQuery } from "src/graphql/generated/graphql";
import { useRouter } from "next/router";

const cx = className.bind(styles);

type Props = {
  myInfo: FindMyInfoByUserQuery["findMyInfoByUser"] | undefined;
  kind: string;
  onClickChangeHandle: () => void;
};

export default function DriveCard({
  kind,
  myInfo,
  onClickChangeHandle,
}: Props) {
  const router = useRouter();

  const birth = myInfo?.driverLicense?.birth;
  const serial = myInfo?.driverLicense?.serialNumber;
  const ricense = myInfo?.driverLicense?.licenseNumber;

  const regex = /^(\d{2})(\d{2})(\d{2})/;
  const regex2 = /^(\d{2})(\d{2})(\d{6})/;

  const birthMaskedNumber = birth?.replace(
    regex,
    (_, firstGroup, secondGroup, thirdGroup) => {
      return `${firstGroup}/${secondGroup}/${thirdGroup}`;
    }
  );

  const serialMaskedNumber = serial?.replace(
    regex,
    (_, firstGroup, secondGroup, thirdGroup) => {
      return `${firstGroup}/${secondGroup}/${thirdGroup}`;
    }
  );

  const ricenseMaskedNumber = ricense?.replace(
    regex2,
    (_, firstGroup, secondGroup, thirdGroup, founthGroup) => {
      return `${firstGroup}-${secondGroup}-${thirdGroup}-${founthGroup}`;
    }
  );

  return (
    <div className={cx("container")}>
      <div className={cx("full")}>
        <div className={cx("title")}>종류</div>
        <div className="flex">
          <div className={cx("view_text")}>{kind}</div>
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
        <div className={cx("title")}>이름</div>
        <div className={cx("view_text")}>{myInfo?.driverLicense?.name}</div>
        <div className={cx("title")}>생년월일</div>
        <div className={cx("view_text")}>{birthMaskedNumber}</div>
        <div className={cx("title")}>지역코드 앞 두자리 또는 지역명</div>
        <div className={cx("view_text")}>{myInfo?.driverLicense?.area}</div>
        <div className={cx("title")}>운전면허 번호</div>
        <div className={cx("view_text")}>{ricenseMaskedNumber}</div>
        <div className={cx("title")}>암호일련번호</div>
        <div className={cx("view_text")}>{serialMaskedNumber}</div>
      </div>
    </div>
  );
}
