import React, { useState } from "react";
import {
  makeStyles,
  Grid,
  List,
  ListItem,
  Button,
  FormGroup,
  Box,
  TextareaAutosize,
  CircularProgress,
} from "@material-ui/core";
import { getStars } from "../../../helpers/utils";
import { Controller, useForm } from "react-hook-form";
import InfoIcon from "@material-ui/icons/Info";
import CustomModal from "../../common/CustomModal";

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
  star: {
    cursor: "pointer",
    "& svg": {
      fontSize: 16,
      color: "#32CD32",
      verticalAlign: "middle"
    }
  },
  compaignInfo: {
    boxShadow: "0 0 5px rgba(0,0,0,0.15)",
    borderRadius: 4
  },
  campaignCode: {
    color: 'rgba(0, 0, 0, 0.54)'
  }
}));

export default function CompleteCampaignsModal({
  handleClose,
  open,
  ...props
}) {
  const { handleSubmit, errors, control } = useForm();
  const [Loader, setLoader] = useState();
  const { completeData, completeCampaign } = props;
  const classes = useStyles();

  const onSubmit = async (data) => {
    const completeCampaignData = {
      ...data,
      code: completeData.code_id.unique_code
    }
    console.log("completeCampaignData",completeCampaignData)
    setLoader(true);
    await completeCampaign(completeCampaignData);
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
          <Grid item md={3} xs={12}>
            <div className={classes.compaignInfo}>
              <List className={classes.proposalList}>
                <ListItem><b>Campaign Name</b><span>{completeData.campaign.campaign_name}</span></ListItem>
                <ListItem><b>Zip</b><span>{completeData.campaign.zip}</span></ListItem>
                <ListItem><b>Industry</b><span>{completeData.campaign.industry}</span></ListItem>
                <ListItem><b>Stars</b><span className={classes.star}>{getStars(completeData.campaign.stars)}</span></ListItem>
                <ListItem><b>Price (Including tex)</b><span>$ {completeData.campaign.price.business_price}</span></ListItem>
              </List>
            </div>
          </Grid>
          <Grid item md={9} xs={12}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h4>Submission Code: <span className={classes.campaignCode}>{completeData.code_id.unique_code}</span></h4>
              <FormGroup>
                <div className={classes.formControl}>
                  <Controller
                    as={TextareaAutosize}
                    fullWidth
                    rowsMin={8}
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
              {/* <FormGroup>
                <CustomTextField
                  name="code"
                  type="text"
                  variant="filled"
                  autoComplete="false"
                  control={control}
                  defaultValue={completeData.code_id.unique_code}
                  disabled={completeData}
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
              </FormGroup> */}

              <Box mt={2}>
                <Grid
                  container
                  spacing={4}
                  className={classes.socialFollowWrap}
                >
                  <Grid item md={4}>
                    {Loader ? (
                      <Button
                        fullWidth
                        color="primary"
                        variant="contained"
                        disableElevation
                      >
                        <CircularProgress color="inherit" size={24} />
                      </Button>
                    ) : (
                      <Button
                        fullWidth
                        color="primary"
                        variant="contained"
                        disableElevation
                        type="submit"
                      >
                        Submit For Review
                      </Button>
                    )}
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
              </Box>
            </form>
          </Grid>
        </Grid>
      </CustomModal>
    </div>
  );
}
