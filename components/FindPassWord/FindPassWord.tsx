import { useState, useEffect, MouseEvent, FormEvent } from "react";
import router, { useRouter } from "next/router";
import styles from "./FindPassWord.module.scss";
import className from "classnames/bind";
import { toast } from "react-toastify";
import { useLazyQuery } from "@apollo/client";
import { SEND_PHONE_AUTH_NUMBER } from "../../src/graphql/query/sendPhoneAuthNumber";
import { CONFIRM_PHONE_AUTH_NUMBER } from "../../src/graphql/query/confirmPhoneAuthNumber";
import { useCookies } from "react-cookie";
import {
  ConfirmPhoneAuthNumberQuery,
  CountryCodeModel,
  SendPhoneAuthNumberQuery,
} from "src/graphql/generated/graphql";

import { FIND_MANY_COUNTRY_CODE } from "src/graphql/query/findManyCountryCode";
import CountryDropDown from "components/DropDown/CountryDropDown/CountryDropDown";

const cx = className.bind(styles);

export default function FindPassWord() {
  const router = useRouter();

  const [countryCodes, setCountryCodes] = useState<CountryCodeModel[]>([]);
  const [countryCode, setCountryCode] = useState("82");

  const [_, setCookies] = useCookies(["hash", "phone"]);
  const [id, setId] = useState<string>("");
  const [tell, setTell] = useState<string>("");
  const [certificationTellText, setCertificationTellText] = useState("");
  const [viewConfirmTell, setViewConfirmTell] = useState(false);

  const idRule = /^[a-zA-Z0-9]{4,20}$/;

  const changeCountry = (code: string) => {
    setCountryCode(code);
    setViewConfirmTell(false);
  };

  const onSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!idRule.test(id)) {
      toast.warn("아이디를 확인해주세요");
    } else {
      sendPhoneAuthNumber({ variables: { phone: tell, countryCode } });
    }
  };

  const onSubmitText = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    confirmPhoneAuthNumber({
      variables: {
        phone: tell,
        authNumber: certificationTellText,
        identity: id,
        countryCode,
      },
    });
    toast.dismiss();
  };

  const [sendPhoneAuthNumber] = useLazyQuery<SendPhoneAuthNumberQuery>(
    SEND_PHONE_AUTH_NUMBER,
    {
      onError: (e) => toast.error(e.message ?? `${e}`),
      onCompleted(_data) {
        setViewConfirmTell(true);
        toast.success(
          <div>
            휴대폰 번호로 인증번호를 발송하였습니다.
            <br />
            인증코드를 입력해주세요.
          </div>,
          { autoClose: false, toastId: 1 }
        );
      },
      fetchPolicy: "no-cache",
    }
  );

  const [confirmPhoneAuthNumber] = useLazyQuery<ConfirmPhoneAuthNumberQuery>(
    CONFIRM_PHONE_AUTH_NUMBER,
    {
      onError: (e) => toast.error(e.message ?? `${e}`),
      onCompleted(data) {
        setCookies("hash", data.confirmPhoneAuthNumber);
        setCookies("phone", tell);
        router.push(`/find-pw/${id}`);
      },
    }
  );

  const [findManyCountryCode] = useLazyQuery(FIND_MANY_COUNTRY_CODE, {
    onError: (e) => toast.error(e.message ?? `${e}`),
    onCompleted(data) {
      setCountryCodes(data.findManyCountryCode);
    },
  });

  useEffect(() => {
    findManyCountryCode();
  }, []);

  return (
    <div className={cx("container")}>
      <div className={cx("wrap")}>
        <div className={cx("title")}>비밀번호 찾기</div>
        <div className={cx("part_title")}>아이디</div>
        <div>
          <form onSubmit={onSendMessage}>
            <input
              className={cx("input")}
              placeholder="아이디를 입력하세요"
              value={id}
              onChange={(e) => setId(e.target.value.trim())}
            />
            <div className={cx("part_title")}>휴대폰 인증</div>
            <div className="flex">
              <div className={cx("dropdown_wrap")}>
                <CountryDropDown
                  data={countryCodes}
                  onChangeHandel={changeCountry}
                />
              </div>
              <input
                className={cx(!viewConfirmTell ? "input" : "part_input")}
                placeholder="- 를 빼고 입력하세요"
                value={tell}
                onChange={(e) => {
                  setTell(e.target.value.replace(/\D/g, "").trim());
                  setViewConfirmTell(false);
                  setCertificationTellText("");
                }}
              />
              <button className={cx(viewConfirmTell ? "part_btn" : "none")}>
                {viewConfirmTell && "재발송"}
              </button>
            </div>
          </form>
          <form onSubmit={viewConfirmTell ? onSubmitText : onSendMessage}>
            {viewConfirmTell && (
              <input
                className={cx("input")}
                placeholder="인증번호를 입력하세요"
                value={certificationTellText}
                onChange={(e) =>
                  setCertificationTellText(
                    e.target.value.replace(/\D/g, "").trim()
                  )
                }
              />
            )}
            <button
              className={cx("btn")}
              disabled={
                viewConfirmTell
                  ? certificationTellText.length !== 6
                  : tell.length === 0
              }
            >
              {viewConfirmTell ? "인증완료" : "인증번호 발송"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
