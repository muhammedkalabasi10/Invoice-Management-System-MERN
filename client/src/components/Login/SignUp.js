import React, { useContext, useState } from 'react'
import AuthContext from '../Context/AuthContext'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink, useNavigate } from 'react-router-dom';
import SnackBar from '../SnackBar';

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://www.google.com/">
          Luxury
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  const theme = createTheme();

export default function SignUp() {
    const [openSnackbar, setOpenSnackbar]=useState({
        message:"",
        status: false
      })
    const navigate=useNavigate()

    const {signup}=useContext(AuthContext)

    const handleSubmit = async(event) => {
      event.preventDefault();
      const data = await new FormData(event.currentTarget);
      const res=await signup({name:data.get('name'),surName:data.get('surname'),phone:data.get('phone'),email:data.get('email'),address:data.get('address'),password:data.get('password'),confirmPassword:data.get('confirmpassword')},navigate)
      res && setOpenSnackbar({message:res,status:true})
    };
    const closeSnackbar=()=>{
        setOpenSnackbar({message:"",status:false})
      }

  return (
    <ThemeProvider theme={theme}>
        <SnackBar state={openSnackbar} handleClose={closeSnackbar}/>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            borderRadius: "10px",
            backdropFilter: "blur(10px)",
            border: "2px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 0 40px rgba(8, 7, 16, 0.6)",
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="surname"
              label="Surname"
              name="surname"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              id="phone"
              label="Phone"
              name="phone"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              id="address"
              label="Address"
              name="address"
              autoFocus
            />
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
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <NavLink to="/" variant="body2">
                  {"Do you already have an account? Sign In"}
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
}
