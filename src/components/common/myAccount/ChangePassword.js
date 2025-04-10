import React, { useState } from 'react'
import { Box, Button, CircularProgress, FormGroup, FormLabel, Grid, IconButton, InputAdornment, makeStyles } from '@material-ui/core';
import LegendBox from '../LegendBox'
import CustomTextField from '../CustomTextField';
import InfoIcon from "@material-ui/icons/Info";
import { useForm } from 'react-hook-form';
import Auth from "../../../helpers/Auth";
import { toast } from 'react-toastify';
import { ApiPut } from '../../../helpers/API/ApiData';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import { logout } from '../../../redux/logout/logoutAction';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    profileWrap: {
        "& .MuiFormGroup-root": {
            "&:not(:last-child)": {
                marginBottom: 25,
            },
            "& .MuiFormLabel-root": {
                marginBottom: "10px !important",
            },
        },
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20
    },
    profileField: {
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 5,
        marginBottom: 15,

        '& .MuiInputBase-formControl': {
            padding: 0,

            '& .MuiInputAdornment-positionEnd': {
                position: 'absolute',
                right: 0,
                top: 0,
                width: '50px',
                height: '40px',
                padding: 0,
                margin: 0,
                maxHeight: '3em',
            }

        }

    },
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
}));

export default function ChangePassword() {
    const userInfo = Auth.getUserDetail()
    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()
    const [loader, setLoader] = useState(false);
    const { handleSubmit, errors, control, watch } = useForm();
    const [visibility, setVisibility] = useState({
        old_password: false,
        new_password: false,
        confirm_new_password: false
    })
    const new_password = watch("new_password", "");
    const old_password = watch("old_password", "");

    const onSubmit = async (data) => {
        setLoader(true);
        data = Object.assign({ ...data, user_role: userInfo.user_role });
        const res = await ApiPut("user/resetPassword", data);
        try {
            if (res.data.status === 200) {
                setLoader(false);
                toast.success(res.data.message, { autoClose: 5000 });
                dispatch(logout())
                localStorage.clear();
                history.push("/");
            } else {
                setLoader(false);
                toast.error(res.data.message, { autoClose: 5000 });
            }
        } catch (err) {
            setLoader(false);
            toast.error("Internal server error", { autoClose: 5000 });
        }
    };

    return (
        <div className={classes.profileWrap}>
            <LegendBox>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={classes.profileField}>
                        <div className={classes.title}>Change Password</div>
                        <FormGroup>
                            <FormLabel>Old Password</FormLabel>
                            <CustomTextField
                                fullWidth
                                name="old_password"
                                type={visibility.old_password ? "text" : "password"}
                                variant="filled"
                                placeholder="Old Password"
                                autoComplete="false"
                                control={control}
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end" >
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={(e) => setVisibility({
                                                    ...visibility,
                                                    old_password: !visibility.old_password
                                                })}
                                                edge="end"
                                            >
                                                {visibility.old_password ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                            </IconButton>
                                        </InputAdornment>

                                }}
                                rules={{
                                    required: "Old password required",
                                }}
                            />
                            {errors.old_password && (
                                <Box className={classes.error} color="error.main">
                                    <InfoIcon />
                                    {errors.old_password.message}
                                </Box>
                            )}
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>New Password</FormLabel>
                            <CustomTextField
                                fullWidth
                                name="new_password"
                                type={visibility.new_password ? "text" : "password"}
                                variant="filled"
                                placeholder="New Password"
                                control={control}
                                autoComplete="false"
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end" >
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={(e) => setVisibility({
                                                    ...visibility,
                                                    new_password: !visibility.new_password
                                                })}
                                                edge="end"
                                            >
                                                {visibility.new_password ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                            </IconButton>
                                        </InputAdornment>

                                }}
                                rules={{
                                    required: "New password required",
                                    pattern: {
                                        value: /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/,
                                        message: 'password should be including uppercase,lowercase,special character and minimum length 8'
                                    },
                                    validate: value => value !== old_password || 'Your new password is match with old password'
                                }}
                            />
                            {errors.new_password && (
                                <Box className={classes.error} color="error.main">
                                    <InfoIcon />
                                    {errors.new_password.message}
                                </Box>
                            )}
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Repeat Password</FormLabel>
                            <CustomTextField
                                fullWidth
                                name="confirm_new_password"
                                type={visibility.confirm_new_password ? "text" : "password"}
                                variant="filled"
                                control={control}
                                placeholder="Repeat Password"
                                autoComplete="false"
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end" >
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={(e) => setVisibility({
                                                    ...visibility,
                                                    confirm_new_password: !visibility.confirm_new_password
                                                })}
                                                edge="end"
                                            >
                                                {visibility.confirm_new_password ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                            </IconButton>
                                        </InputAdornment>

                                }}
                                rules={{
                                    required: "Confirm password required",
                                    validate: value => value === new_password || 'password mis match'
                                }}
                            />
                            {errors.confirm_new_password && (
                                <Box className={classes.error} color="error.main">
                                    <InfoIcon /> {errors.confirm_new_password.message}
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
                                            type="submit"
                                            disableElevation
                                        >
                                            save
                                        </Button>
                                    )}
                                </Grid>
                            </Grid>
                        </FormGroup>
                    </div>
                </form>
            </LegendBox>
        </div>
    )
}
