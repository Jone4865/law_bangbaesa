import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import styles from "./PostQuestion.module.scss";
import className from "classnames/bind";
import Image from "next/image";

const cx = className.bind(styles);

export default function PostQuestion() {
  const [email, setEmail] = useState("");
  const [cellPhone, setCellPhone] = useState("");
  const [content, setContent] = useState("");
  const [disable, setDisable] = useState(true);
  const [phoneCheck, setPhoneCheck] = useState(false);
  const postData = { content, email, cellPhone };

  const emailRegex = new RegExp(
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
  );
  const phoneRegex = new RegExp(
    /^(070|02|0[3-9]{1}[0-9]{1})[0-9]{3,4}[0-9]{4}$/
  );
  const cellPhoneRegex = new RegExp(/^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/);

  useEffect(() => {
    if (phoneRegex.test(cellPhone) || cellPhoneRegex.test(cellPhone)) {
      setPhoneCheck(true);
    }
  }, [cellPhone]);

  useEffect(() => {
    if (emailRegex.test(email) && content.length > 20 && phoneCheck) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [email, phoneCheck, content]);

  const postQuestion = async () => {
    const post = await (
      await fetch("/api/postQuestion", {
        method: "POST",
        body: JSON.stringify(postData),
      })
    ).json();

    if (post.status == 200) {
      setEmail("");
      setContent("");
      setCellPhone("");
      toast.success("문의하기를 완료했습니다.", {
        position: "top-center",
      });
      return;
    } else {
      toast.warning("알수 없는 오류가 발생했습니다.", {
        position: "top-center",
      });
      return;
    }
  };

  const onSubmitHandle = () => {
    postQuestion();
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(), onSubmitHandle();
      }}
      className={cx("container")}
    >
      <div className={cx("wrap")}>
        <div className={cx("image_wrap")}>
          <div className={cx("image")}>
            <Image
              fill
              src="/img/logo/logo_orange.png"
              alt="질문하기 로고"
              priority
              quality={100}
            />
          </div>
        </div>
        <h1 className={cx("title")}>문의하기</h1>
        <p className={cx("sub_title")}>
          <span>기업상품권 판매대행에 대하여 궁금하신 점은 </span>
          <span> 무엇이든 물어보세요.</span>
        </p>
        <span className={cx("name")}>이메일</span>
        <input
          placeholder="abc@gmail.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className={cx("inputs")}
        />
        {email.length > 0 && !emailRegex.test(email) && (
          <span className={cx("notice")}>이메일을 확인해주세요.</span>
        )}
      </div>
      <div className={cx("wrap")}>
        <span className={cx("name")}>연락처</span>
        <input
          placeholder="01012341234"
          value={cellPhone}
          onChange={(e) => {
            setCellPhone(e.target.value);
          }}
          className={cx("inputs")}
        />
        {!phoneCheck && cellPhone.length > 0 && (
          <span className={cx("notice")}>연락처를 확인해주세요.</span>
        )}
      </div>
      <div className={cx("wrap")}>
        <span className={cx("name")}>문의내용</span>
        <textarea
          placeholder="최소 20자 이상 작성해주세요."
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          className={cx("input_content")}
        />
        {content.length > 0 && content.length < 20 && (
          <span className={cx("notice")}>내용을 20글자 이상 작성해주세요.</span>
        )}
      </div>
      <div className={cx("btn_wrap")}>
        <button disabled={disable} className={cx("btn")}>
          문의하기
        </button>
      </div>
    </form>
  );
}
