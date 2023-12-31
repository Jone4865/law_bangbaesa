import {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  SyntheticEvent,
  useCallback,
} from "react";
import { useRouter } from "next/router";

import styles from "./SignUp.module.scss";
import className from "classnames/bind";

import { toast } from "react-toastify";
import { useLazyQuery, useMutation } from "@apollo/client";
import { CHECK_DUPLICATE_IDENTITY } from "../../src/graphql/query/checkDuplicateIdentity";
import { SEND_PHONE_AUTH_NUMBER } from "../../src/graphql/query/sendPhoneAuthNumber";
import { CONFIRM_PHONE_AUTH_NUMBER } from "../../src/graphql/query/confirmPhoneAuthNumber";
import { SIGN_UP_BY_USER } from "../../src/graphql/mutation/signUpByUser";
import PolicyModal from "./PolicyModal/PolicyModal";
import {
  CheckDuplicateIdentityQuery,
  ConfirmPhoneAuthNumberQuery,
  CountryCodeModel,
  LoginKind,
  PolicyKind,
  SendPhoneAuthNumberQuery,
  SignUpByUserMutation,
} from "src/graphql/generated/graphql";
import { FIND_MANY_COUNTRY_CODE } from "src/graphql/query/findManyCountryCode";

import CountryDropDown from "components/DropDown/CountryDropDown/CountryDropDown";

const cx = className.bind(styles);

