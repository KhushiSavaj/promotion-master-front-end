import React from 'react'
import { Container, Grid, makeStyles, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme)=> ({
    footer: {
        backgroundColor: "#3F3F3F",
        padding: "20px 0",
        marginTop: "auto"
    },
    footerDesc: {
        color: "#fff",
        fontSize: 14,
        [theme.breakpoints.down("sm")]: {
            textAlign: "center"
        }
    },
    footerLink: {
        textAlign: "right",
        "& a": {
            color: "#fff",
            paddingLeft: 15 ,
            lineHeight: "24px",
            [theme.breakpoints.down("380")]: {
                display: "block",
                padding: 0
            }
        },
        "& a:hover": {
            textDecoration: "underline"
        },
        [theme.breakpoints.down("sm")]: {
            textAlign: "center"
        },
    }
}));

export default function Footer() {
    const classes = useStyles();

    return (
        <div className={classes.footer}>
            <Container>
                <Grid container justify="center" alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Typography className={classes.footerDesc} component="p">
                            &copy; 2021 All Rights Reserved.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div className={classes.footerLink}>
                            <Link to="/">Terms of Service</Link>
                            <Link to="/">Privacy Policy</Link>
                            <Link to="/">Accessibility</Link>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
