import React, { useState } from "react";
import {
  makeStyles,
  Grid,
  Button,
  CircularProgress,
  FormGroup,
  TextareaAutosize,
  List,
  ListItem,
  withStyles,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import CustomModal from "../../common/CustomModal";
import Rating from '@material-ui/lab/Rating';
import StarIcon from '@material-ui/icons/Star';


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
  },
  campaignCode: {
    color: 'rgba(0, 0, 0, 0.54)'
  }
}));

const StyledRating = withStyles({
  iconFilled: {
    color: '#32CD32',
  },
  iconHover: {
    color: '#32CD32',
  },
})(Rating);

export default function RateCampaignModal({
  handleClose,
  sumbittingReview,
  open,
  ...props
}) {
  const { handleSubmit } = useForm();
  const [Loader, setLoader] = useState();
  const { viewData } = props;
  const classes = useStyles();
  const [rating, setRating] = useState(0);
  const [reviews, setReview] = useState();

  const onSubmit = async () => {
    setLoader(true);
    await sumbittingReview(rating, reviews)
    setLoader(false);
  };

  return (
    <div>
      <CustomModal
        open={open}
        maxWidth="md"
        handleClose={handleClose}
        closeIcon={true}
        {...props}
      >
        <Grid container spacing={3}>
          <Grid item md={4} xs={12}>
            <div className={classes.compaignInfo}>
              <List className={classes.proposalList}>
                <ListItem><b>Campaign Name</b><span>{viewData.campaign_name}</span></ListItem>
                <ListItem><b>Zip</b><span>{viewData.zip}</span></ListItem>
                <ListItem><b>Price (Including tex)</b><span>$ {viewData.price.business_price}</span></ListItem>
              </List>
            </div>
            <h4>Submission Code: <span className={classes.campaignCode}>{viewData.proposals.map(item => item.code_id)}</span></h4>
          </Grid>
          <Grid item md={8} xs={12}>
            <FormGroup>
              <div className={classes.formControl}>
                <textarea
                  as={TextareaAutosize}
                  fullWidth
                  rows={6}
                  placeholder="Review"
                  name="review"
                  type="text"
                  variant="filled"
                  autoComplete="false"
                  onChange={(e) => setReview(e.target.value)}
                />
              </div>
            </FormGroup>
            <div className={classes.ratingStar}>
              <span>Rating</span>
              <StyledRating
                name="customized-color"
                defaultValue={rating}
                getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                onChange={(e, value) => { setRating(value) }}
                precision={0.5}
                icon={<StarIcon fontSize="inherit" />}
              />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={4} className={classes.socialFollowWrap}>
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
                      Submit Rating
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
            </form>
          </Grid>
        </Grid>
      </CustomModal>
    </div>
  );
}
