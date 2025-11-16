import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  Typography,
  TextField,
} from "@mui/material";

export default function SignInModal({ open, onClose }) {
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
      onClose={onclose}
      PaperProps={{
        sx: {
          borderRadius: 3.5, // 4 = 32px
        },
      }}
    >
      <DialogTitle>Sign In</DialogTitle>
      <DialogContent>
        <Box
          components="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            name="username"
            label="Username"
            type="username"
            required
            fullWidth
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            required
            fullWidth
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            required
            fullWidth
          />

          <Button type="submit" variant="contained" fullWidth>
            Sign Up
          </Button>
        </Box>

        <Typography sx={{ mt: 2, textAlign: "center", fontSize: 14 }}>
          Already have an account? <strong>Log in</strong>
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
