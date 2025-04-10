import React from 'react'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    spinner: {
        textAlign: "center",
        "& > div": {
            width: 18,
            height: 18,
            backgroundColor: "#3F3F3F",
            borderRadius: "100%",
            margin: "0 3px",
            display: "inline-block",
            WebkitAnimation: "sk-bouncedelay 1.4s infinite ease-in-out both",
            animation: "sk-bouncedelay 1.4s infinite ease-in-out both",
            "&:first-child": {
                WebkitAnimationDelay: "-0.32s",
                animationDelay: "-0.32s",
            },
            "&:nth-child(2)": {
                WebkitAnimationDelay: "-0.16s",
                animationDelay: "-0.16s",
            }
        }
    },
}));

export default function Loader() {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.spinner}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}