export default function SignUp() {
  const router = useRouter();

  const [countryCodes, setCountryCodes] = useState<CountryCodeModel[]>([]);
  const [countryCode, setCountryCode] = useState("82");
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
  const [prevSubmitEvent, setPrevSubmitEvent] = useState<number | null>(null);

  const [visible, setVisible] = useState(false);
  const [policy, setPolicy] = useState<PolicyKind>(
    PolicyKind.TermsAndConditions
  );

  const passwordRule =
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

  const idRule = /^[a-zA-Z0-9]{4,20}$/;

  const changeCountry = (code: string) => {
    setCountryCode(code);
    setTell("");
    setViewConfirmTell(false);
  };

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
        toast.warn("아이디는 4자 이상, 20자 이하로 작성해주세요");
      }
    } else {
      toast.warn("아이디를 입력해주세요", { toastId: 0 });
    }
  };

  const onSendCertification = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (disAbleSubmit) {
      setDisAbleSummit(false);
    }
    if (tell !== "") {
      sendPhoneAuthNumber({ variables: { phone: tell, countryCode } });
    }
  };

  const onCertificationTellHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    confirmPhoneAuthNumber({
      variables: {
        phone: tell,
        authNumber: certificationTellText,
        countryCode,
      },
    });
  };

  const onSubmitHandleDebounced = useCallback(
    (e: FormEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (prevSubmitEvent) {
        clearTimeout(+prevSubmitEvent);
      }

      const newSubmitEvent = setTimeout(() => {
        onSubmitHandle(e);
      }, 500);

      setPrevSubmitEvent(+newSubmitEvent);
    },
    [prevSubmitEvent]
  );

  const onSubmitHandle = (
    e: FormEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    signUpByUser({
      variables: {
        identity: id,
        password: passWord,
        phone: tell,
        hash: hash ? hash : "",
        loginKind: LoginKind.Email,
        countryCode,
      },
    });
    toast.dismiss();
  };

  const handlePaste = (event: SyntheticEvent) => {
    event.preventDefault();
    toast.warning("붙여넣기가 금지되었습니다.");
  };

  const modalHandle = (key: PolicyKind) => {
    setVisible(true);
    setPolicy(key);
  };

  const [findManyCountryCode] = useLazyQuery(FIND_MANY_COUNTRY_CODE, {
    onError: (e) => toast.error(e.message ?? `${e}`),
    onCompleted(data) {
      setCountryCodes(data.findManyCountryCode);
    },
  });

  const [checkDuplicateIdentity] = useLazyQuery<CheckDuplicateIdentityQuery>(
    CHECK_DUPLICATE_IDENTITY,
    {
      onError: (e) => toast.error(e.message ?? `${e}`),
      onCompleted(_data) {
        setDuplicateId(true);
        toast.success("사용할 수 있는 아이디입니다.");
      },
    }
  );

  const [sendPhoneAuthNumber] = useLazyQuery<SendPhoneAuthNumberQuery>(
    SEND_PHONE_AUTH_NUMBER,
    {
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
      fetchPolicy: "no-cache",
    }
  );

  const [confirmPhoneAuthNumber] = useLazyQuery<ConfirmPhoneAuthNumberQuery>(
    CONFIRM_PHONE_AUTH_NUMBER,
    {
      onError: (e) => toast.error(e.message ?? `${e}`),
      onCompleted(data) {
        setPassTell(true);
        setHash(data.confirmPhoneAuthNumber);
        toast.success("휴대폰 인증이 완료되었습니다.");
      },
    }
  );

  const [signUpByUser] = useMutation<SignUpByUserMutation>(SIGN_UP_BY_USER, {
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
    findManyCountryCode();
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
            <div className={cx("warn_wrap")}>
              {id && !duplicateId && (
                <div className={cx("warn_text_wrap")}>!</div>
              )}
              <input
                className={cx(
                  "part_input",
                  id && !duplicateId && "warn_border"
                )}
                placeholder="아이디를 입력하세요"
                value={id}
                onChange={(e) => {
                  onChangeIdHandle(e);
                  toast.dismiss();
                }}
              />
            </div>
            <button className={cx("part_btn")}>중복검사</button>
          </form>
          {id && !duplicateId && (
            <div className={cx("warn")}>아이디 중복검사가 필요합니다.</div>
          )}
          <form onSubmit={onSubmitHandle}>
            <div className={cx("part_title")}>비밀번호</div>
            <div className={cx("warn_wrap")}>
              {passWord && !passwordRule.test(passWord) && (
                <div className={cx("warn_text_wrap")}>!</div>
              )}
              <input
                className={cx(
                  "input",
                  passWord && !passwordRule.test(passWord) && "warn_border"
                )}
                placeholder="비밀번호를 입력하세요"
                value={passWord}
                type="password"
                autoComplete="on"
                onChange={(e) => setPassWord(e.target.value.trim())}
              />
            </div>
            {passWord && !passwordRule.test(passWord) && (
              <div className={cx("warn")}>
                비밀번호는 영문, 특수문자(@$!%*#?&), 숫자 포함 8~20자 입력
                가능합니다.
              </div>
            )}
            <div className={cx("part_title")}>비밀번호 확인</div>
            <div className={cx("warn_wrap")}>
              {confirmPass && confirmPass !== passWord && (
                <div className={cx("warn_text_wrap")}>!</div>
              )}
              <input
                onPaste={handlePaste}
                type="password"
                autoComplete="on"
                className={cx(
                  "input",
                  confirmPass && confirmPass !== passWord && "warn_border"
                )}
                placeholder="비밀번호를 한번 더 입력하세요"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value.trim())}
              />
            </div>
          </form>
          {confirmPass && confirmPass !== passWord && (
            <div className={cx("warn")}>비밀번호와 일치하지 않습니다.</div>
          )}
          <div className={cx("part_title")}>휴대폰 인증</div>
          <form
            className={cx("dropdown_container")}
            onSubmit={onSendCertification}
          >
            <div className={cx("dropdown_wrap")}>
              <CountryDropDown
                data={countryCodes}
                onChangeHandel={changeCountry}
              />
            </div>
            <div className={cx("dropdown_body")}>
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
                {viewConfirmTell ? "재전송" : "인증"}
              </button>
            </div>
          </form>
          {viewConfirmTell && (
            <form
              className={cx("part_wrap")}
              onSubmit={onCertificationTellHandle}
            >
              <div className={cx("warn_wrap")}>
                {viewConfirmTell && !passTell && (
                  <div className={cx("phone_warn_text_wrap")}>!</div>
                )}
                <input
                  placeholder="숫자를 입력해주세요"
                  className={cx(
                    "part_input",
                    "more",
                    viewConfirmTell && !passTell && "warn_border"
                  )}
                  value={certificationTellText}
                  onChange={(e) =>
                    setCertificationTellText(
                      e.target.value.replace(/\D/g, "").trim()
                    )
                  }
                />
              </div>
              <button className={cx("part_btn", "more")} disabled={passTell}>
                {passTell ? "인증완료" : "인증"}
              </button>
            </form>
          )}
          {viewConfirmTell && !passTell && (
            <div className={cx("warn")}>휴대폰 인증을 진행해주세요.</div>
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
                onClick={() => modalHandle(PolicyKind.TermsAndConditions)}
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
                onClick={() =>
                  modalHandle(PolicyKind.PersonalInformationProcessingPolicy)
                }
              >
                보기
              </div>
            </div>
          </div>
          <button
            id="btn"
            className={cx("btn")}
            disabled={disAbleSubmit}
            onClick={onSubmitHandleDebounced}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
