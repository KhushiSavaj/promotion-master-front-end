import React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    customeModal: {
        width: "100%",
        "&.MuiDialog-paper": {
            top: 25,
            margin: 20
        },
        "& .MuiDialogTitle-root": {
            "& .MuiTypography-root ": {
                [theme.breakpoints.down("xs")]: {
                    fontSize: 16
                }
            }
        },
        "& .MuiDialogContent-root": {
            paddingTop: theme.spacing(3),
            paddingBottom: theme.spacing(3),
            "&.MuiDialogContent-dividers": {
                [theme.breakpoints.down("xs")]: {
                    padding: 15
                }
            }
        }
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));

export default function CustomModal({ handleClose, maxWidth, title, closeIcon, children, open, ...props }) {
    const classes = useStyles();
    return (
        <div>
            <Dialog
                open={open}
                maxWidth={maxWidth}
                classes={{
                    paper: classes.customeModal,
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                {...props}
            >

                {title && <DialogTitle>
                    {title}
                    {closeIcon && <IconButton className={classes.closeButton} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>}

                </DialogTitle>}
                <DialogContent dividers>
                    {children}
                </DialogContent>
            </Dialog>
        </div>
    );
}