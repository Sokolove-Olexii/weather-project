import styles from "./DailyForecast.module.scss";
import { Container } from "../Container/Container";

export const DailyForecast = ({ forecast }) => {
  if (!forecast) return null;

  return (
    <div className={styles.overlay}>
      <Container>
        <div className={styles.DailyForecast}>
          <p className={styles.DailyForecast_title}>8-day forecast</p>
          <ul className={styles.DailyForecastList}>
            {forecast.map((day, index) => {
              const date = new Date(day.dt * 1000);
              const dateString = date.toLocaleDateString("en-GB", {
                weekday: "short",
                month: "short",
                day: "numeric",
              });
              return (
                <li key={day.dt} className={styles.DailyForecastList_li}>
                  <span className={styles.DailyForecastList_date}>
                    {dateString}
                  </span>
                  <div className={styles.DailyForecastListTemperature}>
                    <img
                      src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                      alt={day.weather[0].description}
                      className={styles.DailyForecastList_icon}
                    />
                    <div
                      className={styles.DailyForecastListTemperature_position}
                    >
                      <span
                        className={styles.DailyForecastListTemperature_text}
                      >
                        {Math.round(day.temp.day)}°C/
                      </span>
                      <span
                        className={styles.DailyForecastListTemperature_text}
                      >
                        {Math.round(day.temp.night)}°C
                      </span>
                    </div>
                  </div>

                  <span className={styles.DailyForecastList_description}>
                    {day.weather[0].description}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </div>
  );
};
