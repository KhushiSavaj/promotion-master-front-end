import React, { lazy, Suspense, useState, useEffect } from "react";
import "./App.css";
import "../src/assets/css/style.css";
import "../src/assets/css/fonts.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import * as authUtil from "./utils/auth.util";
import * as userUtil from "./utils/user.util";
import { ApiPut } from "./helpers/API/ApiData";
import ProtectedRoute from "./protectedRoute";
import GuestRoute from "./guestRoute";
import store from "./redux/Store";
import { makeStyles } from "@material-ui/core/styles";
import { messaging } from "./components/common/pushNotification";
import Auth from "./helpers/Auth";
import { Fade, Modal } from "@material-ui/core";
import Loader from "./components/common/Loader";

const Header = lazy(() => import("./components/common/layout/header"));
const Footer = lazy(() => import("./components/common/layout/footer"));
const Login = lazy(() => import("./components/auth/login/login"));
const ForgotPassword = lazy(() => import("./components/auth/forgotPassword/forgotPassword"));
const ResetPassword = lazy(() => import("./components/auth/forgotPassword/ResetPassword"));
const SignUp = lazy(() => import("./components/auth/signup/signup"));
const MyAccount = lazy(() => import("./components/common/myAccount/MyAccount"));
const Search = lazy(() => import("./components/common/Search/Search"));
const Welcome = lazy(() => import("./components/common/welcome"));
const ProposalsSMI = lazy(() => import("./components/smi/Proposal/Proposal"));
const CampaignSMI = lazy(() => import("./components/smi/Campaign/Campaign"));
const MyCampaignSMI = lazy(() => import("./components/smi/MyCampaign/MyCampaign"));
const InfluencerSMI = lazy(() => import("./components/smi/Influencer/Influencer"));
const HomeSMI = lazy(() => import("./components/smi/Home/Home"));
const Home = lazy(() => import("./components/business/Home/Home"));
const Influencer = lazy(() => import("./components/business/Influencer/Influencer"));
const InfluencerDetails = lazy(() => import("./components/common/InfluencerDetails"));
const Campaigns = lazy(() => import("./components/business/Campaigns/Campaign"));
const Proposals = lazy(() => import("./components/business/Proposals/Proposals"));

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#fff",
      main: "#32CD32",
      dark: "#32CD32",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#3F3F3F",
      dark: "#3F3F3F",
      contrastText: "#fff",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "capitalize",
        fontFamily: "helvetica-light",
      },
    },
  },
  typography: {
    fontFamily: ["helvetica-light"].join(","),
  },
});

function App() {
  let userInfo = Auth.getUserDetail();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [notificationData, setNotificationData] = useState()
  const handleClose = () => setOpen(false);

  const updateUser = async (token) => {
    let form_data = new FormData();
    form_data.append("_id", userInfo._id);
    form_data.append("device_token", token);
    let res = await ApiPut("user/", form_data);
    try {
      if (res.data.status === 200) {
        userUtil.setUserInfo(res.data.data);
      } else {
      }
    } catch (err) {
    }
  };

  useEffect(() => {
    if (messaging) {
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      } else if (Notification.permission === "granted") {
        Notification.requestPermission().then(async function (permission) {
          // If the user accepts, let's create a notification
          try {
            if (permission === "granted" && messaging) {
              const token = await messaging.getToken();
              if (authUtil.getNotificationToken() !== token) {
                authUtil.setNotificationToken(token);
                if (userInfo && userInfo.device_token !== token) {
                  updateUser(token);
                }
              }
            } else {
              authUtil.removeNotificationToken();
              if (userInfo && userInfo.device_token) {
                updateUser("");
              }
            }
          } catch (error) {
          }
        }).catch(error => {
          console.log("error", error)
        })

      }
      // Otherwise, we need to ask the user for permission
      else if (Notification.permission !== "denied" && messaging) {
        Notification.requestPermission().then(async function (permission) {
          // If the user accepts, let's create a notification
          try {
            if (permission === "granted") {
              const token = await messaging.getToken();
              if (authUtil.getNotificationToken() !== token) {
                authUtil.setNotificationToken(token);
                if (userInfo && userInfo.device_token !== token) {
                  updateUser(token);
                }
              }
            } else {
              authUtil.removeNotificationToken();
              if (userInfo && userInfo.device_token) {
                updateUser("");
              }
            }
          } catch (error) {
            console.log("error", error)
          }
        }).catch(error => console.log("error", error))
      }

      navigator.serviceWorker.addEventListener("message", (message) => {
        console.log('message', message)
        setOpen(true)
        setNotificationData(message.data.notification)
      });

      Notification.onclick = function (event) {
        event.preventDefault(); // prevent the browser from focusing the Notification's tab
        window.open('http://www.google.com', '_blank');
      }
    } else {
    }
  }, [userInfo]);

  // navigator.serviceWorker.addEventListener("message", (message) => {
  //   console.log('message1', message)
  //   setOpen(true)
  // });
  const Layout = ({ children }) => (
    <>
      <Header />
      <Suspense fallback={<div className="suspenseLoader"><Loader /></div>}>{children}</Suspense>
      <Footer />
    </>
  );

  return (
    <div className="App">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">{notificationData?.title}</h2>
            <p id="transition-modal-description">
              {notificationData?.body}
            </p>
          </div>
        </Fade>
      </Modal>
      <Provider store={store}>
        <ToastContainer />
        <ThemeProvider theme={theme}>
          <Suspense fallback={<div className="suspenseLoader"><Loader /></div>}>
            <Router>
              <Switch>
                <Layout>
                  <GuestRoute exact path="/" component={Login} />
                  <GuestRoute exact path="/login" component={Login} />
                  <GuestRoute exact path="/signup" component={SignUp} />
                  <GuestRoute exact path="/welcome" component={Welcome} />
                  <GuestRoute
                    exact
                    path="/reset-password"
                    component={ResetPassword}
                  />
                  <GuestRoute
                    exact
                    path="/forgot-password"
                    component={ForgotPassword}
                  />
                  <ProtectedRoute exact path="/home" component={Home} />
                  <ProtectedRoute
                    exact
                    path="/my-account"
                    component={MyAccount}
                  />
                  <ProtectedRoute
                    exact
                    path="/campaigns"
                    component={Campaigns}
                  />
                  <ProtectedRoute
                    exact
                    path="/proposals"
                    component={Proposals}
                  />
                  <ProtectedRoute
                    exact
                    path="/influencer"
                    component={Influencer}
                  />
                  <ProtectedRoute
                    exact
                    path="/influencer-details"
                    component={InfluencerDetails}
                  />
                  <ProtectedRoute exact path="/search" component={Search} />

                  <ProtectedRoute exact path="/smi/home" component={HomeSMI} />
                  <ProtectedRoute
                    exact
                    path="/smi/influencer"
                    component={InfluencerSMI}
                  />
                  <ProtectedRoute
                    exact
                    path="/smi/campaigns"
                    component={CampaignSMI}
                  />
                  <ProtectedRoute
                    exact
                    path="/smi/my-campaign"
                    component={MyCampaignSMI}
                  />
                  <ProtectedRoute
                    exact
                    path="/smi/proposals"
                    component={ProposalsSMI}
                  />
                </Layout>
              </Switch>
            </Router>
          </Suspense>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
