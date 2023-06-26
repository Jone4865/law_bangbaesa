import { useState, useEffect } from "react";
import styles from "./Mypage.module.scss";
import className from "classnames/bind";

import MyLevel from "./MyLevel/MyLevel";
import { useLazyQuery, useMutation } from "@apollo/client";
import { FIND_MY_INFO_BY_USER } from "../../src/graphql/generated/query/findMyInfoByUser";
import { toast } from "react-toastify";
import { SIGN_OUT_BY_USER } from "../../src/graphql/generated/mutation/signOutByUser";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import Image from "next/image";
import MyPageTop from "./MyPageTop/MyPageTop";
import OTC from "../OTC/OTC";
import { FIND_USER_INFO_BY_USER } from "../../src/graphql/generated/query/findUserInfoByUser";
import SideStatus from "./SideStatus/SideStatus";

const cx = className.bind(styles);

type Data = {
  connectionDate: string;
  identity: string;
  level: number;
  negativeFeedbackCount: number;
  positiveFeedbackCount: number;
};

export default function Mypage() {
  const router = useRouter();
  const [, , removeCookies] = useCookies(["login"]);
  const [mobileMore, setMobileMore] = useState(false);
  const [nowAble, setNowAble] = useState("my");
  const [data, setData] = useState<Data>();
  const [refetch, setRefetch] = useState(false);
  const [offerState, setOfferState] = useState<"SELL" | "BUY">("BUY");
  const [isData, setIsData] = useState(true);

  const [part, setPart] =
    useState<"mypage" | "home" | "otc" | "user">("mypage");

  const handleRefetch = () => {
    findUserInfoByUser({
      variables: { identity: router.query.id },
    });
  };

  const [findMyInfoByUser] = useLazyQuery(FIND_MY_INFO_BY_USER, {
    onError: (e) => {
      toast.error(e.message ?? `${e}`), router.push("/sign-in");
    },
    onCompleted(data) {
      setData(data.findMyInfoByUser);
    },
    fetchPolicy: "no-cache",
  });

  const [findUserInfoByUser] = useLazyQuery(FIND_USER_INFO_BY_USER, {
    onError: (e) => {
      toast.error(e.message ?? `${e}`), router.push("/sign-in");
    },
    onCompleted(data) {
      setData(data.findUserInfoByUser);
    },
    fetchPolicy: "no-cache",
  });

  const [signOutByUser] = useMutation(SIGN_OUT_BY_USER, {
    onError: (e) => toast.error(e.message ?? `${e}`),
    onCompleted(_data) {
      removeCookies("login");
      router.replace("/");
    },
  });

  useEffect(() => {
    if (router.pathname === "/user/[id]") {
      router.query.id &&
        findUserInfoByUser({
          variables: { identity: router.query.id },
          onCompleted(data) {
            findMyInfoByUser({
              onCompleted(myData) {
                if (
                  myData.findMyInfoByUser.identity ===
                  data.findUserInfoByUser.identity
                ) {
                  router.push("/mypage");
                } else {
                  setData(data.findUserInfoByUser);
                }
              },
            });
          },
        });
      setPart("user");
    } else {
      findMyInfoByUser({});
    }
  }, [router.query.id, refetch]);

  useEffect(() => {}, [nowAble, data, isData]);

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
                      {data?.identity} 님의 보안 인증 레벨은
                      <span className={cx("level_blue")}>
                        레벨 {data?.level}
                      </span>{" "}
                      입니다
                      <br />
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
                      <div
                        onClick={() =>
                          router.push(
                            `/certification/level${data ? data?.level + 1 : 1}`
                          )
                        }
                        className={cx("middle_btn")}
                      >
                        <div>본인인증 하기</div>
                        <div className={cx("top_img_wrap", "non_mobile")}>
                          <Image
                            alt="화살표"
                            src={"/img/mypage/arrow.png"}
                            fill
                          />
                        </div>
                      </div>
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
                    관심있는 오퍼내역
                  </div>
                </div>
              )}
              {isData ? (
                <div className={cx("offer_body")}>
                  {nowAble === "like" ||
                    (router.pathname === "/user/[id]" && (
                      <div
                        onClick={() =>
                          setOfferState((prev) =>
                            prev === "SELL" ? "BUY" : "SELL"
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
                          {offerState === "BUY" ? "구매" : "판매"}
                        </div>
                        <div>구매</div>
                        <div>판매</div>
                      </div>
                    ))}
                  <OTC
                    part={part}
                    nickName={data ? data.identity : ""}
                    isChat={nowAble !== "my" ? true : false}
                    nowAble={nowAble}
                    partKind={offerState}
                    setIsData={setIsData}
                  />
                </div>
              ) : (
                <div className={cx("none_data_wrap")}>
                  <div className={cx("none_data_img")}>
                    <Image alt="느낌표" src={"/img/mypage/warning.png"} fill />
                  </div>
                  <span>아직 거래를 하지 않았습니다.</span>
                </div>
              )}
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
                onClick={() => router.push("/inquiry")}
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
              <div onClick={() => signOutByUser()} className={cx("logout_btn")}>
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
