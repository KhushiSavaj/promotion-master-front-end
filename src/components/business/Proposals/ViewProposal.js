import React, { useState } from "react";
import { makeStyles, Button, CircularProgress } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getStars } from "../../../helpers/utils";
import { ApiPost } from "../../../helpers/API/ApiData";
import { toast } from "react-toastify";
import CustomModal from "../../common/CustomModal";
import ViewProposalDetails from "./ViewProposalDetails";
import RateCampaignModal from "./RateCampaignModal";
import PaymentModal from "./PaymentModal";

const useStyles = makeStyles((theme) => ({
  campaignTable: {
    border: "1px solid #ddd",
    "& .MuiTableCell-head": {
      fontFamily: "Helvetica-Bold",
      padding: 10,
      whiteSpace: "nowrap"
    },
    "& .MuiTableCell-body": {
      padding: 10,
      border: 0,
      whiteSpace: "nowrap"
    },
  },
  star: {
    "& svg": {
      fontSize: 16,
      color: "#32CD32",
      verticalAlign: "middle"
    }
  },
}));

export default function ViewProposal({
  handleClose,
  open,
  AcceptProposal,
  ...props
}) {
  const { viewData } = props;
  const classes = useStyles();
  const [proposalOpen, setProposalOpen] = React.useState(false);
  const [proposalData, setProposalData] = React.useState();
  const [paymentOpen, setPaymentOpen] = React.useState(false);
  const [paymentData, setPaymentData] = React.useState();
  const [rateData, setRateData] = useState();
  const [rateOpen, setRateOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState();
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [index, setIndex] = useState();


  const handleClickProposal = (data) => {
    setProposalData(data);
    setProposalOpen(true);
  };
  const handleCloseProposal = () => {
    setProposalData();
    setProposalOpen(false);
  };

  const handleRateOpen = (data) => {
    setRateData(data);
    setRateOpen(true);
  };

  const handleRateClose = () => {
    setRateData();
    setRateOpen(false);
  };

  const handlePaymentOpen = (data, ind) => {
    setIndex(ind)
    setPaymentData(data)
    setPaymentOpen(true)
  }
  const handlePaymentClose = () => {
    setPaymentData()
    setPaymentOpen(false)
  }

  const submitProposal = async (data, status, fromCheckOut) => {
    console.log("called")
    if (fromCheckOut) {
      setAcceptLoading(true)
      await AcceptProposal(data, status);
      setAcceptLoading(false)
    }
    else {
      handlePaymentOpen(data)
    }
  };

  const hiredOneSmi = viewData.proposals.find(item => item.is_completed_in_SMI === true)

  const sumbittingReview = async (rating, reviews) => {
    let res;
    const data = {
      rating: rating,
      smi: rateData.smi._id,
      campaign_id: rateData.campaign,
      review: reviews,
    };
    const dataComplete = {
      _id: rateData._id,
    };
    res = await ApiPost("rating/rateToSMI", data);
    try {
      if (res.data.status === 200) {
        res = await ApiPost("proposal/acceptCompletion", dataComplete);
        console.log("res", res)
        try {
          const index = viewData.proposals.findIndex(
            (item) => item._id === rateData._id
          );
          if (index > -1) {
            const viewDataCopy = viewData
            viewDataCopy.proposals[index] = {
              ...viewDataCopy.proposals[index],
              is_completed_in_SMI: true,
              invitation_status: "ACCEPTED",
              completion_status: "ACCEPTED"
            }
          }
          handleRateClose();
          toast.success(res.data.message, { autoClose: 5000 });
        } catch (error) {
          toast.error("Internal server error", { autoClose: 5000 });
        }
      } else {
        toast.error(res.data.message, { autoClose: 5000 });
      }
    } catch (err) {
      toast.error("Internal server error", { autoClose: 5000 });
    }
  };

  return (
    <div>
      {proposalData && (
        <ViewProposalDetails
          open={proposalOpen}
          title="View Proposal"
          viewDataPrice={viewData.price}
          disabled={hiredOneSmi}
          paymentStatus={paymentStatus}
          proposalData={proposalData}
          submitProposal={submitProposal}
          handleClose={handleCloseProposal}
          closeIcon={true}
        />
      )}
      {rateData && (
        <RateCampaignModal
          open={rateOpen}
          title="Rate Influencer"
          type={"BUSINESS"}
          sumbittingReview={sumbittingReview}
          handleClose={handleRateClose}
          closeIcon={true}
          viewData={viewData}
        />
      )}
      {paymentData && (
        <PaymentModal
          open={paymentOpen}
          title="Payment "
          type={"BUSINESS"}
          paymentData={paymentData}
          paymentStatus={paymentStatus}
          setPaymentStatus={setPaymentStatus}
          submitProposal={(data, status, fromPayment) => submitProposal(data, status, fromPayment)}
          handleClose={handlePaymentClose}
          closeIcon={true}
          viewData={viewData}
        />
      )}
      <CustomModal
        open={open}
        maxWidth="md"
        handleClose={handleClose}
        closeIcon={true}
        {...props}
      >
        <TableContainer component={Paper} elevation={0}>
          <Table className={classes.campaignTable} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Influencer</TableCell>
                <TableCell>Zip</TableCell>
                <TableCell>Influencer Review</TableCell>
                <TableCell colSpan="2"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
              }
              {viewData &&
                viewData.proposals.length > 0 &&
                viewData.proposals.map((data, ind) => {
                  return (
                    <TableRow>
                      <TableCell>{data.smi.first_name + data.smi.last_name}</TableCell>
                      <TableCell>{data.smi.business_zipcode}</TableCell>
                      <TableCell><span className={classes.star}>{getStars(data.smi.stars)}</span></TableCell>
                      {(ind === index && acceptLoading) ?
                        <TableCell>
                          <Button
                            fullWidth
                            variant="contained"
                            disableElevation
                          >
                            <CircularProgress
                              color="inherit"
                              size={14}
                            />
                            &nbsp;&nbsp;Loading...
                          </Button>
                        </TableCell>
                        :
                        data.invitation_status === "RESPONSE_WAITING" ? (
                          <>
                            <TableCell>
                              {
                                viewData.paymentConfirmed === true ?
                                  <Button
                                    fullWidth
                                    color={"default"}
                                    variant="contained"
                                    disabled={true}
                                    disableElevation
                                  >
                                    Accept
                                 </Button>
                                  :
                                  (
                                    <Button
                                      fullWidth
                                      color={hiredOneSmi ? "default" : "primary"}
                                      variant="contained"
                                      disabled={hiredOneSmi ? true : false}
                                      onClick={() => { paymentStatus ? submitProposal(data, "accept") : handlePaymentOpen(data, ind) }}
                                      disableElevation
                                    >
                                      Accept
                                    </Button>
                                  )}
                            </TableCell>
                          </>
                        )
                          : data.completion_status ===
                            "RESPONSE_WAITING" ? (
                            <>
                              <TableCell>
                                <Button
                                  fullWidth
                                  color="primary"
                                  variant="contained"
                                  onClick={() => handleRateOpen(data)}
                                  disableElevation
                                >
                                  Review Campaign
                            </Button>
                              </TableCell>
                            </>
                          ) : data.is_completed_in_SMI ?
                            <TableCell>
                              <p
                                fullWidth
                                style={{
                                  borderColor: "#f44336",
                                  color: "#f44336",
                                }}
                                variant="outlined"
                                disabled
                                disableElevation
                              >
                                Completed
                          </p>
                            </TableCell>
                            : data.invitation_status === "ACCEPTED" ?
                              <>
                                <TableCell>
                                  <p
                                    fullWidth
                                    style={{
                                      borderColor: "#f44336",
                                      color: "#f44336",
                                    }}
                                    variant="outlined"
                                    disabled
                                    disableElevation
                                  >
                                    Accepted
                            </p>
                                </TableCell>
                              </>
                              : null}

                      <TableCell>
                        <Button
                          fullWidth
                          color="primary"
                          variant="outlined"
                          disableElevation
                          onClick={() => handleClickProposal(data)}
                        >
                          View Proposal
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </CustomModal>
    </div>
  );
}
