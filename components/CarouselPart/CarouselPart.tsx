import React, { useCallback, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import className from "classnames/bind";
import styles from "./CarouselPart.module.scss";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";
import { AutoHeightImage } from "components/AutoHeightImage";

const cx = className.bind(styles);

type CarouselData = {
  id: number;
  name: string;
  moveTo: string | undefined;
  arrowColor: string | undefined;
  dotsColor: string | undefined;
  alt: string;
  backGroundColor: string | undefined;
};

type Props = {
  carouselData: CarouselData[];
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
    <div
      style={{
        backgroundColor: `${
          carouselData[currentDataIdx]?.backGroundColor
            ? carouselData[currentDataIdx]?.backGroundColor
            : "black"
        }`,
      }}
      className={cx("container")}
    >
      <Slider className={cx("wrap")} {...settings} ref={sliderRef}>
        {carouselData.map((v, idx) => (
          <div
            onClick={() => !dragging && v.moveTo && router.push(`/${v.moveTo}`)}
            key={idx}
            className={cx("img_wrap", v.moveTo && "pointer")}
          >
            <AutoHeightImage
              src={`/img/banner/${!mobile ? v.name : v.name + "_m"}.png`}
              alt={v.alt}
              objectFit="contain"
              className={cx("inner_img")}
            />
          </div>
        ))}
      </Slider>
      <div
        style={{
          color: `${
            carouselData[currentDataIdx]?.arrowColor
              ? carouselData[currentDataIdx]?.arrowColor
              : "black"
          }`,
        }}
        className={cx("prev")}
        onClick={() => sliderRef.current?.slickPrev()}
      >
        {"<"}
      </div>
      <div
        style={{
          color: `${
            carouselData[currentDataIdx]?.arrowColor
              ? carouselData[currentDataIdx]?.arrowColor
              : "black"
          }`,
        }}
        className={cx("next")}
        onClick={() => sliderRef.current?.slickNext()}
      >
        {">"}
      </div>
      <div className={cx("dots")}>
        {carouselData.map((v, idx) => (
          <div
            key={v.alt}
            style={{
              backgroundColor: `${
                carouselData[currentDataIdx]?.dotsColor
                  ? carouselData[currentDataIdx]?.dotsColor
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
