import { useState, useEffect, FormEvent } from "react";
import styles from "./ChangePassWord.module.scss";
import className from "classnames/bind";
import { toast } from "react-toastify";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { useLazyQuery } from "@apollo/client";
import { FIND_PASSWORD } from "../../src/graphql/generated/query/findPassword";
import { useRouter } from "next/router";

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

  const [warnPassWord, setWarnPassWord] = useState(false);
  const [warnConfirmPass, setWarnConfirmPass] = useState(false);

  const onSubmitPassWord = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      passWord &&
      passwordRule.test(passWord) &&
      passWord === confirmPassWord
    ) {
      findPassword({
        variables: {
          identity: id,
          hash: hash,
          phone: phone,
          newPassword: passWord,
        },
      });
    } else {
      if (!passWord) {
        setWarnPassWord(true);
      } else {
        setWarnConfirmPass(true);
      }
    }
  };

  const [findPassword] = useLazyQuery(FIND_PASSWORD, {
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
    },
  });

  useEffect(() => {
    if (passWord && !passwordRule.test(passWord)) {
      setWarnPassWord(true);
    } else {
      setWarnPassWord(false);
    }
    if (confirmPassWord && passWord !== confirmPassWord) {
      setWarnConfirmPass(true);
    } else {
      setWarnConfirmPass(false);
    }
  }, [passWord, confirmPassWord]);

  useEffect(() => {
    setHash(cookies.hash);
    setPhone(cookies.phone);
    removeCookies("hash");
    removeCookies("phone");
  }, []);

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
          />
          {warnPassWord && (
            <div>
              비밀번호는 영문, 특수문자(@$!%*#?&), 숫자 포함 8~20자 입력
              가능합니다.
            </div>
          )}
          <div>새 비밀번호 확인</div>
          <input
            className={cx("input")}
            value={confirmPassWord}
            onChange={(e) => setConfirmPassWord(e.target.value)}
            placeholder="한번 더 입력해주세요"
          />
          {warnConfirmPass && <div>비밀번호와 일치하지 않습니다.</div>}
          <button className={cx("btn")}>비밀번호 변경</button>
        </form>
      </div>
    </div>
  );
}
