import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../common/Sidebar";
import { useHistory } from "react-router-dom";
import { BusinessHomeAction } from "../../../redux/business/Home/BusinessHomeAction";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import { addFavorite, removeFavorite } from "../../../redux/favorite/FavoriteAction";
import InfluencerCard from "../../common/influencerCard";
import CampaignCard from "../../common/CampaignCard";
import NoData from "../../common/NoData";
import Loader from "../../common/Loader";


SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const useStyles = makeStyles((theme) => ({
  homeContent: {
    padding: [[20, 0]],
  },
  refresh: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "-35px",
  },
  refreshHome: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "-9px",
  },
  campaignsCreateBtn: {
    marginBottom: 22,
  },
  campaignsFindBtn: {
    marginTop: 10,
    marginBottom: 20,
  },
  BoxWrap: {
    marginTop: 20,
    "&:not(:last-child)": {
      marginBottom: 20,
    },
  },
  cardHeader: {
    padding: [[15, 15, 0, 15]],
    textAlign: "center",
    position: "relative"
  },
  userImg: {
    "& img": {
      borderRadius: "100%",
      maxWidth: 70,
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
  zipCode: {
    color: "#777",
    textAlign: "right",
    "& svg": {
      fontSize: 16,
      verticalAlign: "middle",
    },
    "& span": {
      verticalAlign: "middle",
      color: "#777"
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
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15
  },

}));

export default function Home() {
  const classes = useStyles();
  const history = useHistory();
  const [pageDataLimit] = useState(10);
  const [index, setIndex] = useState();

  const dispatch = useDispatch();
  const HomeData = useSelector((state) => state.BusinessHomeReducer);

  useEffect(() => {
    dispatch(BusinessHomeAction(1, pageDataLimit));
  }, [dispatch, pageDataLimit]);


  const handleClickOpenInfluencer = (data) => {
    history.push({
      pathname: '/influencer-details',
      state: data._id
    })
  };

  const favorites = useSelector((state) => state.favoriteReducer.favorite)
  const InfluencerFavoriteUnFavoriteLoader = useSelector(state => state.favoriteReducer.buttonLoader)

  const isInFavorite = (data) => {
    return favorites.map((item) => item._id).includes(data && data._id)
  }

  const handleFavorite = async (data) => {
    const indexNo = HomeData.influencer.findIndex(
      (item) => item._id === data._id
    );
    setIndex(indexNo)
    if (indexNo > -1) {
      dispatch(addFavorite(data._id));
    }
  };

  const handleUnFavorite = async (data) => {
    const indexNo = HomeData.influencer.findIndex(
      (item) => item._id === data._id
    );
    setIndex(indexNo)
    if (indexNo > -1) {
      dispatch(removeFavorite(data._id));
    }
  };

  return (
    <React.Fragment>
      {
        <div className={classes.homeContent}>
          <Container>
            {HomeData.error && <p>{HomeData.error}</p>}
            {HomeData.loading ? (
              <div className="loader">
                <Loader />
              </div>
            ) : HomeData.influencer.length === 0 && HomeData.campaignData.length === 0 ? <NoData /> :
              (
                <>
                  <Grid container spacing={3}>
                    <Grid item md={9} xs={12}>
                      <div className={classes.sliderWrap}>
                        <Swiper
                          spaceBetween={30}
                          navigation
                          pagination={{ clickable: true }}
                          breakpoints={{
                            640: {
                              slidesPerView: 1,
                            },
                            768: {
                              slidesPerView: 2,
                            },
                            991: {
                              slidesPerView: 3,
                            },
                          }}
                        >
                          {HomeData &&
                            HomeData.influencer.map((item, i) => {
                              const isFavorite = isInFavorite(item)
                              return (
                                <SwiperSlide key={i}>
                                  <InfluencerCard
                                    data={item}
                                    loader={index === i && InfluencerFavoriteUnFavoriteLoader ? true : false}
                                    handleFavorite={data => handleFavorite(data)}
                                    handleUnFavorite={data => handleUnFavorite(data)}
                                    isFavorite={isFavorite}
                                    swiper={true}
                                    handleClickOpenInfluencer={data => handleClickOpenInfluencer(data)}
                                  /></SwiperSlide>
                              )
                            })
                          }
                        </Swiper>
                        <div className={classes.BoxWrap}>
                          <CampaignCard
                            data={HomeData.campaignData}
                          />
                        </div>
                      </div>
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <Sidebar />
                    </Grid>
                  </Grid>
                </>
              )}
          </Container>
        </div>}
    </React.Fragment>
  );
}
