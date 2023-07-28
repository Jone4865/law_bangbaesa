import router from "next/router";
import styles from "./Footer.module.scss";
import className from "classnames/bind";
import Image from "next/image";

const cx = className.bind(styles);

export default function Footer() {
  return (
    <footer className={cx("footer")}>
      <div className={cx("container")}>
        <div className={cx("wrap")}>
          <div className={cx("top_container")}>
            <div className={cx("top_wrap")}>
              <div className={cx("image")} onClick={() => router.push("/")}>
                <Image
                  fill
                  src="/img/logo/logo.png"
                  alt="푸터 로고"
                  priority
                  quality={100}
                />
              </div>
              <div className={cx("content_wrap")}>
                <span className={cx("content")}>
                  각 분야별 전문가들이 서비스 운영과 마케팅 홍보를 대행해&nbsp;
                </span>
                <span className={cx("content")}>
                  IT 서비스의 운영을 컨설팅합니다.
                </span>
              </div>
            </div>
            <div className={cx("top_content")}>
              <a href="tel:1833-8603" className={cx("content_bottom")}>
                전화 : 1833-8603
              </a>
              <span className={cx("content_bottom", "email")}>
                이메일 : bangbaesa@naver.com
              </span>
              <span
                onClick={() => router.push("/terms/1")}
                className={cx("content_bottom", "terms1")}
              >
                서비스 이용약관
              </span>
              <span
                onClick={() => router.push("/terms/2")}
                className={cx("content_bottom", "terms2")}
              >
                개인정보 처리방침
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("bottom_container")}>
        <div className={cx("bottom_wrap")}>
          <div className={cx("text_wrap")}>
            <span className={cx("bottom_content")}>
              {"(주)방배사 | 대표이사 윤창기 | "}
            </span>
            <span className={cx("bottom_content")}>
              서울특별시 서초구 서초대로25길 53 | 사업자번호 678-88-02172
            </span>
          </div>
          <span className={cx("reserved")}>
            ⓒBANGBAESA All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
