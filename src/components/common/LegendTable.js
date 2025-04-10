import React from 'react'
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme)=> ({
    legendTableWrap: {
        marginTop: 15,
        "& .MuiTableHead-root th": {
            fontWeight: "bold",
            backgroundColor: "#fff",
            "&:empty": {
                position: "relative",
                "&:before": {
                    content: '""',
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    left: "0px",
                    height: 1,
                    backgroundColor: "#e0e0e0",
                    transform: "translateY(-50%)"
                }
            }
        },
        "& .MuiTableCell-root": {
            border: 0,
            padding: 10,
            whiteSpace: "nowrap",
            "& svg": {
                fontSize: 16,
                verticalAlign: "middle"
            }
        }
    },
    legendTableInner: {
        margin: "0 20px"
    }
}));

export default function LegendTable({children, ...props}) {
    const classes = useStyles();
    return (
        <div className={classes.legendTableWrap} {...props}>
            <div className={classes.legendTableInner}>
                {children}
            </div>
        </div>
    )
}
