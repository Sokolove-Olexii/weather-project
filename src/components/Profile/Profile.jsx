import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import DarkTheme from "../DarkTheme/DarkTheme";
import logo from "../../images/UserImg.png";
import styles from "./Profile.module.scss";
import { useState } from "react";

export default function Profile({ open, onClose, user }) {
  const [showPassword, setShowPassword] = useState(false);

  const username = user?.username || "Guest";
  const email = user?.email || "Немає email'у";
  const realPassword = user?.password || "";

  const starsCount = realPassword.length > 0 ? realPassword.length : 8;
  const maskedPassword = "*".repeat(starsCount);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        className: styles.Dialog,
        sx: {
          borderRadius: "25px",
          padding: "28px 80px",
          width: "600px",
          textAlign: "center",
          "@media (max-width: 768px)": {
            padding: "30px 45px",
          },
          "@media (max-width: 480px)": {
            padding: "25px",
          },
        },
      }}
    >
      <section className={styles.Profile}>
        <DarkTheme />
        <div className={styles.CloseBtn} onClick={onClose}>
          <a href="#" className={styles.CloseBtn_a}>
            <span className={styles.left}>
              <span className={styles.circleLeft}></span>
              <span className={styles.circleRight}></span>
            </span>
            <span className={styles.right}>
              <span className={styles.circleLeft}></span>
              <span className={styles.circleRight}></span>
            </span>
          </a>
        </div>
        <a className={styles.Profile_logo}>
          <img src={logo} className={styles.Profile_logoIcon} alt="logo" />
        </a>
        <p>Your username:{username}</p>
        <p>
          Your password:
          {showPassword ? realPassword || "No password" : maskedPassword}
        </p>
        <p>Your email:{email}</p>
      </section>
    </Dialog>
  );
}
