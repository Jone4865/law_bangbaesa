import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./NoticeDetail.module.scss";
import className from "classnames/bind";
import moment from "moment";
import { FIND_ONE_NOTICE } from "../../../../src/graphql/generated/query/findOneNotice";
import { toast } from "react-toastify";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";

const cx = className.bind(styles);

type Data = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  hits: number;
};

export default function NoticeDetail() {
  const router = useRouter();
  const [detailData, setDetailData] = useState<Data>();

  const [findOneNotice] = useLazyQuery(FIND_ONE_NOTICE, {
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
