import React, { useContext, useState } from "react";
import AuthContext from "../Context/AuthContext";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SnackBar from "../SnackBar";

export default function Profile() {
    const {user,updateUser}=useContext(AuthContext)
    const [edit, setEdit]=useState(false)
  const [openSnackbar, setOpenSnackbar] = useState({
    message: "",
    status: false,
  });
  const theme = createTheme();
  const closeSnackbar = () => {
    setOpenSnackbar({ message: "", status: false });
  };
  const updateProfile=async(e)=>{
    e.preventDefault()
    const data = await new FormData(e.currentTarget);
    const res=await updateUser({name:data.get('name'),surName:data.get('surname'),phone:data.get('phone'),email:data.get('email'),password:data.get('password'),confirmPassword:data.get('confirmPassword')},user.user._id)
    res ? setOpenSnackbar({message:res,status:true}):setEdit(false)
  }
  const editHandler=(e)=>{
    e.preventDefault()
    setEdit(true)
  }

  return (
    <ThemeProvider theme={theme}>
      <SnackBar state={openSnackbar} handleClose={closeSnackbar} />
      <CssBaseline />
      <Box
        sx={{
          borderRadius: "10px",
          backdropFilter: "blur(10px)",
          border: "2px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 0 40px rgba(8, 7, 16, 0.6)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width:"30%",
          textAlign:"center",
          margin:"2.5% auto auto auto",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          {edit?<LockOpenOutlinedIcon/>:<LockOutlinedIcon />}
        </Avatar>
        <Typography component="h1" variant="h5">
          Profile
          </Typography>
          <Box component="form" onSubmit={edit?updateProfile:editHandler} noValidate sx={{ mt: 1 }}>
          <TextField
          disabled={!edit}
          sx={{marginBottom:"1rem"}}
          id="filled-disabled"
          label="Name"
          name="name"
          defaultValue={user.user.name}
          variant="filled"
        />
        <TextField
          disabled={!edit}
          sx={{marginBottom:"1rem"}}
          id="filled-disabled"
          label="Surname"
          name="surname"
          defaultValue={user.user.surName}
          variant="filled"
        />
        <TextField
          disabled={!edit}
          sx={{marginBottom:"1rem"}}
          id="filled-disabled"
          label="E-Mail"
          name="email"
          defaultValue={user.user.email}
          variant="filled"
        />
        <TextField
          disabled={!edit}
          sx={{marginBottom:"1rem"}}
          id="filled-disabled"
          label="Phone"
          name="phone"
          defaultValue={user.user.phone}
          variant="filled"
        />{
          edit && <><TextField
          sx={{marginBottom:"1rem"}}
          id="filled-disabled"
          label="Password"
          type="password"
          name="password"
          variant="filled"
        /><TextField
        id="filled-disabled"
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        variant="filled"
      /></>
        }
        <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
            >
              {edit?"Update Profile":"Edit"}
            </Button>
          </Box>
      </Box>
    </ThemeProvider>
  );
}
