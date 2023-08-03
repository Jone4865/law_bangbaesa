import React, { useCallback, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import className from "classnames/bind";
import styles from "./CarouselPart.module.scss";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";
import { AutoHeightImage } from "components/AutoHeightImage";
import { FindManyBannerQuery } from "src/graphql/generated/graphql";

const cx = className.bind(styles);

type Props = {
  carouselData: FindManyBannerQuery["findManyBanner"];
};

const CarouselPart = ({ carouselData }: Props) => {
  const [mobile, setMobile] = useState(false);
  const isMobile = useMediaQuery({
    query: "(max-width: 759px)",
  });
  const [dragging, setDragging] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentDataIdx, setCurrentDataIdx] = useState(0);
  const sliderRef = useRef<Slider>(null);
  const router = useRouter();

  const settings = {
    infinite: true,
    autoplaySpeed: 4000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    beforeChange: (currentSlide: number, nextSlide: number) => {
      setDragging(true);
      const dataLength = carouselData.length;
      let adjustedNextSlide = nextSlide;

      if (nextSlide < 0) {
        adjustedNextSlide = dataLength - 1;
      } else if (nextSlide >= dataLength) {
        adjustedNextSlide = 0;
      }

      setCurrentPage(currentSlide);
      setCurrentDataIdx(adjustedNextSlide);
    },
    afterChange: () => setDragging(false),
  };

  useEffect(() => {}, [currentPage, carouselData]);

  useEffect(() => {
    setMobile(isMobile);
  }, [isMobile]);

  return (
    <div className={cx("container")}>
      <Slider
        {...settings}
        ref={sliderRef}
        nextArrow={
          <div>
            <AutoHeightImage
              src="/img/icon/slider-right.png"
              objectFit="contain"
              alt="화살표"
              className={cx("slider_next")}
            />
          </div>
        }
        prevArrow={
          <div>
            <AutoHeightImage
              src="/img/icon/slider-left.png"
              objectFit="contain"
              alt="화살표"
              className={cx("slider_prev")}
            />
          </div>
        }
      >
        {carouselData.map((v, idx) => (
          <div
            onClick={() => !dragging && v.path && router.push(`/${v.path}`)}
            key={idx}
            className={cx("img_wrap", v.path && "pointer")}
          >
            <AutoHeightImage
              src={!isMobile ? v.pcFileName : v.mobileFileName}
              alt={v.pcFileName}
              objectFit="contain"
              className={cx("inner_img")}
            />
          </div>
        ))}
      </Slider>

      <div className={cx("dots")}>
        {carouselData.map((v, idx) => (
          <div
            key={v.pcFileName}
            style={{
              backgroundColor: `${
                carouselData[currentDataIdx]?.dotColor
                  ? carouselData[currentDataIdx]?.dotColor
                  : "black"
              }`,
            }}
            onClick={() => sliderRef.current?.slickGoTo(idx)}
            className={cx(idx === currentDataIdx ? "able_dot" : "default_dot")}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselPart;
