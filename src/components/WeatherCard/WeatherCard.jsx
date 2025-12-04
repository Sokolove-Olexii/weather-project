import { useState } from "react";
import styles from "./WeatherCard.module.scss";
import refreshImg from "../../images/Svg/refreshImg.svg";
import likeImg from "../../images/Svg/heartImg.svg";
import deleteImg from "../../images/Svg/deleteImg.svg";

export const WeatherCard = ({
  data,
  onRefresh,
  onDelete,
  onOpen,
  onOpenSeeMore,
}) => {
  const [spin, setSpin] = useState(false);
  const [heartAnim, setHeartAnim] = useState(false);
  const date = new Date((data.dt + data.timezone) * 1000);

  const formattedDate = date.toLocaleDateString("en-GB");
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  const timeString = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={styles.weatherCard} onClick={onOpen}>
      <div className={styles.upperDiv}>
        <p className={styles.upperDiv_text}>{data.name}</p>
        <p className={styles.upperDiv_text}>{data.sys.country}</p>
      </div>
      <p className={styles.weatherCard_time}>{timeString}</p>

      <button className={styles.weatherCard_forecast}>Hourly forecast</button>

      <div className={styles.dateDiv}>
        <p className={styles.dateDiv_date}>{formattedDate}</p>
        <div className={styles.dateDiv_line}></div>
        <p className={styles.dateDiv_date}>{dayName}</p>
      </div>
      <div>
        <img
          className={styles.weatherCard_icon}
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
          alt={data.weather[0].description}
        />

        <p className={styles.weatherCard_temp}>
          {Math.round(data.main.temp)}°C
        </p>
      </div>

      {/* <p className={styles.description}>{data.weather[0].description}</p> */}

      <div className={styles.weatherBtnDiv}>
        <img
          src={refreshImg}
          alt="#"
          className={`${styles.weatherBtnDiv_refresh} ${
            spin ? styles.spin : ""
          }`}
          onClick={(e) => {
            e.preventDefault();
            setSpin(true);
            onRefresh(data.name);
            setTimeout(() => setSpin(false), 600);
          }}
        />
        <img
          src={likeImg}
          alt="#"
          className={`${styles.weatherBtnDiv_like} ${
            heartAnim ? styles.heartPop : ""
          }`}
          onClick={(e) => {
            e.preventDefault();
            setHeartAnim(true);
            setTimeout(() => setHeartAnim(false), 400);
          }}
        />
        <button
          className={styles.weatherBtnDiv_seeMore}
          onClick={(e) => {
            e.stopPropagation();
            onOpenSeeMore(data);
          }}
        >
          See more
        </button>
        <img
          src={deleteImg}
          alt="#"
          className={styles.weatherBtnDiv_delete}
          onClick={(e) => {
            e.preventDefault();
            onDelete(data.name);
          }}
        />
      </div>
    </div>
  );
};
