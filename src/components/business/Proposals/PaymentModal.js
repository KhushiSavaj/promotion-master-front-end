import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Grid,
  List,
  ListItem,
  CircularProgress,
} from "@material-ui/core";
import CustomModal from "../../common/CustomModal";
import { ApiPost } from "../../../helpers/API/ApiData";
import AppPayment from "../../payment/AppPayment";
import { toast } from "react-toastify";


const useStyles = makeStyles((theme) => ({
  error: {
    fontSize: 14,
    "& svg": {
      fontSize: 16,
      verticalAlign: "middle",
      marginRight: "5px",
    },
    "& .MuiFormGroup-root > textarea": {
      borderColor: "#f44336 !important",
    },
  },
  fieldName: {
    marginBottom: 10,
    "& .MuiTableCell-head": {
      fontFamily: "Helvetica-Bold",
      padding: 10,
      border: 0,
    },
  },
  socialFollowWrap: {
    display: "flex",
    justifyContent: "center",
  },
  cover_letter: {
    margin: 15,
    padding: 15,
  },
  formControl: {
    "& textarea": {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #ced4da",
      fontSize: 16,
      width: "100%",
      resize: "vertical",
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      outline: "none",
      fontFamily: "helvetica-light"
    }
  },
  proposalList: {
    padding: 0,
    "& .MuiListItem-root": {
      justifyContent: "space-between",
      "&:not(:first-child)": {
        borderTop: "1px solid #ddd"
      }
    }
  },
  compaignInfo: {
    boxShadow: "0 0 5px rgba(0,0,0,0.15)",
    borderRadius: 4
  },
  ratingStar: {
    textAlign: "center",
    marginBottom: 15,
    "& > span": {
      verticalAlign: "middle",
      marginRight: 10,
      fontWeight: "bold"
    }
  }
}));



export default function PaymentModal({
  handleClose,
  submitProposal,
  open,
  paymentStatus,
  setPaymentStatus,
  ...props
}) {
  const { paymentData, viewData } = props;
  const classes = useStyles();
  const [clientSecret, setClientSecret] = useState();
  const [paymentLoader, setPaymentLoader] = useState(false);
  const [clickOnSubmit, setClickOnSubmit] = useState(false)

  const paymentCompleteHandler = (data) => {
    setPaymentStatus(data)
  }

  useEffect(() => {
    const fetchData = async () => {
      setPaymentLoader(true)
      toast.info('Please add payment method to accept campaign proposal')
      try {
        const response = await ApiPost('payment/proceed', {
          campaign_id: paymentData.campaign,
          smi_id: paymentData.smi._id
        })
        try {
          setClientSecret(response.data.data.client_secret)
          setPaymentLoader(false)
        } catch (error) {
          setPaymentLoader(false)
        }
      } catch (error) {
        setPaymentLoader(false)
      }
    }
    fetchData()
  }, [paymentData.campaign, paymentData.smi._id])


  return (
    <div>
      <CustomModal
        open={open}
        maxWidth="md"
        handleClose={!clickOnSubmit && handleClose}
        closeIcon={true}
        {...props}
      >
        <Grid container spacing={3}>
          <Grid item md={4} xs={12}>
            <div className={classes.compaignInfo}>
              <List className={classes.proposalList}>
                <ListItem><b>Campaign Name</b><span>{viewData.campaign_name}</span></ListItem>
                <ListItem><b>Zip</b><span>{viewData.zip}</span></ListItem>
                <ListItem><b>Price (Including tax)</b><span>$ {viewData.price.business_price && viewData.price.business_price}</span></ListItem>
              </List>
            </div>
          </Grid>
          {
            <>
              <Grid item md={8} xs={12}>
                {
                  paymentLoader && <CircularProgress color="inherit" size={34} style={{ margin: '7% 45%' }} />
                }
                {clientSecret && <AppPayment setClickOnSubmit={setClickOnSubmit} handleClose={handleClose} setPaymentStatus={setPaymentStatus} submitProposal={(data, status, fromPayment) => submitProposal(data, status, fromPayment)} proposalData={paymentData} id={viewData._id} clientSecret={clientSecret} paymentCompleteHandler={data => paymentCompleteHandler(data)} />}
              </Grid>
            </>
          }
        </Grid>
      </CustomModal>
    </div>
  );
}
