import styles from "./IdCard.module.scss";
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

export default function IdCard({ kind, myInfo, onClickChangeHandle }: Props) {
  const input = myInfo?.idCard?.registrationNumber.toString();
  const regex = /^(\d{5})(\d)(\d+)/;

  const maskedNumber = input?.replace(
    regex,
    (_, firstGroup, secondDigit, remainingDigits) => {
      const asterisks = "*".repeat(remainingDigits.length);
      return `${firstGroup}${secondDigit}-` + asterisks;
    }
  );

  const regex2 = /^(\d{3})(\d{1})(\d{2})(\d{2})/;

  const input2 = myInfo?.idCard?.issueDate.toString();
  const maskedNumber2 = input2?.replace(
    regex2,
    (_, firstGroup, secondDigit, thirdGroup, fourthGroup) => {
      return `${firstGroup}${secondDigit}-` + `${thirdGroup}-${fourthGroup}`;
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
        <div className={cx("view_text")}>{myInfo?.idCard?.name}</div>
        <div className={cx("title")}>주민등록번호</div>
        <div className={cx("view_text")}>{maskedNumber}</div>
        <div className={cx("title")}>발급일</div>
        <div className={cx("view_text")}>{maskedNumber2}</div>
      </div>
    </div>
  );
}