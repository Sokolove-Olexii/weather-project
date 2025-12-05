import { Container } from "../Container/Container";
import { useState } from "react";
import searchImg from "../../images/Svg/searchImg.svg";
import styles from "./Hero.module.scss";

export const Hero = ({ onSearch, handleKey }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
      setQuery("");
    }

    const handleKey = (e) => {
      if (e.key === "Enter") handleSearch();
    };
  };
  return (
    <section className={styles.Hero}>
      <div className={styles.Hero_clouds}>
        <div className={styles.Hero_cloud}></div>
        <div className={styles.Hero_cloud}></div>
        <div className={styles.Hero_cloud}></div>
      </div>
      <Container>
        <div className={styles.Hero_contentWrapper}>
          {/* <div className={styles.HeroTitlePosition}> */}
          <h1 className={styles.HeroTitlePosition_title}>Weather dashboard</h1>
          {/* </div> */}
          <div>
            <ul className={styles.HeroList}>
              <li className={styles.HeroList_li}>
                Create your personal list of <br></br>
                favorite cities and always be <br></br>
                aware of the weather.
              </li>
              <li>
                <div className={styles.HeroList_line}></div>
              </li>
              <li className={styles.HeroList_li}>
                October 2023
                <br />
                Friday, 13th
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
