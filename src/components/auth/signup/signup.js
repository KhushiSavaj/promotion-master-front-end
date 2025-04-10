import { Box, Button, CircularProgress, FormControlLabel, FormGroup, Grid, IconButton, Hidden, makeStyles, Radio, RadioGroup, Typography, InputAdornment } from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import FacebookIcon from '@material-ui/icons/Facebook';
import InfoIcon from "@material-ui/icons/Info";
import LockIcon from "@material-ui/icons/Lock";
import PersonIcon from "@material-ui/icons/Person";
import RoomIcon from "@material-ui/icons/Room";
import React, { useState } from "react";
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { ApiPostNoAuth } from "../../../helpers/API/ApiData";
import * as authUtil from "../../../utils/auth.util";
import * as userUtil from "../../../utils/user.util";
import CustomTextField from "../../common/CustomTextField";
import loginSignUpImg from "../../../assets/images/loginSignUpImg.jpg"
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';

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
    height: "100%",

    '& .MuiInputBase-formControl': {
      padding: 0,

      '& .MuiInputAdornment-positionEnd': {
        position: 'absolute',
        right: 0,
        top: 0,
        width: '50px',
        height: '40px',
        padding: 0,
        margin: 0,
        maxHeight: '3em',
      }

    }
  },
  loginSignUpBox: {
    backgroundColor: "#fff",
    padding: [[60, 20]],
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
      [theme.breakpoints.up("md")]: {
        marginBottom: 15,
      },
      position: "relative",
    },
    "& input.MuiInputBase-input": {
      paddingLeft: 40,
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
    fontWeight: "bold",
    marginBottom: 30,
    [theme.breakpoints.down("xs")]: {
      fontSize: 20,
      marginBottom: 20,
    },
  },
  signUpSecondStep: {
    padding: [[30, 40]],
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
  bottomLink: {
    paddingTop: 20,
    borderTop: "1px solid #e0e0e0",
    textAlign: "center",
  },
  googleButton: {
    color: '#FFFFFF !important',
    backgroundColor: '#cf4332 !important',
    borderRadius: '4px !important',
    boxShadow: 'none !important',
    borderWidth: "2px !important",
    "& > div": {
      padding: "8px !important"
    },
    "&:hover": {
      backgroundColor: '#cf4332 !important',
    }
  },
  facebookButton: {
    position: "relative",
    "& button": {
      color: '#FFFFFF',
      backgroundColor: '#3c66c4',
      padding: "10px 10px 10px 50px",
      fontSize: 14,
      textTransform: 'capitalize',
      fontWeight: 'normal',
      borderRadius: '4px !important',
      width: '100%',
      height: 40,
      textAlign: "left",
      "&:hover": {
        backgroundColor: '#3c66c4',
      },
    },
    "& svg": {
      top: 0,
      backgroundColor: "#fff",
      left: 0,
      position: "absolute",
      bottom: 0,
      margin: 2,
      borderRadius: 2,
      padding: 6,
      width: 37,
      height: 36,
      fill: "#3c66c4",
    }
  }
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const { handleSubmit, errors, control } = useForm();
  const [userType, setUserType] = useState("SMI");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loader, setLoader] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const onSubmit = async (data) => {
    setLoader(true)
    data = { ...data, user_role: userType };
    await ApiPostNoAuth("user/signup", data)
      .then((res) => {
        if (res.data.status === 200) {
          history.push("/login")
          setLoader(false)
          toast.success(res.data.message, { autoClose: 5000 });
        } else {
          setLoader(false)
          toast.error(res.data.message, { autoClose: 5000 });
        }
      }).catch(err => {
        setLoader(false)
        toast.error("Internal server error", { autoClose: 5000 });
      })
  };

  const responseFacebook = async (response) => {
    setLoader(true);
    var facebookData = '';
    facebookData = {
      user_role: userType,
      email: response.email,
      user_name: response.email,
      signin_provider: "facebook",
      profile: (response.picture && response.picture.url) || null
    };
    if (authUtil.getNotificationToken()) {
      setLoader(false);
      facebookData = { ...facebookData, device_token: authUtil.getNotificationToken() };
    }
    else {
      setLoader(false);
    }
    const res = await ApiPostNoAuth("user/socialLogin", facebookData);
    try {
      if (res.data.status === 200) {
        localStorage.clear();
        authUtil.setToken(res.data.data.token);
        userUtil.setUserInfo(res.data.data);
        toast.success(res.data.message, { autoClose: 5000 });
        history.push('home')
        setLoader(false);
      } else {
        setLoader(false);
        toast.error(res.data.message, { autoClose: 5000 });
      }
    } catch (err) {
      setLoader(false);
      toast.error("Internal server error", { autoClose: 5000 });
    }
  }

  const responseGoogle = async (response) => {
    setLoader(true);
    var googleData = '';
    googleData = {
      user_role: userType,
      email: response.profileObj.email,
      user_name: response.profileObj.email,
      signin_provider: "google",
      profile: (response.profileObj.imageUrl && response.profileObj.imageUrl) || null
    };
    if (authUtil.getNotificationToken()) {
      googleData = { ...googleData, device_token: authUtil.getNotificationToken() };
    }
    const res = await ApiPostNoAuth("user/socialLogin", googleData);
    try {
      if (res.data.status === 200) {
        localStorage.clear();
        authUtil.setToken(res.data.data.token);
        userUtil.setUserInfo(res.data.data);
        toast.success(res.data.message, { autoClose: 5000 });
        history.push('home')
        setLoader(false);
      } else {
        setLoader(false);
        toast.error(res.data.message, { autoClose: 5000 });
      }
    } catch (err) {
      setLoader(false);
      toast.error("Internal server error", { autoClose: 5000 });
    }
  }

  return (
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
              {!isSignUp ? (
                <>
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
                    ></FormControlLabel>

                    <FormControlLabel
                      value="BUSINESS"
                      control={<Radio color="primary" />}
                      label="I am a business"
                    ></FormControlLabel>
                  </RadioGroup>
                  <FormGroup>
                    <Button
                      fullWidth
                      color="primary"
                      variant="contained"
                      onClick={() => setIsSignUp(true)}
                      disableElevation
                    >
                      Sign Up Now
                    </Button>
                  </FormGroup>
                  <div className={classes.bottomLink}>
                    <Link to="/login">
                      Already Registered? Click To Sign In
                    </Link>
                  </div>
                </>
              ) : (
                <div>
                  <Typography
                    variant="body1"
                    component="h1"
                    className={classes.title}
                  >
                    Complete your account setup
                  </Typography>
                  <div className={classes.socialAccount}>
                    {userType === "SMI" ? (
                      <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                          <FormGroup>
                            <CustomTextField
                              fullWidth
                              name="first_name"
                              type="text"
                              variant="filled"
                              placeholder="First Name"
                              autoComplete="false"
                              control={control}
                              rules={{
                                required: "Firstname required",
                                pattern: {
                                  value: /^[A-Za-z]+$/i,
                                  message: "Invalid input",
                                },
                              }}
                              className={errors.first_name && classes.error}
                            />
                            <PersonIcon className={classes.inputIcon} />
                            {errors.first_name && (
                              <Box
                                className={classes.error}
                                color="error.main"
                              >
                                <InfoIcon />
                                {errors.first_name.message}
                              </Box>
                            )}
                          </FormGroup>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <FormGroup>
                            <CustomTextField
                              fullWidth
                              name="last_name"
                              type="text"
                              variant="filled"
                              placeholder="Last Name"
                              autoComplete="false"
                              control={control}
                              rules={{
                                required: "Lastname required",
                                pattern: {
                                  value: /^[A-Za-z]+$/i,
                                  message: "Invalid input",
                                },
                              }}
                              className={errors.last_name && classes.error}
                            ></CustomTextField>
                            <PersonIcon className={classes.inputIcon} />
                            {errors.last_name && (
                              <Box
                                className={classes.error}
                                color="error.main"
                              >
                                <InfoIcon />
                                {errors.last_name.message}
                              </Box>
                            )}
                          </FormGroup>
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <FormGroup>
                            <CustomTextField
                              fullWidth
                              name="business_name"
                              type="text"
                              variant="filled"
                              placeholder="Business Name"
                              autoComplete="false"
                              control={control}
                              rules={{
                                required: "Business Name required",

                              }}
                              className={errors.business_name && classes.error}
                            />
                            <PersonIcon className={classes.inputIcon} />
                            {errors.business_name && (
                              <Box
                                className={classes.error}
                                color="error.main"
                              >
                                <InfoIcon />
                                {errors.business_name.message}
                              </Box>
                            )}
                          </FormGroup>
                        </Grid>
                      </Grid>
                    )}
                    <Grid container spacing={3}>
                      <Grid item md={6} xs={12}>
                        <FormGroup>
                          <CustomTextField
                            fullWidth
                            name="email"
                            type="email"
                            variant="filled"
                            placeholder="Email"
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
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <FormGroup>
                          <CustomTextField
                            fullWidth
                            name="business_zipcode"
                            type="text"
                            variant="filled"
                            placeholder="Zip"
                            autoComplete="false"
                            control={control}
                            rules={{
                              required: "Zip Code required",
                              pattern: {
                                value: /^[0-9]+$/i,
                                message: "Invalid input",
                              },
                            }}
                            className={errors.business_zipcode && classes.error}
                          ></CustomTextField>
                          <RoomIcon className={classes.inputIcon} />
                          {errors.business_zipcode && (
                            <Box className={classes.error} color="error.main">
                              <InfoIcon />
                              {errors.business_zipcode.message}
                            </Box>
                          )}
                        </FormGroup>
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item md={6} xs={12}>
                        <FormGroup>
                          <CustomTextField
                            fullWidth
                            name="user_name"
                            type="text"
                            variant="filled"
                            placeholder="Username"
                            autoComplete="false"
                            control={control}
                            rules={{
                              required: "Username required",
                              pattern: {
                                value: /^[A-Za-z]+$/i,
                                message: "Invalid input",
                              },
                            }}
                            className={errors.user_name && classes.error}
                          />
                          <PersonIcon className={classes.inputIcon} />
                          {errors.user_name && (
                            <Box className={classes.error} color="error.main">
                              <InfoIcon />
                              {errors.user_name.message}
                            </Box>
                          )}
                        </FormGroup>
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <FormGroup>
                          <CustomTextField
                            fullWidth
                            name="password"
                            type={passwordVisibility ? "text" :"password"}
                            variant="filled"
                            placeholder="Password"
                            autoComplete="false"
                            control={control}
                            InputProps={{
                              endAdornment:
                                <InputAdornment position="end" >
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setPasswordVisibility(!passwordVisibility)}
                                    edge="end"
                                  >
                                    {passwordVisibility ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                  </IconButton>
                                </InputAdornment>
          
                            }}
                            rules={{
                              required: "Password Required",
                              pattern: {
                                value: /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)[0-9a-zA-Z!@#$%^&*()]*$/,
                                message: "Password should contain minimum 8 Character with 1 Uppercase, 1 Lowercase, 1 Number and a special character",
                              },
                            }}
                            className={errors.password && classes.error}
                          />
                          <LockIcon className={classes.inputIcon} />
                          {errors.password && (
                            <Box className={classes.error} color="error.main">
                              <InfoIcon />
                              {errors.password.message}
                            </Box>
                          )}
                        </FormGroup>
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <FormGroup>
                          {loader ?
                            <Button fullWidth color="primary" variant="contained" disableElevation disabled >
                              <CircularProgress color="inherit" size={14} />&nbsp;&nbsp;Loading...
                            </Button>
                            :
                            <Button fullWidth color="primary" variant="contained" type="submit" disableElevation >
                              Next
                            </Button>
                          }
                        </FormGroup>
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item md={6} xs={12}>
                        <FormGroup>
                          <GoogleLogin
                            clientId="459131883810-0nka4jkb9g623d851mob4ibrkv58qsll.apps.googleusercontent.com"
                            buttonText="Google"
                            onSuccess={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            className={classes.googleButton}
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <FormGroup>
                          <div className={classes.facebookButton}>
                            <FacebookIcon />
                            <FacebookLogin
                              appId="1517653091757630"
                              autoLoad={false}
                              fields="name,email,picture"
                              textButton="Facebook"
                              callback={responseFacebook}
                            />
                          </div>
                        </FormGroup>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              )}
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
