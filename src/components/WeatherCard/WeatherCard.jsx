import styles from "./WeatherCard.module.scss";
import refreshImg from "../../images/Svg/refreshImg.svg";
import likeImg from "../../images/Svg/heartImg.svg";
import deleteImg from "../../images/Svg/deleteImg.svg";

export const WeatherCard = ({ data, onRefresh, onDelete, onOpen }) => {
  const date = new Date((data.dt + data.timezone) * 1000);

  const formattedDate = date.toLocaleDateString("en-GB");
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

  const timeString = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // const getIcon = (description) => {
  //   description = description.toLowerCase();

  //   if (description.includes("clear")) return "/icons/sun.png";
  //   if (description.includes("cloud")) return "/icons/cloud.png";
  //   if (description.includes("rain")) return "/icons/rain.png";
  //   if (description.includes("snow")) return "/icons/snow.png";
  //   if (description.includes("storm")) return "/icons/storm.png";
  //   if (description.includes("mist") || description.includes("fog"))
  //     return "/icons/fog.png";

  //   return "/icons/default.png";
  // };

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
      {/* 
      <img
        className={styles.icon}
        src={getIcon(data.weather[0].description)}
        alt="weather icon"
      /> */}

      <div className={styles.weatherCard_temp}>
        {Math.round(data.main.temp)}°C
      </div>

      <p className={styles.description}>{data.weather[0].description}</p>

      <div className={styles.weatherBtnDiv}>
        <img
          src={refreshImg}
          alt="#"
          className={styles.weatherBtnDiv_refresh}
          onClick={(e) => {
            e.preventDefault();
            onRefresh(data.name);
          }}
        />
        <img src={likeImg} alt="#" className={styles.weatherBtnDiv_like} />
        <button className={styles.weatherBtnDiv_seeMore}>See more</button>
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
