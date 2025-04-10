import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Container, Grid, ListItem, ListItemText, Tabs, Typography } from "@material-ui/core";
import userImage from "../../assets/images/user-avatar.png";
import facebook from '../../assets/images/facebook.png';
import instagram from '../../assets/images/instagram.png';
import linkedin from '../../assets/images/linkdin.png';
import pinterest from '../../assets/images/pintrest.png';
import snapchat from '../../assets/images/snapchat.png';
import tiktok from '../../assets/images/tiktok.png';
import twitter from '../../assets/images/twitter.png';
import youtube from '../../assets/images/youtube.png';
import { getStars } from "../../helpers/utils";
import { ApiGet } from "../../helpers/API/ApiData";
import NoData from "./NoData";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: 'transparent',
        '& .MuiAppBar-root': {
            boxShadow: 'none',
            position: "sticky",
            top: 84,
            zIndex: 1
        },
        '& .MuiAppBar-colorPrimary': {
            backgroundColor: 'transparent',
            color: theme.palette.primary.main,
            borderBottom: 0
        },
        '& .MuiTabs-scroller': {
            minHeight: '50vh',
            '& span': {
                backgroundColor: 'transparent',
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                "& *:first-child": {
                    marginBottom: 0,
                    marginRight: 15
                }
            }
        },
        '& .MuiTab-textColorInherit': {
            color: '#353535',
            opacity: '1',
            textTransform: 'capitalize',
            fontSize: 18,
            borderRadius: 5
        },
        '& .MuiTab-textColorInherit.Mui-selected': {
            color: '#32CD32',
            position: 'relative',
            borderColor: "#32CD32",
            '&::after': {
                content: '""',
                position: 'absolute',
                width: '80%',
                bottom: 0
            }
        },
        '& .MuiTab-root': {
            minWidth: 'unset !important',
            padding: '15px 20px',
            borderRadius: 0,
            fontSize: 16,
            textAlign: "left",
            minHeight: "auto",
            width: "100%",
            borderBottom: "1px solid #ddd",
            maxWidth: "100%",
            "&:last-child": {
                borderBottom: "0",
            }
        }
    },
    tabCustom: {
        borderRadius: 5,
        backgroundColor: "#fff",
        alignItems: 'center'
    },
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
    displayBlock: {
        '& .MuiTabs-flexContainer': {
            display: 'block !important',
            textAlign: 'center'
        }
    },
    followerDetails: {
        display: 'flex',
        paddingTop: 15,
        paddingBottom: 15
    },
    follower: {
        borderRight: '1px solid #e5e5e5',
        borderColor: 'black',
    },
    labelFollower: {
        fontSize: '14px',
        margin: '0px',
        fontWeight: "normal",
        color: "#777",
        padding: '0px'
    },
    followerNumber: {
        fontSize: '18px',
    },
    socialImgWithUrl: {
        padding: 10,
        width: "25%",
        "& img": {
            maxWidth: 24,
            maxHeight: 24,
        },
        cursor: 'pointer'
    },
    socialImgWithOutUrl: {
        padding: 10,
        width: "25%",
        "& img": {
            maxWidth: 24,
            maxHeight: 24,
        },
    },
    socialMediaDetails: {
        display: 'flex',
        flexWrap: "wrap"
    },
    socialFollower: {
        fontSize: 13,
        color: "#777",
        fontWeight: "bold"
    },
    socialImage: {
        maxWidth: '200px',
        padding: [[20, 20, 0, 20]],
        margin: "0 auto"
    },
    urlLink: {
        color: 'black'
    },
    socialMediaList: {
        padding: 20,
        borderRadius: 5,
        backgroundColor: "#fff",
        alignItems: 'center'
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
        display: 'block',
        fontFamily: 'Helvetica-Bold',
    },
    userInput: {
        [theme.breakpoints.down("sm")]: {
            marginBottom: 10
        }
    },
    backButton: {
        marginLeft: 'auto',
        background: '#efefef'
    },
    influencerReview: {
        whiteSpace: 'normal',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginBottom: 10,
        fontSize: 15,
        color: '#000',
        fontStyle: 'italic',

        '& svg': {
            fill: 'green',
            fontSize: 22,
        },

        '& span': {
            fontSize: 12,
            color: '#000',
            padding: [[0, 0, 0, 10]],
            fontFamily: 'LeagueSpartan-Bold',
            lineHeight: 1,
            fontStyle: 'normal',
        }

    },
    reviewBox: {
        display: 'block',

        '& .MuiListItemText-multiline': {
            margin: 0,

            '& .MuiTypography-body1': {
                fontSize: 20,
                color: '#111',
                lineHeight: 1,
                textTransform: 'capitalize',
                marginBottom: 20,
                fontFamily: 'Helvetica-Bold',
            }

        }

    },
    reviewBoxSub: {
        padding: [[0, 0, 0, 50]]
    },
    influencerReviewTitle: {
        fontSize: 16,
        color: '#111',
        lineHeight: 1,
        marginBottom: 10,
        fontFamily: 'Helvetica',
    }
}));

const imagesOfSocialMedia = (item) => {
    switch (item) {
        case 'facebook':
            return facebook
        case 'instagram':
            return instagram
        case 'linkedin':
            return linkedin
        case 'pinterest':
            return pinterest
        case 'snapchat':
            return snapchat
        case 'tiktok':
            return tiktok
        case 'twitter':
            return twitter
        case 'youtube':
            return youtube
        default:
            break;
    }
}

