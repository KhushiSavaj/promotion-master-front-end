import React, { useState, useEffect } from "react";
import { Container, Grid, makeStyles} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../common/Sidebar";
import {
  proposalAction,
  proposalPagination,
} from "../../../redux/smi/proposal/ProposalAction";
import { CancelProposal } from "../../../redux/smi/proposal/CancelProposalAction";
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

export default function Proposals() {
  const classes = useStyles();
  const [startPageNo, setStartPageNo] = useState(1);
  const [pageDataLimit] = useState(4);
  const [priceOpen, setPriceOpen] = useState(false);
  const [priceData, setPriceData] = useState();
  const [cancel, setCancel] = useState(0);

  const dispatch = useDispatch();
  const ProposalData = useSelector((state) => state.proposalReducer);

  useEffect(() => {
      dispatch(proposalAction(1, pageDataLimit));
  }, [dispatch,pageDataLimit]);



  const handleClickPriceClose = () => {
    setPriceOpen(false);
    setPriceData();
  };


  const pagination = () => {
    if (ProposalData.data.length !== ProposalData.count) {
      setStartPageNo(startPageNo + 1);
      dispatch(proposalPagination(startPageNo + 1, pageDataLimit));
    }
  };

  const cancelApplyProposal = async (data) => {
    data = { campaign: data.campaign._id };
    dispatch(CancelProposal(data));
    const index = ProposalData.data.findIndex(
      (item) => item.campaign._id === data.campaign
    );
    if (index > -1) {
      ProposalData.data.splice(index, 1);
      ProposalData.count = ProposalData.count - 1
      setCancel(cancel + 1);
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
      <div className={classes.homeContent}>
        <Container>

          {ProposalData.error && <p>{ProposalData.error}</p>}
          {ProposalData.loading ? (
            <div className="loader">
              <Loader />
            </div>
          ) : ProposalData.count === 0 ? <NoData /> : (
            <>
              <Grid container spacing={3}>
                <Grid item md={9} xs={12}>
                  <div className={classes.BoxWrap}>
                    <InfiniteScroll
                      dataLength={ProposalData.data.length}
                      next={pagination}
                      hasMore={true}
                      loader={ProposalData.seeMoreLoading ? <h4>Loading...</h4> : null}
                    >
                      <CampaignCard
                        data={ProposalData.data}
                        cancelApplyProposal={item => cancelApplyProposal(item)}
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
