import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./NoticeDetail.module.scss";
import className from "classnames/bind";
import moment from "moment";
import { FIND_ONE_NOTICE } from "../../../../src/graphql/query/findOneNotice";
import { toast } from "react-toastify";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { FindOneNoticeQuery } from "src/graphql/generated/graphql";

const cx = className.bind(styles);

export default function NoticeDetail() {
  const router = useRouter();
  const [detailData, setDetailData] = useState<
    FindOneNoticeQuery["findOneNotice"]
  >({
    content:
      "안녕하십니까?<br/>방배사와 함께해주시는 모든 분들께 갚은 감사의 말씀을 드립니다.<br/>방배사 웹서비스가 2023년 7월에 오픈을 하였습니다.<br/>항상 여러분이 편하게 사용하실 수 있도록 노력하는 방배사가 되겠습니다.<br/>불편사항이나 궁금하신게 있으시다면<br/>언제든 고객센터를 통해 문의주시면 감사하겠습니다.<br/>늘 행복하시고 건강하세요.<br/>감사합니다.",
    createdAt: new Date(),
    hits: 30,
    id: 1,
    title: "방배사 사이트가 오픈하였습니다.",
  });

  const [findOneNotice] = useLazyQuery<FindOneNoticeQuery>(FIND_ONE_NOTICE, {
    onError: (e) => toast.error(e.message ?? `${e}`),
    onCompleted(data) {
      setDetailData(data.findOneNotice);
    },
  });

  useEffect(() => {
    // if (router.query.id) {
    //   findOneNotice({
    //     variables: { findOneNoticeId: +router.query.id },
    //   });
    // }
  }, [router.query.id]);

  const formattedContent = detailData?.content?.replace(
    /(?:\r\n|\r|\n)/g,
    "<br>"
  );

  return (
    <div className={cx("container")}>
      <div className={cx("wrap")}>
        <div className={cx("title")}>{detailData?.title}</div>
        <div className={cx("date_hits_wrap")}>
          <div className={cx("date")}>
            등록일 : {moment(detailData?.createdAt).format("YYYY-MM-DD")}
          </div>
          <div className={cx("line")} />
          <div className={cx("hits")}>조회 : {detailData?.hits}</div>
        </div>
        <div
          className={cx("content")}
          dangerouslySetInnerHTML={{ __html: formattedContent || "" }}
        ></div>
        <div className={cx("btn_wrap")}>
          <div className={cx("btn")} onClick={() => router.push("/notice")}>
            목록
          </div>
        </div>
      </div>
    </div>
  );
}
