import React from "react";
import { makeStyles } from "@material-ui/core";
import CustomModal from "./CustomModal";

const useStyles = makeStyles((theme) => ({
  campaignTable: {
    marginBottom: 10,
    "& .MuiTableCell-head": {
      fontFamily: "Helvetica-Bold",
      padding: 10,
      border: 0,
    },
  },
  priceFields: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function PriceDetails({ handleClose, open, ...props }) {
  const classes = useStyles();
  const { priceData, type } = props;

  return (
    <div>
      <CustomModal
        open={open}
        maxWidth="sm"
        handleClose={handleClose}
        closeIcon={true}
        {...props}
      >
        {type === "business" ? (
          <div>
            <div className={classes.priceFields}>
              <h4>Campaign Budget ($)</h4>
              {priceData.campaign_price}
            </div>
            <div className={classes.priceFields}>
              <h4>Sales Tax Rate (%)</h4>
              {priceData.sales_tax_rate}
            </div>
            <div className={classes.priceFields}>
              <h4>Sales Tax ($)</h4>
              {priceData.sales_tax}
            </div>
            <div className={classes.priceFields}>
              <h4>Final Price ($)</h4>
              {priceData.business_price}
            </div>
          </div>
        ) : type === "smi" ?
            <div>
              <div className={classes.priceFields}>
                <h4>Campaign Budget ($)</h4>
                {priceData.campaign_price}
              </div>
              <div className={classes.priceFields}>
                <div className={classes.fieldTitle}>Service Fee Rate(%)</div>
                {priceData.commission_rate}
              </div>
              <div className={classes.priceFields}>
                <h4>Service Fee ($)</h4>
                {priceData.commission}
              </div>
              <div className={classes.priceFields}>
                <h4>Stripe Fee ($)</h4>
                {priceData.total_stripe_fee}
              </div>
              <div className={classes.priceFields}>
                <h4>Final Price ($)</h4>
                {priceData.smi_price}
              </div>
            </div> : null
        }
      </CustomModal>
    </div>
  );
}
