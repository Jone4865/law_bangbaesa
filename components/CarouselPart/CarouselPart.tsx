import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import className from "classnames/bind";
import styles from "./CarouselPart.module.scss";
const cx = className.bind(styles);

const CarouselPart = () => {
  const CustomPrevArrow: React.FC = () => (
    <div className="custom-prev-arrow">Previous</div>
  );

  const CustomNextArrow: React.FC = () => (
    <div className="custom-next-arrow">Next</div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    appendDots: (dots: any) => (
      <div className={cx("dots")}>
        <ul>{dots}</ul>
      </div>
    ),
  };

  useEffect(() => {}, []);

  return (
    <Slider className={cx("container")} {...settings}>
      <div className={cx("img_wrap")}>
        <img src="/img/meta_img.png" alt="Image 1" />
      </div>
      <div className={cx("img_wrap")}>
        <img src="/img/meta_img.png" alt="Image 2" />
      </div>
      <div className={cx("img_wrap")}>
        <img src="/img/meta_img.png" alt="Image 3" />
      </div>
    </Slider>
  );
};

export default CarouselPart;
