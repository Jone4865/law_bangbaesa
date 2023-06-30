import { useState } from "react";
import styles from "./IdCard.module.scss";
import className from "classnames/bind";
import ImageUpload from "../../../ImageUpload/ImageUpload";
import { useMutation } from "@apollo/client";
import { CREATE_ID_CARD } from "../../../../src/graphql/generated/mutation/createIdCard";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const cx = className.bind(styles);

export default function IdCard() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");

  const [files, setFiles] = useState<any>();

  const handleUpload = (file: File, key: string) => {
    setFiles((prev: any) =>
      prev ? [...prev, { file, key }] : [{ file, key }]
    );
  };

  const onClickHandle = () => {
    if (files?.length === 3) {
      createIdCard({
        variables: { name, registrationNumber: number, issueDate: date },
      });
    } else {
      toast.warn("사진을 추가해주세요.", { toastId: 0 });
    }
  };

  const [createIdCard] = useMutation(CREATE_ID_CARD, {
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
            defaultImageUrl="/img/level3/id_card/front.png"
          />
        </div>
        <div className={cx("image")}>
          <div className={cx("title")}>후면</div>
          <ImageUpload
            onUpload={handleUpload}
            kind={"back"}
            defaultImageUrl="/img/level3/id_card/back.png"
          />
        </div>
        <div className={cx("image")}>
          <div className={cx("title")}>셀카</div>
          <ImageUpload
            onUpload={handleUpload}
            kind={"selfie"}
            defaultImageUrl="/img/level3/id_card/selfie.png"
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
      <div className={cx("title")}>주민등록번호</div>
      <input
        className={cx("input")}
        placeholder="9011121234566"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <div className={cx("title")}>발급일</div>
      <input
        className={cx("input")}
        placeholder="20000303"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button className={cx("btn")} onClick={onClickHandle}>
        신분증 인증
      </button>
    </div>
  );
}
