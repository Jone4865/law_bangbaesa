import {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  SyntheticEvent,
} from "react";
import { useRouter } from "next/router";

import styles from "./SignUp.module.scss";
import className from "classnames/bind";

import { toast } from "react-toastify";
import { useLazyQuery, useMutation } from "@apollo/client";
import { CHECK_DUPLICATE_IDENTITY } from "../../src/graphql/generated/query/checkDuplicateIdentity";
import { SEND_PHONE_AUTH_NUMBER } from "../../src/graphql/generated/query/sendPhoneAuthNumber";
import { CONFIRM_PHONE_AUTH_NUMBER } from "../../src/graphql/generated/query/confirmPhoneAuthNumber";
import { SIGN_UP_BY_USER } from "../../src/graphql/generated/mutation/signUpByUser";
import PolicyModal from "./PolicyModal/PolicyModal";

const cx = className.bind(styles);

export default function SignUp() {
  const router = useRouter();

  const [id, setId] = useState("");
  const [passWord, setPassWord] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [tell, setTell] = useState("");
  const [certificationTellText, setCertificationTellText] = useState("");
  const [duplicateId, setDuplicateId] = useState(false);
  const [passTell, setPassTell] = useState(false);
  const [hash, setHash] = useState<string>();

  const [allCheck, setAllCheck] = useState(false);
  const [serviseCheck, setServiceCheck] = useState(false);
  const [persnerCheck, setPersnerCheck] = useState(false);

  const [viewConfirmTell, setViewConfirmTell] = useState(false);
  const [disAbleTell, setDisAbleTell] = useState(true);
  const [disAbleSubmit, setDisAbleSummit] = useState(true);

  const [visible, setVisible] = useState(false);
  const [policy, setPolicy] = useState<"service" | "personal">("service");

  const passwordRule =
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

  const idRule = /^[a-zA-Z0-9]{4,20}$/;

  const onChangeIdHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setDuplicateId(false);
    setId(e.target.value.trim());
  };

  const onAllCheckHandle = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setAllCheck(true);
      setServiceCheck(true);
      setPersnerCheck(true);
    } else {
      setAllCheck(false);
      setServiceCheck(false);
      setPersnerCheck(false);
    }
  };

  const onDuplicateId = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id) {
      if (idRule.test(id)) {
        checkDuplicateIdentity({ variables: { identity: id } });
      } else {
        toast.warn("아이디는 네글자 이상으로 작성해주세요");
      }
    } else {
      toast.warn("아이디를 입력해주세요", { toastId: 0 });
    }
  };

  const onSendCertification = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tell !== "") {
      sendPhoneAuthNumber({ variables: { phone: tell } });
    }
  };

  const onCertificationTellHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    confirmPhoneAuthNumber({
      variables: { phone: tell, authNumber: certificationTellText },
    });
  };

  const onSubmitHandle = (
    e: FormEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    signUpByUser({
      variables: {
        identity: id,
        password: passWord,
        phone: tell,
        hash: hash,
        loginKind: "EMAIL",
      },
    });
    toast.dismiss();
  };

  const handlePaste = (event: SyntheticEvent) => {
    event.preventDefault();
    toast.warning("붙여넣기가 금지되었습니다.");
  };

  const modalHandle = (key: "service" | "personal") => {
    setVisible(true);
    setPolicy(key);
  };

  const [checkDuplicateIdentity] = useLazyQuery(CHECK_DUPLICATE_IDENTITY, {
    onError: (e) => toast.error(e.message ?? `${e}`),
    onCompleted(_data) {
      setDuplicateId(true);
      toast.success("사용할 수 있는 아이디입니다.");
    },
  });

  const [sendPhoneAuthNumber] = useLazyQuery(SEND_PHONE_AUTH_NUMBER, {
    onError: (e) => toast.error(e.message ?? `${e}`),
    onCompleted(_data) {
      toast.success(
        <div>
          휴대폰 번호로 인증번호를 발송하였습니다.
          <br /> 인증코드를 입력해주세요.
        </div>,
        { autoClose: false, toastId: 0 }
      );
      setViewConfirmTell(true);
    },
  });

  const [confirmPhoneAuthNumber] = useLazyQuery(CONFIRM_PHONE_AUTH_NUMBER, {
    onError: (e) => toast.error(e.message ?? `${e}`),
    onCompleted(data) {
      setPassTell(true);
      setHash(data.confirmPhoneAuthNumber);
      toast.success("휴대폰 인증이 완료되었습니다.");
    },
  });

  const [signUpByUser] = useMutation(SIGN_UP_BY_USER, {
    onError: (e) => toast.error(e.message ?? `${e}`),
    onCompleted(_data) {
      setPassTell(true);
      router.push("/sign-in");
      toast.success(
        <>
          회원가입이 완료되었습니다.
          <br />
          로그인 해주시기 바랍니다.
        </>,
        { toastId: 0 }
      );
    },
  });

  useEffect(() => {
    if (serviseCheck && persnerCheck) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }

    if (
      serviseCheck &&
      persnerCheck &&
      duplicateId &&
      passTell &&
      passwordRule.test(passWord) &&
      passWord === confirmPass
    ) {
      setDisAbleSummit(false);
    } else {
      setDisAbleSummit(true);
    }

    if (certificationTellText.length !== 6) {
      setDisAbleTell(true);
    } else {
      setDisAbleTell(false);
    }
  }, [
    serviseCheck,
    persnerCheck,
    disAbleTell,
    duplicateId,
    passWord,
    confirmPass,
    id,
    certificationTellText,
    passTell,
  ]);

  useEffect(() => {
    const htmlEle = document?.getElementsByTagName("html").item(0);
    if (visible) {
      if (htmlEle) {
        htmlEle.style.overflow = "hidden";
      }
    } else {
      if (htmlEle) {
        htmlEle.style.overflow = "unset";
      }
    }
  }, [visible]);

  return (
    <div className={cx("container")}>
      {visible && (
        <PolicyModal
          setVisible={setVisible}
          partName={policy}
          visible={visible}
        />
      )}
      <div className={cx("wrap")}>
        <div className={cx("body")}>
          <div className={cx("title")}>회원가입</div>
          <div className={cx("part_title")}>아이디</div>
          <form className={cx("part_wrap")} onSubmit={onDuplicateId}>
            <input
              className={cx("part_input")}
              placeholder="아이디를 입력하세요"
              value={id}
              onChange={(e) => {
                onChangeIdHandle(e);
                toast.dismiss();
              }}
            />
            <button className={cx("part_btn")}>중복검사</button>
          </form>

          <form onSubmit={onSubmitHandle}>
            <div className={cx("part_title")}>비밀번호</div>
            <input
              className={cx("input")}
              placeholder="비밀번호를 입력하세요"
              value={passWord}
              type="password"
              autoComplete="on"
              onChange={(e) => setPassWord(e.target.value.trim())}
            />

            <div className={cx("part_title")}>비밀번호 확인</div>
            <input
              onPaste={handlePaste}
              type="password"
              autoComplete="on"
              className={cx("input")}
              placeholder="비밀번호를 한번 더 입력하세요"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value.trim())}
            />
          </form>

          <div className={cx("part_title")}>휴대폰 인증</div>
          <form className={cx("part_wrap")} onSubmit={onSendCertification}>
            <input
              className={cx("part_input")}
              placeholder="- 를 빼고 입력하세요"
              value={tell}
              onChange={(e) => {
                setTell(e.target.value.replace(/\D/g, "").trim());
                setPassTell(false);
              }}
            />
            <button className={cx("part_btn")}>
              {viewConfirmTell ? "재전송" : "인증번호 발송"}
            </button>
          </form>
          {viewConfirmTell && (
            <form
              className={cx("part_wrap")}
              onSubmit={onCertificationTellHandle}
            >
              <input
                placeholder="숫자를 입력해주세요"
                className={cx("part_input", "more")}
                value={certificationTellText}
                onChange={(e) =>
                  setCertificationTellText(
                    e.target.value.replace(/\D/g, "").trim()
                  )
                }
              />
              <button className={cx("part_btn", "more")} disabled={passTell}>
                {passTell ? "인증완료" : "인증"}
              </button>
            </form>
          )}
        </div>
        <div className={cx("line")} />
        <div className={cx("bottom")}>
          <div className={cx("check_all_wrap")}>
            <input
              onChange={(e) => onAllCheckHandle(e)}
              checked={allCheck}
              type="checkbox"
              className={cx("check")}
            />
            <div>전체 동의</div>
          </div>
          <div className="flex">
            <div className={cx("check_wrap")}>
              <input
                onChange={(e) => setServiceCheck(e.target.checked)}
                checked={serviseCheck}
                type="checkbox"
                className={cx("check")}
              />
              <div>서비스 이용약관(필수)</div>
              <div
                className={cx("more_policy")}
                onClick={() => modalHandle("service")}
              >
                보기
              </div>
            </div>
          </div>
          <div className="flex">
            <div className={cx("check_wrap")}>
              <input
                onChange={(e) => setPersnerCheck(e.target.checked)}
                checked={persnerCheck}
                type="checkbox"
                className={cx("check")}
              />
              <div>개인정보 처리방침(필수)</div>
              <div
                className={cx("more_policy")}
                onClick={() => modalHandle("personal")}
              >
                보기
              </div>
            </div>
          </div>
          <button
            className={cx("btn")}
            disabled={disAbleSubmit}
            onClick={onSubmitHandle}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
