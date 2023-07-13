import { useState, useEffect } from "react";
import styles from "./Mypage.module.scss";
import className from "classnames/bind";

import MyLevel from "./MyLevel/MyLevel";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { FIND_MY_INFO_BY_USER } from "../../src/graphql/query/findMyInfoByUser";
import { toast } from "react-toastify";
import { SIGN_OUT_BY_USER } from "../../src/graphql/mutation/signOutByUser";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import Image from "next/image";
import MyPageTop from "./MyPageTop/MyPageTop";
import OTC from "../OTC/OTC";
import { FIND_USER_INFO_BY_USER } from "../../src/graphql/query/findUserInfoByUser";
import SideStatus from "./SideStatus/SideStatus";
import {
  FindMyInfoByUserQuery,
  FindUserInfoByUserQuery,
  OfferAction,
  SignOutByUserMutation,
} from "src/graphql/generated/graphql";

const cx = className.bind(styles);

export default function Mypage() {
  const router = useRouter();
  const [cookies, , removeCookies] = useCookies(["login", "nickName"]);
  const [mobileMore, setMobileMore] = useState(false);
  const [nowAble, setNowAble] = useState("my");
  const [data, setData] =
    useState<
      | FindMyInfoByUserQuery["findMyInfoByUser"]
      | FindUserInfoByUserQuery["findUserInfoByUser"]
    >();
  const [offerState, setOfferState] = useState<OfferAction>(OfferAction.Buy);
  const [totalOffer, setTotalOffer] = useState(0);
  const [mynickName, setMynickName] = useState("");
  const [refetch, setRefetch] = useState(false);

  const [part, setPart] =
    useState<"mypage" | "home" | "otc" | "user">("mypage");

  const logoutHandle = () => {
    removeCookies("login");
    removeCookies("nickName");
    signOutByUser();
  };

  const [signOutByUser] = useMutation<SignOutByUserMutation>(SIGN_OUT_BY_USER, {
    onError: (e) => toast.error(e.message ?? `${e}`),
    onCompleted(_data) {
      router.replace("/");
    },
    fetchPolicy: "no-cache",
  });

  const [findMyInfoByUser] = useLazyQuery<FindMyInfoByUserQuery>(
    FIND_MY_INFO_BY_USER,
    {
      onError: (_e) => {
        router.push("/sign-in");
      },
      onCompleted(data) {
        setData(data.findMyInfoByUser);
        setMynickName(data.findMyInfoByUser.identity);
      },
      fetchPolicy: "no-cache",
    }
  );

  const { data: findUserInfoByUserQuery, refetch: userRefetch } =
    useQuery<FindUserInfoByUserQuery>(FIND_USER_INFO_BY_USER, {
      variables: { identity: router.query.id },
      skip: router.pathname !== "/user/[id]",
    });

  const handleRefetch = () => {
    userRefetch({
      identity: router.query.id,
    });
  };

  useEffect(() => {
    if (!cookies.nickName) {
      router.push("/sign-in");
      toast.warn("로그인이 필요한 서비스입니다.", { toastId: 0 });
    } else {
      router.pathname === "/mypage" && findMyInfoByUser();
    }
  }, [router.pathname]);

  useEffect(() => {
    if (findUserInfoByUserQuery) {
      if (findUserInfoByUserQuery.findUserInfoByUser.identity === mynickName) {
        router.push("/mypage");
      } else {
        setData(findUserInfoByUserQuery.findUserInfoByUser);
      }
    }
  }, [findUserInfoByUserQuery, mynickName]);

  useEffect(() => {
    setRefetch(!refetch);
  }, [nowAble, data, totalOffer]);

  return (
    <div className={cx("container")}>
      {mobileMore && (
        <div className={cx("mobile_more")}>
          <SideStatus
            mobile
            setMobileMore={setMobileMore}
            level={data ? data.level : 1}
          />
        </div>
      )}
      <div className={cx("wrap")}>
        <MyPageTop data={data} handleRefetch={handleRefetch} />
        <div className="flex">
          <div>
            <SideStatus mobile={false} level={data ? data.level : 1} />
          </div>
          <div className={cx("top_container")}>
            {router.pathname !== "/user/[id]" && (
              <>
                <div className={cx("top_wrap")}>
                  <div className={cx("middle_top")}>
                    <div>
                      <div className={cx("middle_top_container")}>
                        <div className={cx("middle_top_body")}>
                          <div className={cx("middle_name")}>
                            {data?.identity}
                          </div>{" "}
                          님의 보안 인증 레벨은
                        </div>
                        <span className={cx("level_blue")}>
                          레벨 {data?.level}
                        </span>{" "}
                        입니다
                        <br />
                      </div>
                      다양한 기능을 이용하기 위해서
                      <br />
                      본인인증을 진행해 주세요
                    </div>
                    <div className={cx("btn_wrap")}>
                      <div
                        className={cx("mobile_btn")}
                        onClick={() => setMobileMore(true)}
                      >
                        나의 인증상태
                      </div>
                      <button
                        onClick={() =>
                          router.push(
                            `/certification/level${data ? data?.level + 1 : 1}`
                          )
                        }
                        className={cx("middle_btn")}
                        disabled={data && data.level >= 3}
                      >
                        {data && data.level >= 3 ? (
                          <div>본인인증이 완료되었습니다.</div>
                        ) : (
                          <>
                            <div>본인인증 하기</div>
                            <div className={cx("top_img_wrap", "non_mobile")}>
                              <Image
                                alt="화살표"
                                src={"/img/mypage/arrow.png"}
                                fill
                                priority
                                quality={100}
                              />
                            </div>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <MyLevel level={data ? data.level : 1} />
              </>
            )}
            <div>
              {router.pathname == "/mypage" && (
                <div className={cx("offer_top")}>
                  <div
                    onClick={() => setNowAble("my")}
                    className={cx(
                      nowAble === "my" ? "able_btn" : "default_btn"
                    )}
                  >
                    내 오퍼내역
                  </div>
                  <div
                    onClick={() => setNowAble("like")}
                    className={cx(
                      nowAble !== "my" ? "able_btn" : "default_btn"
                    )}
                  >
                    즐겨찾기
                  </div>
                </div>
              )}
              {router.pathname === "/user/[id]" && (
                <div>
                  <div
                    onClick={() => setMobileMore(true)}
                    className={cx("user_more_btn")}
                  >
                    {data?.identity} 님의 인증상태
                  </div>
                  <div className={cx("user_title")}>오퍼내역</div>
                </div>
              )}
              <div
                className={cx("offer_body", totalOffer === 0 ? "white" : null)}
              >
                {(nowAble === "like" || router.pathname === "/user/[id]") && (
                  <div
                    onClick={() =>
                      setOfferState((prev) =>
                        prev === OfferAction.Sell
                          ? OfferAction.Buy
                          : OfferAction.Sell
                      )
                    }
                    className={cx("toggle_body")}
                  >
                    <div
                      className={cx(
                        "toggle-circle",
                        offerState === "SELL" && "toggle--checked"
                      )}
                    >
                      {offerState === OfferAction.Buy ? "구매" : "판매"}
                    </div>
                    <div>구매</div>
                    <div>판매</div>
                  </div>
                )}
                <OTC
                  part={part}
                  nickName={data ? data.identity : ""}
                  isChat={nowAble !== "my" ? true : false}
                  nowAble={nowAble}
                  partKind={offerState}
                  setTotalOffer={setTotalOffer}
                  refetch={refetch}
                />
              </div>
            </div>
          </div>
        </div>
        {router.pathname !== "/user/[id]" && (
          <div className={cx("bottom_container")}>
            <div className={cx("bottom_left")}>
              <div className={cx("service_img")}>
                <Image
                  alt="서비스 이미지"
                  fill
                  src={"/img/mypage/servicecenter.png"}
                  priority
                  quality={100}
                />
              </div>
              <div>고객센터</div>
            </div>
            <div className={cx("bottom_right")}>
              <div
                onClick={() => router.push("/inquiry/my-inquiry")}
                className={cx("inquiry_btn")}
              >
                <div className={cx("inquiry_img")}>
                  <Image
                    alt="1:1 문의 이미지"
                    fill
                    src={"/img/mypage/inquiry.png"}
                    priority
                    quality={100}
                  />
                </div>
                <div>1:1 문의</div>
              </div>
              <div onClick={logoutHandle} className={cx("logout_btn")}>
                <div className={cx("logout_img")}>
                  <Image
                    alt="로그아웃 이미지"
                    fill
                    src={"/img/mypage/logout.png"}
                    priority
                    quality={100}
                  />
                </div>
                <div>로그아웃</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
