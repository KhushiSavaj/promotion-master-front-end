import React, { useState, useEffect } from "react";
import {  Container, Grid, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../common/Sidebar";
import { influencerAction, influencerPagination } from '../../../redux/smi/influencer/InfluencerAction'
import { addFavorite, removeFavorite } from "../../../redux/favorite/FavoriteAction";
import InfluencerCard from "../../common/influencerCard";
import NoData from "../../common/NoData";
import Loader from "../../common/Loader";
import { useHistory } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles(() => ({
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
  campaignsFindBtn: {
    marginTop: 10,
    marginBottom: 20,
  },
  BoxWrap: {
    "&:not(:last-child)": {
      marginBottom: 20,
    },
    '& .infinite-scroll-component':{
      display:'contents'
    }
  },
  cardHeader: {
    padding: [[20, 20, 0, 20]],
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
  }
}));

export default function InfluencerSMI() {
  const classes = useStyles();
  const history = useHistory()
  const [pageDataLimit] = useState(10);
  const [startPageNo, setStartPageNo] = useState(1);
  const [index, setIndex] = useState();

  const dispatch = useDispatch();
  const InfluencerData = useSelector(state => state.InfluencerReducer)
  const InfluencerFavoriteUnFavoriteLoader = useSelector(state => state.favoriteReducer.buttonLoader)

  useEffect(() => {
     dispatch(influencerAction(1, pageDataLimit))
  }, [dispatch, pageDataLimit]);

  const handleClickOpenInfluencer = (data) => {
    history.push({
      pathname: '/influencer-details',
      state: data._id
    })
  };

  const handleFavorite = async (data) => {
    const indexNo = InfluencerData.data.findIndex(
      (item) => item._id === data._id
    );
    setIndex(indexNo)
    if (indexNo > -1) {
      dispatch(addFavorite(data._id));
    }
  };

  const handleUnFavorite = async (data) => {
    const indexNo = InfluencerData.data.findIndex(
      (item) => item._id === data._id
    );
    setIndex(indexNo)
    if (indexNo > -1) {
      dispatch(removeFavorite(data._id));
    }
  };


  const pagination = () => {
    if (InfluencerData.data.length !== InfluencerData.count) {
      setStartPageNo(startPageNo + 1);
      dispatch(influencerPagination(startPageNo + 1, pageDataLimit));
    }
  };

  return (
    <React.Fragment>
      {
        <div className={classes.homeContent}>
          <Container>
            {InfluencerData.error && <p>{InfluencerData.error}</p>}
            {InfluencerData.loading ? (
              <div className="loader">
                <Loader />
              </div>
            ) : InfluencerData.data.length === 0 ? <NoData /> :
              <>
                <Grid container spacing={3}>
                  <Grid item md={9} xs={12}>
                      <div className={classes.BoxWrap}>
                        <InfiniteScroll
                          dataLength={InfluencerData.data.length}
                          next={() => pagination()}
                          hasMore={true}
                          loader={InfluencerData.seeMoreLoading ? <h4>Loading...</h4> : null}
                        >
                          <InfluencerCard
                            data={InfluencerData.data}
                            index={index}
                            loader={InfluencerFavoriteUnFavoriteLoader}
                            handleFavorite={data => handleFavorite(data)}
                            handleUnFavorite={data => handleUnFavorite(data)}
                            handleClickOpenInfluencer={data => handleClickOpenInfluencer(data)}
                          />
                        </InfiniteScroll>
                      </div>
                    </Grid>
                  <Grid item md={3} xs={12}>
                    <Sidebar />
                  </Grid>
                </Grid>
              </>
            }
          </Container>
        </div>}
    </React.Fragment>
  );
}
