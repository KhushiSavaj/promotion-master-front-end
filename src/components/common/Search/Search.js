import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  makeStyles,
  Popover,
  TableCell,
  Typography,
} from "@material-ui/core";
import LegendBox from "../LegendBox";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { ApiPost, ApiPut } from "../../../helpers/API/ApiData";
import Auth from "../../../helpers/Auth";
import { useDispatch, useSelector } from "react-redux";
import {
  SearchAction,
} from "../../../redux/Search/SerachAction";
import { getStars } from "../../../helpers/utils";
import EditCampaignsModal from "../../business/Campaigns/EditCampaignsModal";
import { toast } from "react-toastify";
import ApplyCampaign from "../../smi/Campaign/ApplyCampaign";
import { ApplyForCampaign } from "../../../redux/smi/campaign/ApplyCampaignAction";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import RoomIcon from '@material-ui/icons/Room';
import InfluencerCard from "../influencerCard";
import { addFavorite, removeFavorite } from "../../../redux/favorite/FavoriteAction";
import NoData from "../NoData";
import Loader from "../Loader";

const useStyles = makeStyles((theme) => ({
  searchContent: {
    padding: [[40, 0]],
  },
  campaignsCreateBtn: {
    marginBottom: 22,
  },
  root: {
    paddingTop: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    boxShadow: "none",
    border: "1px solid #e0e0e0",
    height: "35px",
    margin: "5px 0px",
  },
  input: {
    marginLeft: theme.spacing(1.5),
    flex: 1,
  },
  iconButton: {
    padding: 10,
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

export default function Search(props) {
  const searchName =
    props &&
    props.history &&
    props.history.location &&
    props.history.location.searchName &&
    props.history.location.searchName;
  const classes = useStyles();
  const history = useHistory()
  let userInfo = Auth.getUserDetail();
  const [editData, setEditData] = useState();
  const [applyOpen, setApplyOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [applyCampaign, setApplyCampaign] = useState();
  const [search, setSearch] = useState(null);
  const [pageDataLimit] = useState(10);
  const [priceData, setPriceData] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [index, setIndex] = useState();
  const [seeMore, setSeeMore] = React.useState(false)
  const [indexSeeMore, setIndexSeeMore] = React.useState()

  const InfluencerFavoriteUnFavoriteLoader = useSelector(state => state.favoriteReducer.buttonLoader)

  const handlePopoverOpen = (event, item) => {
    setAnchorEl(event.currentTarget);
    setPriceData(item)
  };

  const seeMoreClick = (i) => {
    setSeeMore(true)
    setIndexSeeMore(i)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setPriceData();

  };

  const openMenu = Boolean(anchorEl);
  const dispatch = useDispatch();
  const searchData = useSelector((state) => state.SearchReducer);
  const isOwnInfluencer = searchData && searchData.influencerData && searchData.influencerData.findIndex(item => item._id === userInfo._id)

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  const searchSubmitHandler = (event) => {
    event.preventDefault();
    if (search) {
      dispatch(SearchAction(1, pageDataLimit, search));
    }
  };

  useEffect(() => {
    if (searchName) {
      dispatch(SearchAction(1, pageDataLimit, searchName));
    }
  }, [dispatch, pageDataLimit, searchName]);

  const handleApplyOpen = (data) => {
    setApplyCampaign(data);
    setApplyOpen(true);
  };

  const handleApplyClose = () => {
    setApplyCampaign();
    setApplyOpen(false);
  };

  const handleClickOpenInfluencer = (data) => {
    history.push({
      pathname: '/influencer-details',
      state: data._id
    })
  };

  const toggleEditModal = (data) => {
    setEditData(data);
    setEditModal(!editModal);
  };

  const CreateOrEdit = async (
    data,
    picture,
    industry,
    influencerData,
    editData,
    type
  ) => {
    data = { ...data };
    var form_data = new FormData();

    for (var key in data) {
      form_data.append(key, data[key]);
    }
    if (picture && picture.file) {
      form_data.append("image", picture.file);
    }
    if (picture && picture.file) {
      form_data.append("image", picture.file);
    }
    if (industry) {
      form_data.append("industry", industry);
    }
    let influences = influencerData.filter((obj) => obj.selected);
    let influencerIds = influences.map((obj) => obj._id);
    if (influencerIds.length > 0) {
      form_data.append("invite_smi", influencerIds.toString());
    }
    let res;
    if (editData) {
      form_data.append("_id", editData._id);
      res = await ApiPut("campaign/", form_data);
    } else {
      res = await ApiPost("campaign/create", form_data);
    }
    try {
      if (res.data.status === 200) {
        toast.success(res.data.message, { autoClose: 5000 });
        if (type === "edit") {
          const index = searchData.campaignData.findIndex(
            (item) => item._id === res.data.data._id
          );
          if (index > -1) {
            searchData.campaignData[index] = res.data.data;
            setEditModal(!editModal);
          }
        }
      } else {
        toast.error(res.data.message, { autoClose: 5000 });
      }
    } catch (err) {
      toast.error("Internal server error", { autoClose: 5000 });
    }
  };

  const onSubmitForApplyCampaign = (data) => {
    dispatch(ApplyForCampaign(data));
    const index =
      searchData.campaignData &&
      searchData.campaignData &&
      data &&
      searchData.campaignData.findIndex((item) => item._id === data.campaign);
    if (index > -1) {
      searchData.campaignData[index] = {
        ...searchData.campaignData[index],
        status: "Applied"
      }
    }
  };

  const handleFavorite = async (data) => {
    const indexNo = searchData.influencerData.findIndex(
      (item) => item._id === data._id
    );
    setIndex(indexNo)
    if (indexNo > -1) {
      dispatch(addFavorite(data._id));
    }
  };

  const handleUnFavorite = async (data) => {
    const indexNo = searchData.influencerData.findIndex(
      (item) => item._id === data._id
    );
    setIndex(indexNo)
    if (indexNo > -1) {
    }
    dispatch(removeFavorite(data._id));
  };

  return (
    <React.Fragment>
      {applyCampaign && (
        <ApplyCampaign
          open={applyOpen}
          title="Campaign Application"
          applyCampaign={applyCampaign}
          handleClose={handleApplyClose}
          onSubmitForApplyCampaign={onSubmitForApplyCampaign}
          closeIcon={true}
        />
      )}
      <EditCampaignsModal
        open={editModal}
        editData={editData}
        title={"Edit Campaign"}
        handleClose={() => toggleEditModal()}
        CreateOrEdit={CreateOrEdit}
        closeIcon={true}
      />
      <Container>
        <form onSubmit={(event) => searchSubmitHandler(event)}>
          <Paper component="form" className={classes.root}>
            <InputBase
              className={classes.input}
              placeholder="Search..."
              inputProps={{ "aria-label": "search google maps" }}
              onChange={(e) => {
                searchHandler(e);
              }}
              value={search}
              onKeyPress={(event) =>
                event.key === "Enter"
                  ? searchSubmitHandler(event)
                  : null
              }
            />
            <IconButton
              className={classes.iconButton}
              aria-label="search"
              type="submit"
              onClick={(event) => {
                searchSubmitHandler(event);
              }}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </form>
        {searchData.error && <p>{searchData.error}</p>}
        {searchData.loading ? (
          <div className="loader">
            <Loader />
          </div>
        ) : searchData.campaignCount === 0 && searchData.influencerCount === 0 ? <NoData /> : (
          <>
            <Grid container spacing={3} style={{ marginBottom: '35px' }}>
              <Grid item md={9} xs={12}>
                <div className={classes.BoxWrap}>
                  {searchData.campaignCount > 0 &&
                    searchData.campaignData.map((item, i) => {
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
                                  {userInfo.user_role === 'SMI' ?
                                    item.status ?
                                      item.status
                                      : (
                                        <TableCell>
                                          <Button
                                            fullWidth
                                            color="primary"
                                            variant="contained"
                                            disableElevation
                                            onClick={() =>
                                              handleApplyOpen(item)
                                            }
                                          >
                                            Apply
                                    </Button>
                                        </TableCell>
                                      )
                                    :
                                    <Button
                                      color="primary"
                                      variant="contained"
                                      disableElevation
                                      onClick={() => {
                                        toggleEditModal(item);
                                      }}
                                    >
                                      Edit
                                    </Button>}
                                </div>
                              </div>
                              <div className={classes.cardBody}>
                                <div className={classes.textDesc}>
                                  <Typography variant="body1" component="p">
                                    {item.campaign_instruction}
                                  </Typography>
                                  <span onClick={() => seeMoreClick(i)} style={{ cursor: 'pointer' }}>{item.campaign_instruction.length > 279 ? indexSeeMore === i && seeMore ? null : 'See more' : null}</span>
                                </div>
                              </div>
                              <div className={classes.cardFooter}>
                                <div className={classes.priceBox}>
                                  <div className={classes.price}>Price (including fees)<span className={classes.textGreen}>${userInfo.user_role === 'SMI' ? item.price.smi_price : item.price.business_price}</span>{userInfo.user_role !== 'SMI' && <InfoOutlinedIcon onMouseEnter={(e) => handlePopoverOpen(e, item)} onMouseLeave={handlePopoverClose} />}</div>
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
                                    <Typography>{userInfo.user_role === 'SMI' ? null : <div>
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

                                  {userInfo.user_role !== 'SMI' && <div className={classes.price}>Campaign Budget<span>${item.price.campaign_price}</span></div>}
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
                </div>
              </Grid>
            </Grid>

            {searchData.error && <p>{searchData.error}</p>}
            {searchData.loading ? (
              <div className="loader">
                <Loader />
              </div>
            ) : (
              <>
                <Grid item md={9} xs={12}>
                  <Grid container spacing={3}>
                    <InfluencerCard
                      data={searchData.influencerData}
                      index={index}
                      isOwnInfluencer={isOwnInfluencer}
                      loader={InfluencerFavoriteUnFavoriteLoader}
                      handleFavorite={data => handleFavorite(data)}
                      handleUnFavorite={data => handleUnFavorite(data)}
                      handleClickOpenInfluencer={data => handleClickOpenInfluencer(data)}
                    />
                  </Grid>
                </Grid>
              </>
            )}
          </>
        )}
      </Container>
    </React.Fragment>
  );
}
