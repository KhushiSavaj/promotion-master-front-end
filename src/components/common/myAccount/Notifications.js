import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core';
import LegendBox from '../LegendBox'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import NoData from "../../common/NoData";
import { ApiGet } from "../../../helpers/API/ApiData";
import Loader from "../../common/Loader";
import Auth from '../../../helpers/Auth';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    profileWrap: {
        "& .MuiFormGroup-root": {
            "&:not(:last-child)": {
                marginBottom: 25,
            },
            "& .MuiFormLabel-root": {
                marginBottom: "10px !important",
            },
        },
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20
    },
    profileField: {
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 5,
        marginBottom: 15,
    },
    notificationsList: {
        padding: 0
    }
}));

export default function Notifications() {
    const classes = useStyles();
    const userInfo = Auth.getUserDetail()
    const history = useHistory()
    const [notificationData, setNotificationData] = React.useState();
    const [loader, setLoader] = React.useState(false);


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

    useEffect(() => {
        getNotifications();
    }, []);


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
    }

    return (
        <div className={classes.profileWrap}>
            <LegendBox>
                <div className={classes.profileField}>
                    <div className={classes.title}>Notifications</div>
                    <List className={classes.notificationsList}>
                        {
                            loader ? <div className="loader">
                                <Loader />
                            </div>
                                :
                                notificationData && notificationData.length ?
                                    notificationData.map((item) => {
                                        return (
                                            <>
                                                <ListItem alignItems="flex-start" disableGutters onClick={() => notificationRoutes(item.notification_type)} style={{cursor:'pointer'}}>
                                                    <ListItemAvatar>
                                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                                    </ListItemAvatar>
                                                    <ListItemText
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
                                                <Divider component="li" />
                                            </>
                                        )
                                    }) :
                                    <NoData />
                        }
                    </List>
                </div>
            </LegendBox>
        </div>
    )
}
