import React, { useState, useEffect } from "react";
import styles from "./Inquiry.module.scss";
import className from "classnames/bind";
import Notice from "./Notice/Notice";
import InquiryRow from "./InquiryRow/InquiryRow";
import CreateInquiry from "./CreateInquiry/CreateInquiry";
import { useLazyQuery } from "@apollo/client";
import { FIND_MANY_USER_INQUIRY_BY_USER } from "../../src/graphql/generated/query/findManyUserInquiryByUser";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import Image from "next/image";
import NoticeDetail from "./Notice/NoticeDetail/NoticeDetail";

const cx = className.bind(styles);

type Data = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  hits: number;
};

export default function Inquiry() {
  const router = useRouter();
  const [cookies] = useCookies(["login"]);
  const [partName, setPartName] = useState("공지사항");
  const [create, setCreate] = useState(false);
  const [detailData, setDetailData] = useState<Data | undefined>(undefined);

  const partArr = ["공지사항", "1:1 문의"];

  const onClickHandle = (item: string) => {
    if (item === "공지사항") {
      setPartName(item);
      setDetailData(undefined);
    } else {
      cookies.login ? setPartName(item) : router.push("/sign-in");
    }
  };

  const [findManyUserInquiryByUser] = useLazyQuery(
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
    if (partName === "1:1 문의") {
      findManyUserInquiryByUser({ variables: { take: 20, skip: 0 } });
    }
  }, [partName]);

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
        {partName === "공지사항" ? (
          detailData === undefined ? (
            <Notice setDetailData={setDetailData} />
          ) : (
            <NoticeDetail
              detailData={detailData}
              setDetailData={setDetailData}
            />
          )
        ) : create ? (
          <CreateInquiry setCreate={setCreate} />
        ) : (
          <InquiryRow create={create} setCreate={setCreate} />
        )}
      </div>
    </div>
  );
}