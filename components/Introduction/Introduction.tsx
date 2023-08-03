import { useState, useEffect } from "react";
import Item from "../Body/Item/Item";
import Solution from "../Body/Solution/Solution";
import { useMediaQuery } from "react-responsive";
import Download_Part from "../Body/Download_Part/Download_Part";
import styles from "./Introduction.module.scss";
import className from "classnames/bind";
import Big_TopImage from "components/Big_TopImage/Big_TopImage";

const cx = className.bind(styles);

export default function Introduction() {
  const [middle, setMiddle] = useState(false);

  const isMiddle = useMediaQuery({
    query: "(min-width: 1300px) and (max-width: 10000px)",
  });

  useEffect(() => {
    if (isMiddle) {
      setMiddle(true);
    } else {
      setMiddle(false);
    }
  }, [isMiddle]);

  const titles = [
    <>
      <p>기업 상품권</p>
      <p>운영대행 컨설팅</p>
    </>,
    <>
      <p>고객맞춤 서비스</p>
    </>,
    <>방배사 솔루션</>,
  ];

  const contents = [
    <>
      다년간 축척 된 글로벌 서비스 운영경험과 CS대응 노하우를
      <br />
      바탕으로 국내 IT 서비스의 해외진출을 컨설팅 해드립니다.
    </>,
    <>
      방배사는 기업을 대상으로 한 상품권 판매 온라인 광고에 최적화된 통합마케팅
      서비스를 제공합니다.
    </>,
    <>
      방배사는 기업상품권 판매대행 서비스를 위해 다양한 마케팅 솔루션을 보유하고
      있습니다.
    </>,
  ];

  return (
    <div className={cx("container")}>
      <Big_TopImage imageName={"3"} />
      <Item
        title={titles[1]}
        content={contents[1]}
        img_name={middle ? "bg4" : "bg4_m"}
        item_name="service"
      />
      <Solution title={titles[2]} content={contents[2]} />
      <Download_Part />
    </div>
  );
}
