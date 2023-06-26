import { useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import { useCookies } from "react-cookie";

import styles from "./Header.module.scss";
import className from "classnames/bind";
import Image from "next/image";

import { toast } from "react-toastify";

import { useMutation } from "@apollo/client";
import { SIGN_OUT_BY_USER } from "../../src/graphql/generated/mutation/signOutByUser";

const cx = className.bind(styles);

type Props = {
  setModalState: (modal: boolean) => void;
};

export default function Header({ setModalState }: Props) {
  const router = useRouter();
  const [scrollY, setScrollY] = useState(false);
  const [cookies, , removeCookies] = useCookies(["login"]);
  const [login, setLogin] = useState(false);

  const Btns = [
    { name: "홈", path: "/" },
    { name: "OTC", path: "/otc" },
    { name: "상품권", path: "/gift-card" },
    { name: "고객센터", path: "/inquiry" },
    { name: "회사소개", path: "/introduction" },
  ];

  const onNavigate = (path: string) => {
    router.push(path);
  };

  const onLogout = () => {
    removeCookies("login");
    toast.success("로그아웃 되었습니다.");
    signOutByUser();
  };

  const [signOutByUser] = useMutation(SIGN_OUT_BY_USER, {
    onError: (e) => toast.error(e.message ?? `${e}`),
    onCompleted(_data) {
      setLogin(false);
      router.push("/");
    },
  });

  useEffect(() => {
    if (cookies.login) {
      setLogin(true);
    }

    (() => {
      window.addEventListener("scroll", () => {
        setScrollY(window.pageYOffset <= 20 ? false : true);
      });
    })();
  }, [cookies.login]);

  return (
    <header className={cx("header")}>
      <div className={cx("header_container")}>
        <div className={cx("none")} />
        <div className={cx("header_logo")}>
          <div onClick={() => onNavigate("/")}>
            <div className={cx("image_wrap")}>
              <Image alt="로고" src={"/img/logo/logo_on.png"} fill />
            </div>
          </div>
        </div>
        <div className={cx("header_bottons_container")}>
          <div className={cx("herder_buttons_wrap")}>
            {Btns.map((btn) => (
              <div
                key={btn.name}
                className={cx(
                  "header_hover",
                  router.pathname === btn.path && "orange"
                )}
                onClick={() => {
                  setModalState(false);
                }}
              >
                <div onClick={() => onNavigate(btn.path)}>
                  <span>{btn.name}</span>
                </div>
              </div>
            ))}
            <div className={cx("sign_container")}>
              <div
                className={cx("link")}
                onClick={() => (login ? onLogout() : onNavigate("/sign-in"))}
              >
                {login ? "로그아웃" : "로그인"}
              </div>
              <hr className={cx("line")} />
              <div
                className={cx(
                  "link",
                  login && router.pathname === "/mypage" && "orange"
                )}
                onClick={() => onNavigate(login ? "/mypage" : "/sign-up")}
              >
                {login ? "내정보" : "회원가입"}
              </div>
            </div>
          </div>
          <Image
            className={cx("header_icon")}
            src={"/img/icon/menu_white.svg"}
            onClick={() => setModalState(true)}
            width={20}
            height={16}
            alt="헤더 삼단바 아이콘"
          />
        </div>
      </div>
    </header>
  );
}
