import React from 'react'
import { withStyles, Switch, makeStyles } from '@material-ui/core'

const StyledSwitch = withStyles(theme => ({
    root: {
        width: 60,
        height: 26,
        padding: 0,
        margin: theme.spacing(1),
    },
    switchBase: {
        padding: 2,
        '&$checked': {
            transform: 'translateX(34px)',
            color: theme.palette.common.white,
            '& + $track': {
                backgroundColor: '#37a000',
                opacity: 1,
                border: 'none',
            },
        },
        '&$focusVisible $thumb': {
            color: '#37a000',
        },
    },
    thumb: {
        width: 22,
        height: 22,
        borderRadius: 0
    },
    track: {
        borderRadius: 0,
        backgroundColor: "#555",
        opacity: 1,
    },
    checked: {},
}))(Switch);

const useStyles = makeStyles((theme)=> ({
    switchWrap: {
        position: 'relative'
    },
    swichLabelLeft: {
        position: "absolute",
        left: 15,
        top: 7,
        color: "#fff",
        display: "none",
        zIndex: "1",
        pointerEvents: "none"
    },
    swichLabelRight: {
        position: "absolute",
        right: 15,
        top: 7,
        color: "#fff",
        display: "none",
        zIndex: "1",
        pointerEvents: "none"
    },
    active: {
        display: "block !important"
    }
}));


export default function CustomSwitch({ ...props }) {
    const classes = useStyles();
    const [isActive, setActive] = React.useState(true);


    return (
        <div className={classes.switchWrap}>
            <span className={`${isActive ? `${classes.active}` : ""} ${classes.swichLabelLeft}`}>On</span>
            <StyledSwitch {...props}
                checked={isActive}
                onChange={() => setActive(!isActive)}/>
            <span className={`${!isActive ? `${classes.active}` : ""} ${classes.swichLabelRight}`}>Off</span>
        </div>
    )
}