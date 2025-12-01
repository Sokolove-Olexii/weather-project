import styles from "./SeeMore.module.scss";
import Container from "../Container/Container";
import temperature from "../../images/SeeMore/temperature.svg";
import humidity from "../../images/SeeMore/humidity.svg";
import pressure from "../../images/SeeMore/pressure.svg";
import windSpeed from "../../images/SeeMore/windSpeed.svg";
import visibility from "../../images/SeeMore/visibility.svg";

export const SeeMore = ({ data, onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <section className={styles.SeeMore} onClick={(e) => e.stopPropagation()}>
        {/* <Container> */}
        <ul className={styles.SeeMoreList}>
          <li className={styles.SeeMoreList_li}>
            <p className={styles.SeeMoreList_text}>Feels like</p>
            <p className={styles.SeeMoreList_data}>{data.main.feels_like} °C</p>
            <img
              src={temperature}
              alt="temperatureIcon"
              className={styles.SeeMoreList_icons}
            />
          </li>
          <li className={styles.SeeMoreList_li}>
            <p className={styles.SeeMoreList_text}>Min °C</p>
            <p className={styles.SeeMoreList_data}>{data.main.temp_min}°C</p>
            <p className={styles.SeeMoreList_text}>Max °C</p>
            <p className={styles.SeeMoreList_data}>{data.main.temp_max}°C</p>
          </li>
          <li className={styles.SeeMoreList_li}>
            <p className={styles.SeeMoreList_text}>Humidity</p>
            <p className={styles.SeeMoreList_data}>{data.main.humidity}%</p>
            <img
              src={humidity}
              alt="humidityIcon"
              className={styles.SeeMoreList_icons}
            />
          </li>
          <li className={styles.SeeMoreList_li}>
            <p className={styles.SeeMoreList_text}>Pressure</p>
            <p className={styles.SeeMoreList_data}>{data.main.pressure} Pa</p>
            <img
              src={pressure}
              alt="pressureIcon"
              className={styles.SeeMoreList_icons}
            />
          </li>
          <li className={styles.SeeMoreList_li}>
            <p className={styles.SeeMoreList_text}>Wind speed</p>
            <p className={styles.SeeMoreList_data}>{data.wind.speed} m/s</p>
            <img
              src={windSpeed}
              alt="windSpeedIcon"
              className={styles.SeeMoreList_icons}
            />
          </li>
          <li className={styles.SeeMoreList_li}>
            <p className={styles.SeeMoreList_text}>Visibility</p>
            <p className={styles.SeeMoreList_data}>{data.visibility + "m"}</p>
            <img
              src={visibility}
              alt="visibilityIcon"
              className={styles.SeeMoreList_icons}
            />
          </li>
        </ul>
        {/* </Container> */}
      </section>
    </div>
  );
};
