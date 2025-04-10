import React, { useState } from "react";
import {
  FormGroup,
  FormLabel,
  Grid,
  makeStyles,
  Typography,
  Box,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
  Hidden,
} from "@material-ui/core";
import CustomTextField from "../../common/CustomTextField";
import InfoIcon from "@material-ui/icons/Info";
import EmailIcon from "@material-ui/icons/Email";
import { useForm } from "react-hook-form";
import { ApiPostNoAuth } from "../../../helpers/API/ApiData";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import loginSignUpImg from "../../../assets/images/loginSignUpImg.jpg"

const useStyles = makeStyles((theme) => ({
  loginSignUpWrap: {
    display: "flex",
    minHeight: "calc(100vh - 132px)"
  },
  loginSignUpImg: {
    backgroundImage: `url(${loginSignUpImg})`,
    backgroundSize: "cover",
    height: "100%",
    backgroundPosition: "center"
  },
  loginBox: {
    backgroundColor: "#fff",
    height: "100%"
  },
  loginSignUpBox: {
    backgroundColor: "#fff",
    padding: 60,
    borderRadius: 10,
    maxWidth: 425,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    margin: "0 auto",
    [theme.breakpoints.down("xs")]: {
      padding: 20,
    },
    "& .MuiFormGroup-root": {
      marginBottom: 25,
      position: "relative",
    },
    "& input.MuiInputBase-input": {
      paddingLeft: 40,
    },
  },
  inputIcon: {
    position: "absolute",
    left: 12,
    top: 38,
    fontSize: 18,
    color: "#656565",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    [theme.breakpoints.down("xs")]: {
      fontSize: 20,
      marginBottom: 20,
    },
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

export default function ForgotPassword() {
  const classes = useStyles();
  const history = useHistory();
  const [userType, setUserType] = useState("SMI");
  const [loader, setLoader] = useState(false);
  const { handleSubmit, errors, control } = useForm();

  const onSubmit = async (data) => {
    setLoader(true);
    data = { ...data, user_role: userType };
    const res = await ApiPostNoAuth("user/OTP", data);
    try {
      if (res.data.status === 200) {
        history.push({
          pathname: "/reset-password",
          state: data,
        });
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
        <Grid container>
          <Hidden smDown>
            <Grid item md={7} xs={12}>
              <div className={classes.loginSignUpImg}></div>
            </Grid>
          </Hidden>
          <Grid item md={5} xs={12}>
            <div className={classes.loginBox}>
              <form className={classes.loginSignUpBox} onSubmit={handleSubmit(onSubmit)}>
              <Typography
                variant="body1"
                component="h1"
                className={classes.title}
              >
                Forgot your password
                  </Typography>

              <RadioGroup
                aria-label="social-login"
                name="userType"
                defaultValue={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <FormControlLabel
                  value="SMI"
                  control={<Radio color="primary" />}
                  label="I am a social media influencer"
                />
                <FormControlLabel
                  value="BUSINESS"
                  control={<Radio color="primary" />}
                  label="I am a business"
                />
              </RadioGroup>

              <FormGroup>
                <FormLabel>Email</FormLabel>
                <CustomTextField
                  fullWidth
                  name="email"
                  type="email"
                  variant="filled"
                  autoComplete="false"
                  control={control}
                  rules={{
                    required: "Email required",
                    pattern: {
                      value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
                      message: "Invalid input",
                    },
                  }}
                  className={errors.email && classes.error}
                ></CustomTextField>
                <EmailIcon className={classes.inputIcon} />
                {errors.email && (
                  <Box className={classes.error} color="error.main">
                    <InfoIcon />
                    {errors.email.message}
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
                    Send Reset Email
                  </Button>
                )}
              </FormGroup>
            </form>{" "}
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
