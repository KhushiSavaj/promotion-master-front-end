import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import {
  AppBar,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  Menu,
  MenuItem,
  Toolbar,
} from "@material-ui/core";
import userImage from "../../../assets/images/user-avatar.png";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from "@material-ui/icons/Person";
import Auth from "../../../helpers/Auth";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import { ApiGet } from "../../../helpers/API/ApiData";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from "@material-ui/core/IconButton";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/logout/logoutAction";
import Loader from "../Loader";
import localStoreUtil from "../../../utils/localstore.util";

const useStyles = makeStyles((theme) => ({
  headerWrap: {
    height: 64,
    position: "relative",
    [theme.breakpoints.down("640")]: {
      height: 48,
      zIndex: 99999,
    },
    [theme.breakpoints.down("498")]: {
      height: 56
    },
    "& .MuiGrid-container": {
      position: "relative"
    }
  },
  searchBox: {
    [theme.breakpoints.down("1199")]: {
      maxWidth: 140
    },
    "& .MuiInputBase-input": {
      paddingLeft: 10,
      [theme.breakpoints.down("sm")]: {
        color: "#fff"
      }
    }
  },
  iconButton: {
    padding: 6,
    [theme.breakpoints.down("sm")]: {
      color: "#fff"
    }
  },
  siteLogo: {
    position: "relative",
    padding: [[6, 0]],
    "& a:hover": {
      textDecoration: "none",
    },
    "& .MuiTypography-root": {
      color: "#fff",
      fontFamily: "LeagueSpartan-Bold",
      fontSize: 20,
      lineHeight: "normal",
      [theme.breakpoints.down("md")]: {
        fontSize: 16
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: 14
      },
    },
  },
  mainMenu: {
    display: "flex",
    flexDirection: "row-reverse",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      left: "0",
      right: "0",
      transition: "all 0.3s ease-in-out",
      position: "absolute",
      top: 48,
      backgroundColor: "#313131",
      opacity: 0,
      visibility: "hidden",
      marginLeft: -24,
      marginRight: -24,
      zIndex: 9,
      transform: "translateX(-100%)"
    },
    [theme.breakpoints.down("600")]: {
      marginLeft: -16,
      marginRight: -16,
      top: 40
    },
    "& .MuiList-root": {
      padding: 0,
      [theme.breakpoints.up("md")]: {
        display: "flex",
        justifyContent: "flex-end",
      },
      "& .MuiListItem-root": {
        width: "auto",
        padding: [[0, 10]],
        "& span": {
          [theme.breakpoints.up("md")]: {
            display: "none"
          }
        },
        [theme.breakpoints.down("1199")]: {
          padding: [[0, 5]],
        },
        [theme.breakpoints.down("sm")]: {
          padding: [[10, 20]],
          display: "block",
          borderBottom: "1px solid rgba(255,255,255,0.2)",
          "& svg": {
            float: "right",
          }
        }
      },
      "& a": {
        color: "#fff",
      },
      "& a:hover": {
        color: "#6fda44",
        textDecoration: "none",
      },
    }
  },
  searchWrap: {
    display: "flex",
    alignItems: "center",
    height: "35px",
    marginRight: 10,
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  searchToggleOpen: {
    display: "flex",
    position: "absolute",
    left: 0,
    right: 0,
    marginRight: 30,
    top: -2,
    backgroundColor: "#3F3F3F",
    zIndex: 9,
    "& .MuiInputBase-root": {
      width: "100%"
    }
  },
  mainMenuOpen: {
    transform: "translateX(0)",
    opacity: 1,
    visibility: "visible",
  },
  mainLogo: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      display: "table",
      margin: '0 auto',
    }
  },
  menuIcon: {
    position: "absolute",
    left: 0,
    top: 0,
    "& svg": {
      verticalAlign: "middle"
    },
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  searchMobileIcon: {
    position: "absolute",
    right: 0,
    top: 0,
    color: "#fff",
    "& svg": {
      verticalAlign: "middle",
    },
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  userImage: {
    [theme.breakpoints.down("sm")]: {
      padding: [[10, 20]],
      borderBottom: "1px solid rgba(255,255,255,0.2)",
      display: "flex",
      alignItems: "center"
    },
    "& span": {
      marginLeft: 10,
      [theme.breakpoints.up("md")]: {
        display: "none"
      }
    },
    "& img": {
      width: "40px",
      height: "40px",
      objectFit: "cover",
      borderRadius: "100%",
      display: "block",
      border: "2px solid #336278",
      cursor: "pointer",
    },
  },
  headerMenu: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileDropdownMenu: {
    "& .MuiListItem-root": {
      fontSize: 14,
    },
    "& .MuiListItem-root svg": {
      fontSize: 18,
      marginRight: 5,
    },
    "& .MuiMenu-paper": {
      top: "55px !important",
      minWidth: 200,
      [theme.breakpoints.down("960")]: {
        top: "125px !important",
        left: "20px !important",
        right: 0,
      },
      [theme.breakpoints.down("600")]: {
        top: "112px !important",
      }
    },
  },
  headerBtn: {
    float: "right",
    width: "100%",
    "& button + button": {
      marginLeft: 10,
    },
  },
  headerRight: {
    textAlign: "right",
    "& .MuiFormGroup-root": {
      position: "relative",
    },
  },
  typography: {
    padding: theme.spacing(2),
    paddingBottom: '0px',
    width: '50vh'
  },
  mobileHeader: {
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      zIndex: 1,
    }
  },
  seeMore: {
    marginBottom: '8px',
    marginTop: '8px',
    marginLeft: '40%',
  },
  profileField: {
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  notificationsList: {
    padding: 0,
    borderBottom: '3px solid #f2f2f2'
  },
  noData: {
    display: 'flex',
    justifyContent: 'center'
  },
  loader: {
    padding: '10 0'
  }
}));

