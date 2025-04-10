import React from 'react'
import {Button, Grid, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme)=> ({
    paymentWrap: {
        paddingTop: 15
    }
}));

export default function Payment() {
    const classes = useStyles();
    return (
        <div className={classes.paymentWrap}>
            <Grid container spacing={3} justify="space-between">
                <Grid item md={4}>
                    <Button
                        fullWidth
                        color="primary"
                        variant="outlined"
                        disableElevation>Add Payple</Button>
                </Grid>
                <Grid item md={4}>
                    <Button
                        fullWidth
                        color="primary"
                        variant="outlined"
                        disableElevation>Add Venmo</Button>
                </Grid>
                <Grid item md={3}>
                    <Button
                        fullWidth
                        color="primary"
                        variant="contained"
                        disableElevation>Save</Button>
                </Grid>
            </Grid>
        </div>
    )
}