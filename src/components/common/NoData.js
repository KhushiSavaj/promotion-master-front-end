import React from 'react'
import { makeStyles } from '@material-ui/core';
import NoDataImage from '../../assets/images/nodataImage.png'


const useStyles = makeStyles((theme) => ({
    NoDataImage: {
        display: "flex",
        height: "calc(100vh - 172px)",
        alignItems: "center",
        justifyContent: "center",
    }
}));

function NoData() {
    const classes = useStyles();
    return (
        <div className={classes.NoDataImage}>
            <img src={NoDataImage} alt="No Data Found"/>
        </div>
    )
}

export default NoData
