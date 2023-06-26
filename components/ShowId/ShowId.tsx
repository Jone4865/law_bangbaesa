import { useEffect } from "react";
import styles from "./ShowId.module.scss";
import className from "classnames/bind";
import { useCookies } from "react-cookie";
import Link from "next/link";
import { useRouter } from "next/router";

const cx = className.bind(styles);

export default function ShowId() {
  const router = useRouter();
  const { id } = router.query;

  const [, setCookie] = useCookies(["saveId", "id"]);

  const onNavigateLogin = () => {
    setCookie("saveId", true);
    setCookie("id", id);
  };

  useEffect(() => {}, []);

  return (
    <div className={cx("container")}>
      <div className={cx("wrap")}>
        <div className={cx("title")}>아이디 찾기</div>
        <div>
          <div className={cx("text")}>
            회원님의 아이디는 <span>{id}</span>
            입니다.
          </div>
          <Link href={"/sign-in"} onClick={onNavigateLogin}>
            <button className={cx("btn")}>로그인</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
