import React, { useContext, useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import styled from "styled-components";
import AuthContext from '../Context/AuthContext';
import Box from "@mui/material/Box";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function VerifyEmail() {
    const { id, token }=useParams()
    const {verifyAccount}=useContext(AuthContext)
    useEffect(()=>{
        verifyAccount({id:id, token:token},"verify")
    },[])
    const MainDiv = styled.div`
display:flex;
justify-content:center;
align-items:center; 
  height:100vh;
`;
  return (
    <MainDiv><Box
    sx={{
      borderRadius: "10px",
      backdropFilter: "blur(10px)",
      border: "2px solid rgba(255, 255, 255, 0.1)",
      boxShadow: "0 0 40px rgba(8, 7, 16, 0.6)",
      verticalAlign:"middle",
      alignItems: "center",
      width: "30%",
      textAlign: "center",
      padding:"1rem",
      margin:"0 auto"
    }}
  >

      <CheckCircleIcon color="success" fontSize="large" />

    Your account has been successfully activated and logged in. If you want continue {<NavLink to="/">click the link.</NavLink>} 
  </Box></MainDiv>
  )
}
