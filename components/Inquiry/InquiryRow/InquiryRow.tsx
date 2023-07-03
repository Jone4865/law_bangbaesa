import { useState, Dispatch, SetStateAction, useEffect } from "react";
import styles from "./InquiryRow.module.scss";
import className from "classnames/bind";
import Pagination from "react-js-pagination";
import { useLazyQuery } from "@apollo/client";
import { FIND_MANY_USER_INQUIRY_BY_USER } from "../../../src/graphql/query/findManyUserInquiryByUser";
import { toast } from "react-toastify";
import moment from "moment";
import Image from "next/image";
import { FindManyUserInquiryByUserQuery } from "src/graphql/generated/graphql";

const cx = className.bind(styles);

type Props = {
  create: boolean;
  setCreate: Dispatch<SetStateAction<boolean>>;
};

export default function InquiryRow({ create, setCreate }: Props) {
  const [take] = useState(20);
  const [skip, setSkip] = useState(0);
  const [current, setCurrent] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [data, setData] = useState<
    FindManyUserInquiryByUserQuery["findManyUserInquiryByUser"]["userInquiries"]
  >([]);
  const [detailId, setDetailId] = useState<number | undefined>(undefined);

  const handlePagination = (e: number) => {
    setSkip((e - 1) * take);
    setCurrent(e);
  };

  const [findManyUserInquiryByUser] =
    useLazyQuery<FindManyUserInquiryByUserQuery>(
      FIND_MANY_USER_INQUIRY_BY_USER,
      {
        onError: (e) => toast.error(e.message ?? `${e}`),
        onCompleted(data) {
          setTotalCount(data.findManyUserInquiryByUser.totalCount);
          setData(data.findManyUserInquiryByUser.userInquiries);
        },
        fetchPolicy: "no-cache",
      }
    );

  useEffect(() => {
    findManyUserInquiryByUser({ variables: { take, skip } });
  }, [create]);

  return (
    <div className={cx("container")}>
      <div className={cx("wrap")}>
        <div className={cx("number")}>번호</div>
        <div className={cx("title")}>제목</div>
        <div className={cx("date", "non_mobile")}>등록일</div>
        <div className={cx("state", "non_mobile")}>상태</div>
        <div className={cx("mobile", "mobile_hits")}>상태/등록일</div>
      </div>
      {data?.map((v, idx) => (
        <div key={idx} className={cx("map_container")}>
          <div
            className={cx("map_wrap")}
            onClick={() =>
              setDetailId((prev) => (prev === v.id ? undefined : v.id))
            }
          >
            <div className={cx("number")}>{v.id}</div>
            <div className={cx("title_wrap")}>
              <div className={cx("title")}>{v.title}</div>
              <div className={cx("mobile")}>
                {v.reply ? (
                  <div className={cx("done")}>답변완료</div>
                ) : (
                  <div className={cx("wait")}>답변대기</div>
                )}
                <div className={cx("line")} />
                {moment(v.createdAt).format("YYYY-MM-DD")}
              </div>
            </div>
            <div className={cx("date", "non_mobile")}>
              {moment(v.createdAt).format("YYYY-MM-DD")}
            </div>
            <div className={cx("state", "non_mobile")}>
              {v.reply ? (
                <div className={cx("done")}>답변완료</div>
              ) : (
                <div className={cx("wait")}>답변대기</div>
              )}
            </div>
          </div>
          {detailId === v.id && (
            <div className={cx("more_container")}>
              <div className="flex">
                <span className={cx("more_content")}>내용</span>
                <span>{v.content}</span>
              </div>
              {v.reply && (
                <div className={cx("more_reply_wrap")}>
                  <span className={cx("more_reply")}>답변</span>
                  <span>{v.reply}</span>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
      <div className={cx("bottom_wrap")}>
        <Pagination
          activePage={current}
          itemsCountPerPage={take}
          totalItemsCount={totalCount}
          pageRangeDisplayed={5}
          onChange={handlePagination}
          activeClass={cx("able_number")}
          itemClass={cx("default_number")}
          prevPageText={
            <div className={cx("left_arrow")}>
              <Image
                alt="화살표"
                src={"/img/inquiry/arrow_b.png"}
                width={15}
                height={9.5}
                priority
                quality={100}
              />
            </div>
          }
          nextPageText={
            <div className={cx("right_arrow")}>
              <Image
                alt="화살표"
                src={"/img/inquiry/arrow_b.png"}
                width={15}
                height={9.5}
                priority
                quality={100}
              />
            </div>
          }
          lastPageText={""}
          firstPageText={""}
        />
      </div>
      <div className={cx("btn_wrap")}>
        <button className={cx("btn")} onClick={() => setCreate(true)}>
          문의하기
        </button>
      </div>
    </div>
  );
}
