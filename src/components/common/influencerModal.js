import React from "react";
import {
  makeStyles,
  Grid,
  List,
  ListItem,
} from "@material-ui/core";
import CustomModal from "../common/CustomModal";
import userImage from "../../assets/images/user-image.png";
import { getStars } from "../../helpers/utils";
  
const useStyles = makeStyles((theme) => ({
  userDetail: {
    display: "flex",
    "& .MuiListItem-root": {
      justifyContent: "center",
      fontFamily: "Helvetica-Bold",
    },
    "& svg": {
      fontSize: 18,
    },
  },
  socialFollow: {
    display: "flex",
    "& > span": {
      maxWidth: "70px",
      width: "100%",
      fontFamily: "Helvetica-Bold",
    },
  },
  followInfo: {
    marginLeft: 10,
    fontWeight: "900",
    "& span": {
      margin: "0 15px",
    },
  },
  socialFollowWrap: {
    marginTop: 20,
  },
  btnGroup: {
    "& button + button": {
      marginTop: 10,
    },
  },
}));

export default function InfluencerModal({
  influencerData,
  handleClose,
  open,
  ...props
}) {
  
const social = Object.keys(influencerData);

  const classes = useStyles();
  return (
    <div>
      <CustomModal
        open={open}
        maxWidth="md"
        handleClose={handleClose}
        closeIcon={true}
        {...props}
      >
        <Grid container spacing={3}>
          <Grid item md={3}>
            <div className={classes.userImg}>
              <img
                src={
                  influencerData && influencerData.image
                    ? "http://" + influencerData.image
                    : userImage
                }
                alt="userimage"
              />
            </div>
          </Grid>
          <Grid item md={9}>
            <List className={classes.userDetail}>
              <ListItem>UserName</ListItem>
              <ListItem>Zip</ListItem>
              <ListItem>Influencer Review</ListItem>
              <ListItem>Campaigns Completed</ListItem>
            </List>
            {influencerData && (
              <List className={classes.userDetail}>
                <ListItem>{influencerData.user_name}</ListItem>
                <ListItem>{influencerData.business_zipcode}</ListItem>
                <ListItem>{influencerData.industry}</ListItem>
                <ListItem>{influencerData.follower}</ListItem>
                <ListItem>{getStars(influencerData.stars)}</ListItem>
                <ListItem>{influencerData.campaign_count}</ListItem>
              </List>
            )}
          </Grid>
        </Grid>
        <div className={classes.socialFollowWrap}>
          <Grid container>
            {social.map((data, ind) => {
              return (
                influencerData[data] && influencerData[data]?.follower > 0 &&
                
                <Grid key={ind} item md={6}>
                  <div className={classes.socialFollow}>
                    <span>{data}</span>
                    <div className={classes.followInfo}>
                      <span>{influencerData[data].url && "Link: "+ influencerData[data].url}</span>
                      <span>Follower: {
                                    influencerData[data].follower
                                      ? influencerData[data].follower
                                      : 0
                                  }</span>
                    </div>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </CustomModal>
    </div>
  );
}