export default function InfluencerDetails(props) {
    const classes = useStyles();
    const [viewDataInfluencer, setViewDataInfluencer] = React.useState()
    const id = props.location.state


    useEffect(() => {
        const fetchData = async () => {
            const res = await ApiGet(`user/${id}`);
            try {
                if (res.data.status === 200) {
                    setViewDataInfluencer(res.data.data)
                }
            } catch (error) {
            }
        };
        fetchData();
    }, [id])

    const openUrlPage = (url) => {
        window.open(`http://${url}`, '_blank',)
    }

    return (
        <React.Fragment>
            {
                viewDataInfluencer &&
                <div className={classes.profilSection}>
                    <Container>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <div>
                                    <div className={classes.root}>
                                        <Grid container spacing={3}>
                                            <Grid item md={3} xs={12}>
                                                <AppBar color="inherit" className={classes.displayBlock} position="static">
                                                    <Tabs variant="scrollable" className={classes.tabCustom} >
                                                        <div>
                                                            <div className={classes.socialImage}>
                                                                <img
                                                                    src={viewDataInfluencer.image ? viewDataInfluencer.image : userImage}
                                                                    alt="influencerImage"
                                                                />
                                                            </div>
                                                            <div className={classes.userInfo} align="center">
                                                                <Typography component='h6' variant="h6">{viewDataInfluencer.first_name}{viewDataInfluencer.last_name}</Typography>
                                                                <Typography component='span' variant="body2">{viewDataInfluencer.email}</Typography>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <Grid item xs={12} className={classes.followerDetails}>
                                                                <Grid item xs={6} className={classes.follower}>
                                                                    <h3 className={classes.labelFollower}>Followers</h3>
                                                                    <div className={classes.followerNumber}>{viewDataInfluencer.followersCount}</div>
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    <h3 className={classes.labelFollower}>Following</h3>
                                                                    <div className={classes.followerNumber}>{viewDataInfluencer.followingCount}</div>
                                                                </Grid>
                                                            </Grid>
                                                        </div>
                                                        <div className={classes.socialMediaDetails}>
                                                            {
                                                                viewDataInfluencer.social_accounts &&
                                                                Object.keys(viewDataInfluencer.social_accounts).map((item) => {
                                                                    const image = imagesOfSocialMedia(item)
                                                                    return (
                                                                        <>
                                                                            <div
                                                                                className={viewDataInfluencer.social_accounts[item].url !== '' ? classes.socialImgWithUrl : classes.socialImgWithOutUrl}
                                                                                onClick={() => viewDataInfluencer.social_accounts[item].url !== '' ? openUrlPage(viewDataInfluencer.social_accounts[item].url) : null}
                                                                            >
                                                                                <img src={image} alt="socialMediaLogo" />
                                                                                <div className={classes.socialFollower}>{viewDataInfluencer.social_accounts[item].follower}</div>
                                                                            </div>
                                                                        </>
                                                                    )
                                                                })

                                                            }
                                                        </div>
                                                    </Tabs>
                                                </AppBar>
                                            </Grid>
                                            <Grid item md={9} xs={12}>
                                                <div className={classes.socialMediaList}>
                                                    <div className={classes.title}>
                                                        Influencer Reviews
                                                    </div>
                                                    {
                                                        !Object.values(viewDataInfluencer.businessReview).length ?
                                                            <NoData />
                                                            :
                                                            <div className={classes.userInput}>
                                                                <Tabs>
                                                                    <Grid container spacing={2} alignItems="center">
                                                                        <Grid item sm={12} xs={12}>
                                                                            {
                                                                                Object.values(viewDataInfluencer.businessReview).map(item => {
                                                                                    const data = item[0]
                                                                                    const obj = item[1]
                                                                                    return (
                                                                                        <ul>
                                                                                            {
                                                                                                data &&
                                                                                                <>
                                                                                                    <ListItem alignItems="flex-start" disableGutters className={classes.reviewBox}>
                                                                                                        <ListItemText
                                                                                                            primary={data.campaign_name}

                                                                                                            secondary={
                                                                                                                <React.Fragment>
                                                                                                                    <Typography
                                                                                                                        component="span"
                                                                                                                        variant="body2"
                                                                                                                        className={classes.inline}
                                                                                                                        color="textPrimary"
                                                                                                                    >
                                                                                                                    </Typography>
                                                                                                                    <div className={classes.influencerReview}>
                                                                                                                        {getStars(data.rating)}
                                                                                                                        <span>{data.rating}</span>
                                                                                                                    </div>
                                                                                                                    <div className={classes.influencerReview}>{data.review}</div>
                                                                                                                </React.Fragment>
                                                                                                            }
                                                                                                        />
                                                                                                    </ListItem>
                                                                                                </>
                                                                                            }
                                                                                            { obj &&
                                                                                                <>
                                                                                                    <ListItem alignItems="flex-start" disableGutters className={classes.reviewBoxSub}>
                                                                                                        <ListItemText
                                                                                                            secondary={
                                                                                                                <React.Fragment>
                                                                                                                    <Typography
                                                                                                                        component="span"
                                                                                                                        variant="body2"
                                                                                                                        className={classes.inline}
                                                                                                                        color="textPrimary"
                                                                                                                    >
                                                                                                                    </Typography>
                                                                                                                    <div className={classes.influencerReviewTitle}>Influencer's review to business</div>
                                                                                                                    <div className={classes.influencerReview}>
                                                                                                                        {getStars(obj.rating)}
                                                                                                                        <span>{obj.rating}</span>
                                                                                                                    </div>
                                                                                                                    <div className={classes.influencerReview}>{obj.review}</div>
                                                                                                                </React.Fragment>
                                                                                                            }
                                                                                                        />
                                                                                                    </ListItem>
                                                                                                </>
                                                                                            }
                                                                                        </ul>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </Grid>
                                                                    </Grid>
                                                                </Tabs>
                                                            </div>
                                                    }
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            }
        </React.Fragment>
    );
}
