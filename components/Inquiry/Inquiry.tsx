import React, { useState, useEffect } from "react";
import styles from "./Inquiry.module.scss";
import className from "classnames/bind";
import Notice from "./Notice/Notice";
import InquiryRow from "./InquiryRow/InquiryRow";
import CreateInquiry from "./CreateInquiry/CreateInquiry";
import { useLazyQuery } from "@apollo/client";
import { FIND_MANY_USER_INQUIRY_BY_USER } from "../../src/graphql/query/findManyUserInquiryByUser";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import Image from "next/image";
import NoticeDetail from "./Notice/NoticeDetail/NoticeDetail";
import { FindManyUserInquiryByUserQuery } from "src/graphql/generated/graphql";

const cx = className.bind(styles);

export default function Inquiry() {
  const router = useRouter();
  const [cookies] = useCookies(["login"]);
  const [partName, setPartName] = useState("공지사항");
  const [create, setCreate] = useState(false);

  const partArr = ["공지사항", "1:1 문의"];

  const onClickHandle = (item: string) => {
    if (item === "공지사항") {
      router.push("/notice");
    } else {
      cookies.login
        ? router.push("/inquiry/my-inquiry")
        : router.push("/sign-in");
    }
  };

  const [findManyUserInquiryByUser] =
    useLazyQuery<FindManyUserInquiryByUserQuery>(
      FIND_MANY_USER_INQUIRY_BY_USER,
      {
        onError: (e) => toast.error(e.message ?? `${e}`),
        onCompleted(data) {
          if (data.findManyUserInquiryByUser.totalCount === 0) {
            setCreate(true);
          } else {
            setCreate(false);
          }
        },
      }
    );

  useEffect(() => {
    if (router.pathname === "/inquiry/my-inquiry") {
      findManyUserInquiryByUser({ variables: { take: 20, skip: 0 } });
    }
    if (router.pathname.includes("/inquiry")) {
      setPartName("1:1 문의");
    } else {
      setPartName("공지사항");
    }
  }, [router.pathname, partName]);

  return (
    <div className={cx("container")}>
      <div className={cx("top_container")}>
        <div className={cx("top_wrap")}>
          <div className={cx("top_image_wrap")}>
            <Image
              alt="말풍선"
              src={"/img/inquiry/inquiry.png"}
              width={73.1}
              height={61.8}
              priority
              quality={100}
            />
          </div>
          <div>
            <div className={cx("top_title")}>고객센터</div>
            <div className={cx("top_text")}>
              궁금한게 있으시면 방배사 고객센터에
              <br className={cx("mobile")} /> 편하게 남겨주세요.
            </div>
          </div>
        </div>
      </div>
      <div className={cx("wrap")}>
        <div className={cx("body")}>
          {partArr.map((arr) => (
            <div
              onClick={() => onClickHandle(arr)}
              className={cx(arr !== partName ? "default_btns" : "able_btn")}
              key={arr}
            >
              {arr}
            </div>
          ))}
        </div>
        {router.pathname === "/notice/[id]" ? (
          <NoticeDetail />
        ) : partName === "공지사항" ? (
          <Notice />
        ) : create ? (
          <CreateInquiry setCreate={setCreate} />
        ) : (
          <InquiryRow create={create} setCreate={setCreate} />
        )}
      </div>
    </div>
  );
}
