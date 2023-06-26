import { Dispatch, SetStateAction, useState } from "react";
import styles from "./CreateInquiry.module.scss";
import className from "classnames/bind";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation } from "@apollo/client";
import { CREATE_USER_INQUIRY_BY_USER } from "../../../src/graphql/generated/mutation/createUserInquiryByUser";

const cx = className.bind(styles);

type Props = {
  setCreate: Dispatch<SetStateAction<boolean>>;
};

export default function CreateInquiry({ setCreate }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onSubmitHandle = () => {
    if (title === "" || title.length > 100) {
      toast.warn("제목은 1~100자 사이로 입력해주세요.");
    } else if (content.length < 10 || content.length > 500) {
      toast.warn("내용은 10~500자 사이로 입력해주세요.");
    } else {
      createUserInquiryByUser({ variables: { title, content } });
    }
  };

  const [createUserInquiryByUser] = useMutation(CREATE_USER_INQUIRY_BY_USER, {
    onError: (e) => toast.error(e.message ?? `${e}`),
    onCompleted(_data) {
      toast.success("문의가 접수되었습니다.");
      setCreate(false);
    },
  });

  return (
    <div className={cx("container")}>
      <ToastContainer
        limit={1}
        position="top-center"
        autoClose={1}
        hideProgressBar
        pauseOnFocusLoss={false}
        containerId={0}
      />
      <div>
        <div className={cx("title")}>제목</div>
        <input
          className={cx("input")}
          placeholder="제목을 입력하세요..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className={cx("title")}>문의내용</div>
        <textarea
          className={cx("text_area")}
          placeholder="문의사항 (최소 10글자 이상 입력해주세요.)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className={cx("bottom")}>
          <button
            className={cx("btn")}
            onSubmit={(e) => e.preventDefault()}
            onClick={onSubmitHandle}
          >
            문의 접수
          </button>
        </div>
      </div>
    </div>
  );
}
