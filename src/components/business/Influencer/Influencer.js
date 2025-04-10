import React, { useState, useEffect } from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../common/Sidebar";
import { BusinessInfluencerAction, BusinessInfluencerPagination } from "../../../redux/business/influencer/BusinessInfluencerAction";
import { addFavorite, removeFavorite } from "../../../redux/favorite/FavoriteAction";
import InfluencerCard from "../../common/influencerCard";
import NoData from "../../common/NoData";
import Loader from "../../common/Loader";
import { useHistory } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";

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
    "&:not(:last-child)": {
      marginBottom: 20,
    },
    '& .infinite-scroll-component': {
      display: 'contents'
    }
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    padding: [[20, 20, 0, 20]],
  },
  userDetail: {
    display: "flex"
  },
  userImg: {
    marginRight: 10,
    "& img": {
      borderRadius: "100%",
      maxWidth: 40,
      height: 40,
      objectFit: "cover",
      display: "block"
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
    display: "flex",
    alignItems: "center",
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
    borderTop: "1px solid #eee",
    padding: [[10, 20]],
    display: 'flex',
    justifyContent: "space-between",
    alignItems: "center"
  },
  priceBox: {
    display: "flex",
    justifyContent: "space-between"
  },
  price: {
    marginRight: 10,
    color: "#777",
    "& span": {
      paddingLeft: 10,
      color: "#333",
      fontWeight: "bold"
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
    "& svg": {
      fontSize: 20
    }
  },
  inFavorite: {
    color: "#32CD32;",
    cursor: 'pointer',
    "& svg": {
      fontSize: 20
    }
  },
  marginNone: {
    marginBottom: 0
  }
}));

export default function Influencer() {
  const classes = useStyles();
  const history = useHistory()
  const [startPageNo, setStartPageNo] = useState(1);
  const [pageDataLimit] = useState(10);
  const [index, setIndex] = useState();

  const dispatch = useDispatch();
  const InfluencerData = useSelector((state) => state.BusinessInfluencerReducer);
  const InfluencerFavoriteUnFavoriteLoader = useSelector(state => state.favoriteReducer.buttonLoader)

  useEffect(() => {
    dispatch(BusinessInfluencerAction(1, pageDataLimit));
  }, [dispatch, pageDataLimit]);

  const handleClickOpenInfluencer = (data) => {
    history.push({
      pathname: '/influencer-details',
      state: data._id
    })
  };

  const pagination = () => {
    if (InfluencerData.data.length !== InfluencerData.count) {
      setStartPageNo(startPageNo + 1);
      dispatch(BusinessInfluencerPagination(startPageNo + 1, pageDataLimit));
    }
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
        </div>
      }
    </React.Fragment>
  );
}
