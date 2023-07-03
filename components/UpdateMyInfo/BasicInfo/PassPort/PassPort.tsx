import { FindMyInfoByUserQuery } from "src/graphql/generated/graphql";
import styles from "./PassPort.module.scss";
import className from "classnames/bind";

const cx = className.bind(styles);

type Props = {
  myInfo: FindMyInfoByUserQuery["findMyInfoByUser"] | undefined;
  kind: string;
  onClickChangeHandle: () => void;
};

export default function PassPort({ kind, myInfo, onClickChangeHandle }: Props) {
  const regex = /^(\d{2})(\d{2})/;

  const create = myInfo?.passport?.issueDate;
  const expired = myInfo?.passport?.expirationDate;

  const createMaskedNumber = create?.replace(
    regex,
    (_, firstGroup, secondGroup) => {
      return `${firstGroup}/${secondGroup}`;
    }
  );

  const expiredMaskedNumber = expired?.replace(
    regex,
    (_, firstGroup, secondGroup) => {
      return `${firstGroup}/${secondGroup}`;
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
        <div className={cx("title")}>여권번호</div>
        <div className={cx("view_text")}>
          {myInfo?.passport?.passportNumber}
        </div>
        <div className={cx("title")}>발급일</div>
        <div className={cx("view_text")}>{createMaskedNumber}</div>
        <div className={cx("title")}>기간만료일</div>
        <div className={cx("view_text")}>{expiredMaskedNumber}</div>
      </div>
    </div>
  );
}
