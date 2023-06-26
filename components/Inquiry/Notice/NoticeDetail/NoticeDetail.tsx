import { Dispatch, SetStateAction, useEffect } from "react";
import styles from "./NoticeDetail.module.scss";
import className from "classnames/bind";
import moment from "moment";

const cx = className.bind(styles);

type Data = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  hits: number;
};

type Props = {
  detailData: Data;
  setDetailData: Dispatch<SetStateAction<Data | undefined>>;
};

export default function NoticeDetail({ detailData, setDetailData }: Props) {
  useEffect(() => {}, [detailData]);
  return (
    <div className={cx("container")}>
      <div className={cx("wrap")}>
        <div className={cx("title")}>{detailData.title}</div>
        <div className={cx("date_hits_wrap")}>
          <div className={cx("date")}>
            등록일 : {moment(detailData.createdAt).format("YYYY-MM-DD")}
          </div>
          <div className={cx("line")} />
          <div className={cx("hits")}>조회 : {detailData.hits}</div>
        </div>
        <div className={cx("content")}>{detailData.content}</div>
        <div className={cx("btn_wrap")}>
          <div className={cx("btn")} onClick={() => setDetailData(undefined)}>
            목록
          </div>
        </div>
      </div>
    </div>
  );
}
