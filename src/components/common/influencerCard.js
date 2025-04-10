import React from "react";
import { Button, CircularProgress, Grid, makeStyles, Typography } from "@material-ui/core";
import { getStars } from "../../helpers/utils";
import FavoriteIcon from '@material-ui/icons/Favorite';
import userImage from "../../assets/images/user-avatar.png";
import LegendBox from "./LegendBox";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
    cardHeader: {
        padding: [[20, 20, 0, 20]],
        textAlign: "center",
        position: "relative"
    },
    userImg: {
        "& img": {
            borderRadius: "100%",
            width: 70,
            height: 70,
            objectFit: "cover",
            display: "table",
            margin: "0 auto 10px"
        }
    },
    titleText: {
        "& h6": {
            fontWeight: "bold",
            fontSize: 16,
            lineHeight: "normal"
        },
    },
    compaignRate: {
        marginBottom: 8
    },
    star: {
        cursor: "pointer",
        "& svg": {
            fontSize: 16,
            color: "#32CD32",
            verticalAlign: "middle"
        }
    },
    cardFooter: {
        borderTop: "1px solid #e5e5e5",
        padding: 5,
        display: 'flex',
        justifyContent: "space-between",
        alignItems: "center"
    },
    campaignZip: {
        display: "flex",
        marginBottom: 15,
        marginLeft: -15,
        marginRight: -15
    },
    compaignTitle: {
        padding: [[5, 0]],
        fontSize: 14,
        borderBottom: "1px solid #e5e5e5",
        textTransform: "capitalize",
        marginBottom: 10
    },
    priceBox: {
        width: "50%",
        padding: [[0, 10]],
        borderRight: "1px solid #e5e5e5"
    },
    earning: {
        width: "50%",
        padding: [[0, 10]]
    },
    price: {
        color: "#777",
        "& span": {
            color: "#333",
            fontWeight: "bold",
            display: "block",
            fontSize: 20
        },
        "& svg": {
            fontSize: 16,
            verticalAlign: "text-bottom",
            marginLeft: 5,
            cursor: "pointer"
        }
    },
    favorite: {
        color: "#777",
        cursor: 'pointer',
        position: "absolute",
        right: 20,
        top: 20,
        "& svg": {
            fontSize: 20
        }
    },
    inFavorite: {
        color: "#32CD32;",
        cursor: 'pointer',
        position: "absolute",
        right: 20,
        top: 20,
        "& svg": {
            fontSize: 20
        }
    },
    marginNone: {
        marginBottom: 0
    },

}));

export default function InfluencerCard({ handleFavorite, handleUnFavorite, index, loader, data, isOwnInfluencer, swiper, isFavorite, handleClickOpenInfluencer }) {
    const classes = useStyles();
    const favorites = useSelector((state) => state.favoriteReducer.favorite)

    const isInFavorite = (data) => {
        return favorites.map((item) => item._id).includes(data && data._id)
    }

    return (
        <React.Fragment>
            {!swiper ?
                <>
                    <Grid container spacing={3}>
                        {
                            data.map((data, i) => {
                                const isFavorite = isInFavorite(data)
                                return (
                                    <Grid item lg={4} sm={6} xs={12} key={i}>
                                        <LegendBox dimClassName={classes.marginNone}>
                                            <div className={classes.cardWrap}>
                                                <div className={classes.cardHeader}>
                                                    <div className={classes.userDetail}>
                                                        <div className={classes.userImg}>
                                                            <img src={data.image ? data.image : userImage} alt="" />
                                                        </div>
                                                        <div className={classes.titleText}>
                                                            <Typography component="h6" variant="h6">{data.first_name} {data.last_name}</Typography>
                                                            <div className={classes.compaignRate}>
                                                                <div className={classes.star}>
                                                                    {getStars(data.stars)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {isOwnInfluencer !== i && <div className={isFavorite ? classes.inFavorite : classes.favorite}>
                                                        {i === index && loader ?
                                                            <CircularProgress size={15} />
                                                            : <FavoriteIcon onClick={() => isFavorite ? handleUnFavorite(data) : handleFavorite(data)} />}
                                                    </div>}
                                                    <div className={classes.compaignTitle}>campaigns</div>
                                                    <div className={classes.campaignZip}>
                                                        <div className={classes.priceBox}>
                                                            <div className={classes.price}>Completed<span className={classes.textGreen}>{data.campaign_count}</span></div>
                                                        </div>
                                                        <div className={classes.earning}>
                                                            <div className={classes.price}>Earning<span>${data.earnings ? data.earnings : 0}</span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={classes.cardFooter}>
                                                    <Button fullWidth color="inherit" onClick={() => handleClickOpenInfluencer(data)}>View Profile</Button>
                                                </div>
                                            </div>
                                        </LegendBox>
                                    </Grid>
                                )
                            })}
                    </Grid>
                </> :
                <LegendBox dimClassName={classes.marginNone}>
                    <div className={classes.cardWrap}>
                        <div className={classes.cardHeader}>
                            <div className={classes.userDetail}>
                                <div className={classes.userImg}>
                                    <img src={data.image ? data.image : userImage} alt="" />
                                </div>
                                <div className={classes.titleText}>
                                    <Typography component="h6" variant="h6">{data.first_name} {data.last_name}</Typography>
                                    <div className={classes.compaignRate}>
                                        <div className={classes.star}>
                                            {getStars(data.stars)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={isFavorite ? classes.inFavorite : classes.favorite}>
                                {loader ?
                                    <CircularProgress size={15} />
                                    : <FavoriteIcon onClick={() => isFavorite ? handleUnFavorite(data) : handleFavorite(data)} />}
                            </div>
                            <div className={classes.compaignTitle}>campaigns</div>
                            <div className={classes.campaignZip}>
                                <div className={classes.priceBox}>
                                    <div className={classes.price}>Completed<span className={classes.textGreen}>{data.campaign_count}</span></div>
                                </div>
                                <div className={classes.earning}>
                                    <div className={classes.price}>Earning<span>${data.earnings ? data.earnings : 0}</span></div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.cardFooter}>
                            <Button fullWidth color="inherit" onClick={() => handleClickOpenInfluencer(data)}>View Profile</Button>
                        </div>
                    </div>
                </LegendBox>
            }
        </React.Fragment>
    );
}
