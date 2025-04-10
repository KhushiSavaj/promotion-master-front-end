import { ApiGet } from "../../../helpers/API/ApiData";

export const CAMPAIGN_REQUEST_FROM_BUSINESS = "[Campaign/API] Load campaigns from business";
export const CAMPAIGN_REQUEST_PAGINATION_FROM_BUSINESS = "[Campaign/API] Load more campaigns from business";
export const CAMPAIGN_SUCCESS_FROM_BUSINESS = "[Campaign/API] Load campaigns success from business";
export const CAMPAIGN_SUCCESS_PAGINATION_FROM_BUSINESS = "[Campaign/API] Load more campaigns success from business";
export const CAMPAIGN_FAILURE_FROM_BUSINESS = "[Campaign/API] Load campaigns failure from business";

export const BusinessCampaignRequest = () => {
  return {
    type: CAMPAIGN_REQUEST_FROM_BUSINESS,
  };
};
export const BusinessCampaignRequestPagination = () => {
  return {
    type: CAMPAIGN_REQUEST_PAGINATION_FROM_BUSINESS,
  };
};
export const BusinessCampaignSuccess = (Campaign) => {
  return {
    type: CAMPAIGN_SUCCESS_FROM_BUSINESS,
    payload: Campaign,
  };
};
export const BusinessCampaignSuccessPagination = (Campaign) => {
  return {
    type: CAMPAIGN_SUCCESS_PAGINATION_FROM_BUSINESS,
    payload: Campaign,
  };
};
export const BusinessCampaignFailure = (error) => {
  return {
    type: CAMPAIGN_FAILURE_FROM_BUSINESS,
    ResponseStatus: "",
    payload: error,
  };
};
export const BusinessCampaignAction = (startPageNo,pageDataLimit) => {
  return (dispatch) => {
    dispatch(BusinessCampaignRequest());
    const fetchData = async () => {
      const res = await ApiGet(`campaign/myCampaigns?page=${startPageNo}&limit=${pageDataLimit}`);
      try {
        if (parseInt(res.data.status) / 100 === 2) {
          dispatch(BusinessCampaignSuccess(res.data.data));
        }
      } catch (err) {
        dispatch(BusinessCampaignFailure(err));
      }
    };
    fetchData();
  };
};
export const BusinessCampaignPagination = (startPageNo,pageDataLimit) => {
  return (dispatch) => {
    dispatch(BusinessCampaignRequestPagination());
    const fetchData = async () => {
      const res = await ApiGet(`campaign/myCampaigns?page=${startPageNo}&limit=${pageDataLimit}`);
      try {
        if (parseInt(res.data.status) / 100 === 2) {
          dispatch(BusinessCampaignSuccessPagination(res.data.data));
        }
      } catch (err) {
        dispatch(BusinessCampaignFailure(err));
      }
    };
    fetchData();
  };
};
