import React, { useState, useEffect } from "react";
import {
  FormGroup,
  Grid,
  makeStyles,
  withStyles,
  MenuItem,
  Select,
  FormControl,
  Button,
  Box,
  CircularProgress,
  FormLabel,
  Typography,
} from "@material-ui/core";
import userImage from "../../../assets/images/user-image.png";
import CustomTextField from "../../common/CustomTextField";
import InputBase from "@material-ui/core/InputBase";
import InfluencerModal from "../../common/influencerModal";
import Auth from "../../../helpers/Auth";
import { useForm } from "react-hook-form";
import InfoIcon from "@material-ui/icons/Info";
import { ApiPut } from "../../../helpers/API/ApiData";
import { toast } from "react-toastify";
import * as userUtil from "../../../utils/user.util";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Industry from '../../data/Industry'
import CameraAltIcon from '@material-ui/icons/CameraAlt';

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
  formControl: {
    width: "100%"
  },
  userImg: {
    padding: [[30, 20]],
    backgroundColor: "#fff",
    borderRadius: 5,
    position: "sticky",
    top: 84,
    "& img": {
      width: 200,
      margin: "0 auto 10px",
      height: 200,
      display: "table",
      borderRadius: 5,
      objectFit: "cover",
    },
  },
  userInfo: {
    marginBottom: 10,
    "& h6": {
      color: "#000",
      fontWeight: "bold",
      textTransform: "capitalize"
    },
    "& span": {
      color: "#777"
    }
  },
  saveAndDeleteButton: {
    margin: 5
  },
  saveAndDeleteButtonBlock: {
    justifyContent: 'center'
  },
  profileWrap: {
    "& .MuiFormGroup-root": {
      "&:not(:last-child)": {
        marginBottom: 15,
      },
      "& .MuiFormLabel-root": {
        marginBottom: "10px !important",
      },
    },
  },
  fileInput: {
    display: "none",
  },
  fileUploadBtn: {
    border: "1px solid #37a000",
    color: "#37a000",
    borderRadius: 5,
    padding: "12px 40px 12px 12px",
    width: "100%",
    display: "block",
    textAlign: "center",
    lineHeight: "normal",
    cursor: "pointer",
    position: "relative",
    "& svg": {
      position: "absolute",
      right: 15,
      top: 9
    }
  },
  profileField: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 15,
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20
  },
  deleteAccount: {
    background: 'red !important',
    color: 'white'
  },
  imageLoader: {
    marginLeft: '45%',
  }
}));

