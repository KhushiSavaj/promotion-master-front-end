import React, { Fragment } from 'react';
import { makeStyles, AppBar, Tabs, Tab, Grid } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: 'transparent',
        '& .MuiAppBar-root': {
            boxShadow: 'none',
            position: "sticky",
            top: 84
        },
        '& .MuiAppBar-colorPrimary': {
            backgroundColor: 'transparent',
            color: theme.palette.primary.main,
            borderBottom: 0
        },
        '& .MuiTabs-scroller': {
            '& span': {
                backgroundColor: 'transparent',
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                "& *:first-child": {
                    marginBottom: 0,
                    marginRight: 15
                }
            }
        },
        '& .MuiTab-textColorInherit': {
            color: '#353535',
            opacity: '1',
            textTransform: 'capitalize',
            fontSize: 18,
            borderRadius: 5 
        },
        '& .MuiTab-textColorInherit.Mui-selected': {
            color: '#32CD32',
            position: 'relative',
            borderColor: "#32CD32",
            '&::after': {
                content: '""',
                position: 'absolute',
                width: '80%',
                bottom: 0
            }
        },
        '& .MuiTab-root': {
            minWidth: 'unset !important',
            padding: '15px 20px',
            borderRadius: 0,
            fontSize: 16,
            textAlign: "left",
            minHeight: "auto",
            width: "100%",
            borderBottom: "1px solid #ddd", 
            maxWidth: "100%",
            "&:last-child": {
                borderBottom: "0", 
            }
        }
    },
    tabCustom: {
        borderRadius: 5,
        backgroundColor: "#fff",
    },
}));

function a11yProps(index) {
    return {
        id: `user-tab-${index}`,
        'aria-controls': `user-tabPanel-${index}`,
    };
}

function TabPanel(props) {
    const { children, value, index, styles, ...other } = props;



    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`user-tabPanel-${index}`}
            aria-labelledby={`user-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Fragment>
                    {children}

                </Fragment>
            )}
        </div>
    );
}

export default function CustomTabs({ tabs, value, orientation, handleChange }) {
    const classes = useStyles();

    return (
        <Fragment>
            <div>
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item md={3} xs={12}>
                            <AppBar className={classes.displayBlock} position="static">
                                <Tabs orientation={orientation} variant="scrollable" className={classes.tabCustom} value={value} onChange={handleChange}>
                                    {
                                        tabs && tabs.length > 0 && tabs.map((tab, tabIndex) => (
                                            <Tab key={tabIndex} icon={tab.icon} label={tab.label} {...a11yProps(tabIndex)} />
                                        ))
                                    }
                                </Tabs>
                            </AppBar>
                        </Grid>
                        <Grid item md={9} xs={12}>          
                            {
                                tabs && tabs.length > 0 && tabs.map((tab, tabIndex) => (
                                    <TabPanel key={tabIndex}
                                        value={value}
                                        index={tabIndex}
                                        styles={classes}>
                                        {tab.tabComponent}
                                    </TabPanel>
                                ))
                            }
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Fragment >
    )
}