import { useState, useEffect, FormEvent } from "react";
import router, { useRouter } from "next/router";
import styles from "./FindId.module.scss";
import className from "classnames/bind";
import { toast } from "react-toastify";
import { useLazyQuery } from "@apollo/client";
import { SEND_PHONE_AUTH_NUMBER } from "../../src/graphql/query/sendPhoneAuthNumber";
import { CONFIRM_PHONE_AUTH_NUMBER } from "../../src/graphql/query/confirmPhoneAuthNumber";
import { FIND_IDENTITY } from "../../src/graphql/query/findIdentity";
import {
  ConfirmPhoneAuthNumberQuery,
  CountryCodeModel,
  FindIdentityQuery,
  SendPhoneAuthNumberQuery,
} from "src/graphql/generated/graphql";
import { FIND_MANY_COUNTRY_CODE } from "src/graphql/query/findManyCountryCode";
import DropDown from "components/DropDown/DropDown";

const cx = className.bind(styles);

export default function FindId() {
  const [countryCodes, setCountryCodes] = useState<CountryCodeModel[]>([]);
  const [countryCode, setCountryCode] = useState(82);

  const [moreVisible, setMoreVisible] = useState(false);
  const [tell, setTell] = useState("");
  const [confirmTell, setConfirmTell] = useState("");

  const router = useRouter();

  const changeCountry = (code: number) => {
    setCountryCode(code);
    setMoreVisible(false);
  };

  const onSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (tell !== "") {
      sendPhoneAuthNumber({ variables: { phone: tell } });
    }
  };

  const onSubmitConfirmNum = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    confirmPhoneAuthNumber({
      variables: { phone: tell, authNumber: confirmTell },
    });
    toast.dismiss();
  };

  const [sendPhoneAuthNumber] = useLazyQuery<SendPhoneAuthNumberQuery>(
    SEND_PHONE_AUTH_NUMBER,
    {
      onError: (e) => toast.error(e.message ?? `${e}`),
      onCompleted(_data) {
        setMoreVisible(true);
        toast.success(
          <div>
            휴대폰 번호로 인증번호를 발송하였습니다.
            <br />
            인증코드를 입력해주세요.
          </div>,
          { autoClose: false }
        );
      },
      fetchPolicy: "no-cache",
    }
  );

  const [findManyCountryCode] = useLazyQuery(FIND_MANY_COUNTRY_CODE, {
    onError: (e) => toast.error(e.message ?? `${e}`),
    onCompleted(data) {
      setCountryCodes(data.findManyCountryCode);
    },
  });

  const [confirmPhoneAuthNumber] = useLazyQuery<ConfirmPhoneAuthNumberQuery>(
    CONFIRM_PHONE_AUTH_NUMBER,
    {
      onError: (e) => toast.error(e.message ?? `${e}`),
      onCompleted(data) {
        findIdentity({
          variables: {
            phone: tell,
            hash: data.confirmPhoneAuthNumber,
          },
        });
      },
    }
  );

  const [findIdentity] = useLazyQuery<FindIdentityQuery>(FIND_IDENTITY, {
    onError: (e) => toast.error(e.message ?? `${e}`),
    onCompleted(data) {
      router.push(`/find-id/${data.findIdentity}`);
    },
  });

  useEffect(() => {
    findManyCountryCode();
  }, [tell]);

  return (
    <div className={cx("container")}>
      <div className={cx("wrap")}>
        <div className={cx("title")}>아이디 찾기</div>
        <div className={cx("text")}>휴대폰 인증</div>
        <form className={cx("body")} onSubmit={onSendMessage}>
          <div className="flex">
            <DropDown
              type="county"
              data={countryCodes}
              onChangeHandel={changeCountry}
            />
            <input
              className={cx(!moreVisible ? "input" : "part_input")}
              placeholder="- 를 빼고 입력하세요"
              value={tell}
              onChange={(e) => {
                setTell(e.target.value.replace(/\D/g, "").trim());
                setConfirmTell("");
                setMoreVisible(false);
              }}
            />
            <button className={cx(moreVisible ? "part_btn" : "none")}>
              {moreVisible ? "재발송" : ""}
            </button>
          </div>
        </form>
        <form
          onSubmit={moreVisible ? onSubmitConfirmNum : onSendMessage}
          className={cx("body")}
        >
          {moreVisible && (
            <input
              placeholder="인증번호를 입력하세요"
              value={confirmTell}
              onChange={(e) =>
                setConfirmTell(e.target.value.replace(/\D/g, "").trim())
              }
              className={cx("input")}
            />
          )}
          <button
            className={cx("btn")}
            disabled={
              moreVisible ? confirmTell.length !== 6 : tell.length === 0
            }
          >
            {moreVisible ? "인증 완료" : "인증번호 발송"}
          </button>
        </form>
      </div>
    </div>
  );
}
