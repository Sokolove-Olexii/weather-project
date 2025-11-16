import { Container } from "../Container/Container";
import searchImg from "../../images/Svg/searchImg.svg";
import styles from "./Hero.module.scss";

export const Hero = () => {
  return (
    <section className={styles.Hero}>
      <Container>
        <div className={styles.Hero_contentWrapper}>
          <h1 className={styles.Hero_title}>Weather dashboard</h1>
          <div>
            <ul className={styles.HeroList}>
              <li className={styles.HeroList_li}>
                Create your personal list of favorite cities and always be aware
                of the weather.
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
            />
            <button className={styles.HeroSearch_button}>
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
