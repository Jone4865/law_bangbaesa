import { useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import { useCookies } from "react-cookie";

import styles from "./Header.module.scss";
import className from "classnames/bind";
import Image from "next/image";

import { toast } from "react-toastify";

import { useMutation } from "@apollo/client";
import { SIGN_OUT_BY_USER } from "../../src/graphql/mutation/signOutByUser";
import { SignOutByUserMutation } from "src/graphql/generated/graphql";

const cx = className.bind(styles);

type Props = {
  setModalState: (modal: boolean) => void;
};

export default function Header({ setModalState }: Props) {
  const router = useRouter();
  const [scrollY, setScrollY] = useState(false);
  const [cookies, , removeCookies] = useCookies(["login", "nickName"]);
  const [login, setLogin] = useState(false);

  const Btns = [
    { name: "홈", path: "/", index: "/" },
    { name: "P2P", path: "/p2p", index: "/p2p" },
    { name: "상품권", path: "/gift-card", index: "/gift-card" },
    { name: "고객센터", path: "/notice", index: "/notice" },
    { name: "회사소개", path: "/introduction", index: "/introduction" },
  ];

  const onNavigate = (path: string) => {
    router.push(path);
  };

  const onLogout = () => {
    removeCookies("login");
    removeCookies("nickName");
    signOutByUser();
  };

  const [signOutByUser] = useMutation<SignOutByUserMutation>(SIGN_OUT_BY_USER, {
    onError: (e) => toast.error(e.message ?? `${e}`),
    onCompleted(_data) {
      setLogin(!login);
      setLogin(false);
      removeCookies("login");
      removeCookies("nickName");
      router.replace("/");
    },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (cookies.login) {
      setLogin(true);
    } else {
      setLogin(false);
    }

    (() => {
      window.addEventListener("scroll", () => {
        setScrollY(window.pageYOffset <= 2 ? false : true);
      });
    })();
  }, [cookies, router, scrollY, router.pathname]);

  return (
    <header className={cx("header")}>
      <div className={cx("header_container")}>
        <div className={cx("none")} />
        <div className={cx("header_logo")}>
          <div onClick={() => onNavigate("/")}>
            <div className={cx("image_wrap")}>
              <Image
                alt="로고"
                src={"/img/logo/logo_on.png"}
                fill
                priority
                quality={100}
              />
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
                  btn.path !== "/"
                    ? router.pathname.includes(btn.index) && "orange"
                    : router.pathname === btn.path && "orange",
                  btn.name === "고객센터" &&
                    (router.pathname.includes(btn.index) ||
                      router.pathname.includes("/inquiry")) &&
                    "orange"
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
          <div className={cx("side_view")}>
            <Image
              className={cx("header_icon")}
              src={"/img/icon/menu_white.svg"}
              onClick={() => setModalState(true)}
              width={20}
              height={16}
              alt="헤더 삼단바 아이콘"
              priority
              quality={100}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
