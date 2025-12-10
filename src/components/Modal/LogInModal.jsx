import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  Typography,
  TextField,
} from "@mui/material";

export default function LogInModal({
  open,
  onClose,
  onSwitchToSignUp,
  onLoginSuccess,
  setIsLoggedIn,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log("Email:", email);
    console.log("Password:", password);
    onLoginSuccess({ username, email });
    setIsLoggedIn(true);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
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
      <DialogTitle
        sx={{
          fontFamily: "Montserrat Alternates",
          fontSize: "28px",
          fontWeight: 500,
          lineHeight: "34px",
          mb: 3,
          textAlign: "center",
          "@media (max-width: 768px)": {
            fontSize: "20px",
            lineHeight: "24px",
          },
        }}
      >
        Log In
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
                color: "rgba(171, 171, 171, 1)",
                fontFamily: "Montserrat",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "17px",
                background: "rgba(228, 228, 228, 1)",
                borderRadius: "10px",
                "& fieldset": { border: "none" },
                "@media (max-width: 768px)": {
                  fontSize: "12px",
                  lineHeight: "15px",
                },
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
              placeholder="Email"
              fullWidth
              required
              sx={{
                color: "rgba(171, 171, 171, 1)",
                fontFamily: "Montserrat",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "17px",
                background: "rgba(228, 228, 228, 1)",
                borderRadius: "10px",
                "& fieldset": { border: "none" },
                "@media (max-width: 768px)": {
                  fontSize: "12px",
                  lineHeight: "15px",
                },
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
                color: "rgba(171, 171, 171, 1)",
                fontFamily: "Montserrat",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "17px",
                background: "rgba(228, 228, 228, 1)",
                borderRadius: "10px",
                "& fieldset": { border: "none" },
                "@media (max-width: 768px)": {
                  fontSize: "12px",
                  lineHeight: "15px",
                },
              }}
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            sx={{
              marginBottom: "15px",
              width: "114px",
              height: "37px",
              padding: "10px 30px 10px 30px",
              borderRadius: "10px",
              backgroundColor: "rgba(255, 179, 108, 1)",
              color: "black",
              fontFamily: "Montserrat",
              textTransform: "none",
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "17px",
              mt: 2,
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "pointer",
              "&:hover": {
                transform: "translateY(-0.15em)",
                boxShadow: "0 0 0.3em 0em",
              },
            }}
          >
            Log In
          </Button>
        </Box>

        <Typography
          sx={{
            color: "rgba(0, 0, 0, 1)",
            fontFamily: "Montserrat",
            fontSize: "10px",
            fontWeight: 500,
            lineHeight: "12px",
          }}
        >
          Don't have an account?{" "}
          <span
            style={{
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={onSwitchToSignUp}
          >
            Sign In
          </span>
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
