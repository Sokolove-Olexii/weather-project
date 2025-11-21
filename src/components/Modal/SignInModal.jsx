import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  Typography,
  TextField,
} from "@mui/material";

export default function SignInModal({ open, onClose, onSwitchToLogin }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log("Email:", email);
    console.log("Password:", password);
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
              }}
            >
              Username
            </Typography>
            <TextField
              name="username"
              placeholder="Username"
              fullWidth
              sx={{
                color: "rgba(171, 171, 171, 1)",
                fontFamily: "Montserrat",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "17px",
                background: "rgba(228, 228, 228, 1)",
                borderRadius: "10px",
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
              }}
            >
              E-Mail
            </Typography>
            <TextField
              name="email"
              placeholder="E-Mail"
              fullWidth
              sx={{
                color: "rgba(171, 171, 171, 1)",
                fontFamily: "Montserrat",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "17px",
                background: "rgba(228, 228, 228, 1)",
                borderRadius: "10px",
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
              }}
            >
              Password
            </Typography>
            <TextField
              name="password"
              placeholder="Password"
              type="password"
              fullWidth
              sx={{
                color: "rgba(171, 171, 171, 1)",
                fontFamily: "Montserrat",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "17px",
                background: "rgba(228, 228, 228, 1)",
                borderRadius: "10px",
                "& fieldset": { border: "none" },
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
            }}
          >
            Sign Up
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
    </Dialog>
  );
}
