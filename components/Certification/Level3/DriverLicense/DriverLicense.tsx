import { useEffect, useState } from "react";
import styles from "../Level3_certificate.module.scss";
import className from "classnames/bind";
import ImageUpload from "../../../ImageUpload/ImageUpload";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { CREATE_DRIVER_LICENSE } from "../../../../src/graphql/mutation/createDriverLicense";
import { CreateDriverLicenseMutation } from "src/graphql/generated/graphql";
import { constants, publicEncrypt } from "crypto";

const cx = className.bind(styles);

export default function DriverLicense() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [code, setCode] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [number, setNumber] = useState("");
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
      createDriverLicense({
        variables: {
          name: rsaEncryptionWithPublicKey(name),
          birth: rsaEncryptionWithPublicKey(birthDay),
          area: rsaEncryptionWithPublicKey(code),
          licenseNumber: rsaEncryptionWithPublicKey(licenseNumber),
          serialNumber: rsaEncryptionWithPublicKey(number),
        },
      });
    } else {
      toast.warn("사진을 추가해주세요.", { toastId: 0 });
    }
  };

  const [createDriverLicense, { loading }] =
    useMutation<CreateDriverLicenseMutation>(CREATE_DRIVER_LICENSE, {
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
        router.push("/mypage");
      },
    });

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
      <div className={cx("title")}>생년월일</div>
      <input
        className={cx("input")}
        placeholder="19920116"
        value={birthDay.replace("-", "")}
        type="number"
        onChange={(e) => setBirthDay(e.target.value)}
      />
      <div className={cx("title")}>지역코드 앞 두자리 또는 지역명</div>
      <input
        type="number"
        className={cx("input")}
        placeholder="11 또는 서울"
        value={code.replace("-", "")}
        onChange={(e) => setCode(e.target.value)}
      />
      <div className={cx("title")}>운전면허 번호 (10자리)</div>
      <input
        type="number"
        className={cx("input")}
        placeholder="1234567891"
        value={licenseNumber.replace("-", "")}
        onChange={(e) => setLicenseNumber(e.target.value)}
      />
      <div className={cx("title")}>암호일련번호</div>
      <input
        className={cx("input")}
        placeholder="kkk111"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <div className={cx("title")}>KYC</div>
      <div className={cx("image_wrap")}>
        <div className={cx("image")}>
          <div className={cx("title")}>전면</div>
          <ImageUpload
            onUpload={handleUpload}
            kind={"front"}
            defaultImageUrl="/img/level3/drive_card/front.png?v2"
          />
        </div>
        <div className={cx("image")}>
          <div className={cx("title")}>후면</div>
          <ImageUpload
            onUpload={handleUpload}
            kind={"back"}
            defaultImageUrl="/img/level3/drive_card/back.png?v2"
          />
        </div>
        <div className={cx("image")}>
          <div className={cx("title")}>셀카</div>
          <ImageUpload
            onUpload={handleUpload}
            kind={"selfie"}
            defaultImageUrl="/img/level3/drive_card/selfie.png?v2"
          />
        </div>
      </div>
      <button className={cx("btn")} onClick={onClickHandle}>
        신분증 인증
      </button>
    </div>
  );
}
