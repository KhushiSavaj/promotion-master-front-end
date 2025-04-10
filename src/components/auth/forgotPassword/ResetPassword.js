import React, { useState } from "react";
import {
  Container,
  FormGroup,
  FormLabel,
  Grid,
  makeStyles,
  Typography,
  Box,
  Button,
  CircularProgress,
} from "@material-ui/core";
import CustomTextField from "../../common/CustomTextField";
import InfoIcon from "@material-ui/icons/Info";
import { useForm } from "react-hook-form";
import { ApiPostNoAuth } from "../../../helpers/API/ApiData";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  loginSignUpWrap: {
    padding: [[60, 0]],
  },
  loginSignUpBox: {
    backgroundColor: "#fff",
    padding: [[30, 70]],
    borderRadius: 10,
    boxShadow: "0px 1px 2px rgba(0,0,0,0.5)",
    "& .MuiFormGroup-root": {
      marginBottom: 25,
      position: "relative",
    },
  },
  inputIcon: {
    position: "absolute",
    left: 12,
    top: 10,
    fontSize: 18,
    color: "#656565",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 30,
  },
  btnSeparator: {
    borderTop: "1px solid #e0e0e0",
    lineHeight: "0",
    textAlign: "center",
    marginBottom: "30px",
    display: "inline-block",
    width: "100%",
    "& span": {
      backgroundColor: "#fff",
      padding: "0 5px",
      color: "#606060",
    },
  },
  btnGroup: {
    marginBottom: 20,
    "& button + button": {
      marginTop: 20,
    },
  },
  googleBtn: {
    position: "relative",
    "& img": {
      position: "absolute",
      left: 0,
      top: 0,
      borderRadius: 5,
    },
  },
  appleBtn: {
    "& svg": {
      fontSize: 14,
      marginRight: 5,
    },
  },
  loginFooter: {
    padding: [[20, 70]],
    textAlign: "center",
    borderTop: "1px solid #e0e0e0",
    margin: "0 -70px",
    "& button": {
      minWidth: 170,
    },
  },
  error: {
    fontSize: 14,
    "& svg": {
      fontSize: 16,
      verticalAlign: "middle",
      marginRight: "5px",
    },
    "& .MuiInputBase-input": {
      borderColor: "#f44336",
    },
  },
}));

export default function ResetPassword(props) {
  const { email, user_role } = props.location.state;
  const classes = useStyles();
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const { handleSubmit, errors, control } = useForm();

  const onSubmit = async (data) => {
    setLoader(true);
    data = Object.assign({ ...data }, props.location.state);
    const res = await ApiPostNoAuth("user/forgotPassword", data);
    try {
      if (res.data.status === 200) {
        history.push("/login");
        setLoader(false);

        toast.success(res.data.message, { autoClose: 5000 });
      } else {
        setLoader(false);
        toast.error(res.data.message, { autoClose: 5000 });
      }
    } catch (err) {
      setLoader(false);
      toast.error("Internal server error", { autoClose: 5000 });
    }
  };

  return (
    <>
      <div className={classes.loginSignUpWrap}>
        <Container>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container justify="center">
              <Grid item md={5}>
                <div className={classes.loginSignUpBox}>
                  <Typography
                    variant="body1"
                    component="h1"
                    className={classes.title}
                  >
                    Reset your password
                  </Typography>

                  <FormGroup>
                    {user_role === "SMI" ? (
                      <FormLabel>I am a social media influencer</FormLabel>
                    ) : (
                      <FormLabel>I am a business</FormLabel>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Email</FormLabel>
                    <CustomTextField
                      fullWidth
                      name="email"
                      type="email"
                      variant="filled"
                      autoComplete="false"
                      value={email}
                      // control={control}
                      // rules={{
                      //   required: "Email required",
                      //   pattern: {
                      //     value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
                      //     message: "Invalid input",
                      //   },
                      // }}
                      className={errors.email && classes.error}
                      disabled
                    ></CustomTextField>
                    {/* {errors.email && (
                      <Box className={classes.error} color="error.main">
                        <InfoIcon />
                        {errors.email.message}
                      </Box>
                    )} */}
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>New Password</FormLabel>
                    <CustomTextField
                      fullWidth
                      name="password"
                      type="password"
                      variant="filled"
                      autoComplete="false"
                      control={control}
                      rules={{
                        required: "Password required",
                      }}
                      className={errors.password && classes.error}
                    ></CustomTextField>
                    {errors.password && (
                      <Box className={classes.error} color="error.main">
                        <InfoIcon />
                        {errors.password.message}
                      </Box>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Confirm Password</FormLabel>
                    <CustomTextField
                      fullWidth
                      name="confirm_password"
                      type="password"
                      variant="filled"
                      autoComplete="false"
                      control={control}
                      rules={{
                        required: "Confirm Password required",
                      }}
                      className={errors.confirm_password && classes.error}
                    ></CustomTextField>
                    {errors.confirm_password && (
                      <Box className={classes.error} color="error.main">
                        <InfoIcon />
                        {errors.confirm_password.message}
                      </Box>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>One-Time Passcode(OTP)</FormLabel>
                    <CustomTextField
                      fullWidth
                      name="otp"
                      type="text"
                      variant="filled"
                      autoComplete="false"
                      control={control}
                      rules={{
                        required: "OTP required",
                      }}
                      className={errors.otp && classes.error}
                    ></CustomTextField>
                    {errors.otp && (
                      <Box className={classes.error} color="error.main">
                        <InfoIcon />
                        {errors.otp.message}
                      </Box>
                    )}
                  </FormGroup>

                  <FormGroup>
                    {loader ? (
                      <Button
                        fullWidth
                        color="primary"
                        variant="contained"
                        disableElevation
                      >
                        <CircularProgress color="inherit" size={24} />
                      </Button>
                    ) : (
                      <Button
                        fullWidth
                        color="primary"
                        variant="contained"
                        type="submit"
                        disableElevation
                      >
                        Change Password
                      </Button>
                    )}
                  </FormGroup>
                </div>
              </Grid>
            </Grid>
          </form>{" "}
        </Container>
      </div>
    </>
  );
}
