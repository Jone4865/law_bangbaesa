import { useState } from "react";
import styles from "./DriverLicense.module.scss";
import className from "classnames/bind";
import ImageUpload from "../../../ImageUpload/ImageUpload";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { CREATE_DRIVER_LICENSE } from "../../../../src/graphql/generated/mutation/createDriverLicense";

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
      prev ? [...prev, { file, key }] : [{ file, key }]
    );
  };

  const onClickHandle = () => {
    if (files?.length === 3) {
      createDriverLicense({
        variables: {
          name,
          birth: birthDay,
          area: code,
          licenseNumber,
          serialNumber: number,
        },
      });
    } else {
      toast.warn("사진을 추가해주세요.", { toastId: 0 });
    }
  };

  const [createDriverLicense] = useMutation(CREATE_DRIVER_LICENSE, {
    onError: (e) => toast.error(e.message ?? `${e}`),
    onCompleted(_data) {
      toast.success("신분증 인증이 완료되었습니다.");
      router.push("/mypage");
    },
  });

  return (
    <div className={cx("container")}>
      <div className={cx("image_wrap")}>
        <div className={cx("image")}>
          <div className={cx("title")}>전면</div>
          <ImageUpload
            onUpload={handleUpload}
            kind={"front"}
            defaultImageUrl="/img/level3/drive_card/front.png"
          />
        </div>
        <div className={cx("image")}>
          <div className={cx("title")}>후면</div>
          <ImageUpload
            onUpload={handleUpload}
            kind={"back"}
            defaultImageUrl="/img/level3/drive_card/back.png"
          />
        </div>
        <div className={cx("image")}>
          <div className={cx("title")}>셀카</div>
          <ImageUpload
            onUpload={handleUpload}
            kind={"selfie"}
            defaultImageUrl="/img/level3/drive_card/selfie.png"
          />
        </div>
      </div>
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
        placeholder="920116"
        value={birthDay}
        onChange={(e) => setBirthDay(e.target.value)}
      />
      <div className={cx("title")}>지역코드 앞 두자리 또는 지역명</div>
      <input
        className={cx("input")}
        placeholder="11 또는 서울"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <div className={cx("title")}>운전면허 번호 (10자리)</div>
      <input
        className={cx("input")}
        placeholder="1234567891"
        value={licenseNumber}
        onChange={(e) => setLicenseNumber(e.target.value)}
      />
      <div className={cx("title")}>암호일련번호</div>
      <input
        className={cx("input")}
        placeholder="920116"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button className={cx("btn")} onClick={onClickHandle}>
        신분증 인증
      </button>
    </div>
  );
}
