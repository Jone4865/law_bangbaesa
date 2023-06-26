import React, {
  useState,
  FormEvent,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import styles from "./Notice.module.scss";
import className from "classnames/bind";
import { useLazyQuery } from "@apollo/client";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import moment from "moment";
import { FIND_MANY_NOTICE } from "../../../src/graphql/generated/query/findManyNotice";
import SearchDropDown from "../../DropDown/SearchDropDown/SearchDropDown";
import { useRouter } from "next/router";
import Image from "next/image";

const cx = className.bind(styles);

type Data = {
  id: number;
  content: React.ReactNode;
  createdAt: string;
  hits: number;
  title: string;
};

type Props = {
  setDetailData: Dispatch<SetStateAction<Data | undefined>>;
};

export default function Notice({ setDetailData }: Props) {
  const router = useRouter();
  const [take] = useState(20);
  const [skip, setSkip] = useState(0);
  const [current, setCurrent] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState<Data[] | []>([
    {
      content: (
        <div>
          안녕하십니까?
          <br />
          방배사와 함께해주시는 모든 분들께 깊은 감사의 말씀을 드립니다.
          <br />
          방배사 웹서비스가 2023년 6월에 오픈을 하였습니다.
          <br />
          항상 여러분이 편하게 사용하실 수 있도록 노력하는 방배사가 되겠습니다.
          <br />
          불편사항이나 궁금하신게 있으시다면
          <br />
          언제든 고객센터를 통해 문의주시면 감사하겠습니다.
          <br />늘 행복하시고 건강하세요.
          <br />
          감사합니다.
        </div>
      ),
      createdAt: "20230518",
      hits: 244,
      id: 1,
      title: "방배사 사이트가 오픈하였습니다.",
    },
  ]);
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

  const [findManyNotice] = useLazyQuery(FIND_MANY_NOTICE, {
    onError: (e) => toast.error(e.message ?? `${e}`),
    onCompleted(data) {
      // setTotalCount(data.findManyNotice.totalCount);
      // setData(data.findManyNotice.notices);
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
            <div className={cx("btn")}>검색</div>
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
          onClick={() => setDetailData(data)}
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
    </div>
  );
}
