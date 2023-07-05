import { useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import { useCookies } from "react-cookie";

import styles from "./Side.module.scss";
import className from "classnames/bind";

import { toast } from "react-toastify";

import { useMutation } from "@apollo/client";
import { SIGN_OUT_BY_USER } from "../../src/graphql/mutation/signOutByUser";
import { SignOutByUserMutation } from "src/graphql/generated/graphql";

const cx = className.bind(styles);

type Props = {
  modal: boolean;
  setModalState: (modal: boolean) => void;
};

function Side({ modal, setModalState }: Props) {
  const router = useRouter();
  const [cookies, , removeCookies] = useCookies(["login", "nickName"]);

  const [login, setLogin] = useState(false);

  const Btns = [
    { name: "홈", path: "/" },
    { name: "OTC", path: "/otc/buy" },
    { name: "상품권", path: "/gift-card" },
    { name: "고객센터", path: "/notice" },
    { name: "회사소개", path: "/introduction" },
  ];

  const bottomBtns = [
    {
      name: login ? "내정보" : "로그인",
      path: login ? "/mypage" : "/sign-in",
    },
    {
      name: "/",
      path: "",
    },
    {
      name: login ? "로그아웃" : "회원가입",
      path: login ? "" : "/sign-up",
    },
  ];

  const onNavigate = (path: string) => {
    if (path === "") {
      onLogout();
      setModalState(false);
    } else {
      router.push(path);
      setModalState(false);
    }
  };

  const onLogout = () => {
    removeCookies("login");
    removeCookies("nickName");
    signOutByUser();
  };

  const [signOutByUser] = useMutation<SignOutByUserMutation>(SIGN_OUT_BY_USER, {
    onCompleted(_data) {
      setLogin(false);
      router.replace("/");
      toast.success("로그아웃 되었습니다.");
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
  }, [modal, cookies.login, router]);

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
                router.pathname === btn.path && "color",
                btn.name === "고객센터" &&
                  (router.pathname.includes(btn.path) ||
                    router.pathname.includes("/inquiry")) &&
                  "color"
              )}
            >
              <span>{btn.name}</span>
            </div>
          </div>
        ))}
        {
          <div className={cx("bottom_btns")}>
            {bottomBtns.map((v, idx) => (
              <div
                key={idx}
                onClick={() => onNavigate(v.path)}
                className={cx("bottom_btn")}
              >
                <div className={cx(idx !== 1 ? "bottom_hover" : "margin")}>
                  {v.name}
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
}

export default Side;
