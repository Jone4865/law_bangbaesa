import { useState, useEffect, FormEvent } from "react";
import styles from "./ChangePassWord.module.scss";
import className from "classnames/bind";
import { toast } from "react-toastify";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { useLazyQuery } from "@apollo/client";
import { FIND_PASSWORD } from "../../src/graphql/query/findPassword";
import { useRouter } from "next/router";
import { FindPasswordQuery } from "src/graphql/generated/graphql";

const cx = className.bind(styles);

export default function ChangePassWord() {
  const router = useRouter();
  const { id } = router.query;
  const [cookies, _, removeCookies] = useCookies(["hash", "phone"]);
  const [passWord, setPassWord] = useState<string>();
  const [confirmPassWord, setConfirmPassWord] = useState<string>();

  const [hash, setHash] = useState<string>();
  const [phone, setPhone] = useState<string>();

  const passwordRule =
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

  const onSubmitPassWord = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!passWord || !passwordRule.test(passWord)) {
      toast.warn("비밀번호를 확인해주세요");
    } else if (!confirmPassWord) {
      toast.warn("비밀번호를 한번 더 입력해주세요");
    } else if (passWord !== confirmPassWord) {
      toast.warn("비밀번호가 일치하지 않습니다");
    } else {
      findPassword({
        variables: {
          identity: id,
          hash: hash,
          phone: phone,
          newPassword: passWord,
        },
      });
    }
  };

  const [findPassword] = useLazyQuery<FindPasswordQuery>(FIND_PASSWORD, {
    onError: (e) => toast.error(e.message ?? `${e}`),
    onCompleted(_data) {
      toast.success(
        <Link href={"/sign-in"}>
          <div>
            비밀번호 수정을 완료했습니다.
            <br /> 로그인 해주시기 바랍니다.
          </div>
        </Link>,
        {
          closeButton: (
            <Link href={"/sign-in"}>
              <div className={cx("toast_btn")}>
                <div>닫기</div>
              </div>
            </Link>
          ),
          autoClose: false,
          hideProgressBar: false,
        }
      );
      router.push("/sign-in");
    },
  });

  useEffect(() => {
    if (!hash || !phone) {
      setHash(cookies.hash);
      setPhone(cookies.phone);
    } else {
      removeCookies("hash");
      removeCookies("phone");
    }
  }, [hash, phone]);

  return (
    <div className={cx("container")}>
      <div className={cx("wrap")}>
        <div className={cx("title")}>비밀번호 찾기</div>
        <form onSubmit={onSubmitPassWord}>
          <div>새 비밀번호</div>
          <input
            className={cx("input")}
            value={passWord}
            onChange={(e) => setPassWord(e.target.value)}
            placeholder="새 비밀번호를 입력해주세요"
            type="password"
          />
          <div>새 비밀번호 확인</div>
          <input
            className={cx("input")}
            value={confirmPassWord}
            onChange={(e) => setConfirmPassWord(e.target.value)}
            placeholder="한번 더 입력해주세요"
            type="password"
          />
          <button className={cx("btn")}>비밀번호 변경</button>
        </form>
      </div>
    </div>
  );
}
