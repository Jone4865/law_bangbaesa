import { FormEvent, useEffect, useState, ChangeEvent } from "react";
import CertificationStateBar from "../CertificationStateBar/CertificationStateBar";
import styles from "./Level2.module.scss";
import className from "classnames/bind";
import { useLazyQuery, useMutation } from "@apollo/client";
import { SEND_MAIL_AUTH_NUMBER } from "../../../src/graphql/generated/query/sendMailAuthNumber";
import { toast } from "react-toastify";
import { CONFIRM_EMAIL_AUTH_NUMBER } from "../../../src/graphql/generated/mutation/confirmEmailAuthNumber";
import { useRouter } from "next/router";

const cx = className.bind(styles);

export default function Level2() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [emailAuthNumber, setEmailAuthNumber] = useState<string>("");
  const [mailSend, setMailSend] = useState(false);

  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setMailSend(false);
    setEmail(e.target.value);
  };

  const onSendMailHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && emailRegEx.test(email)) {
      sendMailAuthNumber({ variables: { email } });
    }
  };

  const onSubmitHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mailSend) {
      confirmEmailAuthNumber({
        variables: { email, authNumber: emailAuthNumber },
      });
    } else {
      if (email && emailRegEx.test(email)) {
        sendMailAuthNumber({ variables: { email } });
      }
    }
  };

  const [sendMailAuthNumber, { loading }] = useLazyQuery(
    SEND_MAIL_AUTH_NUMBER,
    {
      onError: (e) => toast.error(e.message ?? `${e}`),
      onCompleted(_data) {
        toast.success(
          <div>
            이메일로 인증코드를 발송하였습니다.
            <br /> 인증코드를 입력해주세요.
          </div>,
          { autoClose: false }
        );
        setMailSend(true);
      },
    }
  );

  const [confirmEmailAuthNumber, { loading: loading2 }] = useMutation(
    CONFIRM_EMAIL_AUTH_NUMBER,
    {
      onError: (e) => toast.error(e.message ?? `${e}`),
      onCompleted(_data) {
        toast.success("이메일 인증이 완료되었습니다.", { toastId: 0 });
        router.push("/certification/level3");
      },
    }
  );

  useEffect(() => {
    if (email && emailRegEx.test(email)) {
      toast.warn(
        <div>
          이메일을 확인중입니다.
          <br />
          잠시만 기다려주세요.
        </div>,
        { toastId: 0 }
      );
    }
  }, [loading]);

  return (
    <div className={cx("container")}>
      <div className={cx("wrap")}>
        <CertificationStateBar path={router.pathname} />
        <div>
          <div className={cx("title")}>이메일</div>
          <form onSubmit={onSendMailHandle} className="flex">
            <input
              value={email}
              onChange={onChangeEmail}
              className={cx(!mailSend ? "input" : "part_input")}
              placeholder="이메일을 입력하세요"
            />
            <button className={cx(mailSend ? "part_btn" : "none")}>
              {mailSend ? "재발송" : ""}
            </button>
          </form>
          <form onSubmit={mailSend ? onSubmitHandle : onSendMailHandle}>
            {mailSend && (
              <input
                className={cx("input")}
                placeholder="인증번호를 입력해주세요"
                value={emailAuthNumber}
                onChange={(e) => setEmailAuthNumber(e.target.value)}
              />
            )}
            <button
              disabled={
                !mailSend
                  ? !emailRegEx.test(email)
                  : emailAuthNumber.length !== 6
              }
              className={cx("btn")}
            >
              {mailSend ? "이메일 인증" : "인증번호 발송"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
