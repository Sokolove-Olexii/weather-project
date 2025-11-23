import styles from "./WeatherCard.module.scss";

export const WeatherCard = ({ data, onRefresh, onDelete, onOpen }) => {
  return (
    <div className={styles.card} onClick={onOpen}>
      <h2 className={styles.city}>
        {data.name}, {data.sys.country}
      </h2>
      <div className={styles.temp}>{Math.round(data.main.temp)}°C</div>
      <img className={styles.icon} src="#" alt="#" />
      <p className={styles.description}>{data.weather[0].description}</p>
      <div className={styles.button}>
        <button
          className={styles.refresh}
          onClick={(e) => {
            e.preventDefault();
            onRefresh(data.name);
          }}
        >
          Refresh
        </button>
        <button
          className={styles.delete}
          onClick={(e) => {
            e.preventDefault();
            onDelete(data.name);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
