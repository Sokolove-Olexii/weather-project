import styles from "./Header.module.scss";
import { Container } from "../Container/Container";
import logo from "../../images/Svg/Logo.svg";
import user from "../../images/Svg/User.svg";
import SignUpModal from "../Modal/SignInModal";
import LoginModal from "../Modal/LogInModal";
import { useState, useEffect } from "react";

export const Header = () => {
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [userData, setUserData] = useState(null);

  const switchToLogin = () => {
    setOpenSignUp(false);
    setOpenLogin(true);
  };

  const switchToSignUp = () => {
    setOpenLogin(false);
    setOpenSignUp(true);
  };

  const handleUserLogin = (data) => {
    setUserData(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
    }
  }, []);

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
                {userData ? (
                  <span className={styles.HeaderRlist_username}>
                    {userData.username}
                  </span>
                ) : (
                  <button
                    className={styles.HeaderRlist_btn}
                    onClick={() => setOpenSignUp(true)}
                  >
                    Sign Up
                  </button>
                )}

                <SignUpModal
                  open={openSignUp}
                  onClose={() => setOpenSignUp(false)}
                  onSwitchToLogin={switchToLogin}
                  onLoginSuccess={handleUserLogin}
                />

                <LoginModal
                  open={openLogin}
                  onClose={() => setOpenLogin(false)}
                  onSwitchToSignUp={switchToSignUp}
                  onLoginSuccess={handleUserLogin}
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
