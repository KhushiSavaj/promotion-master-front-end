import React, { useState } from "react";
import {
    Popover,
    makeStyles,
    Typography,
    Button,
} from "@material-ui/core";
import LegendBox from "./LegendBox";
import { getStars } from "../../helpers/utils";
import RoomIcon from '@material-ui/icons/Room';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/swiper.scss';
import Auth from "../../helpers/Auth";
import 'swiper/components/navigation/navigation.scss';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { toast } from "react-toastify";
import { useHistory } from "react-router";


SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const useStyles = makeStyles((theme) => ({
    homeContent: {
        padding: [[20, 0]],
    },
    refresh: {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "-35px",
    },
    refreshHome: {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "-9px",
    },
    campaignsCreateBtn: {
        marginBottom: 22,
    },
    campaignsFindBtn: {
        marginTop: 10,
        marginBottom: 20,
    },
    BoxWrap: {
        marginTop: 20,
        "&:not(:last-child)": {
            marginBottom: 20,
        },
    },
    cardHeader: {
        display: "flex",
        justifyContent: "space-between",
        padding: [[20, 20, 0, 20]],
    },
    titleText: {
        width: "60%",
        "& h6": {
            fontWeight: "bold",
            marginBottom: 8
        },
    },
    cardBtn: {
        "& button": {
            [theme.breakpoints.down("380")]: {
                fontSize: 12,
                padding: [[5, 10]]
            }
        }
    },
    industry: {
        color: "#7d7d7d",
        padding: [[4, 10]],
        fontSize: 12,
        backgroundColor: "#f1f1f1",
        borderRadius: 5,
        fontWeight: "600"
    },
    compaignRate: {
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap"
    },
    star: {
        marginLeft: 10,
        "& svg": {
            fontSize: 16,
            color: "#32CD32",
            verticalAlign: "middle"
        },
        [theme.breakpoints.down("380")]: {
            width: "100%",
            marginLeft: 0,
        }
    },
    cardBody: {
        padding: 20,
        "& p": {
            color: "#666",
            fontSize: 14,
            height: 41,
            overflow: "hidden"
        },
        [theme.breakpoints.down("380")]: {
            padding: [[10, 20]],
        }
    },
    seeMoreCardBody: {
        padding: 20,
        "& p": {
            color: "#666",
            fontSize: 14,
        },
        [theme.breakpoints.down("380")]: {
            padding: [[10, 20]],
        }
    },
    cardFooter: {
        borderTop: "1px solid #eee",
        padding: [[10, 20]],
        display: 'flex',
        justifyContent: "space-between"
    },
    priceBox: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        flexWrap: "wrap"
    },
    price: {
        marginRight: 10,
        color: "#777",
        "& span": {
            paddingLeft: 10,
            color: "#333",
            fontWeight: "bold"
        },
        "& svg": {
            fontSize: 16,
            verticalAlign: "text-bottom",
            marginLeft: 5,
            cursor: "pointer"
        }
    },
    textGreen: {
        color: "#32CD32",
    },
    zipCode: {
        color: "#777",
        textAlign: "right",
        "& svg": {
            fontSize: 16,
            verticalAlign: "middle",
        },
        "& span": {
            verticalAlign: "middle",
            color: "#777"
        }
    },
    priceFields: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: '14px',
        color: "#777",
        margin: '2px',
        width: '200px'
    },
    popover: {
        pointerEvents: 'none',
    },
    fieldTitle: {
        color: '#777',
    },
    paper: {
        padding: theme.spacing(2),
        boxShadow: 'none',
        border: '1px solid #f1f1f1'
    },
    status: {
        marginLeft: '10px',
        color: '#777'
    },
    campainName: {
        display: 'flex'
    },
}));

