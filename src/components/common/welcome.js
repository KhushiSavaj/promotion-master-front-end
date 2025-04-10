import React from 'react'
import { useHistory } from "react-router-dom";
import { Button, Container, Grid, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    homeContent: {
        padding: [[30,0]],
        backgroundColor: "#f1f2f4"
    },
    socialInfo: {
        padding: [[30, 0]],
        "& h3": {
            marginBottom: 20
        },
        "& p": {
            marginBottom: 20
        }
    }
}));

export default function Welcome() {
    const classes = useStyles();
    const history = useHistory();

    return (
        <div className={classes.homeContent}>
            <Container>
                <Grid container justify="center" align="center">
                    <Grid item md={8}>
                        <div className={classes.socialInfo}>
                            <Typography variant="h3" component="h3">
                                Small social media influencers are worth a lot. A whole lot.
                            </Typography>
                            <Typography variant="body2" component="p">
                                Click below to explore your social media influencer value.
                            </Typography>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => history.push("/signup")}
                                disableElevation>Start Now</Button>
                        </div>
                        <div className={classes.socialInfo}>
                            <Typography variant="h3" component="h3">
                                Simple social media marketing localization for your business.
                            </Typography>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => history.push("/signup")}
                                disableElevation>Start Now</Button>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
