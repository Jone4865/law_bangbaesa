import { useEffect } from "react";
import styles from "./DriveCard.module.scss";
import className from "classnames/bind";

const cx = className.bind(styles);

type Myinfo = {
  identity: string;
  phone: string;
  emailAuth: { createdAt: string; email: string; id: number };
  driverLicense?: {
    name: string;
    birth: string;
    area: string;
    licenseNumber: string;
    serialNumber: string;
  };
  idCard?: {
    name: string;
    registrationNumber: number;
    issueDate: string;
  };
  passport?: {
    passportNumber: number;
    issueDate: string;
    expirationDate: string;
  };
};

type Props = {
  myInfo: Myinfo | undefined;
  kind: string;
  onClickChangeHandle: () => void;
};

export default function DriveCard({
  kind,
  myInfo,
  onClickChangeHandle,
}: Props) {
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
          <button className={cx("btn")} onClick={onClickChangeHandle}>
            변경
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
