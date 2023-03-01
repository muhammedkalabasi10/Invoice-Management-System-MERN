import React from "react";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import styled from "styled-components";

const MainDiv = styled.div`
display:flex;
justify-content:center;
align-items:center; 
  height:100vh;
`;
export default function EmailSent() {
  const { email } = useParams();
  return (
    <MainDiv>
      <Box
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

          <MarkEmailReadIcon color="success" fontSize="large" />

        {`A verification link has been sent to your email account. Please click on the link that has just been sent to your email account(${email}) to verify your email and continue the registration process.`}
      </Box>
      </MainDiv>
  );
}
