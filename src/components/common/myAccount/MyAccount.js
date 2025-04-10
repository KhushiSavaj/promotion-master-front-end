import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid } from "@material-ui/core";
import Auth from "../../../helpers/Auth";
import CustomTabs from "../CustomTab";
import Profile from "./profile";
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import PaymentOutlinedIcon from '@material-ui/icons/PaymentOutlined';
import SocialAccount from "./SocialAccount";
import ChangePassword from "./ChangePassword";
import Notifications from "./Notifications";
import BillingDetails from "./BillingDetails";
import { ApiGet } from "../../../helpers/API/ApiData";
import * as userUtil from "../../../utils/user.util";

const tabsBusiness = [
  {
    label: 'Account Setting',
    icon: <PersonOutlinedIcon />,
    tabComponent: <Profile />
  },
  {
    label: 'Change Password',
    icon: <LockOutlinedIcon />,
    tabComponent: <ChangePassword />
  },
  {
    label: 'Notifications',
    icon: <NotificationsOutlinedIcon />,
    tabComponent: <Notifications />
  },
]
const tabsSmi = [
  {
    label: 'Account Setting',
    icon: <PersonOutlinedIcon />,
    tabComponent: <Profile />
  },
  {
    label: 'Change Password',
    icon: <LockOutlinedIcon />,
    tabComponent: <ChangePassword />
  },
  {
    label: 'Social Account',
    icon: <ShareOutlinedIcon />,
    tabComponent: <SocialAccount />
  },
  {
    label: 'Notifications',
    icon: <NotificationsOutlinedIcon />,
    tabComponent: <Notifications />
  },
  {
    label: 'Billing Details',
    icon: <PaymentOutlinedIcon />,
    tabComponent: <BillingDetails />
  },
]

const getTabs = (userRole) => userRole === 'BUSINESS' ? tabsBusiness : tabsSmi

const getIndexOfNotification = (role, type) => {
  return getTabs(role).findIndex(item => item.label === type)
}

const useStyles = makeStyles((theme) => ({
  profilSection: {
    padding: [[20, 0]],
  },
  campaignsFind: {
    paddingTop: 10,
  },
  campaignsFindBtn: {
    maxWidth: 500,
    margin: "0 auto 30px",
  },
}));



export default function MyAccount(props) {

  const classes = useStyles();
  const userInfo = Auth.getUserDetail();
  const [value, setTabValue] = React.useState(0);
  // const accountLinkFromQueryParams = new URLSearchParams(props.location.search).get('link');

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  useEffect(() => {
    // if (accountLinkFromQueryParams) {
    //   userInfo.accountLinked = true
    //   userUtil.setUserInfo(userInfo);
    // }
    const fetchData = async () => {
      const res = await ApiGet("user/homepage");
      try {
        if (res.data.status === 200) {
          userUtil.setUserInfo(res.data.data.user || res.data.data)
        }
      } catch (err) {
      }
    };
    fetchData();

    if (props.location.state) {
      setTabValue(getIndexOfNotification(userInfo.user_role, props.location.state))
    }
  }, [userInfo.user_role, props.location.state])

  return (
    <React.Fragment>
      <div className={classes.profilSection}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <CustomTabs orientation="vertical" tabs={getTabs(userInfo.user_role)} handleChange={handleChange} value={value} />
            </Grid>
          </Grid>
        </Container>
      </div>
    </React.Fragment>
  );
}
