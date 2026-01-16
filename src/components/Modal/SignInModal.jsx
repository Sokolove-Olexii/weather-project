import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import { useState } from "react";
import styles from "./Modal.module.scss";

export default function SignInModal({
  open,
  onClose,
  onSwitchToLogin,
  onLoginSuccess,
}) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (!email.endsWith("@gmail.com")) {
      setEmailError("Email must end with @gmail.com");
      return;
    }
    setEmailError("");
    onLoginSuccess({ username, email });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        className: styles.ModalPaper,
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
      <div className={styles.SignInModal}>
        <DialogTitle
          sx={{
            fontFamily: "Montserrat Alternates",
            fontSize: "28px",
            fontWeight: 500,
            lineHeight: "34px",
            mb: 3,
            textAlign: "center",
            color: "var(--modal-text)",
            "@media (max-width: 768px)": {
              fontSize: "20px",
              lineHeight: "24px",
            },
          }}
        >
          Sign up
        </DialogTitle>

        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Box sx={{ width: "100%", textAlign: "left" }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "17px",
                  marginBottom: "15px",
                  color: "var(--modal-text)",
                  "@media (max-width: 768px)": {
                    fontSize: "12px",
                    lineHeight: "15px",
                  },
                }}
              >
                Username
              </Typography>
              <TextField
                name="username"
                placeholder="Username"
                fullWidth
                required
                sx={{
                  "& .MuiInputBase-root": {
                    color: "var(--input-text)",
                    background: "var(--input-bg)",
                    borderRadius: "10px",
                    fontFamily: "Montserrat",
                  },
                  "& input::placeholder": {
                    color: "var(--input-placeholder)",
                    opacity: 1,
                  },
                  "& fieldset": { border: "none" },
                }}
              />
            </Box>

            <Box sx={{ width: "100%", textAlign: "left" }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "17px",
                  marginBottom: "15px",
                  color: "var(--modal-text)",
                  "@media (max-width: 768px)": {
                    fontSize: "12px",
                    lineHeight: "15px",
                  },
                }}
              >
                Email
              </Typography>
              <TextField
                name="email"
                placeholder="E-Mail"
                fullWidth
                required
                error={Boolean(emailError)}
                helperText={emailError}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                value={email}
                sx={{
                  "& .MuiInputBase-root": {
                    color: "var(--input-text)",
                    background: "var(--input-bg)",
                    borderRadius: "10px",
                    fontFamily: "Montserrat",
                  },
                  "& input::placeholder": {
                    color: "var(--input-placeholder)",
                    opacity: 1,
                  },
                  "& fieldset": { border: "none" },
                }}
              />
            </Box>

            <Box sx={{ width: "100%", textAlign: "left" }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "17px",
                  marginBottom: "15px",
                  color: "var(--modal-text)",
                  "@media (max-width: 768px)": {
                    fontSize: "12px",
                    lineHeight: "15px",
                  },
                }}
              >
                Password
              </Typography>
              <TextField
                name="password"
                placeholder="Password"
                type="password"
                fullWidth
                required
                sx={{
                  "& .MuiInputBase-root": {
                    color: "var(--input-text)",
                    background: "var(--input-bg)",
                    borderRadius: "10px",
                    fontFamily: "Montserrat",
                  },
                  "& input::placeholder": {
                    color: "var(--input-placeholder)",
                    opacity: 1,
                  },
                  "& fieldset": { border: "none" },
                }}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              sx={{
                marginBottom: "15px",
                padding: "10px 30px",
                borderRadius: "10px",
                backgroundColor: "var(--btn-bg)",
                color: "var(--btn-text)",
                fontFamily: "Montserrat",
                textTransform: "none",
                fontSize: "12px",
                fontWeight: "500",
                lineHeight: "15px",
                mt: 2,
                transition:
                  "transform 0.3s, box-shadow 0.3s, background-color 0.3s",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "var(--btn-hover)",
                  boxShadow: "0 0 15px rgba(255, 179, 108, 0.6)",
                },
                "&:active": {
                  transform: "scale(1.1)",
                },
              }}
            >
              Sign Up
            </Button>
          </Box>

          <Typography
            sx={{
              color: "var(--modal-text)",
              fontFamily: "Montserrat",
              fontSize: "10px",
              fontWeight: 500,
              lineHeight: "12px",
            }}
          >
            Already have an account?{" "}
            <span
              style={{
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={onSwitchToLogin}
            >
              Log In
            </span>
          </Typography>
        </DialogContent>
      </div>
    </Dialog>
  );
}
