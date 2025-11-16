import styles from "./Header.module.scss";
import { Container } from "../Container/Container";
import logo from "../../images/Svg/Logo.svg?react";
import user from "../../images/Svg/User.svg";
import SignIn from "../Modal/Modal";
import { useState } from "react";

export const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <section>
      <Container>
        <div className={styles.Header}>
          <div>
            <a className={styles.Header_logo}>
              <img src={logo} className={styles.logoIcon} alt="logo" />
            </a>
          </div>
          <div>
            <ul className={styles.HeaderList}>
              <li className={styles.HeaderList_li}>Who we are</li>
              <li className={styles.HeaderList_li}>Contacts</li>
              <li className={styles.HeaderList_li}>Menu</li>
            </ul>
          </div>
          <div>
            <ul className={styles.HeaderRlist}>
              <li className={styles.HeaderRlist_li}>
                <button
                  className={styles.HeaderRlist_btn}
                  onClick={() => setOpen(true)}
                >
                  <SignIn open={open} onClose={() => setOpen(false)}></SignIn>
                  Sign Up
                </button>
              </li>
              <li className={styles.HeaderRlist_li}>
                <a className={styles.HeaderRlist_account}>
                  <img src={user} className={styles.User} alt="userIcon" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
};
