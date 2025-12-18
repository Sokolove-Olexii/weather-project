import styles from "./Interact.module.scss";
import { Container } from "../Container/Container";
import FirstImg from "../../images/InteractPage/First-Interact-Img.jpg";
import SecondImg from "../../images/InteractPage/Second-Interact-Img.jpg";
import ThirdImg from "../../images/InteractPage/Third-Interact-Img.jpg";
import FourthImg from "../../images/InteractPage/Fourth-Interact-Img.jpg";

export const Interact = () => {
  return (
    <section className={styles.Interact} id="news">
      <Container>
        <p className={styles.Interact_title}>Interacting with our pets</p>
        <ul className={styles.InteractList}>
          <li className={styles.InteractList_li}>
            <img
              src={FirstImg}
              alt="FirsImg-pet"
              className={styles.InteractList_img}
            />
            <p className={styles.InteractList_text}>
              Rescue pups pose as ghosts in festive photo shoot
            </p>
          </li>
          <li className={styles.InteractList_li}>
            <img
              src={SecondImg}
              alt="FirsImg-pet"
              className={styles.InteractList_img}
            />
            <p className={styles.InteractList_text}>
              Cat interrupts morning coffee on sunny Washington morning
            </p>
          </li>
          <li className={styles.InteractList_li}>
            <img
              src={ThirdImg}
              alt="FirsImg-pet"
              className={styles.InteractList_img}
            />
            <p className={styles.InteractList_text}>
              New study finds dogs pay more attention to women
            </p>
          </li>
          <li className={styles.InteractList_li}>
            <img
              src={FourthImg}
              alt="FirsImg-pet"
              className={styles.InteractList_img}
            />
            <p className={styles.InteractList_text}>
              Petting dogs gives health benefit, even if they are not yours
            </p>
          </li>
        </ul>
        <a href="https://news.google.com/home?hl=uk&gl=UA&ceid=UA%3Auk">
          <button className={styles.Interact_button}>See more</button>
        </a>
      </Container>
    </section>
  );
};
