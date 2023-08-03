import React, { useEffect, useState } from "react";
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
  const [detailData, setDetailData] =
    useState<FindOneNoticeQuery["findOneNotice"]>();

  const [findOneNotice] = useLazyQuery<FindOneNoticeQuery>(FIND_ONE_NOTICE, {
    onError: (e) => toast.error(e.message ?? `${e}`),
    onCompleted(data) {
      setDetailData(data.findOneNotice);
    },
  });

  useEffect(() => {
    if (router.query.id) {
      findOneNotice({
        variables: { findOneNoticeId: +router.query.id },
      });
    }
  }, [router.query.id]);

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
          dangerouslySetInnerHTML={{ __html: detailData?.content || "" }}
        />
        <div className={cx("btn_wrap")}>
          <div className={cx("btn")} onClick={() => router.push("/notice")}>
            목록
          </div>
        </div>
      </div>
    </div>
  );
}