export default function CampaignCard({ data, toggleEditModal, toogleViewProposalModal, applyCampaign, cancelApplyProposal, handleRateOpen, type, handleCompleteOpen }) {

    let userInfo = Auth.getUserDetail();
    const classes = useStyles();
    const history = useHistory()
    const [priceData, setPriceData] = useState();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [seeMore, setSeeMore] = React.useState(false)
    const [index, setIndex] = React.useState()

    const handlePopoverOpen = (event, item) => {
        setAnchorEl(event.currentTarget);
        setPriceData(item)
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setPriceData();

    };

    const seeMoreClick = (i) => {
        setSeeMore(true)
        setIndex(i)
    }

    const campaignApply = (item) => {
        if (userInfo.accountLinked) {
            applyCampaign(item)
        }
        else {
            toast.error(<>{`Please connect your bank account from`}<span onClick={() => {
                history.push({
                    pathname: '/my-account',
                    state: 'Billing Details'
                })
            }}>{` account setting`}</span></>)
        }
    }

    const openMenu = Boolean(anchorEl);

    console.log("data",data)

    return (
        <React.Fragment>
            {handleRateOpen ? data.map((item, i) => {
                return (
                    <>
                        <LegendBox>
                            <div className={classes.cardWrap}>
                                <div className={classes.cardHeader}>
                                    <div className={classes.titleText}>
                                        <div className={classes.campainName}>
                                            <Typography component="h6" variant="h6">{item.campaign.campaign_name}</Typography>
                                            {<span className={classes.status}>{item.invitation_status ===
                                                "RESPONSE_WAITING"
                                                ? "Applied"
                                                : item.invitation_status === "ACCEPTED"
                                                    ? "Accepted"
                                                    : item.invitation_status === "COMPLETED"
                                                        ? "completed"
                                                        : ""}
                                            </span>
                                            }
                                        </div>
                                        <div className={classes.compaignRate}>
                                            <Typography className={classes.industry} component="span" variant="body1">{item.campaign.industry}</Typography>
                                            <div className={classes.star}>
                                                {getStars(item.campaign.stars)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={classes.cardBtn}>
                                        {
                                            item.is_completed_in_SMI ? (
                                                item.is_completed_in_Business ? (
                                                    <Button
                                                        fullWidth
                                                        style={{
                                                            borderColor: "#37A000",
                                                            color: "#37A000",
                                                        }}
                                                        variant="outlined"
                                                        disabled
                                                        disableElevation
                                                    >
                                                        Completed
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        fullWidth
                                                        style={{
                                                            borderColor: "#37A000",
                                                            color: "#37A000",
                                                        }}
                                                        variant="outlined"
                                                        onClick={() => handleRateOpen(item)}
                                                        disableElevation
                                                    >
                                                        Mark As Complete
                                                    </Button>
                                                )
                                            ) : item.completion_status === "RESPONSE_WAITING" ? (
                                                <Button
                                                    fullWidth
                                                    style={{
                                                        borderColor: "#37A000",
                                                        color: "#37A000",
                                                    }}
                                                    variant="outlined"
                                                    disabled
                                                    disableElevation
                                                >
                                                    Pending
                                                </Button>
                                            ) : (
                                                <Button
                                                    fullWidth
                                                    style={{
                                                        borderColor: "#37A000",
                                                        color: "#37A000",
                                                    }}
                                                    variant="outlined"
                                                    onClick={() =>
                                                        handleCompleteOpen(item)
                                                    }
                                                    disableElevation
                                                >
                                                    Submit for review
                                                </Button>
                                            )}
                                    </div>
                                </div>
                                <div className={index === i && seeMore ? classes.seeMoreCardBody : classes.cardBody}>
                                    <div className={classes.textDesc}>
                                        <Typography variant="body1" component="p">
                                            {item.campaign.campaign_instruction}
                                        </Typography>
                                        <span onClick={() => seeMoreClick(i)} style={{ cursor: 'pointer' }}>{item.campaign.campaign_instruction.length > 279 ? index === i && seeMore ? null : 'See more' : null}</span>
                                    </div>
                                </div>
                                <div className={classes.cardFooter}>
                                    <div className={classes.priceBox}>
                                        <div className={classes.price}>Price {userInfo.user_role === 'SMI' ? '(excluding fees)' : '(including fees)'}<span className={classes.textGreen}>${item.campaign.price.smi_price}</span></div>
                                        <div className={classes.zipCode}>
                                            <RoomIcon /> <span>{item.campaign.zip || item.zip}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </LegendBox>
                    </>
                )
            }
            ) : cancelApplyProposal ?
                data.map((item, i) => {
                    return (
                        <>
                            <LegendBox>
                                <div className={classes.cardWrap}>
                                    <div className={classes.cardHeader}>
                                        <div className={classes.titleText}>
                                            <Typography component="h6" variant="h6">{item.campaign.campaign_name}</Typography>
                                            <div className={classes.compaignRate}>
                                                <Typography className={classes.industry} component="span" variant="body1">{item.campaign.industry}</Typography>
                                                <div className={classes.star}>
                                                    {getStars(item.campaign.stars)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={classes.cardBtn}>
                                            <Button
                                                fullWidth
                                                style={{
                                                    backgroundColor: "#f44336",
                                                    color: "#fff",
                                                }}
                                                onClick={() =>
                                                    cancelApplyProposal(item)
                                                }
                                                disableElevation
                                            >
                                                Cancel
                                      </Button>
                                        </div>
                                    </div>
                                    <div className={index === i && seeMore ? classes.seeMoreCardBody : classes.cardBody}>
                                        <div className={classes.textDesc}>
                                            <Typography variant="body1" component="p">
                                                {item.campaign.campaign_instruction}
                                            </Typography>
                                            <span onClick={() => seeMoreClick(i)} style={{ cursor: 'pointer' }}>{item.campaign.campaign_instruction.length > 279 ? index === i && seeMore ? null : 'See more' : null}</span>
                                        </div>
                                    </div>
                                    <div className={classes.cardFooter}>
                                        <div className={classes.priceBox}>
                                            <div className={classes.price}>Price {userInfo.user_role === 'SMI' ? '(excluding fees)' : '(including fees)'}<span className={classes.textGreen}>${item.campaign && item.campaign.price.smi_price}</span></div>

                                            <div className={classes.zipCode}>
                                                <RoomIcon /> <span>{item.campaign.zip || item.zip}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </LegendBox>
                        </>
                    )
                })

                :

                data.map((item, i) => {
                    return (
                        <>
                            <LegendBox>
                                <div className={classes.cardWrap}>
                                    <div className={classes.cardHeader}>
                                        <div className={classes.titleText}>
                                            <Typography component="h6" variant="h6">{item.campaign_name}</Typography>
                                            <div className={classes.compaignRate}>
                                                <Typography className={classes.industry} component="span" variant="body1">{item.industry}</Typography>
                                                <div className={classes.star}>
                                                    {getStars(item.stars)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={classes.cardBtn}>
                                            {toggleEditModal && <Button
                                                color="primary"
                                                variant="contained"
                                                disableElevation
                                                onClick={() => {
                                                    toggleEditModal(item);
                                                }}
                                            >
                                                Edit
                                            </Button>}
                                            {toogleViewProposalModal && <Button
                                                fullWidth
                                                color="primary"
                                                variant="outlined"
                                                onClick={() => toogleViewProposalModal(item)}
                                                disableElevation
                                            >
                                                View Proposals
                                            </Button>}
                                            {applyCampaign && <Button
                                                color="primary"
                                                variant="contained"
                                                disableElevation
                                                onClick={() => campaignApply(item)}
                                            >
                                                Apply
                                            </Button>}
                                        </div>
                                    </div>
                                    <div className={index === i && seeMore ? classes.seeMoreCardBody : classes.cardBody}>
                                        <div className={classes.textDesc}>
                                            <Typography variant="body1" component="p">
                                                {item.campaign_instruction}
                                            </Typography>
                                            <span onClick={() => seeMoreClick(i)} style={{ cursor: 'pointer' }}>{item.campaign_instruction.length > 279 ? index === i && seeMore ? null : 'See more' : null}</span>
                                        </div>
                                    </div>
                                    <div className={classes.cardFooter}>
                                        <div className={classes.priceBox}>
                                            <div className={classes.price}>Price {userInfo.user_role === 'SMI' ? '(excluding fees)' : '(including fees)'}<span className={classes.textGreen}>${type ? item.price.smi_price : item.price.business_price}</span>{userInfo.user_role !== 'SMI' && <InfoOutlinedIcon onMouseEnter={(e) => handlePopoverOpen(e, item)} onMouseLeave={handlePopoverClose} />} </div>
                                            {priceData && <Popover
                                                id="mouse-over-popover"
                                                className={classes.popover}
                                                classes={{
                                                    paper: classes.paper,
                                                }}
                                                open={openMenu}
                                                anchorEl={anchorEl}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'left',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                                disableRestoreFocus
                                            >
                                                <Typography>{type ? null : <div>
                                                    <div className={classes.priceFields}>
                                                        <div className={classes.fieldTitle}>Campaign Budget($)</div>
                                                        {priceData.price.campaign_price}
                                                    </div>
                                                    <div className={classes.priceFields}>
                                                        <div className={classes.fieldTitle}>Sales Tax Rate(%)</div>
                                                        {priceData.price.sales_tax_rate}
                                                    </div>
                                                    <div className={classes.priceFields}>
                                                        <div className={classes.fieldTitle}>Sales Tax($)</div>
                                                        {priceData.price.sales_tax}
                                                    </div>
                                                    <div className={classes.priceFields}>
                                                        <div className={classes.fieldTitle}>Final Price($)</div>
                                                        {priceData.price.business_price}
                                                    </div>
                                                </div>}</Typography>
                                            </Popover>}
                                            {!type && <div className={classes.price}>Campaign Budget<span>${item.price.campaign_price}</span></div>}
                                            {/* <div className={classes.price}>Submission Code<span>{item}</span></div> */}
                                            <div className={classes.zipCode}>
                                                <RoomIcon /> <span>{item.zip || item.campaign.zip}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </LegendBox>
                        </>
                    )
                })
            }
        </React.Fragment>
    );
}
