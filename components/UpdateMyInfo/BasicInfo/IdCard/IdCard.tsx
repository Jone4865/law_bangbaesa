import { FindMyInfoByUserQuery } from "src/graphql/generated/graphql";
import styles from "./IdCard.module.scss";
import className from "classnames/bind";
import { useRouter } from "next/router";

const cx = className.bind(styles);

type Props = {
  myInfo: FindMyInfoByUserQuery["findMyInfoByUser"] | undefined;
  kind: string;
  onClickChangeHandle: () => void;
};

export default function IdCard({ kind, myInfo, onClickChangeHandle }: Props) {
  const router = useRouter();
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
          <button
            className={cx("btn")}
            onClick={() =>
              myInfo?.emailAuth?.email
                ? onClickChangeHandle()
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
        <div className={cx("view_text")}>{myInfo?.idCard?.name}</div>
        <div className={cx("title")}>주민등록번호</div>
        <div className={cx("view_text")}>{maskedNumber}</div>
        <div className={cx("title")}>발급일</div>
        <div className={cx("view_text")}>{maskedNumber2}</div>
      </div>
    </div>
  );
}