export default function Profile() {
  const classes = useStyles();
  const userInfo = Auth.getUserDetail();
  const [gender, setGender] = useState(userInfo.gender ? userInfo.gender : "");
  const [industry, setIndustry] = useState(userInfo.industry ? userInfo.industry : '');
  const [profile, setProfile] = useState(userInfo.image && userInfo.image);
  const [birth_date, setBirth_date] = useState(userInfo && userInfo.birth_date ? new Date(userInfo.birth_date) : new Date());
  const { handleSubmit, errors, control, setValue } = useForm();
  const [loader, setLoader] = useState(false);
  const [allIndustries, setAllIndustries] = useState();
  const [uploadLoader, setUploadLoader] = useState(false);

  useEffect(() => {
    setValue("object", Auth.getUserDetail());
  }, [setValue]);

  useEffect(() => {
    getIndustries() 
  }, [])

  const onSubmit = async (data) => {
    setLoader(true);
    data = { ...data, _id: userInfo._id };
    if (gender) {
      data = { ...data, gender: gender };
    }
    if (industry) {
      data = { ...data, industry: industry.value || industry };
    }
    if (birth_date) {
      data = { ...data, birth_date: birth_date };
    }
    var form_data = new FormData();

    for (var key in data) {
      form_data.append(key, data[key]);
    }
    if (profile && profile.file) {
      form_data.append("profile", profile.file);
    }
    const res = await ApiPut("user/", form_data);
    try {
      if (res.data.status === 200) {
        userUtil.setUserInfo(res.data.data);
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

  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);


  const handleImageHandler = async (e) => {
    setUploadLoader(true)
    if (e.target.files[0] && e.target.files[0].size > 5242880) {
      toast.error('please upload image less than 5 mb')
      setUploadLoader(false)
      return
    }
    if (e.target.files[0]) {
      setProfile({ file: e.target.files[0] })
      let data = { _id: userInfo._id };
      var form_data = new FormData();
      for (var key in data) {
        form_data.append(key, data[key]);
      }
      if (e.target.files[0]) {
        form_data.append("profile", e.target.files[0]);
      }
      const res = await ApiPut("user/", form_data);
      try {
        if (res.data.status === 200) {
          userUtil.setUserInfo(res.data.data);
          setUploadLoader(false);
          toast.success(res.data.message, { autoClose: 5000 });
        } else {
          setUploadLoader(false);
          toast.error(res.data.message, { autoClose: 5000 });
        }
      } catch (err) {
        setUploadLoader(false);
        toast.error("Internal server error", { autoClose: 5000 });
      }
      setUploadLoader(false);
    }
  }

  const getIndustries = async () => {
    const industriesData = await Industry()
    setAllIndustries(industriesData && industriesData)
  }

  return (
    <React.Fragment>
      <InfluencerModal
        open={open}
        title="View Influencer"
        handleClose={handleClose}
        closeIcon={true}
        influencerData={userInfo}
      />
      <div className={classes.profileWrap}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3} direction="row-reverse">
            <Grid item sm={4} xs={12}>
              <div className={classes.userImg}>
                <img
                  src={
                    profile
                      ? profile.file
                        ? URL.createObjectURL(profile.file)
                        : profile
                      : userImage
                  }
                  alt="userimage"
                />
                <div className={classes.userInfo} align="center">
                  <Typography component='h6' variant="h6" style={{ textTransform: 'none' }}>{userInfo.user_name}</Typography>
                  <Typography component='span' variant="body2">{userInfo.email}</Typography>
                </div>
                <input
                  accept="image/*"
                  className={classes.fileInput}
                  id="profile-image"
                  multiple
                  type="file"
                  disabled={uploadLoader}
                  onChange={(e) => handleImageHandler(e)}
                />
                {
                  uploadLoader ?
                    <CircularProgress size={24} className={classes.imageLoader} />
                    :
                    <label className={classes.fileUploadBtn} htmlFor="profile-image">
                      <span>Upload Photo </span><CameraAltIcon />
                    </label>
                }
              </div>
            </Grid>
            {userInfo.user_role === "SMI" ? (
              <>
                <Grid item sm={8} xs={12}>
                  <div className={classes.profileField}>
                    <div className={classes.title}>My Profile</div>
                    <FormGroup>
                      <FormLabel>First Name</FormLabel>
                      <CustomTextField
                        fullWidth
                        name="first_name"
                        type="text"
                        variant="filled"
                        placeholder="First Name"
                        autoComplete="false"
                        defaultValue={userInfo.first_name}
                        control={control}
                        rules={{
                          required: "First Name required",
                        }}
                        className={errors.first_name && classes.error}
                      />
                      {errors.first_name && (
                        <Box className={classes.error} color="error.main">
                          <InfoIcon />
                          {errors.first_name.message}
                        </Box>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Last Name</FormLabel>
                      <CustomTextField
                        fullWidth
                        name="last_name"
                        type="text"
                        variant="filled"
                        placeholder="Last Name"
                        autoComplete="false"
                        defaultValue={userInfo.last_name}
                        control={control}
                        rules={{
                          required: "Last Name required",
                        }}
                        className={errors.last_name && classes.error}
                      />
                      {errors.last_name && (
                        <Box className={classes.error} color="error.main">
                          <InfoIcon />
                          {errors.last_name.message}
                        </Box>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Birth Date</FormLabel>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          fullWidth
                          name="birth_date"
                          disableToolbar
                          autoOk={true}
                          variant="inline"
                          format="MM/dd/yyyy"
                          maxDate={new Date()}
                          className={classes.datePikerInput}
                          value={birth_date}
                          onChange={date => setBirth_date(date)}
                        />
                      </MuiPickersUtilsProvider>
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Zip</FormLabel>
                      <CustomTextField
                        fullWidth
                        name="business_zipcode"
                        type="text"
                        variant="filled"
                        placeholder="Zip"
                        autoComplete="false"
                        defaultValue={userInfo.business_zipcode}
                        control={control}
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Gender</FormLabel>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={gender}
                          displayEmpty
                          input={<BootstrapInput />}
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <MenuItem value="" disabled>
                            Gender
                          </MenuItem>
                          {
                            allIndustries && allIndustries?.gender.map((item) => {
                              return (
                                <MenuItem key={item.value} value={item.value}>{item.Gender}</MenuItem>
                              )
                            })
                          }
                        </Select>
                      </FormControl>
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Industry</FormLabel>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          defaultValue={industry}
                          displayEmpty
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
                    <FormGroup>
                      <Grid container className={classes.saveAndDeleteButtonBlock}>
                        <Grid item md={4} className={classes.saveAndDeleteButton}>
                          {loader ? (
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
                              Save
                            </Button>
                          )}
                        </Grid>
                        <Grid item md={4} className={classes.saveAndDeleteButton}>
                          {
                            <Button
                              fullWidth
                              className={classes.deleteAccount}
                              variant="contained"
                              disableElevation
                            >
                              Delete account
                            </Button>
                          }
                        </Grid>
                      </Grid>
                    </FormGroup>
                  </div>
                </Grid>
              </>
            ) : (
              <>
                <Grid item sm={8} xs={12}>
                  <div className={classes.profileField}>
                    <div className={classes.title}>My Profile</div>
                    <FormGroup>
                      <FormLabel>Business Name</FormLabel>
                      <CustomTextField
                        fullWidth
                        name="business_name"
                        type="text"
                        variant="filled"
                        placeholder="Business Name"
                        autoComplete="false"
                        defaultValue={userInfo.business_name}
                        control={control}
                        rules={{
                          required: "Business Name required",
                        }}
                        className={errors.business_name && classes.error}
                      />
                      {errors.business_name && (
                        <Box className={classes.error} color="error.main">
                          <InfoIcon />
                          {errors.business_name.message}
                        </Box>
                      )}{" "}
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Industry</FormLabel>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          defaultValue={userInfo.industry}
                          displayEmpty
                          input={<BootstrapInput />}
                          onChange={(e) => setIndustry(e.target.value)}
                        >
                          <MenuItem value={null} select disabled>Industry</MenuItem>
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
                    <FormGroup>
                      <FormLabel>Zip Code</FormLabel>
                      <CustomTextField
                        fullWidth
                        name="business_zipcode"
                        type="text"
                        variant="filled"
                        placeholder="Zip"
                        autoComplete="false"
                        defaultValue={userInfo.business_zipcode}
                        control={control}
                      // rules={{
                      //   required: "business_zipcode required",
                      // }}
                      // className={errors.business_zipcode && classes.error}
                      />
                      {/* {errors.business_zipcode && (
                                    <Box className={classes.error} color="error.main">
                                      <InfoIcon />
                                      {errors.business_zipcode.message}
                                    </Box>
                                  )} */}
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Email</FormLabel>
                      <CustomTextField
                        fullWidth
                        name="email"
                        type="email"
                        disabled={true}
                        variant="filled"
                        placeholder="Email"
                        autoComplete="false"
                        defaultValue={userInfo.email}
                        className={errors.email && classes.error}
                      />
                      {errors.email && (
                        <Box className={classes.error} color="error.main">
                          <InfoIcon />
                          {errors.email.message}
                        </Box>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Username</FormLabel>
                      <CustomTextField
                        fullWidth
                        name="user_name"
                        type="text"
                        variant="filled"
                        placeholder="Username"
                        autoComplete="false"
                        defaultValue={userInfo.user_name}
                        control={control}
                        rules={{
                          required: "User  Name required",
                        }}
                        className={errors.user_name && classes.error}
                      />
                      {errors.user_name && (
                        <Box className={classes.error} color="error.main">
                          <InfoIcon />
                          {errors.user_name.message}
                        </Box>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Grid container justify="center">
                        <Grid item md={4}>
                          {loader ? (
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
                              Save
                            </Button>
                          )}
                        </Grid>
                      </Grid>
                    </FormGroup>
                  </div>
                </Grid>
              </>
            )}
          </Grid>
        </form >
      </div >
    </React.Fragment >
  );
}
