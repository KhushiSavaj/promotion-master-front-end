import React, { useState } from "react";
import {
  makeStyles,
  Grid,
  Button,
  FormGroup,
  Box,
  TextareaAutosize,
  CircularProgress,
  List,
  ListItem,
} from "@material-ui/core";
import CustomModal from "../../common/CustomModal";
import userImage from "../../../assets/images/user-image.png";
import { getStars } from "../../../helpers/utils";
import { Controller, useForm } from "react-hook-form";
import InfoIcon from "@material-ui/icons/Info";

const useStyles = makeStyles((theme) => ({
  proposalInfo: {
    boxShadow: "0 0 5px rgba(0,0,0,0.15)",
    borderRadius: 4
  },
  userImg: {
    padding: 20,
    maxWidth: 200,
    margin: "0 auto",
    "& img": {
      display: "block"
    }
  },
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
  star: {
    "& svg": {
      fontSize: 16,
      color: "#32CD32",
      verticalAlign: "middle"
    }
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
      borderTop: "1px solid #ddd"
    }
  }
}));

export default function ViewProposalDetails({ handleClose, viewDataPrice, disabled, open, ...props }) {
  const { handleSubmit, errors, control } = useForm();
  const [loader, setLoader] = useState(false);
  const { proposalData, submitProposal, paymentStatus } = props;
  const classes = useStyles();

  const onSubmit = async (data) => {
    setLoader(true)
    await submitProposal(proposalData, "accept");
    setLoader(false)
    handleClose();
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
            <div className={classes.proposalInfo}>
              <div className={classes.userImg}>
                <img src={proposalData.smi.image ? proposalData.smi.image : userImage} alt="userimage" />
              </div>
              <List className={classes.proposalList}>
                <ListItem><b>Influencer Name</b><span>{proposalData.smi.first_name + proposalData.smi.last_name}</span></ListItem>
                <ListItem><b>Zip</b><span>{proposalData.smi.business_zipcode}</span></ListItem>
                <ListItem><b>Influencer Rating</b><span className={classes.star}>{getStars(proposalData.smi.stars)}</span></ListItem>
                <ListItem><b>Campaign Budget</b><span>$ {viewDataPrice.business_price}</span></ListItem>
              </List>
            </div>
          </Grid>

          <Grid item md={9}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <div className={classes.formControl}>
                  <Controller
                    as={TextareaAutosize}
                    fullWidth
                    rowsMin={8}
                    name="description"
                    type="text"
                    variant="filled"
                    placeholder="Description"
                    autoComplete="false"
                    defaultValue={proposalData.description}
                    disabled={proposalData}
                    control={control}
                    rules={{
                      required: "Description required",
                    }}
                    className={errors.description && classes.error}
                  />
                </div>
                {errors.description && (
                  <Box className={classes.error} color="error.main">
                    <InfoIcon />
                    {errors.description.message}
                  </Box>
                )}{" "}
              </FormGroup>

              <FormGroup>
                <div className={classes.formControl}>
                  <Controller
                    as={TextareaAutosize}
                    fullWidth
                    rowsMin={8}
                    name="cover_letter"
                    type="text"
                    variant="filled"
                    placeholder="Cover Letter"
                    autoComplete="false"
                    defaultValue={proposalData.cover_letter}
                    disabled={proposalData}
                    control={control}
                    rules={{
                      required: "Cover Letter required",
                    }}
                    className={errors.cover_letter && classes.error}
                  />
                </div>
                {errors.cover_letter && (
                  <Box className={classes.error} color="error.main">
                    <InfoIcon />
                    {errors.cover_letter.message}
                  </Box>
                )}{" "}
              </FormGroup>
              <div>
                {proposalData && (
                  <Grid
                    container
                    spacing={4}
                    className={classes.socialFollowWrap}
                  >
                    {proposalData.invitation_status === "RESPONSE_WAITING" ? (
                      <Grid item md={4}>
                        {loader ? (
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
                        ) : (
                          <Button
                            fullWidth
                            color={disabled ? "default" : "primary"}
                            variant="contained"
                            disabled={disabled || paymentStatus}
                            onClick={() =>
                              onSubmit()
                            }
                            disableElevation
                          >
                            Accept
                          </Button>
                        )}
                      </Grid>
                    ) : null}
                  </Grid>
                )}
              </div>
            </form>
          </Grid>
        </Grid>
      </CustomModal>
    </div>
  );
}
