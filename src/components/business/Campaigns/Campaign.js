import React, { useState, useEffect } from "react";
import {
  Button, Container, Grid, makeStyles
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../common/Sidebar";
import CreateCampaignsModal from "./CreateCampaignsModal";
import { BusinessCampaignAction, BusinessCampaignPagination } from "../../../redux/business/Campaign/BusinessCampaignAction";
import EditCampaignsModal from "./EditCampaignsModal";
import { ApiPost, ApiPut } from "../../../helpers/API/ApiData";
import { toast } from "react-toastify";
import PriceDetails from "../../common/PriceDetails";
import CampaignCard from "../../common/CampaignCard";
import NoData from "../../common/NoData";
import Loader from "../../common/Loader";
import InfiniteScroll from "react-infinite-scroll-component";

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
    "&:not(:last-child)": {
      marginBottom: 20,
    },
  },
}));

export default function Home() {
  const classes = useStyles();
  const [editData, setEditData] = useState();
  const [editModal, setEditModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [startPageNo, setStartPageNo] = useState(1);
  const [pageDataLimit] = useState(4);
  const [priceOpen, setPriceOpen] = useState(false);
  const [priceData, setPriceData] = useState();

  const dispatch = useDispatch();
  const CampaignData = useSelector((state) => state.BusinessCampaignReducer);

  useEffect(() => {
    dispatch(BusinessCampaignAction(1, pageDataLimit));
  }, [dispatch,pageDataLimit]);

  const toggleEditModal = (data) => {
    setEditData(data)
    setEditModal(!editModal)
  };

  const createCampaign = () => {
    setCreateModal(!createModal);
  };

  const handleClickPriceClose = () => {
    setPriceOpen(false)
    setPriceData()
  }

  const pagination = () => {
    if (CampaignData.data.length !== CampaignData.count) {
      setStartPageNo(startPageNo + 1);
      dispatch(BusinessCampaignPagination(startPageNo + 1, pageDataLimit));
    }
  };

  const campaignPush = (data) => {
    CampaignData.data.push(data)
    CampaignData.count = CampaignData.count + 1
  }

  const CreateOrEdit = async (data, picture, industry, influencerData, editData, type) => {
    data = { ...data };

    var form_data = new FormData();

    for (var key in data) {
      form_data.append(key, data[key]);
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
        if (type === 'create') {
          CampaignData.data.length < 1 ? campaignPush(res.data.data) : CampaignData.data.unshift(res.data.data)
          setCreateModal(!createModal);
        }
        else if (type === 'edit') {
          const index = CampaignData.data.findIndex(item => item._id === res.data.data._id)
          if (index > -1) {
            CampaignData.data[index] = res.data.data
            setEditModal(!editModal)
          }
        }
      } else {
        toast.error(res.data.message, { autoClose: 5000 });
      }
    } catch (err) {
      toast.error("Internal server error", { autoClose: 5000 });
    }
  }

  return (
    <React.Fragment>
      {priceData && (
        <PriceDetails
          open={priceOpen}
          title="View Price Details"
          type="business"
          priceData={priceData}
          handleClose={handleClickPriceClose}
          closeIcon={true}
        />
      )}
      <CreateCampaignsModal
        open={createModal}
        title={"Create Campaign"}
        handleClose={() => createCampaign()}
        CreateOrEdit={CreateOrEdit}
        closeIcon={true}
      />
      <EditCampaignsModal
        open={editModal}
        editData={editData}
        title={"Edit Campaign"}
        handleClose={() => toggleEditModal()}
        CreateOrEdit={CreateOrEdit}
        closeIcon={true}
      />
      <div className={classes.homeContent}>
        <Container>
          {CampaignData.error && <p>{CampaignData.error}</p>}
          {CampaignData.loading ? (
            <div className="loader">
              <Loader />
            </div>
          ) :
            <>
              <Grid container spacing={3}>

                <Grid item md={9} xs={12}>
                  <div className={classes.campaignsCreateBtn}>
                    <Button
                      fullWidth
                      color="primary"
                      variant="outlined"
                      onClick={() => createCampaign()}
                      disableElevation
                    >
                      Create New Campaign
                    </Button>
                  </div>
                  <div className={classes.BoxWrap}>
                    {CampaignData.count === 0 ? <NoData /> :
                      <InfiniteScroll
                        dataLength={CampaignData.data.length}
                        next={pagination}
                        hasMore={true}
                        loader={CampaignData.seeMoreLoading ? <h4>Loading...</h4> : null}
                      >
                        <CampaignCard
                          data={CampaignData.data}
                          toggleEditModal={item => toggleEditModal(item)}
                        />
                      </InfiniteScroll>}
                  </div>
                </Grid>
                <Grid item md={3} xs={12}>
                  <Sidebar />
                </Grid>
              </Grid>
            </>
          }
        </Container>
      </div>
    </React.Fragment>
  );
}
