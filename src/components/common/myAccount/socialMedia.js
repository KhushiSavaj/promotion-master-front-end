import React, { useState, useEffect } from "react";
import { FormGroup, Grid, Button, makeStyles, CircularProgress } from "@material-ui/core";
import CustomTextField from "../CustomTextField";
import Auth from "../../../helpers/Auth";
import { useForm } from "react-hook-form";
import { ApiPut } from "../../../helpers/API/ApiData";
import { toast } from "react-toastify";
import * as userUtil from "../../../utils/user.util";
import Facebook from '../../../assets/images/facebook.png';
import Instagram from '../../../assets/images/instagram.png';
import Linkdin from '../../../assets/images/linkdin.png';
import Pinterest from '../../../assets/images/pintrest.png';
import SnapChat from '../../../assets/images/snapchat.png';
import TikTok from '../../../assets/images/tiktok.png';
import Twitter from '../../../assets/images/twitter.png';
import YouTube from '../../../assets/images/youtube.png';


const userInfo = Auth.getUserDetail()

const useStyles = makeStyles((theme) => ({
  socialGrid: {
    alignItems: "center",
    display: "flex",
    textTransform: "capitalize",
  },
  socialMediaList: {
    padding: 20
  },
  socialLink: {
    position: "relative",
    "& .MuiInputBase-input": {
      paddingLeft: 40
    }
  },
  socialImg: {
    position: "absolute",
    left: 10,
    top: 10,
    zIndex: 9,
    "& img": {
      maxWidth: 20
    }
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20
  },
  syncBtn: {
    marginTop: 15
  },
  userInput: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: 10
    }
  }
}));


const socialAccounts = {
  Facebook: {
    url: userInfo.social_accounts && userInfo.social_accounts['facebook'].url ? userInfo.social_accounts['facebook'].url : '',
    label: 'Facebook',
    image: Facebook,
    followers: userInfo.social_accounts && userInfo.social_accounts['facebook'].follower ? userInfo.social_accounts['facebook'].follower : null,
    error: ''
  },
  Instagram: {
    url: userInfo.social_accounts && userInfo.social_accounts['instagram'].url ? userInfo.social_accounts['instagram'].url : '',
    label: 'Instagram',
    image: Instagram,
    followers: userInfo.social_accounts && userInfo.social_accounts['instagram'].follower ? userInfo.social_accounts['instagram'].follower : null,
    error: ''
  },
  Twitter: {
    url: userInfo.social_accounts && userInfo.social_accounts['twitter'].url ? userInfo.social_accounts['twitter'].url : '',
    label: 'Twitter',
    image: Twitter,
    followers: userInfo.social_accounts && userInfo.social_accounts['twitter'].follower ? userInfo.social_accounts['twitter'].follower : null,
    error: ''
  },
  Snapchat: {
    url: userInfo.social_accounts && userInfo.social_accounts['snapchat'].url ? userInfo.social_accounts['snapchat'].url : '',
    label: 'Snapchat',
    image: SnapChat,
    followers: userInfo.social_accounts && userInfo.social_accounts['snapchat'].follower ? userInfo.social_accounts['snapchat'].follower : null,
    error: ''
  },
  TikTok: {
    url: userInfo.social_accounts && userInfo.social_accounts['tiktok'].url ? userInfo.social_accounts['tiktok'].url : '',
    label: 'TikTok',
    image: TikTok,
    followers: userInfo.social_accounts && userInfo.social_accounts['tiktok'].follower ? userInfo.social_accounts['tiktok'].follower : null,
    error: ''
  },
  YouTube: {
    url: userInfo.social_accounts && userInfo.social_accounts['youtube'].url ? userInfo.social_accounts['youtube'].url : '',
    label: 'YouTube',
    image: YouTube,
    followers: userInfo.social_accounts && userInfo.social_accounts['youtube'].follower ? userInfo.social_accounts['youtube'].follower : null,
    error: ''
  },
  Pinterest: {
    url: userInfo.social_accounts && userInfo.social_accounts['pinterest'].url ? userInfo.social_accounts['pinterest'].url : '',
    label: 'Pinterest',
    image: Pinterest,
    followers: userInfo.social_accounts && userInfo.social_accounts['pinterest'].follower ? userInfo.social_accounts['pinterest'].follower : null,
    error: ''
  },
  Linkedin: {
    url: userInfo.social_accounts && userInfo.social_accounts['linkedin'].url ? userInfo.social_accounts['linkedin'].url : '',
    label: 'Linkedin',
    image: Linkdin,
    followers: userInfo.social_accounts && userInfo.social_accounts['linkedin'].follower ? userInfo.social_accounts['linkedin'].follower : null,
    error: ''
  },
}

