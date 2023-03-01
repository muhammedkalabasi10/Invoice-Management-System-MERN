import React, { useState, Fragment, useContext } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import styled from "styled-components";
import AuthContext from "../Context/AuthContext";
import SnackBar from "../SnackBar";
import TextField from '@mui/material/TextField';
import { Divider } from "@mui/material";

const steps = ["Enter Email Address", "Check Your Email"];

export default function HorizontalLinearStepper() {
  const [emailState,setEmailState]=useState("")
  const [openSnackbar, setOpenSnackbar] = useState({
    message: "",
    status: false,
  });
  const closeSnackbar = () => {
    setOpenSnackbar({ message: "", status: false });
  };
  const [res, setRes] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const { forgotPassword } = useContext(AuthContext);
  const MainDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  `;

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = async (event) => {
    event.preventDefault();
    const response = await forgotPassword({ email: emailState });
    setRes(response);
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <MainDiv>
      <SnackBar state={openSnackbar} handleClose={closeSnackbar} />
      <Box
        sx={{
          borderRadius: "10px",
          backdropFilter: "blur(10px)",
          border: "2px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 0 40px rgba(8, 7, 16, 0.6)",
          padding:2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <Divider sx={{margin:"0.5rem 0"}} />
          <Fragment>
            {activeStep === 0 && <TextField
          onChange={(e)=>{setEmailState(e.target.value)}}
          value={emailState}
              margin="normal"
              required
              fullWidth
              autoFocus
              name="email"
              label="E-Mail"
              id="email"
              autoComplete="current-email"
            />}
            {activeStep === 1 && res}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {activeStep !== steps.length - 1 && (
                <Button onClick={handleNext}>Next</Button>
              )}
            </Box>
          </Fragment>
        </Box>
      </Box>
    </MainDiv>
  );
}
