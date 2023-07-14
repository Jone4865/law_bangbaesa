import { useState } from "react";
import styles from "./SignOut.module.scss";
import className from "classnames/bind";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { useCookies } from "react-cookie";
import { WITHDRAWA_USER } from "../../../src/graphql/mutation/withdrawalUser";
import { useRouter } from "next/router";
import { WithdrawalUserMutation } from "src/graphql/generated/graphql";

const cx = className.bind(styles);

export default function SignOut() {
  const router = useRouter();
  const [, , removeCookies] = useCookies(["login"]);
  const [disAble, setDisAble] = useState(true);

  const contentArr = [
    <div key={1}>
      회원정보는 탈퇴 시 관련 법령에 따라 보관 의무가 있는 경우를 제외하고는
      즉시 삭제됩니다.
    </div>,
    <div key={2}>
      전자상거래 등에서의 소비자보호에 관한 법률에 따라 계약 또는 청약 철회에
      관한 기록, 대금 결제 및<br className={cx("pc_br")} /> 재화 등의 공급에
      관한
      <br className={cx("mobile_br")} /> 기록은 5년, 그리고 소비자의 불만 또는
      쟁처리에 관한 기록은 <br className={cx("mobile_br")} />
      3년간 보존됩니다.
    </div>,
    <div key={3}>
      탈퇴 이후에는 어떠한 방법으로도 삭제된 회원정보를
      <br className={cx("mobile_br")} /> 복원할 수 없습니다.
    </div>,
  ];

  const onClickHandle = () => {
    toast.success("회원탈퇴를 완료했습니다.");
    withdrawalUser();
  };

  const [withdrawalUser] = useMutation<WithdrawalUserMutation>(WITHDRAWA_USER, {
    onError: (e) => toast.error(e.message ?? `${e}`),
    onCompleted(_data) {
      removeCookies("login");
      router.replace("/");
    },
  });

  return (
    <div className={cx("container")}>
      <div className={cx("wrap")}>
        <div className={cx("title")}>회원탈퇴 안내사항</div>
        <div className={cx("content_wrap")}>
          {contentArr.map((arr, idx) => (
            <div key={arr.key} className={cx("content_body")}>
              <div>{idx + 1}.</div>
              <div className={cx("content")}>{arr}</div>
            </div>
          ))}
        </div>
        <div>
          <div className={cx("sub_title")}>회원탈퇴 동의</div>
          <div className="flex">
            <input
              onChange={(e) => setDisAble(!e.target.checked)}
              checked={!disAble}
              type="checkBox"
              className={cx("check")}
            />
            <div className={cx("comment")}>
              회원탈퇴 안내를 모두 확인하였으며
              <br className={cx("mobile_br")} /> 탈퇴에 동의합니다.
            </div>
          </div>
        </div>
        <button
          disabled={disAble}
          className={cx("btn")}
          onClick={onClickHandle}
        >
          탈퇴하기
        </button>
      </div>
    </div>
  );
}
