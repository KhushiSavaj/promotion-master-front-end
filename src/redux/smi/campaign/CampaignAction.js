import { ApiGet } from "../../../helpers/API/ApiData";

export const LOAD_CAMPAIGN_REQUEST = "[Campaign/API] Load campaigns";
export const LOAD_CAMPAIGN_REQUEST_PAGINATION = "[Campaign/API] Load more campaigns";
export const LOAD_CAMPAIGN_SUCCESS = "[Campaign/API] Load campaigns success";
export const LOAD_CAMPAIGN_SUCCESS_PAGINATION = "[Campaign/API] Load more campaigns success";
export const LOAD_CAMPAIGN_FAILURE = "[Campaign/API] Load campaigns failure";

export const CampaignRequest = () => {
  return {
    type: LOAD_CAMPAIGN_REQUEST,
  };
};
export const CampaignRequestPagination = () => {
  return {
    type: LOAD_CAMPAIGN_REQUEST_PAGINATION,
  };
};
export const CampaignSuccess = (Campaign) => {
  return {
    type: LOAD_CAMPAIGN_SUCCESS,
    payload: Campaign,
  };
};
export const CampaignSuccessPagination = (Campaign) => {
  return {
    type: LOAD_CAMPAIGN_SUCCESS_PAGINATION,
    payload: Campaign,
  };
};
export const CampaignFailure = (error) => {
  return {
    type: LOAD_CAMPAIGN_FAILURE,
    ResponseStatus: "",
    payload: error,
  };
};
export const CampaignAction = (startPageNo,pageDataLimit,apply) => {
  return (dispatch) => {
    !apply && dispatch(CampaignRequest());
    const fetchData = async () => {
      const res = await ApiGet(`campaign/myCampaignsOfSMI?page=${startPageNo}&limit=${pageDataLimit}`);
      try {
        if (parseInt(res.data.status) / 100 === 2) {
          dispatch(CampaignSuccess(res.data.data));
        }
      } catch (err) {
        dispatch(CampaignFailure(err));
      }
    };
    fetchData();
  };
};
export const CampaignPagination = (startPageNo,pageDataLimit) => {
  return (dispatch) => {
    dispatch(CampaignRequestPagination());
    const fetchData = async () => {
      const res = await ApiGet(`campaign/myCampaignsOfSMI?page=${startPageNo}&limit=${pageDataLimit}`);
      try {
        if (parseInt(res.data.status) / 100 === 2) {
          dispatch(CampaignSuccessPagination(res.data.data));
        }
      } catch (err) {
        dispatch(CampaignFailure(err));
      }
    };
    fetchData();
  };
};
