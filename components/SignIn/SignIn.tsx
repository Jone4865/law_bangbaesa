import { useState, useEffect, FormEvent } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import Link from "next/link";

import className from "classnames/bind";
import styles from "./SignIn.module.scss";

import { toast } from "react-toastify";

import { useLazyQuery } from "@apollo/client";
import { SIGN_IN_BY_SUER } from "../../src/graphql/query/signInByUser";
import { SignInByUserQuery } from "src/graphql/generated/graphql";

const cx = className.bind(styles);

export default function SignIn() {
  const router = useRouter();
  const idRule = /^[a-zA-Z0-9]{4,20}$/;

  const [cookies, setCookie, removeCookie] = useCookies([
    "saveId",
    "id",
    "login",
    "nickName",
  ]);
  const [saveId, setSaveId] = useState(false);
  const [id, setId] = useState<string>("");
  const [passWord, setPassWord] = useState<string>("");

  const onClickLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!idRule.test(id)) {
      toast.warn("아이디를 확인해주세요");
    } else if (passWord.length === 0) {
      toast.warn("비밀번호를 입력해주세요");
    } else {
      signInByUser({
        variables: {
          identity: id,
          password: passWord,
        },
      });
    }
  };

  const [signInByUser] = useLazyQuery<SignInByUserQuery>(SIGN_IN_BY_SUER, {
    onError: (e) => toast.error(e.message ?? `${e}`),
    onCompleted(_data) {
      if (saveId) {
        setCookie("saveId", true);
        setCookie("id", id);
        setCookie("login", true);
        removeCookie("nickName");
        setCookie("nickName", id);
        router.replace("/");
      } else {
        removeCookie("id");
        removeCookie("saveId");
        removeCookie("nickName");
        setCookie("nickName", id);
        setCookie("login", true);
        router.replace("/");
      }
    },
  });

  useEffect(() => {
    if (cookies.saveId) {
      setSaveId(true);
      setId(cookies.id);
    }
  }, []);

  return (
    <div className={cx("container")}>
      <div className={cx("wrap")}>
        <form onSubmit={onClickLogin} className={cx("body")}>
          <div className={cx("title")}>로그인</div>
          <div className={cx("part_title")}>아이디</div>
          <input
            placeholder="아이디를 입력하세요"
            value={id}
            onChange={(e) => setId(e.target.value.trim())}
            className={cx("input")}
          />
          <div className={cx("part_title")}>비밀번호</div>
          <input
            placeholder="비밀번호를 입력하세요"
            value={passWord}
            type="password"
            autoComplete="on"
            className={cx("input")}
            onChange={(e) => setPassWord(e.target.value.trim())}
          />
          <div className="flex">
            <input
              type="checkbox"
              checked={saveId}
              onChange={(e) => setSaveId(e.target.checked)}
              className={cx("check")}
            />
            <div className={cx("middle-wrap")}>
              <div className={cx("save_id")}>아이디 저장</div>
              <div className={cx("find_container")}>
                <Link href={"/find-id"}>아이디 찾기</Link>
                <span>/</span>
                <Link href={"/find-password"}>비밀번호 찾기</Link>
              </div>
            </div>
          </div>
          <button className={cx("login_btn")}>로그인</button>
          <div className={cx("not_yet")}>아직 방배사 회원이 아니신가요?</div>
          <Link href={"/sign-up"}>
            <button className={cx("sign_btn")}>방배사 회원가입</button>
          </Link>
        </form>
      </div>
    </div>
  );
}
