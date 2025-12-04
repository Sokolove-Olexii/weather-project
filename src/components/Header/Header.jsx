import { useState, useEffect } from "react";
import { Container } from "../Container/Container";
import styles from "./Header.module.scss";
import logo from "../../images/Svg/Logo.svg";
import user from "../../images/Svg/User.svg";
import menuImg from "../../images/Svg/menuImg.svg";
import SignUpModal from "../Modal/SignInModal";
import LoginModal from "../Modal/LogInModal";

export const Header = () => {
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignOut, setOpenSignOut] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [userData, setUserData] = useState(null);

  const switchToLogin = () => {
    setOpenSignUp(false);
    setOpenLogin(true);
  };

  const switchToSignUp = () => {
    setOpenLogin(false);
    setOpenSignUp(true);
  };

  const logOut = () => {
    localStorage.removeItem("user");
    setUserData(null);
    setOpenSignOut(false);
  };

  const menuOpen = () => {
    setOpenMenu((prev) => !prev);
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
              <li className={styles.HeaderList_li} onClick={menuOpen}>
                Menu
              </li>
            </ul>
          </div>

          <div>
            <ul className={styles.HeaderRlist}>
              <li className={styles.HeaderRlist_li}>
                {userData ? (
                  <ul
                    className={styles.HeaderRlist_container}
                    onClick={() => setOpenSignOut((prev) => !prev)}
                  >
                    {openSignOut && (
                      <div className={styles.HeaderRlist_logOut}>
                        <button
                          onClick={logOut}
                          className={styles.HeaderRlist_logOutBtn}
                        >
                          Log out
                        </button>
                        {/* add smth new */}
                      </div>
                    )}
                    <li className={styles.HeaderRlist_username}>
                      {userData.username}
                    </li>
                    <li>
                      <img
                        src={menuImg}
                        alt="menuIcon"
                        className={styles.HeaderRlist_icon}
                      />
                    </li>
                  </ul>
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
                <a className={styles.HeaderRlist_profile}>
                  <img src={user} className={styles.User} alt="userIcon" />
                </a>
              </li>
            </ul>
            <div className={styles.HeaderMobileMenu} onClick={menuOpen}>
              <div className={styles.HeaderMobileMenu_position}>
                <p className={styles.HeaderMobileMenu_text}>Menu</p>
                <img
                  src={menuImg}
                  alt="MenuImg"
                  className={styles.HeaderMobileMenu_icon}
                />
              </div>
              <div
                className={`${styles.HeaderMenu} ${
                  openMenu ? styles.active : ""
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <ul className={styles.HeaderMenu_list}>
                  <li className={styles.HeaderList_li}>Who we are</li>
                  <li className={styles.HeaderList_li}>Contacts</li>
                  <li className={styles.HeaderList_li}>Menu</li>
                </ul>
                <div className={styles.HeaderMenuRightDiv}>
                  <a className={styles.HeaderRlist_profile}>
                    <img src={user} className={styles.User} alt="userIcon" />
                  </a>
                  {userData ? (
                    <ul
                      className={styles.HeaderRlist_container}
                      onClick={() => setOpenSignOut((prev) => !prev)}
                    >
                      {openSignOut && (
                        <div className={styles.HeaderRlist_logOut}>
                          <button
                            onClick={logOut}
                            className={styles.HeaderRlist_logOutBtn}
                          >
                            Log out
                          </button>
                          {/* add smth new */}
                        </div>
                      )}
                      <li className={styles.HeaderRlist_username}>
                        {userData.username}
                      </li>
                      <li>
                        <img
                          src={menuImg}
                          alt="menuIcon"
                          className={styles.HeaderRlist_icon}
                        />
                      </li>
                    </ul>
                  ) : (
                    <button
                      className={styles.HeaderRlist_btn}
                      onClick={() => setOpenSignUp(true)}
                    >
                      Sign Up
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
