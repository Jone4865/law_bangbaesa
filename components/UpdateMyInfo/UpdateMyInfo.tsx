import { useState, useEffect } from "react";
import styles from "./UpdateMyInfo.module.scss";
import className from "classnames/bind";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BasicInfo from "./BasicInfo/BasicInfo";
import PassWordInfo from "./PassWordInfo/PassWordInfo";
import SignOut from "./SignOut/SignOut";
import { useLazyQuery } from "@apollo/client";
import { FIND_MY_INFO_BY_USER } from "../../src/graphql/generated/query/findMyInfoByUser";
import MyPageTop from "../Mypage/MyPageTop/MyPageTop";

const cx = className.bind(styles);

type info = {
  identity: string;
  phone: string;
  emailAuth: { createdAt: string; email: string; id: number };
  level: number;
  driverLicense?: {
    name: string;
    birth: string;
    area: string;
    licenseNumber: string;
    serialNumber: string;
  };
  idCard?: {
    name: string;
    registrationNumber: number;
    issueDate: string;
  };
  passport?: {
    passportNumber: number;
    issueDate: string;
    expirationDate: string;
  };
};

type Data = {
  connectionDate: string;
  identity: string;
  level: number;
  negativeFeedbackCount: number;
  positiveFeedbackCount: number;
};

export default function UpdateMyInfo() {
  const ableArr = ["내정보", "비밀번호 변경", "회원탈퇴"];
  const [nowAble, setNowAble] = useState("내정보");
  const [myInfo, setMyinfo] = useState<info>();
  const [data, setData] = useState<Data>();

  const [findMyInfoByUser] = useLazyQuery(FIND_MY_INFO_BY_USER, {
    onError: (e) => toast.error(e.message ?? `${e}`),
    onCompleted(data) {
      setMyinfo(data.findMyInfoByUser);
      setData(data.findMyInfoByUser);
    },
  });

  useEffect(() => {
    findMyInfoByUser();
  }, [nowAble]);

  return (
    <div className={cx("container")}>
      <div className={cx("wrap")}>
        <MyPageTop data={data} handleRefetch={() => ""} />
        <div className={cx("body")}>
          {ableArr.map((arr) => (
            <div
              onClick={() => setNowAble(arr)}
              className={cx(nowAble === arr ? "able" : "default")}
              key={arr}
            >
              {arr}
            </div>
          ))}
        </div>
        {nowAble === "내정보" && (
          <BasicInfo myInfo={myInfo} setNowAble={setNowAble} />
        )}
        {nowAble === "비밀번호 변경" && (
          <PassWordInfo setNowAble={setNowAble} />
        )}
        {nowAble === "회원탈퇴" && <SignOut />}
      </div>
    </div>
  );
}
