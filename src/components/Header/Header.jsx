import styles from "./Header.module.scss";
import { Container } from "../Container/Container";
import logo from "../../images/Svg/Logo.svg";
import user from "../../images/Svg/User.svg";
import SignUpModal from "../Modal/SignInModal";
import LoginModal from "../Modal/LogInModal";
import { useState } from "react";

export const Header = () => {
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const switchToLogin = () => {
    setOpenSignUp(false);
    setOpenLogin(true);
  };

  const switchToSignUp = () => {
    setOpenLogin(false);
    setOpenSignUp(true);
  };

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
                  onClick={() => setOpenSignUp(true)}
                >
                  Sign Up
                </button>

                <SignUpModal
                  open={openSignUp}
                  onClose={() => setOpenSignUp(false)}
                  onSwitchToLogin={switchToLogin}
                />

                <LoginModal
                  open={openLogin}
                  onClose={() => setOpenLogin(false)}
                  onSwitchToSignUp={switchToSignUp}
                />
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
