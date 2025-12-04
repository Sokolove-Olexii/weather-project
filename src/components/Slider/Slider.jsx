import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import styles from "./Slider.module.scss";
import { Container } from "../Container/Container";
import SliderFirstImg from "../../images/Slider/SliderFirstImg.jpg";
import SliderSecondImg from "../../images/Slider/SliderSecondImg.jpg";
import SliderThirdImg from "../../images/Slider/SliderThirdImg.jpg";
import SliderFourthImg from "../../images/Slider/SliderFourthImg.jpg";
import SliderFifthImg from "../../images/Slider/SliderFifthImg.jpg";

import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

export const CoverflowSlider = () => {
  return (
    <Container>
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        initialSlide={2}
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        autoplay={{
          delay: 3200,
          // disableOnInteraction: true,
          // pauseOnMouseEnter: true,
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className={`${styles.CoverflowSlider} ${styles.swiper}`}
      >
        <SwiperSlide className={styles.SwiperSlide}>
          <img src={SliderFirstImg} alt="SliderFirstImg" />
        </SwiperSlide>
        <SwiperSlide className={styles.SwiperSlide}>
          <img src={SliderSecondImg} alt="SliderSecondImg" />
        </SwiperSlide>
        <SwiperSlide className={styles.SwiperSlide}>
          <img src={SliderThirdImg} alt="SliderThirdImg" />
        </SwiperSlide>
        <SwiperSlide className={styles.SwiperSlide}>
          <img src={SliderFourthImg} alt="SliderFourthImg" />
        </SwiperSlide>
        <SwiperSlide className={styles.SwiperSlide}>
          <img src={SliderFifthImg} alt="SliderFifthImg" />
        </SwiperSlide>
      </Swiper>
    </Container>
  );
};
