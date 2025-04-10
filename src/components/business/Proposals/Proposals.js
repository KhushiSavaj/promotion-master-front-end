import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  BusinessProposalsAction,
  BusinessProposalsPagination,
} from "../../../redux/business/Proposals/BusinessProposalsAction";
import Sidebar from "../../common/Sidebar";
import ViewProposal from "./ViewProposal";
import { toast } from "react-toastify";
import { ApiPost } from "../../../helpers/API/ApiData";
import CampaignCard from "../../common/CampaignCard";
import NoData from "../../common/NoData";
import Loader from "../../common/Loader";
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles((theme) => ({
  campaignsWrap: {
    padding: [[30, 0]],
  },
  homeContent: {
    padding: [[20, 0]],
  },
  refresh: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "-35px",
  },
  campaignsFindBtn: {
    marginTop: 10,
    marginBottom: 20,
  },
}));

export default function Proposals() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [viewData, setViewData] = useState();
  const [startPageNo, setStartPageNo] = useState(1);
  const [pageDataLimit] = useState(4);
  const [loading, setLoading] = useState(false);


  const dispatch = useDispatch();
  let ProposalsData = useSelector((state) => state.BusinessProposalsReducer);

  useEffect(() => {
    dispatch(BusinessProposalsAction(1, pageDataLimit));
    setStartPageNo(1)
  }, [dispatch, pageDataLimit]);

  const handleClickOpen = (data) => {
    setViewData(data);
    setOpen(true);
  };

  const handleClose = () => {
    setViewData();
    setOpen(false);
  };

  const pagination = () => {
    if (ProposalsData.data.length !== ProposalsData.count) {
      setStartPageNo(startPageNo + 1);
      dispatch(BusinessProposalsPagination(startPageNo + 1, pageDataLimit));
    }
  };

  const AcceptProposal = async (data, status) => {
    setLoading(true)
    let res;
    if (status === "accept") {
      res = await ApiPost("proposal/acceptSmi", { proposal_id: data._id });
    } else if (status === "decline") {
      res = await ApiPost("proposal/declineSmi", { proposal_id: data._id });
    }
    try {
      if (parseInt(res.data.status) / 100 === 2) {
        toast.success(res.data.message);
        const index = ProposalsData.data.findIndex(
          (item) => item._id === res.data.data.campaign._id
        );
        if (index > -1) {
          const proposalIndex = ProposalsData.data[index].proposals.findIndex(
            (item) => item._id === res.data.data._id
          );
          if (proposalIndex > -1) {
            const proposalDataCopy = ProposalsData
            proposalDataCopy.data[index].proposals[proposalIndex].invitation_status = "ACCEPTED";
            // proposalDataCopy.data[index].proposals[proposalIndex].is_completed_in_SMI = true;
            ProposalsData = proposalDataCopy
            setLoading(false)
          }
          setLoading(false)
        }
        setLoading(false)
      } else {
        toast.error(res.data.message);
        setLoading(false)
      }
    } catch (err) {
      console.log("err",err)
      setLoading(false)
    }
  };



  return (
    <React.Fragment>
      {viewData && (
        <ViewProposal
          open={open}
          title="Campaign Proposals"
          viewData={viewData}
          AcceptProposal={AcceptProposal}
          handleClose={handleClose}
          closeIcon={true}
        />
      )}
      <div className={classes.homeContent}>
        <Container>
          {ProposalsData.error && <p>{ProposalsData.error}</p>}
          {ProposalsData.loading ? (
            <div className="loader">
              <Loader />
            </div>
          ) : ProposalsData.count === 0 ? <NoData /> : (
            <>
              <Grid container spacing={3}>
                <Grid item md={9} xs={12}>
                  <div className={classes.BoxWrap}>
                    <InfiniteScroll
                      dataLength={ProposalsData.data.length}
                      next={pagination}
                      hasMore={true}
                      loader={ProposalsData.seeMoreLoading ? <h4>Loading...</h4> : null}
                    >
                      <CampaignCard
                        data={ProposalsData.data}
                        toogleViewProposalModal={item => handleClickOpen(item)}
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
