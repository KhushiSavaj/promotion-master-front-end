import React, { useState, useEffect } from "react";
import {
    Popover,
    makeStyles,
    Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import LegendBox from "../../common/LegendBox";
import { getStars } from "../../../helpers/utils";
import {
    BusinessHomeAction,
} from "../../../redux/business/Home/BusinessHomeAction";
import RoomIcon from '@material-ui/icons/Room';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';


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
        "& h6": {
          fontWeight: "bold",
          marginBottom: 8
        },
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
      },
      star: {
        marginLeft: 10,
        "& svg": {
          fontSize: 16,
          color: "#32CD32",
          verticalAlign: "middle"
        }
      },
      cardBody: {
        padding: 20,
        "& p": {
          color: "#666",
          fontSize: 14,
          height: 41,
          overflow: "hidden"
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
        width: "60%",
        justifyContent: "space-between"
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
        width: "40%",
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
        fontSize:'14px',
        color: "#777",
        margin:'2px',
        width:'200px'
      },
      popover: {
        pointerEvents: 'none',
      },
      fieldTitle:{
        color:'#777',
      },
      paper: {
        padding: theme.spacing(2),
        boxShadow:'none',
        border:'1px solid #f1f1f1'
      },

}));

export default function HomeCampaign() {
    const classes = useStyles();
    const [pageDataLimit] = useState(10);
    const [priceData, setPriceData] = useState();

    const dispatch = useDispatch();
    const HomeData = useSelector((state) => state.BusinessHomeReducer);

    useEffect(() => {
        !HomeData.influencer.length &&
            dispatch(BusinessHomeAction(1, pageDataLimit));
    }, []);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event, item) => {
        setAnchorEl(event.currentTarget);
        setPriceData(item)
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setPriceData();

    };

    const openMenu = Boolean(anchorEl);

    return (
        <React.Fragment>
            {
                HomeData &&
                HomeData.campaignData.map((item) => {
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

                                        </div>
                                    </div>
                                    <div className={classes.cardBody}>
                                        <div className={classes.textDesc}>
                                            <Typography variant="body1" component="p">
                                                {item.campaign_instruction}
                                            </Typography>
                                            <span>See more</span>
                                        </div>
                                    </div>
                                    <div className={classes.cardFooter}>
                                        <div className={classes.priceBox}>
                                            <div className={classes.price}>Price (including fees)<span className={classes.textGreen}>${item.price.business_price}</span><InfoOutlinedIcon onMouseEnter={(e) => handlePopoverOpen(e, item)}
                                                onMouseLeave={handlePopoverClose}
                                            /></div>
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
                                                <Typography> <div>
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
                                                </div></Typography>
                                            </Popover>}

                                            <div className={classes.price}>Campaign Budget<span>${item.price.campaign_price}</span></div>
                                        </div>
                                        <div className={classes.zipCode}>
                                            <RoomIcon /> <span>{item.zip}</span>
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
