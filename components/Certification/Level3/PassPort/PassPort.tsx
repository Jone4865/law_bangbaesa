import { useEffect, useState } from "react";
import styles from "./PassPort.module.scss";
import className from "classnames/bind";
import ImageUpload from "../../../ImageUpload/ImageUpload";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { CREATE_PASSPORT } from "../../../../src/graphql/mutation/createPassport";
import { CreatePassportMutation } from "src/graphql/generated/graphql";
import { constants, publicEncrypt } from "crypto";

const cx = className.bind(styles);

export default function PassPort() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [number, setNumber] = useState("");
  const [createDate, setCreatDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [files, setFiles] = useState<any>();

  const handleUpload = (file: File, key: string) => {
    setFiles((prev: any) =>
      prev ? [...prev, { file, key }] : [{ file, key }]
    );
  };
  function rsaEncryptionWithPublicKey(text: string) {
    const publicKey = process.env.NEXT_PUBLIC_BACK_SECRET_KEY;
    const pemPublicKey = `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`;

    const result = publicEncrypt(
      {
        key: pemPublicKey,
        padding: constants.RSA_PKCS1_PADDING,
      },
      Buffer.from(text)
    ).toString("base64");

    return result;
  }

  const onClickHandle = () => {
    if (files?.length === 3) {
      createPassport({
        variables: {
          passportNumber: rsaEncryptionWithPublicKey(number),
          issueDate: rsaEncryptionWithPublicKey(createDate),
          expirationDate: rsaEncryptionWithPublicKey(endDate),
          name: rsaEncryptionWithPublicKey(name),
          birth: rsaEncryptionWithPublicKey(birth),
        },
      });
    } else {
      toast.warn("사진을 추가해주세요.", { toastId: 0 });
    }
  };

  const [createPassport, { loading }] = useMutation<CreatePassportMutation>(
    CREATE_PASSPORT,
    {
      onError: (e) => toast.error(e.message ?? `${e}`),
      onCompleted(_data) {
        toast.success("신분증 인증이 완료되었습니다.");
        router.push("/mypage");
      },
    }
  );

  useEffect(() => {
    if (loading) {
      toast.warn(
        <div>
          신분증을 확인중입니다.
          <br />
          잠시만 기다려주세요.
        </div>,
        { toastId: 0 }
      );
    }
  }, [loading]);

  return (
    <div className={cx("container")}>
      <div className={cx("image_wrap")}>
        <div className={cx("image")}>
          <div className={cx("title")}>전면</div>
          <ImageUpload
            onUpload={handleUpload}
            kind={"front"}
            defaultImageUrl="/img/level3/pass_port/front.png"
          />
        </div>
        <div className={cx("image")}>
          <div className={cx("title")}>셀카</div>
          <ImageUpload
            onUpload={handleUpload}
            kind={"selfie"}
            defaultImageUrl="/img/level3/pass_port/selfie.png"
          />
        </div>
      </div>
      <div className={cx("title")}>이름</div>
      <input
        className={cx("input")}
        placeholder="m12341234"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className={cx("title")}>생년월일</div>
      <input
        className={cx("input")}
        placeholder="m12341234"
        value={birth}
        onChange={(e) => setBirth(e.target.value)}
      />
      <div className={cx("title")}>여권번호</div>
      <input
        className={cx("input")}
        placeholder="m12341234"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <div className={cx("title")}>발급일</div>
      <input
        className={cx("input")}
        placeholder="0523"
        value={createDate}
        onChange={(e) => setCreatDate(e.target.value)}
      />
      <div className={cx("title")}>기간만료일</div>
      <input
        className={cx("input")}
        placeholder="0523"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button className={cx("btn")} onClick={onClickHandle}>
        신분증 인증
      </button>
    </div>
  );
}
