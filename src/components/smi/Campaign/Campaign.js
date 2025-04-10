import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../common/Sidebar";
import ApplyCampaign from "./ApplyCampaign";
import {
  CampaignAction,
  CampaignPagination,
} from "../../../redux/smi/campaign/CampaignAction";
import { ApplyForCampaign } from "../../../redux/smi/campaign/ApplyCampaignAction";
import PriceDetails from "../../common/PriceDetails";
import NoData from "../../common/NoData";
import CampaignCard from "../../common/CampaignCard";
import Loader from "../../common/Loader";
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
  campaignsFindBtn: {
    marginTop: 10,
    marginBottom: 20,
  },
  BoxWrap: {
    "&:not(:last-child)": {
      marginBottom: 20,
    },
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    padding: [[20, 20, 0, 20]],
  },
  titleText: {
    "& h6": {
      fontWeight: "bold",
      marginBottom: 8
    },
  },
  industry: {
    color: "#7d7d7d",
    padding: [[4, 10]],
    fontSize: 12,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
    fontWeight: "600"
  },
  compaignRate: {
    display: "flex",
    alignItems: "center",
  },
  star: {
    marginLeft: 10,
    "& svg": {
      fontSize: 16,
      color: "#32CD32",
      verticalAlign: "middle"
    }
  },
  cardBody: {
    padding: 20,
    "& p": {
      color: "#666",
      fontSize: 14,
      height: 41,
      overflow: "hidden"
    }
  },
  cardFooter: {
    borderTop: "1px solid #eee",
    padding: [[10, 20]],
    display: 'flex',
    justifyContent: "space-between"
  },
  priceBox: {
    display: "flex",
    width: "60%",
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
  textGreen: {
    color: "#32CD32",
  },
  zipCode: {
    color: "#777",
    width: "40%",
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
  priceFields: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: '14px',
    color: "#777",
    margin: '2px',
    width: '200px'
  },
  popover: {
    pointerEvents: 'none',
  },
  fieldTitle: {
    color: '#777',
  },
  paper: {
    padding: theme.spacing(2),
    boxShadow: 'none',
    border: '1px solid #f1f1f1'
  },
}));

export default function Campaign() {
  const classes = useStyles();
  const [applyOpen, setApplyOpen] = React.useState(false);
  const [applyCampaign, setApplyCampaign] = useState();
  const [startPageNo, setStartPageNo] = useState(1);
  const [pageDataLimit] = useState(4);
  const [priceOpen, setPriceOpen] = useState(false);
  const [priceData, setPriceData] = useState();
  const [apply, setApply] = useState(0);

  const dispatch = useDispatch();
  const CampaignData = useSelector((state) => state.CampaignReducer);

  useEffect(() => {
    dispatch(CampaignAction(1, pageDataLimit));
  }, [dispatch, pageDataLimit]);


  const handleClickPriceClose = () => {
    setPriceOpen(false);
    setPriceData();
  };

  const handleApplyOpen = (data) => {
    setApplyCampaign(data);
    setApplyOpen(true);
  };

  const handleApplyClose = () => {
    setApplyCampaign();
    setApplyOpen(false);
  };

  const pagination = () => {
    if (CampaignData.data.length !== CampaignData.count) {
      setStartPageNo(startPageNo + 1);
      dispatch(CampaignPagination(startPageNo + 1, pageDataLimit));
    }
  };

  const onSubmitForApplyCampaign = (data) => {
    dispatch(ApplyForCampaign(data));
    const index =
      CampaignData &&
      CampaignData.data &&
      data &&
      CampaignData.data.findIndex((item) => item._id === data.campaign);
    if (index > -1) {
      CampaignData.data.splice(index, 1);
      CampaignData.count = CampaignData.count - 1
      setApply(apply + 1)
    }
  };

  return (
    <React.Fragment>
      {priceData && (
        <PriceDetails
          open={priceOpen}
          title="View Price Details"
          type="smi"
          priceData={priceData}
          handleClose={handleClickPriceClose}
          closeIcon={true}
        />
      )}
      {applyCampaign && (
        <ApplyCampaign
          open={applyOpen}
          title="Campaign Application"
          applyCampaign={applyCampaign}
          handleClose={handleApplyClose}
          onSubmitForApplyCampaign={onSubmitForApplyCampaign}
          closeIcon={true}
        />
      )}
      <div className={classes.homeContent}>
        <Container>

          {CampaignData.error && <p>{CampaignData.error}</p>}
          {CampaignData.loading ? (
            <div className="loader">
              <Loader />
            </div>
          ) : CampaignData.count === 0 ? <NoData /> : (
            <>
              <Grid container spacing={3}>
                <Grid item md={9} xs={12}>
                  <div className={classes.BoxWrap}>

                    <InfiniteScroll
                      dataLength={CampaignData.data.length}
                      next={pagination}
                      hasMore={true}
                      loader={CampaignData.seeMoreLoading ? <h4>Loading...</h4> : null}
                    >
                      <CampaignCard
                        data={CampaignData.data}
                        applyCampaign={item => handleApplyOpen(item)}
                        type="smi"
                      />
                    </InfiniteScroll>

                  </div>
                </Grid>
                <Grid item md={3} xs={12}>
                  <Sidebar />
                </Grid>
              </Grid>
            </>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
}
