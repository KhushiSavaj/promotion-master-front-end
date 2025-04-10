import React from 'react'
import {makeStyles, } from '@material-ui/core'

const useStyles = makeStyles((theme)=> ({
    dimBoxWrap: {
        backgroundColor: "#fff",
        borderRadius: 5,
        boxShadow: "0 0 2px rgba(0,0,0,0.10)",
        marginBottom: 15,
        display: "table",
        width: "100%",
        "&:last-child": {
            marginBottom: 0,
        }
    }
}));

export default function LegendBox({children, dimClassName, ...props}) {
    const classes = useStyles();
    return (
        <div className={`${classes.dimBoxWrap} ${dimClassName || ""}`} {...props}>
            {children}
        </div>
    )
}