export default function Header() {
  const [userInfo, setUserInfo] = React.useState(Auth.getUserDetail());
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [search, setSearch] = React.useState('');
  const [notificationData, setNotificationData] = React.useState();
  const [mainMenu, setMainMenu] = React.useState(false);
  const [searchToggle, setSearchToggle] = React.useState(false);
  const [loader, setLoader] = React.useState(false);

  const [headerModal, setHeaderModal] = React.useState(null);
  const dispatch = useDispatch()

  useEffect(() => {
    function onStorageChange() {
      const userInfo = Auth.getUserDetail();
      setUserInfo(userInfo);
    }
    localStoreUtil.addSubscriber('userInfo', onStorageChange);

    return () => {
      localStoreUtil.clearAllSubscriptions();
    }
  }, [])


  const getNotifications = async () => {
    setLoader(true)
    const response = await ApiGet("notification");
    try {
      if (response.data.status === 200) {
        setNotificationData(response.data.data);
        setLoader(false)
      } else {
        setLoader(false)
      }
    } catch (err) {
      setLoader(false)
    }
  };


  const handleClick = (event) => {
    setHeaderModal(event.currentTarget);
    setMainMenu(!mainMenu)
    getNotifications();
  };

  const handleClosed = () => {
    setHeaderModal(null);
  };

  const open = Boolean(headerModal);
  const id = open ? "simple-popover" : undefined;

  const handleProfileMenuOpen = (event) => {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
      document.body.classList.add("dropdownOpen");
    }
  };

  const handleClose = () => {
    document.body.classList.remove("dropdownOpen");
    setAnchorEl(null);
  };

  const onLogout = () => {
    handleClose();
    setNotificationData()
    dispatch(logout())
    localStorage.clear();
    localStorage.setItem('visited', 'true')
    history.push("/");
  };
  const searchHandler = (e) => setSearch(e.target.value);

  const searchSubmitHandler = (event) => {
    event.preventDefault();
    if (search) {
      setSearch("");
      history.push({
        pathname: "/search",
        searchName: search,
      });
    }
  };

  const notificationBusinessRoutes = [
    {
      type: "ACCEPT_PROPOSAL",
      route: "/proposals",
    },
    {
      type: "ACCEPT_COMPLETE_PROPOSAL",
      route: "/proposals",
    },
    {
      type: "COMPLETE_PROPOSAL",
      route: "/proposals",
    },
    {
      type: "APPLY_CAMPAIGN",
      route: "/proposals",
    },
  ];
  const notificationSMIRoutes = [
    {
      type: "ACCEPT_PROPOSAL",
      route: "/smi/my-campaign",
    },
    {
      type: "ACCEPT_COMPLETE_PROPOSAL",
      route: "/smi/my-campaign",
    },
  ];

  const getNotificationRoute = (type) => {
    if (userInfo.user_role === 'SMI') {
      const index = notificationSMIRoutes.findIndex((item) => item.type === type)
      if (index > -1) {
        return notificationSMIRoutes[index].route;
      }
      return '/'
    }
    else {
      const index = notificationBusinessRoutes.findIndex((item) => item.type === type)
      if (index > -1) {
        return notificationBusinessRoutes[index].route;
      }
      return '/'
    }

  };

  const notificationRoutes = (type) => {
    history.push(getNotificationRoute(type))
    setHeaderModal(null);
  }

  const seeMoreNotificationHandler = (type) => {
    setHeaderModal(null);
    history.push({
      pathname: '/my-account',
      state: type
    })
  }



  return (
    <div className={classes.headerWrap}>
      <AppBar position="fixed" color="secondary" elevation={0}>
        <Toolbar disableGutters>
          <Container>
            <Grid container alignItems="center">
              {Auth.isUserAuthenticat() ? (
                <Grid item md={3} xs={12}>
                  <div className={`${classes.siteLogo} ${classes.mainLogo}`}>
                    <Link to="/">
                      <Typography variant="h5" component="h1">
                        PROMOTION MASTER
                      </Typography>
                    </Link>
                  </div>
                </Grid>
              ) : (
                <Grid item md={3} xs={4}>
                  <div className={classes.siteLogo}>
                    <Link to="/">
                      <Typography variant="h5" component="h1">
                        PROMOTION MASTER
                      </Typography>
                    </Link>
                  </div>
                </Grid>
              )}
              <Grid item md={9} xs={8}>
                <div className={`${classes.headerRight} ${Auth.isUserAuthenticat() ? classes.mobileHeader : ""}`}>
                  <div className={classes.headerMenu}>
                    {Auth.isUserAuthenticat() ? (
                      <>
                        <form
                          onSubmit={(event) => searchSubmitHandler(event)}
                        >
                          <Paper component="div" className={classes.searchBox}>
                            <div className={classes.searchMobileIcon} onClick={() => setSearchToggle(!searchToggle)}>
                              {
                                !searchToggle ? <SearchIcon /> : <CloseIcon />
                              }
                            </div>
                            <div className={`${classes.searchWrap} ${searchToggle ? classes.searchToggleOpen : undefined}`}>
                              <InputBase
                                className={classes.input}
                                placeholder="Search..."
                                inputProps={{
                                  "aria-label": "search google maps",
                                }}
                                onChange={searchHandler}
                                value={search}
                                onKeyPress={(event) =>
                                  event.key === "Enter"
                                    ? searchSubmitHandler(event)
                                    : null
                                }
                              />
                              <IconButton
                                className={classes.iconButton}
                                aria-label="search"
                                type="submit"
                                onClick={(event) => {
                                  searchSubmitHandler(event);
                                }}
                              >
                                <SearchIcon />
                              </IconButton>
                            </div>
                          </Paper>
                        </form>
                        <div className={`${classes.menuIcon} ${mainMenu ? classes.menuIconOpen : undefined}`} onClick={() => setMainMenu(!mainMenu)}>
                          {
                            !mainMenu ? <MenuIcon /> : <CloseIcon />
                          }
                        </div>
                        <div className={`${classes.mainMenu} ${mainMenu ? classes.mainMenuOpen : undefined}`}>
                          {Auth.isUserAuthenticat() && (
                            <div
                              className={classes.userImage}
                              onClick={handleProfileMenuOpen}
                            >
                              <img src={userInfo.image ? userInfo.image : userImage} alt="" />
                              <span>
                                {userInfo && userInfo.first_name
                                  ? userInfo.first_name
                                  : userInfo.business_name}
                              </span>
                              <Menu
                                id="menu-appbar"
                                className={classes.profileDropdownMenu}
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                  vertical: "bottom",
                                  horizontal: "right",
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                              >
                                <MenuItem onClick={() => seeMoreNotificationHandler('Account Setting')}>
                                  <PersonIcon />
                                  {userInfo && userInfo.first_name
                                    ? userInfo.first_name
                                    : userInfo.business_name}
                                </MenuItem>
                                <MenuItem onClick={onLogout}>
                                  <ExitToAppIcon />
                                    Log out
                                  </MenuItem>
                              </Menu>
                            </div>
                          )}
                          <List>
                            <ListItem>
                              <Link
                                to={
                                  userInfo.user_role === "SMI"
                                    ? "/smi/home"
                                    : "/home"
                                }
                                onClick={() => setMainMenu(!mainMenu)}
                              >
                                Home
                          </Link>
                            </ListItem>
                            <ListItem>
                              <Link
                                to={
                                  userInfo.user_role === "SMI"
                                    ? "/smi/influencer"
                                    : "/influencer"
                                }
                                onClick={() => setMainMenu(!mainMenu)}
                              >
                                Influencers
                          </Link>
                            </ListItem>
                            <ListItem>
                              <Link
                                to={
                                  userInfo.user_role === "SMI"
                                    ? "/smi/campaigns"
                                    : "/campaigns"
                                }
                                onClick={() => setMainMenu(!mainMenu)}
                              >
                                Campaigns
                          </Link>
                            </ListItem>
                            {userInfo.user_role === "SMI" && (
                              <ListItem>
                                <Link to="/smi/my-campaign">My Campaigns</Link>
                              </ListItem>
                            )}
                            <ListItem>
                              <Link
                                to={
                                  userInfo.user_role === "SMI"
                                    ? "/smi/proposals"
                                    : "/proposals"
                                }
                                onClick={() => setMainMenu(!mainMenu)}
                              >
                                Proposals
                          </Link>
                            </ListItem>
                            <ListItem>
                              <Link to="/my-account" onClick={() => setMainMenu(!mainMenu)}>Account</Link>
                            </ListItem>
                            <ListItem>
                              <span onClick={() => setMainMenu(!mainMenu)}>Notifications</span>
                              <NotificationsNoneIcon
                                onClick={handleClick}
                                style={{ cursor: "pointer" }}
                              ></NotificationsNoneIcon>
                              <Popover
                                id={id}
                                open={open}
                                anchorEl={headerModal}
                                onClose={handleClosed}
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "center",
                                }}
                                transformOrigin={{
                                  vertical: "top",
                                  horizontal: "center",
                                }}
                              >
                                <Typography className={classes.typography}>
                                  <div className={classes.profileField}>
                                    {loader ?
                                      <>
                                        <div className={classes.loader}>
                                          <Loader />
                                        </div>
                                      </> :
                                      notificationData && notificationData.length === 0 ?
                                        <p className={classes.noData}>No data found</p>
                                        :
                                        <>
                                          {notificationData &&
                                            notificationData.slice(0, 5).map((item) => {
                                              return (
                                                <>
                                                  <List className={classes.notificationsList}>
                                                    <ListItem alignItems="flex-start" disableGutters>
                                                      <ListItemText
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => notificationRoutes(item.notification_type)}
                                                        primary={item.campaign_name.charAt(0).toUpperCase() + item.campaign_name.slice(1)}
                                                        secondary={
                                                          <React.Fragment>
                                                            <Typography
                                                              component="span"
                                                              variant="body2"
                                                              className={classes.inline}
                                                              color="textPrimary"
                                                            >
                                                            </Typography>
                                                            {item.notification_message}
                                                          </React.Fragment>
                                                        }
                                                      />
                                                    </ListItem>
                                                  </List>
                                                </>
                                              );
                                            })}
                                          < Button className={classes.seeMore} onClick={() => seeMoreNotificationHandler('Notifications')}>See More  </Button>
                                        </>
                                    }
                                  </div>
                                </Typography>
                              </Popover>
                            </ListItem>
                          </List>
                        </div>
                      </>
                    ) : (
                      <div className={classes.headerBtn}>
                        <Button
                          color="inherit"
                          disableElevation
                          onClick={() => history.push("/login")}
                        >
                          Sign In
                        </Button>
                        <Button
                          color="primary"
                          variant="contained"
                          disableElevation
                          onClick={() => history.push("/signup")}
                        >
                          Sign Up
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </div >
  );
}
