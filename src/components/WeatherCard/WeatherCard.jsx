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
  onToggleSeeMore,
}) => {
  const [spin, setSpin] = useState(false);
  const [heartAnim, setHeartAnim] = useState(false);
  const cityTimestamp = (data.dt + data.timezone) * 1000;

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
  }).format(cityTimestamp);
  const dayName = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    timeZone: "UTC",
  }).format(cityTimestamp);
  const timeString = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  }).format(cityTimestamp);

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

      <div className={styles.weatherBtnDiv}>
        <img
          src={refreshImg}
          alt="Refresh"
          className={`${styles.weatherBtnDiv_refresh} ${
            spin ? styles.spin : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            setSpin(true);
            onRefresh(data.name);
            setTimeout(() => setSpin(false), 600);
          }}
        />
        <img
          src={likeImg}
          alt="Like"
          className={`${styles.weatherBtnDiv_like} ${
            heartAnim ? styles.heartPop : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            setHeartAnim(true);
            setTimeout(() => setHeartAnim(false), 400);
          }}
        />
        <button
          className={styles.weatherBtnDiv_seeMore}
          onClick={(e) => {
            e.stopPropagation();
            onToggleSeeMore();
          }}
        >
          See more
        </button>
        <img
          src={deleteImg}
          alt="Delete"
          className={styles.weatherBtnDiv_delete}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(data.name);
            onToggleSeeMore();
          }}
        />
      </div>
    </div>
  );
};
