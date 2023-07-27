import React, { useState, useRef } from "react";
import styles from "./ImageUpload.module.scss";
import className from "classnames/bind";
import Image from "next/image";

const cx = className.bind(styles);

interface ImageUploadProps {
  kind: string;
  onUpload: (file: File, key: string) => void;
  defaultImageUrl: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  defaultImageUrl,
  kind,
  onUpload,
}) => {
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
      onUpload(file, kind);
    }
  };

  const handleImageClick = () => {
    if (image) {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    } else {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
        fileInputRef.current.click();
      }
    }
  };

  return (
    <div>
      <div className={cx("container")}>
        <div className={cx("img_wrap")}>
          <Image
            src={previewImage || defaultImageUrl}
            alt="Uploaded Image"
            fill
            onClick={handleImageClick}
            priority
            quality={100}
          />
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className={cx("none")}
        />
      </div>
      <div className={cx("bottom_btn")} onClick={handleImageClick}>
        파일찾기
      </div>
    </div>
  );
};

export default ImageUpload;
