import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../common/Sidebar";
import {
  myCampaignAction,
  myCampaignPagination,
} from "../../../redux/smi/myCampaign/MyCampaignAction";
import CompleteCampaignsModal from "./completeCampaignsModal";
import RateCampaignModal from "./RateCampaignModal";
import { ApiPost } from "../../../helpers/API/ApiData";
import { toast } from "react-toastify";
import PriceDetails from "../../common/PriceDetails";
import NoData from "../../common/NoData";
import CampaignCard from "../../common/CampaignCard";
import Loader from "../../common/Loader";
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles((theme) => ({
  homeContent: {
    padding: [[20, 0]],
  },
  BoxWrap: {
    "&:not(:last-child)": {
      marginBottom: 20,
    },
  },
  status: {
    marginLeft: '10px',
    color: '#777'
  }
}));

export default function MyCampaign() {
  const classes = useStyles();
  const [startPageNo, setStartPageNo] = useState(1);
  const [pageDataLimit] = useState(4);
  const [rateData, setRateData] = useState();
  const [rateOpen, setRateOpen] = useState(false);
  const [completeData, setCompleteData] = useState();
  const [completeOpen, setCompleteOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [priceData, setPriceData] = useState();

  const dispatch = useDispatch();
  let CampaignData = useSelector((state) => state.MyCampaignReducer);

  useEffect(() => {
    dispatch(myCampaignAction(1, pageDataLimit));
  }, [dispatch, pageDataLimit]);

  const handleClickPriceClose = () => {
    setPriceOpen(false);
    setPriceData();
  };

  const handleCompleteOpen = (data) => {
    setCompleteData(data);
    setCompleteOpen(true);
  };
  const handleCompleteClose = () => {
    setCompleteData();
    setCompleteOpen(false);
  };

  const handleRateOpen = (data) => {
    setRateData(data);
    setRateOpen(true);
  };

  const handleRateClose = () => {
    setRateData();
    setRateOpen(false);
  };

  const pagination = () => {
    if (CampaignData.data.length !== CampaignData.count) {
      setStartPageNo(startPageNo + 1);
      dispatch(myCampaignPagination(startPageNo + 1, pageDataLimit));
    }
  };


  const reviewToBusiness = async (rating, reviews) => {


    let res;
    const data = {
      rating: rating,
      proposal_id: rateData._id,
      campaign_id: rateData.campaign._id,
      review: reviews,
    };
    res = await ApiPost("rating/rateToCampaign", data);
    try {
      if (res.data.status === 200) {
        const indexNo = CampaignData.data.findIndex(
          (item) => item._id === rateData._id
        );
        if (indexNo > -1) {
          CampaignData.data[indexNo].is_completed_in_Business = true;
          handleRateClose();
        }
        toast.success(res.data.message, { autoClose: 5000 });
        handleRateClose();
      } else {
        toast.error(res.data.message, { autoClose: 5000 });
        handleRateClose();
      }
    } catch (err) {
      handleRateClose();
      toast.error("Internal server error", { autoClose: 5000 });
    }
  };

  const completeCampaign = async (data) => {
    let res;
    data = { ...data, _id: completeData._id };
    res = await ApiPost("proposal/complete", data);
    console.log("res", res)
    try {
      if (res.data.status === 200) {
        toast.success(res.data.message, { autoClose: 5000 });
        const indexNo = CampaignData.data.findIndex(
          (item) => item._id === res.data.data._id
        );
        if (indexNo > -1) {
          let CampaignDataCopy = CampaignData
          CampaignDataCopy.data[indexNo] = {
            ...CampaignDataCopy.data[indexNo],
            completion_status: "RESPONSE_WAITING"
          }
          console.log("CampaignDataCopy",CampaignDataCopy)
          CampaignData = CampaignDataCopy
          handleCompleteClose()
        }
      } else {
        toast.error(res.data.message, { autoClose: 5000 });
        handleCompleteClose()
      }
    } catch (err) {
      toast.error(err, { autoClose: 5000 });
      handleCompleteClose()
    }
  };
  console.log("CampaignData",CampaignData)

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

      {completeData && (
        <CompleteCampaignsModal
          open={completeOpen}
          title="Submit For Review"
          completeData={completeData}
          completeCampaign={completeCampaign}
          handleClose={handleCompleteClose}
          closeIcon={true}
        />
      )}
      {rateData && (
        <RateCampaignModal
          open={rateOpen}
          title="Rate business"
          type={"SMI"}
          rateData={rateData}
          reviewToBusiness={reviewToBusiness}
          handleClose={handleRateClose}
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
                        handleRateOpen={item => handleRateOpen(item)}
                        handleCompleteOpen={item => handleCompleteOpen(item)}
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
