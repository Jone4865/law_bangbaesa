import { useEffect, useState } from "react";
import styles from "../Level3_certificate.module.scss";
import className from "classnames/bind";
import ImageUpload from "../../../ImageUpload/ImageUpload";
import { useMutation } from "@apollo/client";
import { CREATE_ID_CARD } from "../../../../src/graphql/mutation/createIdCard";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { CreateIdCardMutation } from "src/graphql/generated/graphql";
import { constants, publicEncrypt } from "crypto";
import { test } from "node:test";

const cx = className.bind(styles);

export default function IdCard() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");

  const [files, setFiles] = useState<any>();

  const handleUpload = (file: File, key: string) => {
    setFiles((prev: any) =>
      prev
        ? [...prev.filter((v: any) => v.key !== key), { file, key }]
        : [{ file, key }]
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
      createIdCard({
        variables: {
          name: rsaEncryptionWithPublicKey(name),
          registrationNumber: rsaEncryptionWithPublicKey(number),
          issueDate: rsaEncryptionWithPublicKey(date),
        },
      });
    } else {
      toast.warn("사진을 추가해주세요.", { toastId: 0 });
    }
  };

  const [createIdCard, { loading }] = useMutation<CreateIdCardMutation>(
    CREATE_ID_CARD,
    {
      onError(e) {
        if (
          e.message ===
          "입력하신+발급일자는+등록된+발급일자와+일치하지+않습니다.+궁금하신+사항은+가까운+읍면동에+문의하시기+바랍니다"
        ) {
          toast.error(
            "입력하신 발급일자는 등록된 발급일자와 일치하지 않습니다. 궁금하신 사항은 가까운 읍면동에 문의하시기 바랍니다"
          );
        } else if (
          e.message ===
          "발급일자+입력오류가+5회+발생하여+타인의+무단사용+방지를+위해+더+이상+확인할+수+없습니다.+궁금하신+사항은+가까운+읍면동을+방문하시거나+www.gov.kr+에+접속하여+잠김상태를+해제하시기+바랍니다."
        ) {
          toast.error(
            "발급일자 입력오류가 5회 발생하여 타인의 무단사용 방지를 위해 더 이상 확인할 수 없습니다. 궁금하신 사항은 가까운 읍면동을 방문하시거나 www.gov.kr 에 접속하여 잠김상태를 해제하시기 바랍니다."
          );
        } else {
          toast.error(e.message ?? `${e}`);
        }
      },
      onCompleted(_data) {
        toast.success("신분증 인증이 완료되었습니다.");
        router.push("/certification/level2");
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
      <div className={cx("title")}>이름</div>
      <input
        className={cx("input")}
        placeholder="홍길동"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className={cx("title")}>주민등록번호</div>
      <input
        type="number"
        className={cx("input")}
        placeholder="9011121234566"
        value={number.replace("-", "")}
        onChange={(e) => setNumber(e.target.value)}
      />
      <div className={cx("title")}>발급일</div>
      <input
        className={cx("input")}
        placeholder="20000303"
        type="number"
        value={date.replace("-", "")}
        onChange={(e) => setDate(e.target.value)}
      />
      <div className={cx("title")}>KYC</div>
      <div className={cx("image_wrap")}>
        <div className={cx("image")}>
          <div className={cx("title")}>전면</div>
          <ImageUpload
            onUpload={handleUpload}
            kind={"front"}
            defaultImageUrl="/img/level3/id_card/front.png?v1"
          />
        </div>
        <div className={cx("image")}>
          <div className={cx("title")}>후면</div>
          <ImageUpload
            onUpload={handleUpload}
            kind={"back"}
            defaultImageUrl="/img/level3/id_card/back.png?v1"
          />
        </div>
        <div className={cx("image")}>
          <div className={cx("title")}>셀카</div>
          <ImageUpload
            onUpload={handleUpload}
            kind={"selfie"}
            defaultImageUrl="/img/level3/id_card/selfie.png?v1"
          />
        </div>
      </div>
      <button className={cx("btn")} onClick={onClickHandle}>
        신분증 인증
      </button>
    </div>
  );
}
