import React, { useEffect } from 'react'
import { Button, CircularProgress, FormGroup, Grid, makeStyles } from '@material-ui/core';
import LegendBox from '../LegendBox'
import { ApiGet, ApiPost } from '../../../helpers/API/ApiData';
import Auth from '../../../helpers/Auth';

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
        marginBottom: 20,
        display: 'flex',
        justifyContent: 'center'
    },
    profileField: {
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 5,
        marginBottom: 15,
    },
}));

export default function BillingDetails() {

    let userInfo = Auth.getUserDetail();
    const classes = useStyles();
    const [loader, setLoader] = React.useState(false)
    const [accountLinked, setAccountLinked] = React.useState()

    useEffect(() => {
        setLoader(true)
        const fetchData = async () => {
            const res = await ApiGet("user/homepage");
            try {
                if (res.data.status === 200) {
                    setAccountLinked(res.data.data.accountLinked)
                    setLoader(false)
                }
            } catch (err) {
                setLoader(false)
            }
        };
        fetchData();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoader(true)
        const data = { first_name: userInfo.first_name, last_name: userInfo.last_name }
        const response = await ApiPost('payment/authorize', data)
        try {
            window.location.href = response.data.data.url
            setLoader(false)
        } catch (error) {
            setLoader(false)
        }
    }


    return (
        <div className={classes.profileWrap}>
            <LegendBox>
                <form onSubmit={handleSubmit}>
                    <div className={classes.profileField}>
                        <div className={classes.title}>Connect your bank account with stripe </div>
                        <FormGroup>
                            <Grid container justify="center">
                                <Grid item md={4}>
                                    {
                                        loader ?
                                            <Button
                                                fullWidth
                                                color="default"
                                                variant="contained"
                                                disableElevation
                                                disabled >
                                                <CircularProgress color="inherit" size={14} />&nbsp;&nbsp;Loading...
                                            </Button>
                                            :
                                            accountLinked ?
                                                <Button
                                                    fullWidth
                                                    color="default"
                                                    variant="contained"
                                                    disableElevation
                                                    disabled >
                                                    Account Connected
                                            </Button>
                                                :
                                                <Button
                                                    fullWidth
                                                    color="primary"
                                                    variant="contained"
                                                    disableElevation
                                                    type="submit"
                                                >
                                                    Connect With Stripe
                                    </Button>
                                    }
                                </Grid>
                            </Grid>
                        </FormGroup>
                    </div>
                </form>
            </LegendBox>
        </div>
    )
}