export default function SocialMedia() {
  const classes = useStyles();
  const [socialMediaList, setSocialMediaList] = useState(socialAccounts)

  const { setValue } = useForm();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setValue("object", Auth.getUserDetail());
  }, [setValue]);

  const socialMediaUrlHandler = (e) => {
    setSocialMediaList({
      ...socialMediaList,
      [e.target.name]: {
        ...socialMediaList[e.target.name],
        url: e.target.value,
        error: ''
      }
    })
  }

  const socialMediaFollowerHandler = (e) => {
    const testSpecialCharacter = (/[ !~`@#$%^&*()_+\-={};':"\\|,.<>/?]/).test(e.target.value)
    const testAlphabet = (/[a-zA-Z]/).test(e.target.value)
    const testForBracketOpen = (/[[]/).test(e.target.value)
    const testForBracketClose = (/([^[]+(?=]))/g).test(e.target.value)

    if (testSpecialCharacter || testAlphabet || testForBracketOpen || testForBracketClose) {
      setSocialMediaList({
        ...socialMediaList,
      })
    }
    else {
      setSocialMediaList({
        ...socialMediaList,
        [e.target.name]: {
          ...socialMediaList[e.target.name],
          followers: e.target.value,
          error: ''
        }
      })
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const isEmpty = Object.values(socialMediaList).filter((item) => {
      if ((item.url && !item.followers) || (!item.url && item.followers)) {
        setSocialMediaList({
          ...socialMediaList,
          [item.label]: {
            ...socialMediaList[item.label],
            error: 'Please fill both the field'
          }
        })
        return true
      }
      else if (item.url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g) === null) {
        setSocialMediaList({
          ...socialMediaList,
          [item.label]: {
            ...socialMediaList[item.label],
            error: 'Please enter valid url'
          }
        })
        return true
      }
      return false
    })
    if (!isEmpty.length) {
      setLoader(true);
      const socialMediaData = {}

      Object.values(socialMediaList).forEach((item) => {
        socialMediaData[item.label.toLowerCase()] = {
          url: item.url,
          follower: item.followers
        }
      })

      let data = {
        _id: userInfo._id,
        social_accounts: { ...socialMediaData }
      }

      var form_data = new FormData();
      form_data.append("social_accounts", JSON.stringify(data.social_accounts));
      form_data.append("_id", userInfo._id);
      const res = await ApiPut("user/", form_data);
      try {
        if (res.data.status === 200) {
          userUtil.setUserInfo(res.data.data);
          setLoader(false);
          toast.success(res.data.message, { autoClose: 5000 });
        } else {
          setLoader(false);
          toast.error(res.data.message, { autoClose: 5000 });
        }
      } catch (err) {
        setLoader(false);
        toast.error("Internal server error", { autoClose: 5000 });
      }
      setLoader(false);
    }
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <div className={classes.socialMediaList}>
        <div className={classes.title}>Social Accounts</div>
        {
          Object.values(socialMediaList).map(item => {
            return (
              <>
                <div className={classes.userInput}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item sm={10} xs={12}>
                      <FormGroup>
                        <div className={classes.socialLink}>
                          <div className={classes.socialImg}><img src={item.image} alt="" /></div>
                          <CustomTextField
                            fullWidth
                            name={item.label}
                            type="text"
                            variant="filled"
                            placeholder={`${item.label} Profile URL`}
                            autoComplete="false"
                            value={item.url}
                            onChange={(e) => socialMediaUrlHandler(e)}
                          />
                        </div>
                      </FormGroup>
                    </Grid>
                    <Grid item sm={2} xs={12}>
                      <FormGroup>
                        <CustomTextField
                          fullWidth
                          name={item.label}
                          variant="filled"
                          type="text"
                          placeholder="Followers"
                          autoComplete="false"
                          value={item.followers}
                          onChange={(e) => socialMediaFollowerHandler(e)}
                        ></CustomTextField>
                      </FormGroup>
                    </Grid>
                  </Grid>
                  {item.error ? <p style={{ color: 'red' }}>{item.error}</p> : null}
                </div>
              </>
            )
          })
        }
        <div className={classes.syncBtn}>
          <Grid
            container
            justify="center"
            alignItems="center"
          >
            <Grid item md={4}>
              {loader ? (
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  disableElevation
                >
                  <CircularProgress color="inherit" size={24} />
                </Button>
              ) : (
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  disableElevation
                  type="submit"
                >
                  Save Social Accounts
                </Button>
              )}
            </Grid>
          </Grid>
        </div>
      </div>
    </form>
  );
}
