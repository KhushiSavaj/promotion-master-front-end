import { ApiGet } from "../../../helpers/API/ApiData";

export const MY_CAMPAIGN_REQUEST = "[myCampaign/API] Load my campaigns";
export const MY_CAMPAIGN_REQUEST_PAGINATION = "[myCampaign/API] Load more my campaigns";
export const MY_CAMPAIGN_SUCCESS = "[myCampaign/API] Load campaigns my success";
export const MY_CAMPAIGN_SUCCESS_PAGINATION = "[myCampaign/API] Load more my campaigns success";
export const MY_CAMPAIGN_FAILURE = "[myCampaign/API] Load my campaigns failure";

export const myCampaignRequest = () => {
  return {
    type: MY_CAMPAIGN_REQUEST,
  };
};
export const myCampaignRequestPagination = () => {
  return {
    type: MY_CAMPAIGN_REQUEST_PAGINATION,
  };
};
export const myCampaignSuccess = (myCampaign) => {
  return {
    type: MY_CAMPAIGN_SUCCESS,
    payload: myCampaign,
  };
};
export const myCampaignSuccessPagination = (myCampaign) => {
  return {
    type: MY_CAMPAIGN_SUCCESS_PAGINATION,
    payload: myCampaign,
  };
};
export const myCampaignFailure = (error) => {
  return {
    type: MY_CAMPAIGN_FAILURE,
    ResponseStatus: "",
    payload: error,
  };
};
export const myCampaignAction = (startPageNo,pageDataLimit) => {
  return (dispatch) => {
    dispatch(myCampaignRequest());
    const fetchData = async () => {
      const res = await ApiGet(`proposal/myProposal?page=${startPageNo}&limit=${pageDataLimit}`);
      try {
        if (parseInt(res.data.status) / 100 === 2) {
          dispatch(myCampaignSuccess(res.data.data));
        }
      } catch (err) {
        dispatch(myCampaignFailure(err));
      }
    };
    fetchData();
  };
};
export const myCampaignPagination = (startPageNo,pageDataLimit) => {
  return (dispatch) => {
    dispatch(myCampaignRequestPagination());
    const fetchData = async () => {
      const res = await ApiGet(`proposal/myProposal?page=${startPageNo}&limit=${pageDataLimit}`);
      try {
        if (parseInt(res.data.status) / 100 === 2) {
          dispatch(myCampaignSuccessPagination(res.data.data));
        }
      } catch (err) {
        dispatch(myCampaignFailure(err));
      }
    };
    fetchData();
  };
};
