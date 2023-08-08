import react, { useEffect } from "react";
import Image from "next/image";
import styles from "./MyPageTop.module.scss";
import className from "classnames/bind";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { TOGGLE_FEEDBACK_BY_USER } from "../../../src/graphql/mutation/toggleFeedbackByUser";
import { toast } from "react-toastify";
import { ToggleFeedbackByUserMutation } from "src/graphql/generated/graphql";
import { AutoHeightImage } from "components/AutoHeightImage";
import { convertConnectionDate } from "utils/convertConnectionDate";

const cx = className.bind(styles);

type Props = {
  data: any;
  handleRefetch: () => void;
  detail?: boolean;
};

export default function MyPageTop({ detail, data, handleRefetch }: Props) {
  const router = useRouter();

  const clickLikeHandle = (kind: string) => {
    router.pathname !== "/mypage" &&
      toggleFeedbackByUser({
        variables: { receiverIdentity: data?.identity, feedbackKind: kind },
      });
  };
  const [toggleFeedbackByUser] = useMutation<ToggleFeedbackByUserMutation>(
    TOGGLE_FEEDBACK_BY_USER,
    {
      onError: (e) => toast.error(e.message ?? `${e}`),
      onCompleted: () => {
        handleRefetch();
      },
    }
  );

  useEffect(() => {}, [data]);

  return (
    <div className={cx("container")}>
      <div
        className={cx(
          "top_wrap",
          router.pathname === "/mypage" && "padding",
          router.pathname === "/user/[id]" && "padding"
        )}
      >
        <div
          className={cx(
            router.pathname === "/mypage" ? "my_top_left" : "top_left"
          )}
        >
          <div className={cx("top_left_body")}>
            <div className={cx("nickname_wrap")}>
              <div className={cx("nickname")}>{data?.identity}</div>
              {router.pathname === "/user/[id]" && (
                <div className={cx("user_content")}>님의 프로필</div>
              )}
              <div
                className={cx(
                  router.pathname === "/mypage" ? "my_level" : "level"
                )}
              >
                레벨 {data?.level}
              </div>
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
          {router.pathname === "/user/[id]" && (
            <div className={cx("user_content_gray")}>
              최근 접속 : {convertConnectionDate(data?.connectionDate)}
            </div>
          )}
        </div>
        <div className={cx("top_right")}>
          <div
            onClick={() => clickLikeHandle("POSITIVE")}
            className={cx(
              "feedback_box",
              router.pathname === "/user/[id]" && "cursor",
              "positive",
              data?.isPositiveFeedback && "active_positive"
            )}
          >
            <div className={cx("count_wrap")}>
              <AutoHeightImage
                alt="화살표"
                src={"/img/mypage/thumb_up.png"}
                className={cx("ment_img")}
              />

              <span>+{data?.positiveFeedbackCount}</span>
            </div>
            <div className={cx("feedback_body")}>
              <div className={cx("ment")}>
                <div>긍정</div>
                <div className={cx("black")}>적 피드백</div>
              </div>

              <AutoHeightImage
                alt="화살표"
                src={"/img/mypage/thumb_up.png"}
                className={cx("ment_img")}
              />
            </div>
          </div>
          <div
            onClick={() => clickLikeHandle("NEGATIVE")}
            className={cx(
              "feedback_box",
              "negative",
              router.pathname === "/user/[id]" && "cursor",
              data?.isNegativeFeedback && "active_negative"
            )}
          >
            <div className={cx("count_wrap")}>
              <AutoHeightImage
                alt="화살표"
                src={"/img/mypage/thumb_down.png"}
                className={cx("ment_img")}
              />
              <span>+{data?.negativeFeedbackCount}</span>
            </div>
            <div className={cx("feedback_body")}>
              <div className={cx("ment")}>
                <div>부정</div>
                <div className={cx("black")}>적 피드백</div>
              </div>

              <AutoHeightImage
                alt="화살표"
                src={"/img/mypage/thumb_down.png"}
                className={cx("ment_img")}
              />
            </div>
          </div>
          <div className={cx("feedback_box", "trade")}>
            <div className={cx("count_wrap")}>
              <AutoHeightImage
                alt="화살표"
                src={"/img/mypage/trade-icon.png"}
                className={cx("ment_img")}
              />
              <span>+{data?.offerCompleteCount}</span>
            </div>
            <div className={cx("feedback_body")}>
              <div className={cx("ment")}>
                <div>거래</div>
                <div className={cx("black")}>&nbsp;성사량</div>
              </div>
              <AutoHeightImage
                alt="화살표"
                src={"/img/mypage/trade-icon.png"}
                className={cx("ment_img")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
