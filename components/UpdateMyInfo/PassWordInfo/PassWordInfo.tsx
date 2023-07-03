import { useState, FormEvent, Dispatch, SetStateAction } from "react";
import styles from "./PassWordInfo.module.scss";
import className from "classnames/bind";
import { toast } from "react-toastify";
import { useLazyQuery, useMutation } from "@apollo/client";
import { VERIFY_ORIGIN_PASSWORD_BY_USER } from "../../../src/graphql/query/verifyOriginPasswordByUser";
import { UPDATE_PASSWORD_BY_USER } from "../../../src/graphql/mutation/updatePasswordByUser";
import { useRouter } from "next/router";
import {
  UpdatePasswordByUserMutation,
  VerifyOriginPasswordByUserQuery,
} from "src/graphql/generated/graphql";

const cx = className.bind(styles);

type Props = {
  setNowAble: Dispatch<SetStateAction<string>>;
};

export default function PassWordInfo({ setNowAble }: Props) {
  const router = useRouter();
  const [passWord, setPassWord] = useState<string>("");
  const [newPassWord, setNewPassWord] = useState<string>("");
  const [confirmPassWord, setConfirmPassWord] = useState<string>();

  const passwordRule =
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

  const onSubmitHandle = (
    e: FormEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!passwordRule.test(passWord)) {
      toast.warn("기존 비밀번호를 확인해주세요");
    } else if (!passwordRule.test(newPassWord)) {
      toast.warn("새 비밀번호를 확인해주세요");
    } else if (newPassWord !== confirmPassWord) {
      toast.warn("새 비밀번호가 일치하지 않습니다");
    } else {
      verifyOriginPasswordByUser({ variables: { password: passWord } });
    }
  };

  const [verifyOriginPasswordByUser] =
    useLazyQuery<VerifyOriginPasswordByUserQuery>(
      VERIFY_ORIGIN_PASSWORD_BY_USER,
      {
        onError: (e) => toast.error(e.message ?? `${e}`),
        onCompleted(_data) {
          updatePasswordByUser({
            variables: { originPassword: passWord, newPassword: newPassWord },
          });
        },
      }
    );

  const [updatePasswordByUser] = useMutation<UpdatePasswordByUserMutation>(
    UPDATE_PASSWORD_BY_USER,
    {
      onError: (e) => toast.error(e.message ?? `${e}`),
      onCompleted(_data) {
        toast.success("변경을 완료했습니다.");
        setNowAble("내정보");
      },
    }
  );

  return (
    <div className={cx("container")}>
      <form className={cx("form")} onSubmit={onSubmitHandle}>
        <div>기존 비밀번호</div>
        <input
          type="passWord"
          autoComplete="on"
          className={cx("input")}
          value={passWord}
          onChange={(e) => setPassWord(e.target.value)}
          placeholder="기존 비밀번호"
        />
        <div>새 비밀번호</div>
        <input
          type="passWord"
          autoComplete="on"
          className={cx("input")}
          value={newPassWord}
          onChange={(e) => setNewPassWord(e.target.value)}
          placeholder="새 비밀번호"
        />
        <div>새 비밀번호 확인</div>
        <input
          type="passWord"
          autoComplete="on"
          className={cx("input")}
          value={confirmPassWord}
          onChange={(e) => setConfirmPassWord(e.target.value)}
          placeholder="새 비밀번호 확인"
        />
        <div className={cx("btn_wrap")}>
          <div
            className={cx("btn_left")}
            onClick={() => router.push("/find-password")}
          >
            비밀번호 찾기
          </div>
          <button className={cx("btn_right")} onSubmit={onSubmitHandle}>
            변경하기
          </button>
        </div>
      </form>
    </div>
  );
}
