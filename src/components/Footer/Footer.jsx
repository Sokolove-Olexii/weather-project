import { Container } from "../Container/Container";
import logo from "../../images/Svg/Logo.svg";
import styles from "./Footer.module.scss";
import instagramImg from "../../images/instagramImg.png";
import facebookImg from "../../images/facebookImg.png";
import whatsappImg from "../../images/whatsappImg.png";

export const Footer = () => {
  return (
    <section className={styles.Footer}>
      <Container>
        <div className={styles.Footer_contentWrapper}>
          <div className={styles.Footer_mobileWrapper}>
            <a className={styles.Footer_link}>
              <img src={logo} className={styles.logoIcon} alt="logo" />
            </a>
            <div>
              <p className={styles.Footer_address}>Address</p>
              <p className={styles.Footer_addressDescription}>
                Svobody str. 35 <br />
                Kyiv <br />
                Ukraine
              </p>
            </div>
          </div>
          <div className={styles.FooterContactUs}>
            <p className={styles.FooterContactUs_text}>Contact us</p>
            <ul className={styles.FooterContactUs_list}>
              <li>
                <a href="">
                  <img
                    src={instagramImg}
                    alt="#"
                    className={styles.Footer_icons}
                  />
                </a>
              </li>
              <li>
                <a href="">
                  <img
                    src={facebookImg}
                    alt="#"
                    className={styles.Footer_icons}
                  />
                </a>
              </li>
              <li>
                <a href="">
                  <img
                    src={whatsappImg}
                    alt="#"
                    className={styles.Footer_icons}
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
};
