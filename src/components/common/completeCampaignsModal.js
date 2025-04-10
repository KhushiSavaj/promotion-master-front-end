import React, { useState } from "react";
import {
  makeStyles,
  Grid,
  Button,
  FormGroup,
  Box,
  TextareaAutosize,
  CircularProgress,
} from "@material-ui/core";
import CustomModal from "./CustomModal";
import { getStars } from "../../helpers/utils";
import { Controller, useForm } from "react-hook-form";
import CustomTextField from "./CustomTextField";
import InfoIcon from "@material-ui/icons/Info";
import { ApiPost} from "../../../helpers/API/ApiData";
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
  campaignTable: {
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
  }
}));

export default function CompleteCampaignsModal({
  handleClose,
  open,
  ...props
}) {
  const { handleSubmit, errors, control } = useForm();
  const [Loader, setLoader] = useState();
  const { completeData } = props;
  const classes = useStyles();

  const onSubmit = async (data) => {
    setLoader(true);
    let res;

    data = { ...data, _id: completeData._id };
    res = await ApiPost("proposal/complete", data);

    try {
      if (res.data.status === 200) {
        handleClose();
        setLoader(false);
        toast.success(res.data.message, { autoClose: 5000 });
      } else {
        setLoader(false);
        toast.error(res.data.message, { autoClose: 5000 });
      }
    } catch (err) {
      setLoader(false);
      toast.error("Internal server error", { autoClose: 5000 });
    }
    setLoader(false);
  };

  return (
    <div>
      <CustomModal
        open={open}
        maxWidth="lg"
        handleClose={handleClose}
        closeIcon={true}
        {...props}
      >
        <Grid container spacing={3}>
          <Grid item md={3}>
            <Grid container spacing={3} style={{ textAlign: "center" }}>
              <Grid item md={6}>
                <b>Campaign Name</b>
              </Grid>
              <Grid item md={6}>
                {completeData.campaign.campaign_name}
              </Grid>

              <Grid item md={6}>
                <b>Zip</b>
              </Grid>
              <Grid item md={6}>
                {completeData.campaign.zip}
              </Grid>

              <Grid item md={6}>
                <b>Expiration</b>
              </Grid>
              <Grid item md={6}>
                {new Date(completeData.campaign.expiration).toDateString()}
              </Grid>

              <Grid item md={6}>
                <b>Stars</b>
              </Grid>
              <Grid item md={6}>
                {getStars(completeData.campaign.stars)}
              </Grid>

              <Grid item md={6}>
                <b>Price (Including tex)</b>
              </Grid>
              <Grid item md={6}>
                $ {completeData.campaign.business_price}
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={9}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <div className={classes.formControl}>
                  <Controller
                    as={TextareaAutosize}
                    fullWidth
                    rowsMin={10}
                    name="completion_description"
                    type="text"
                    variant="filled"
                    placeholder="Write few words on how was the campaign..."
                    autoComplete="false"
                    control={control}
                    rules={{
                      required: "Description required",
                    }}
                    className={errors.completion_description && classes.error}
                  />
                </div>
                {errors.completion_description && (
                  <Box className={classes.error} color="error.main">
                    <InfoIcon />
                    {errors.completion_description.message}
                  </Box>
                )}{" "}
              </FormGroup>
              <FormGroup>
                <CustomTextField
                  name="code"
                  type="text"
                  variant="filled"
                  placeholder="Completion Code"
                  autoComplete="false"
                  control={control}
                  style={{
                    margin: "15px",
                    borderRadius: "20px",
                  }}
                  rules={{
                    required: "Code required",
                  }}
                  className={errors.code && classes.error}
                />
                {errors.code && (
                  <Box className={classes.error} color="error.main">
                    <InfoIcon />
                    {errors.code.message}
                  </Box>
                )}{" "}
              </FormGroup>

              <div>
                <Grid
                  container
                  spacing={4}
                  className={classes.socialFollowWrap}
                >
                  <Grid item md={4}>
                    {Loader ? 
                     <Button
                     fullWidth
                     color="primary"
                     variant="contained"
                     disableElevation
                   >
                       <CircularProgress color="inherit" size={24} />
                   </Button>
                   :
                    <Button
                      fullWidth
                      color="primary"
                      variant="contained"
                      disableElevation
                      type="submit"
                    >
                      Complete Proposal
                    </Button>
                  }
                  </Grid>
                  <Grid item md={4}>
                    <Button
                      fullWidth
                      style={{
                        backgroundColor: "#f44336",
                        color: "#fff",
                      }}
                      variant="contained"
                      onClick={() => {
                        handleClose();
                      }}
                      disableElevation
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </form>
          </Grid>
        </Grid>
      </CustomModal>
    </div>
  );
}
