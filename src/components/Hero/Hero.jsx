import { Container } from "../Container/Container";
import { useState } from "react";
import { toast } from "react-toastify";
import searchImg from "../../images/Svg/searchImg.svg";
import styles from "./Hero.module.scss";

export const Hero = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const currentDay = () => {
    const heroDay = new Date();

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const month = months[heroDay.getMonth()];
    const dayName = days[heroDay.getDay()];
    const year = heroDay.getFullYear();
    const day = heroDay.getDate();

    const getSuffix = (day) => {
      if (day % 10 === 1 && day !== 11) return "st";
      if (day % 10 === 2 && day !== 12) return "nd";
      if (day % 10 === 3 && day !== 13) return "rd";
      return "th";
    };

    return {
      line1: `${month} ${year},`,
      line2: `${dayName} ${day}${getSuffix(day)}`,
    };
  };

  const handleSearch = () => {
    if (query.trim() === "") {
      toast.info("Будь ласка, введіть назву міста!");
      return;
    }

    onSearch(query.trim());
    setQuery("");
  };
  const handleKey = (e) => {
    if (e.key === "Enter") handleSearch();
  };
  return (
    <section className={styles.Hero}>
      <div className={styles.Hero_clouds}>
        <div className={styles.Hero_cloud}></div>
        <div className={styles.Hero_cloud}></div>
        <div className={styles.Hero_cloud}></div>
        <div className={styles.Hero_cloud}></div>
        <div className={styles.Hero_cloud}></div>
        <div className={styles.Hero_cloud}></div>
        <div className={styles.Hero_cloud}></div>
        <div className={styles.Hero_cloud}></div>
        <div className={styles.Hero_cloud}></div>
        <div className={styles.Hero_cloud}></div>
        <div className={styles.Hero_cloud}></div>
        <div className={styles.Hero_cloud}></div>
      </div>
      <Container>
        <div className={styles.Hero_contentWrapper}>
          <h1 className={styles.HeroTitlePosition_title}>Weather dashboard</h1>
          <div>
            <ul className={styles.HeroList}>
              <li className={styles.HeroList_li}>
                Create your personal list of <br />
                favorite cities and always be <br />
                aware of the weather.
              </li>
              <li>
                <div className={styles.HeroList_line}></div>
              </li>
              <li className={styles.HeroList_li}>
                {currentDay().line1}
                <br />
                {currentDay().line2}
              </li>
            </ul>
          </div>
          <div className={styles.HeroSearch}>
            <input
              type="text"
              placeholder="Search location..."
              className={styles.HeroSearch_input}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKey}
            />
            <button className={styles.HeroSearch_button} onClick={handleSearch}>
              <img
                src={searchImg}
                alt="SearchImg"
                className={styles.HeroSearch_icon}
              />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};
