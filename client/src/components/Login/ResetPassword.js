import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import SnackBar from "../SnackBar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function ResetPassword() {
  const [openSnackbar, setOpenSnackbar] = useState({
    message: "",
    status: false,
  });
  const navigate = useNavigate();
  const { id, token } = useParams();
  const { verifyAccount, resetPassword } = useContext(AuthContext);
  const theme = createTheme();
  useEffect(() => {
    verifyAccount({ id: id, token: token }, "reset");
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await new FormData(event.currentTarget);
    const res = await resetPassword({
      password: data.get("password"),
      confirmPassword: data.get("confirmpassword"),
    },id);
    if (res.message) {
      setOpenSnackbar({ message: res.message, status: true });
    } else {
      navigate("/");
      setOpenSnackbar({message:res.success, status:true})
    }
  };

  const closeSnackbar = () => {
    setOpenSnackbar({ message: "", status: false });
  };
  return (
    <ThemeProvider theme={theme}>
      <SnackBar state={openSnackbar} handleClose={closeSnackbar} />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            borderRadius: "10px",
            backdropFilter: "blur(10px)",
            border: "2px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 0 40px rgba(8, 7, 16, 0.6)",
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOpenIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmpassword"
              label="Confirm Password"
              type="password"
              id="confirmpassword"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
