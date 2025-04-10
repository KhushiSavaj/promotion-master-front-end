import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  FormGroup,
  Grid,
  makeStyles,
  Typography,
  Box,
  Button,
  IconButton,
  CircularProgress,
  Hidden,
  Modal,
  InputAdornment,
} from "@material-ui/core";
import CustomTextField from "../../common/CustomTextField";
import PersonIcon from "@material-ui/icons/Person";
import { Link, useHistory } from "react-router-dom";
import LockIcon from "@material-ui/icons/Lock";
import { ApiPostNoAuth } from "../../../helpers/API/ApiData";
import InfoIcon from "@material-ui/icons/Info";
import FacebookIcon from '@material-ui/icons/Facebook';
import * as authUtil from "../../../utils/auth.util";
import * as userUtil from "../../../utils/user.util";
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import ReCAPTCHA from "react-google-recaptcha";
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import loginSignUpImg from "../../../assets/images/loginSignUpImg.jpg";
import SwipeableTextMobileStepper from '../../../SwipeableTextMobileStepper/SwipeableTextMobileStepper';
import CloseIcon from '@material-ui/icons/Close';
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
      [theme.breakpoints.down("md")]: {
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
  },

  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: '90%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(5),
    maxWidth: 1140,
    borderRadius: 10,
    position: 'relative',

    [theme.breakpoints.down("lg")]: {
      maxWidth: 760,
    },

    [theme.breakpoints.down("md")]: {
      maxWidth: 640,
    },

    [theme.breakpoints.down("sm")]: {
      maxWidth: '100%',
      padding: 20,
    },

  },
  closeIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
    border:0,
    background: 'transparent',
    padding: 0,
    margin: 0,
    cursor: 'pointer'
  }
}));

export default function Login() {
  const history = useHistory()
  const classes = useStyles();
  const { handleSubmit, errors, control } = useForm();
  const [userType] = useState("SMI");
  const [loader, setLoader] = useState(false);
  const [reCaptchaValue, setReCaptchaValue] = useState(null);
  const [reCaptchaErrorMessage, setReCaptchaErrorMessage] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const rootRef = React.useRef(null);
  const [modalOpen, setModalOpen] = useState(true)


  const onSubmit = async (data) => {
    // if (!reCaptchaValue) {
    //   setReCaptchaErrorMessage(true);
    //   return;
    // } else {
    //   setReCaptchaErrorMessage(false);
    // }
    setLoader(true);
    data = { ...data, user_role: userType };
    if (authUtil.getNotificationToken()) {
      data = { ...data, device_token: authUtil.getNotificationToken() };
    }
    const res = await ApiPostNoAuth("user/login", data);
    try {
      if (res.data.status === 200) {
        localStorage.clear();
        authUtil.setToken(res.data.data.token);
        userUtil.setUserInfo(res.data.data);
        res.data.data.user_role === 'SMI' ? history.push('/smi/home') : history.push('home')
        setLoader(false);
      } else {
        setLoader(false);
        toast.error(res.data.message, { autoClose: 5000 });
      }
    } catch (err) {
      setLoader(false);
      toast.error("Internal server error", { autoClose: 5000 });
    }
  };

  const responseFacebook = async (response) => {
    setLoader(true);
    var facebookData = '';
    facebookData = {
      user_role: userType, email: response.email,
      user_name: response.email, signin_provider: "facebook",
      profile: response.picture && (response.picture.url || '')
    };
    if (authUtil.getNotificationToken()) {
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
      user_role: userType, email: response.profileObj.email,
      user_name: response.profileObj.email, signin_provider: "google",
      profile: response.profileObj.imageUrl && (response.profileObj.imageUrl || '')
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

  var onChange = (value) => {
    if (value) {
      setReCaptchaValue(value);
      setReCaptchaErrorMessage(false);
    }
  }

 const onModalClose = () => {
  setModalOpen(false)
  localStorage.setItem('visited', 'true')
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
              <Typography
                variant="body1"
                component="h1"
                className={classes.title}
              >
                The Power of Social Media is Only a Click Away
                  </Typography>
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
                    validate: value => !value.trim() ? "Username required" : null
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
              <FormGroup>
                <CustomTextField
                  fullWidth
                  name="password"
                  type={passwordVisibility ? 'text' : "password"}
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
                    required: "Password required",
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
              <Grid container justify="center" >
                <ReCAPTCHA
                  // sitekey="6LcMM1UaAAAAAPhkXHld7XgI0Z-QQyOxCHQDORlz"
                  sitekey={process.env.REACT_APP_SITEKEY}
                  onChange={onChange}
                />
              </Grid>
              <Grid container justify="center" style={{ paddingBottom: '30px' }}>
                {reCaptchaErrorMessage && (
                  <Box className={classes.error} color="error.main">
                    <InfoIcon />
                    {'Recaptch Is Required'}
                  </Box>
                )}
              </Grid>
              <FormGroup>
                {loader ? (
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    disableElevation
                    disabled
                  >
                    <CircularProgress color="inherit" size={14} />&nbsp;&nbsp;Loading...
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    type="submit"
                    disableElevation
                  >
                    Sign In
                  </Button>
                )}
              </FormGroup>

              <Grid container spacing={3}>
                <Grid item xs={6}>
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
                <Grid item xs={6}>
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
              <div className={classes.bottomLink}>
                <div>
                  <Link to="/signup">Not Registered? Click to Sign Up</Link>
                </div>
                <div>
                  <Link to="/forgot-password">Forgot Password?</Link>
                </div>
              </div>
            </form>
          </div>
        </Grid>
      </Grid>

      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open={modalOpen}
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        className={classes.modal}
        container={() => rootRef.current}
      >
        <div className={classes.paper}>
          <button onClick={onModalClose} className={classes.closeIcon}><CloseIcon></CloseIcon></button>
          <SwipeableTextMobileStepper onClose={onModalClose}/>
        </div>
      </Modal>

    </div>
  );
}
