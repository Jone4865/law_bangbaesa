import { useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import { useCookies } from "react-cookie";

import styles from "./Side.module.scss";
import className from "classnames/bind";

import { toast } from "react-toastify";

import { useMutation } from "@apollo/client";
import { SIGN_OUT_BY_USER } from "../../src/graphql/generated/mutation/signOutByUser";

const cx = className.bind(styles);

type Props = {
  modal: boolean;
  setModalState: (modal: boolean) => void;
};

function Side({ modal, setModalState }: Props) {
  const router = useRouter();
  const [cookies, , removeCookies] = useCookies(["login"]);
  const [login, setLogin] = useState(false);

  const Btns = [
    {
      name: login ? "로그아웃" : "로그인",
      path: login ? "" : "/sign-in",
    },
    {
      name: login ? "내정보" : "회원가입",
      path: login ? "/mypage" : "/sign-up",
    },
    { name: "홈", path: "/" },
    { name: "OTC", path: "/otc" },
    { name: "상품권", path: "/gift-card" },
    { name: "고객센터", path: "/inquiry" },
    { name: "회사소개", path: "/introduction" },
  ];

  const onNavigate = (path: string) => {
    if (path === "") {
      onLogout();
    } else {
      router.push(path);
      setModalState(false);
    }
  };

  const onLogout = () => {
    removeCookies("login");
    toast.success("로그아웃 되었습니다.");
    signOutByUser();
  };

  const [signOutByUser] = useMutation(SIGN_OUT_BY_USER, {
    onCompleted(_data) {
      setLogin(false);
      router.push("/");
    },
  });

  useEffect(() => {
    if (cookies.login) {
      setLogin(true);
    } else {
      setLogin(false);
    }

    const htmlEle = document?.getElementsByTagName("html").item(0);
    if (modal) {
      if (htmlEle) {
        htmlEle.style.overflow = "hidden";
      }
    } else {
      if (htmlEle) {
        htmlEle.style.overflow = "unset";
      }
    }
  }, [modal, cookies.login]);

  return (
    <div
      className={cx(!modal ? "side_none" : "side_contain")}
      onClick={() => {
        setModalState(false);
      }}
    >
      <div
        className={cx("side_slideout", "side_wrap")}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <h1>
          <span />
          <span onClick={() => setModalState(false)}>X</span>
        </h1>
        {Btns.map((btn, index) => (
          <div key={index} onClick={() => onNavigate(btn.path)}>
            <div
              className={cx(
                "side_hover",
                router.pathname === btn.path && "color"
              )}
            >
              <span>{btn.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Side;
