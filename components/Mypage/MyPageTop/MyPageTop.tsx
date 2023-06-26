import Image from "next/image";
import styles from "./MyPageTop.module.scss";
import className from "classnames/bind";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { TOGGLE_FEEDBACK_BY_USER } from "../../../src/graphql/generated/mutation/toggleFeedbackByUser";
import { toast } from "react-toastify";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const cx = className.bind(styles);

type Props = {
  data: Data | undefined;
  handleRefetch: () => void;
  detail?: boolean;
};

type Data = {
  connectionDate: string;
  identity: string;
  level: number;
  negativeFeedbackCount: number;
  positiveFeedbackCount: number;
};

export default function MyPageTop({ detail, data, handleRefetch }: Props) {
  const router = useRouter();

  const clickLikeHandle = (kind: string) => {
    router.pathname !== "/mypage" &&
      toggleFeedbackByUser({
        variables: { receiverIdentity: data?.identity, feedbackKind: kind },
        onCompleted(_data) {
          handleRefetch();
        },
      });
  };
  const [toggleFeedbackByUser] = useMutation(TOGGLE_FEEDBACK_BY_USER, {
    onError: (e) => toast.error(e.message ?? `${e}`),
  });

  useEffect(() => {}, [data]);

  return (
    <div className={cx("container")}>
      <div className={cx("top_wrap")}>
        <div className={cx("top_left")}>
          <div className={cx("nickname_wrap")}>
            <div className={cx("nickname")}>{data?.identity}</div>
            <div className={cx("level")}>레벨 {data?.level}</div>
          </div>
          {router.pathname === "/mypage" && (
            <div
              onClick={() => router.push("/update-myinfo")}
              className={cx(!detail ? "top_btn" : "none")}
            >
              <div>정보수정</div>
              <div className={cx("top_img_wrap")}>
                <Image
                  alt="화살표"
                  src={"/img/mypage/arrow.png"}
                  fill
                  priority
                  quality={100}
                />
              </div>
            </div>
          )}
        </div>
        <div className={cx("top_right")}>
          <div
            onClick={() => clickLikeHandle("POSITIVE")}
            className={cx(
              "positive",
              router.pathname === "/user/[id]" && "cursor"
            )}
          >
            <div>+{data?.positiveFeedbackCount}</div>
            <div className={cx("feedback_body")}>
              <div className={cx("ment")}>
                <div>긍정</div>
                <div className={cx("black")}>적 피드백</div>
              </div>
              <div className={cx("ment_img")}>
                <Image
                  alt="화살표"
                  src={"/img/mypage/thumb_up.png"}
                  fill
                  priority
                  quality={100}
                />
              </div>
            </div>
          </div>
          <div
            onClick={() => clickLikeHandle("NEGATIVE")}
            className={cx(
              "negative",
              router.pathname === "/user/[id]" && "cursor"
            )}
          >
            <div>+{data?.negativeFeedbackCount}</div>
            <div className={cx("feedback_body")}>
              <div className={cx("ment")}>
                <div>부정</div>
                <div className={cx("black")}>적 피드백</div>
              </div>
              <div className={cx("ment_img")}>
                <Image
                  alt="화살표"
                  src={"/img/mypage/thumb_down.png"}
                  fill
                  priority
                  quality={100}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
