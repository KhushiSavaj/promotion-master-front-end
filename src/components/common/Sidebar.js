import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import LegendBox from './LegendBox';
import { useSelector, useDispatch } from "react-redux";
import { favorite } from '../../redux/favorite/FavoriteAction';
import userImage from "../../assets/images/user-avatar.png";
import { getStars } from "../../helpers/utils";
import NoDataImage from '../../assets/images/nodataImage.png'
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    favoriteInfluencers: {
        padding: 20
    },
    favoriteUsers: {
        display: "flex",
        alignItems: "flex-start",
        width: "100%",
        "&:not(:last-child)": {
            marginBottom: 15
        }
    },
    userName: {
        cursor: "pointer",
        textTransform: "capitalize",
        lineHeight: "normal",
    },
    userImg: {
        marginRight: 10,
        "& img": {
            borderRadius: "100%",
            width: 40,
            height: 40,
            objectFit: "cover",
            display: "block"
        }
    },
    star: {
        lineHeight: "normal",
        "& svg": {
            fontSize: 16,
            color: "#32CD32",
            verticalAlign: "middle"
        }
    },
    widgetTitle: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 15
    },
    favoriteUsersList: {
        maxHeight: '100vh',
        overflowY: "auto"
    },
    InfluencerFixedBox: {
        [theme.breakpoints.up("md")]: {
            position: "sticky",
            top: 85,
        },
        maxHeight: 'fit-content'
    }
}));

export default function Sidebar({ favoriteInfluencers, googleAds, ...props }) {
    const classes = useStyles();
    const history = useHistory()
    const dispatch = useDispatch()
    const favorites = useSelector(state => state.favoriteReducer)
    useEffect(() => {
        dispatch(favorite())
    }, [dispatch])

    return (
        <React.Fragment {...props}>
            {
                favorites &&
                <div className={classes.InfluencerFixedBox}>
                    <LegendBox>
                        <div className={classes.favoriteInfluencers}>
                            <div className={classes.widgetTitle}>Favorites Influencers</div>
                            <div className={classes.favoriteUsersList}>
                                {favorites.loading ? <div>Loading...</div> : favorites.favorite.length === 0 ? <img src={NoDataImage} alt="No Data Found" /> : favorites.favorite && favorites.favorite.map((obj, index) => {
                                   return (
                                        <div
                                            className={classes.favoriteUsers}
                                            key={index}
                                            onClick={() =>
                                                history.push({
                                                    pathname: '/influencer-details',
                                                    state: obj._id
                                                })
                                            }>
                                            <div className={classes.userImg}>
                                                <img src={obj.image ? obj.image : userImage} alt="" />
                                            </div>
                                            <div className={classes.userInfo}>
                                                <div className={classes.userName}>{obj.user_name}</div>
                                                <div className={classes.star}>
                                                    {getStars(obj.stars)}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                }
                            </div>
                        </div>
                    </LegendBox>
                </div>
            }

        </React.Fragment>
    )
}
