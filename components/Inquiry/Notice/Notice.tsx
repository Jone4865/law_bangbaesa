import React, { useState, FormEvent, useEffect } from "react";
import styles from "./Notice.module.scss";
import className from "classnames/bind";
import { useLazyQuery } from "@apollo/client";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import moment from "moment";
import { FIND_MANY_NOTICE } from "../../../src/graphql/query/findManyNotice";
import SearchDropDown from "../../DropDown/SearchDropDown/SearchDropDown";
import Image from "next/image";
import { useRouter } from "next/router";
import { FindManyNoticeQuery } from "src/graphql/generated/graphql";

const cx = className.bind(styles);

export default function Notice() {
  const router = useRouter();
  const [take] = useState(20);
  const [skip, setSkip] = useState(0);
  const [current, setCurrent] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState<
    FindManyNoticeQuery["findManyNotice"]["notices"]
  >([]);
  const [kind, setKind] = useState<"title" | "content">("title");

  const handlePagination = (e: number) => {
    setSkip((e - 1) * take);
    setCurrent(e);
  };

  const onSubmitHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    findManyNotice({
      variables: { take, skip, searchText, searchKind: kind },
    });
    setSearchText("");
  };

  const [findManyNotice] = useLazyQuery<FindManyNoticeQuery>(FIND_MANY_NOTICE, {
    onError: (e) => toast.error(e.message ?? `${e}`),
    onCompleted(data) {
      setTotalCount(data.findManyNotice.totalCount);
      setData(data.findManyNotice.notices);
    },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    findManyNotice({
      variables: { take, skip, searchText },
    });
  }, [take, skip]);

  return (
    <div className={cx("container")}>
      <div>
        <form className={cx("form")} onSubmit={(e) => onSubmitHandle(e)}>
          <div className={cx("title")}>
            <SearchDropDown setKind={setKind} />
          </div>
          <div className={cx("mobile_flex")}>
            <input
              placeholder="검색어를 입력하세요."
              className={cx("input")}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button className={cx("btn")}>검색</button>
          </div>
        </form>
      </div>
      <div className={cx("middle_wrap")}>
        <div className={cx("number")}>번호</div>
        <div className={cx("middle_title_wrap")}>제목</div>
        <div className={cx("date", "non_mobile")}>등록일</div>
        <div className={cx("hits", "non_mobile")}>조회</div>
        <div className={cx("mobile", "mobile_hits")}>조회/등록일</div>
      </div>
      {data.map((data, idx) => (
        <div
          key={idx}
          className={cx("map_wrap")}
          onClick={() => router.push(`/notice/${data.id}`)}
        >
          <div className={cx("number")}>{data.id}</div>
          <div className={cx("middle_title_wrap")}>
            <div className={cx("middle_title")}>{data.title}</div>
            <div className={cx("mobile")}>
              {data.hits}
              <div className={cx("line")} />
              {moment(data.createdAt).format("YYYY-MM-DD")}
            </div>
          </div>
          <div className={cx("date", "non_mobile")}>
            {moment(data.createdAt).format("YYYY-MM-DD")}
          </div>
          <div className={cx("hits", "non_mobile")}>{data.hits}</div>
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
            <div className={cx("left_arrow", totalCount === 0 && "none")}>
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
            <div className={cx("right_arrow", totalCount === 0 && "none")}>
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
    </div>
  );
}
