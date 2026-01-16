import { useState, useEffect } from "react";
import { Container } from "../Container/Container";
import { Slide, toast } from "react-toastify";
import styles from "./Header.module.scss";
import { ReactComponent as LogoIcon } from "../../images/Svg/Logo.svg";
import user from "../../images/Svg/User.svg";
import menuImg from "../../images/Svg/menuImg.svg";
import SignUpModal from "../Modal/SignInModal";
import LoginModal from "../Modal/LogInModal";
import Profile from "../Profile/Profile";

export const Header = ({ setIsLoggedIn, isLoggedIn }) => {
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignOut, setOpenSignOut] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
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
    setIsLoggedIn(false);
  };

  const profileOpen = () => {
    setOpenProfile((prev) => !prev);

    if (!isLoggedIn) {
      toast.error("Вам потрібно зареєструватись");
      return;
    }
  };

  const menuOpen = () => {
    setOpenMenu((prev) => !prev);
  };

  const handleUserLogin = (data) => {
    setUserData(data);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const scrollToFooter = () => {
    const footerElement = document.getElementById("footer");
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: "smooth" });
    }
    if (openMenu) {
      setOpenMenu(false);
    }
  };

  const scrollToNews = () => {
    const footerElement = document.getElementById("news");
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: "smooth" });
    }
    if (openMenu) {
      setOpenMenu(false);
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <section className={styles.HeaderSection}>
      <Container>
        <div className={styles.Header}>
          <div>
            <LogoIcon className={styles.Header_logoIcon} />
          </div>

          <div>
            <ul className={styles.HeaderList}>
              <li className={styles.HeaderList_li}>Who we are</li>
              <li className={styles.HeaderList_li} onClick={scrollToFooter}>
                Contacts
              </li>
              <li className={styles.HeaderList_li} onClick={scrollToNews}>
                News
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
                      </div>
                    )}
                    <li className={styles.HeaderRlist_username}>
                      {userData.username}
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

                <Profile
                  open={openProfile}
                  onClose={() => setOpenProfile(false)}
                  setIsLoggedIn={setIsLoggedIn}
                  user={userData}
                />

                <SignUpModal
                  open={openSignUp}
                  onClose={() => setOpenSignUp(false)}
                  onSwitchToLogin={switchToLogin}
                  onLoginSuccess={handleUserLogin}
                  setIsLoggedIn={setIsLoggedIn}
                />

                <LoginModal
                  open={openLogin}
                  onClose={() => setOpenLogin(false)}
                  onSwitchToSignUp={switchToSignUp}
                  onLoginSuccess={handleUserLogin}
                  setIsLoggedIn={setIsLoggedIn}
                />
              </li>

              <li className={styles.HeaderRlist_li}>
                <a className={styles.HeaderRlist_profile} onClick={profileOpen}>
                  <img src={user} className={styles.User} alt="userIcon" />
                </a>
              </li>
            </ul>
            <div className={styles.HeaderMobileMenu} onClick={menuOpen}>
              <div className={styles.HeaderMobileMenu_position}>
                <label className={styles.menuButton}>
                  <input
                    type="checkbox"
                    checked={openMenu}
                    onChange={menuOpen}
                  />
                  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <path
                      className={`${styles.line} ${styles.line1}`}
                      d="M0 70l28-28c2-2 2-2 7-2h64"
                    />
                    <path
                      className={`${styles.line} ${styles.line2}`}
                      d="M0 50h99"
                    />
                    <path
                      className={`${styles.line} ${styles.line3}`}
                      d="M0 30l28 28c2 2 2 2 7 2h64"
                    />
                  </svg>
                </label>
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
                  <a
                    className={styles.HeaderRlist_profile}
                    onClick={profileOpen}
                  >
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
