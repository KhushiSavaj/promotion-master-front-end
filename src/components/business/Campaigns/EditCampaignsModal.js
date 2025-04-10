import React, { useState, useEffect } from "react";
import {
  FormGroup,
  Grid,
  makeStyles,
  Button,
  Box,
  CircularProgress,
  TextareaAutosize,
  FormControl,
  MenuItem,
  Select,
  withStyles,
  InputBase,
} from "@material-ui/core";
import CustomModal from "../../common/CustomModal";
import CustomTextField from "../../common/CustomTextField";
import { Controller, useForm } from "react-hook-form";
import { ApiGet, } from "../../../helpers/API/ApiData";
import InfoIcon from "@material-ui/icons/Info";
import { toast } from "react-toastify";
import Industry from '../../data/Industry'

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 4,
      backgroundColor: "transparent",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  error: {
    fontSize: 14,
    "& svg": {
      fontSize: 16,
      verticalAlign: "middle",
      marginRight: "5px",
    },
    "& .MuiInputBase-input": {
      borderColor: "#f44336",
    },
  },
  fileInput: {
    display: "none",
  },
  fileUploadBtn: {
    border: "1px solid #37a000",
    color: "#37a000",
    borderRadius: 5,
    padding: "12px 20px",
    width: "100%",
    display: "block",
    textAlign: "center",
    lineHeight: "normal",
    cursor: "pointer",
  },
  tableTitle: {
    fontSize: "15px",
    fontWeight: "bold",
    textAlign: "center",
  },
  campaignDetail: {
    padding: "20px 0",
    "& .MuiTableContainer-root": {
      marginBottom: 20,
    },
    "& > div > div": {
      margin: "0 10px",
    },
    "& .MuiFormGroup-root": {
      marginBottom: 20,
    },
  },
  datePikerInput: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    padding: "10px",
    "& .MuiInput-underline:before": {
      content: "normal"
    },
    "& .MuiInput-underline:after": {
      content: "normal"
    },
    "& .MuiInputBase-input": {
      padding: 0,
      fontSize: 14,
    },
    "& .MuiIconButton-root": {
      padding: 7,
      "& svg": {
        fontSize: "1.2rem"
      }
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
  }
}));

export default function EditCampaignsModal({
  editData,
  handleClose,
  open,
  CreateOrEdit,
  ...props
}) {
  const classes = useStyles();
  const [picture, setPicture] = useState();
  const { handleSubmit, errors, control } = useForm();
  const [loader, setLoader] = useState(false);
  const [influencerData, setInfluencerData] = useState([]);
  const [industry, setIndustry] = useState()
  const [allIndustries, setAllIndustries] = useState();
  const getInfluencerDetails = async () => {
    const response = await ApiGet("user/influencer/");
    try {
      if (response.data.status === 200) {
        setInfluencerData(response.data.data.influencer);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
    }
  };

  const getIndustries = async () => {
    const industriesData = await Industry()
    setAllIndustries(industriesData && industriesData)
  }

  useEffect(() => {
    getInfluencerDetails();
    getIndustries()
    const industryName = editData && allIndustries?.industries.find(item => item.value === editData.industry && item.Industry_Name)
    setIndustry(industryName && industryName)
  }, [editData]);

  useEffect(() => {
    if (editData) {
      setPicture("http://thawing-peak-81686.herokuapp.com/" + editData.image);
      let data = influencerData.map((obj) => {
        editData.invited_smi.find((e) => e._id === obj._id)
          ? (obj.selected = true)
          : (obj.selected = false);
        return obj;
      });
      setInfluencerData(data);
    } else {
      let data = influencerData.map((obj) => {
        obj.selected = false;
        return obj;
      });
      setInfluencerData(data);
    }
  }, []);

  const onSubmit = async (data) => {
    const industryData = industry.value || industry
    setLoader(true);
    await CreateOrEdit(data, picture, industryData, influencerData, editData, 'edit')
    setLoader(false);
  };

  return (
    <div>
      <CustomModal
        open={open}
        maxWidth="md"
        handleClose={() => {
          setPicture();
          handleClose();
        }}
        closeIcon={true}
        {...props}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item md={12} sm={8} xs={12}>
              <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                  <FormGroup>
                    <CustomTextField
                      fullWidth
                      name="campaign_name"
                      type="text"
                      variant="filled"
                      placeholder="Campaign Name"
                      autoComplete="false"
                      defaultValue={editData && editData.campaign_name}
                      control={control}
                      rules={{
                        required: "Name required",
                      }}
                      className={errors.campaign_name && classes.error}
                    />
                    {errors.campaign_name && (
                      <Box className={classes.error} color="error.main">
                        <InfoIcon />
                        {errors.campaign_name.message}
                      </Box>
                    )}
                  </FormGroup>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <FormGroup>
                    <CustomTextField
                      fullWidth
                      name="zip"
                      type="text"
                      variant="filled"
                      placeholder="Zip"
                      autoComplete="false"
                      defaultValue={editData && editData.zip}
                      control={control}
                    />
                  </FormGroup>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                  <FormGroup>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        displayEmpty
                        defaultValue={industry && industry.value}
                        control={control}
                        input={<BootstrapInput />}
                        onChange={(e) => setIndustry(e.target.value)}
                      >
                        <MenuItem value={null} disabled>Industry</MenuItem>
                        {
                          allIndustries && allIndustries?.industries.map((item) => {
                            return (
                              <MenuItem key={item.value} value={item.value}>{item.Industry_Name}</MenuItem>
                            )
                          })
                        }
                      </Select>
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <FormGroup>
                    <CustomTextField
                      fullWidth
                      name="campaign_links"
                      type="text"
                      variant="filled"
                      placeholder="Campaign Link(s)"
                      autoComplete="false"
                      defaultValue={editData && editData.campaign_links}
                      control={control}
                    />
                  </FormGroup>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                  <FormGroup>
                    <CustomTextField
                      fullWidth
                      name="campaign_price"
                      type="text"
                      variant="filled"
                      placeholder="Campaign Budget"
                      autoComplete="false"
                      defaultValue={editData && editData.price.campaign_price}
                      control={control}
                    />
                  </FormGroup>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormGroup>
                    <div className={classes.formControl}>
                      <Controller
                        as={TextareaAutosize}
                        fullWidth
                        rowsMin={10}
                        name="campaign_instruction"
                        type="text"
                        variant="filled"
                        placeholder="Campaign Instructions"
                        autoComplete="false"
                        defaultValue={editData && editData.campaign_instruction}
                        control={control}
                        rules={{
                          required: "Instruction required",
                        }}
                        className={errors.instruction && classes.error}
                      />
                    </div>
                    {errors.instruction && (
                      <Box className={classes.error} color="error.main">
                        <InfoIcon />
                        {errors.instruction.message}
                      </Box>
                    )}
                  </FormGroup>
                </Grid>
              </Grid>
              <Grid container spacing={3} justify="center">
                <Grid item sm={3} xs={6}>
                  <FormGroup>
                    {loader ? (
                      <Button
                        fullWidth
                        variant="contained"
                        disableElevation
                      >
                        <CircularProgress color="inherit" size={14} />&nbsp;&nbsp;Loading...
                      </Button>
                    ) : (
                      <Button
                        fullWidth
                        color="primary"
                        variant="contained"
                        type="submit"
                        disableElevation
                      >
                        Save
                      </Button>
                    )}
                  </FormGroup>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </CustomModal>
    </div>
  );
}
