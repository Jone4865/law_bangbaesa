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
import { useMediaQuery } from "react-responsive";

const cx = className.bind(styles);

export default function Mypage() {
  const router = useRouter();
  const isMobile = useMediaQuery({
    query: "(max-width: 759px)",
  });
  const [cookies, , removeCookies] = useCookies(["login", "nickName"]);
  const [mobileMore, setMobileMore] = useState(false);
  const [data, setData] =
    useState<
      | FindMyInfoByUserQuery["findMyInfoByUser"]
      | FindUserInfoByUserQuery["findUserInfoByUser"]
    >();
  const [offerState, setOfferState] = useState<OfferAction>(OfferAction.Buy);
  const [myOfferState, setmyOfferState] = useState<OfferAction>(
    OfferAction.Buy
  );
  const [mynickName, setMynickName] = useState("");
  const [refetch, setRefetch] = useState(false);

  const certificateArr = ["휴대폰 인증", "이메일 인증", "신분증 인증"];

  const logoutHandle = () => {
    removeCookies("login");
    removeCookies("nickName");
    signOutByUser();
  };

  const changeOfferActionHandle = (value: OfferAction, key?: "my") => {
    if (key) {
      setmyOfferState(value);
    } else {
      setOfferState(value);
    }
  };

  const [signOutByUser] = useMutation<SignOutByUserMutation>(SIGN_OUT_BY_USER, {
    onError: (e) => toast.error(e.message ?? `${e}`),
    onCompleted(_data) {
      router.replace("/");
    },
    fetchPolicy: "no-cache",
  });

  const [findMyInfoByUser, { refetch: findUserInfoRefetch }] =
    useLazyQuery<FindMyInfoByUserQuery>(FIND_MY_INFO_BY_USER, {
      onError: (_e) => {
        router.push("/sign-in");
      },
      onCompleted(data) {
        setData(data.findMyInfoByUser);
        setMynickName(data.findMyInfoByUser.identity);
      },
      fetchPolicy: "no-cache",
    });

  const { data: findUserInfoByUserQuery, refetch: userRefetch } =
    useQuery<FindUserInfoByUserQuery>(FIND_USER_INFO_BY_USER, {
      variables: { identity: router.query.id },
      skip: router.pathname !== "/user/[id]",
      fetchPolicy: "no-cache",
    });

  const handleRefetch = () => {
    userRefetch({
      identity: router.query.id,
    });
  };

  useEffect(() => {
    if (!cookies.nickName) {
      router.push("/sign-in");
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
  }, [data]);

  useEffect(() => {
    toast.dismiss();
    if (mobileMore) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    if (!isMobile) {
      document.body.style.overflow = "unset";
    }
  }, [mobileMore, isMobile]);

  return (
    <div className={cx("container")}>
      {mobileMore && (
        <SideStatus
          mobile
          setMobileMore={setMobileMore}
          level={data ? data.level : 1}
        />
      )}
      <div className={cx("wrap")}>
        <MyPageTop data={data} handleRefetch={handleRefetch} />
        <div className="flex">
          <div className={cx("top_container")}>
            {router.pathname !== "/user/[id]" && (
              <>
                <div className={cx("top_wrap")}>
                  <div className={cx("middle_top")}>
                    <div className={cx("middle_top_left")}>
                      <div className={cx("middle_top_container")}>
                        <div className={cx("middle_top_body")}>
                          <span className={cx("middle_name")}>
                            {data?.identity}
                          </span>{" "}
                          님의 보안 인증 레벨은
                          <span className={cx("level_blue")}>
                            레벨 {data?.level}
                          </span>{" "}
                          입니다
                          {data?.level && data?.level < 3 && (
                            <>
                              <br />
                              다양한 기능을 이용하기 위해서
                              <br />
                              본인인증을 진행해 주세요
                            </>
                          )}
                        </div>
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
                              `/certification/level${
                                data ? data?.level + 1 : 1
                              }`
                            )
                          }
                          className={cx("middle_btn")}
                          disabled={data && data.level >= 3}
                        >
                          {data && data.level >= 3 ? (
                            <div>본인인증 완료</div>
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
                    <MyLevel level={data ? data.level : 1} />
                  </div>
                </div>
              </>
            )}
            <div className={cx("offer_flex")}>
              {router.pathname === "/user/[id]" && (
                <div className={cx("user_info")}>
                  <div className={cx("user_info_line")} />
                  {certificateArr.map((v, idx) => (
                    <div key={idx} className={cx("certificate_map")}>
                      <div className={cx("certificate_img_container")}>
                        <div className={cx("certificate_img_wrap")}>
                          <Image
                            alt="인증단계"
                            src={`/img/Certification/${
                              data?.level && data?.level > idx
                                ? "success"
                                : "notyet"
                            }/${idx + 1}.png`}
                            fill
                          />
                        </div>
                      </div>
                      <div>
                        <div>레벨 {idx + 1} (필수사항)</div>
                        <div
                          className={cx(
                            "certificate_state",
                            data?.level && data?.level > idx
                              ? "done"
                              : "not_yet"
                          )}
                        >
                          {v}
                          {data?.level && data?.level > idx && " 완료"}
                          {data?.level && data?.level > idx && (
                            <div className={cx("done_img")}>
                              <Image
                                alt="체크 이미지"
                                fill
                                src="/img/mypage/check-icon.png"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className={cx("offer_container")}>
                {router.pathname === "/user/[id]" && (
                  <div
                    onClick={() => setMobileMore(!mobileMore)}
                    className={cx("user_btn")}
                  >
                    {data?.identity} 님의 인증상태
                  </div>
                )}
                <div className={cx("user_title")}>
                  {router.pathname === "/mypage" ? "내 오퍼내역" : "오퍼내역"}
                </div>
                <div className={cx("offer_body")}>
                  <div className={cx("btns")}>
                    <div
                      onClick={() =>
                        changeOfferActionHandle(OfferAction.Buy, "my")
                      }
                      className={cx(
                        myOfferState === OfferAction.Buy && "able_buy",
                        "btn"
                      )}
                    >
                      구매
                    </div>
                    <div
                      onClick={() =>
                        changeOfferActionHandle(OfferAction.Sell, "my")
                      }
                      className={cx(
                        myOfferState === OfferAction.Sell && "able_sell",
                        "btn"
                      )}
                    >
                      판매
                    </div>
                  </div>
                  <div className={cx("offer_wrap")}>
                    <OTC
                      part={router.pathname === "/mypage" ? "mypage" : "home"}
                      nickName={data ? data.identity : ""}
                      isChat={false}
                      nowAble={"my"}
                      partKind={myOfferState}
                      refetch={refetch}
                      handleRefetch={() => findMyInfoByUser()}
                    />
                  </div>
                </div>
              </div>
            </div>
            {router.pathname === "/mypage" && (
              <>
                <div className={cx("user_title")}>즐겨찾기</div>
                <div className={cx("offer_body")}>
                  <div className={cx("btns")}>
                    <div
                      onClick={() => changeOfferActionHandle(OfferAction.Buy)}
                      className={cx(
                        offerState === OfferAction.Buy && "able_buy",
                        "btn"
                      )}
                    >
                      구매
                    </div>
                    <div
                      onClick={() => changeOfferActionHandle(OfferAction.Sell)}
                      className={cx(
                        offerState === OfferAction.Sell && "able_sell",
                        "btn"
                      )}
                    >
                      판매
                    </div>
                  </div>
                  <div className={cx("offer_wrap")}>
                    <OTC
                      part={"mypage"}
                      nickName={data ? data.identity : ""}
                      isChat={true}
                      nowAble={"my"}
                      partKind={offerState}
                      refetch={refetch}
                      handleRefetch={() => findMyInfoByUser()}
                    />
                  </div>
                </div>
              </>
            )}
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
