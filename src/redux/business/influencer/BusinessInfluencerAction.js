import { ApiGet } from "../../../helpers/API/ApiData";

export const INFLUENCER_REQUEST_FROM_BUSINESS = "[Influencer/API] Load influencer from business";
export const INFLUENCER_REQUEST_PAGINATION_FROM_BUSINESS = "[Influencer/API] Load more influencer from business";
export const INFLUENCER_SUCCESS_FROM_BUSINESS = "[Influencer/API] Load influencer success from business";
export const INFLUENCER_SUCCESS_PAGINATION_FROM_BUSINESS = "[Influencer/API] Load more influencer success from business";
export const INFLUENCER_FAILURE_FROM_BUSINESS = "[Influencer/API] Load influencer failure from business";

export const BusinessInfluencerRequest = () => {
  return {
    type: INFLUENCER_REQUEST_FROM_BUSINESS,
  };
};
export const BusinessInfluencerRequestPagination = () => {
  return {
    type: INFLUENCER_REQUEST_PAGINATION_FROM_BUSINESS,
  };
};
export const BusinessInfluencerSuccess = (influencer) => {
  return {
    type: INFLUENCER_SUCCESS_FROM_BUSINESS,
    payload: influencer,
  };
};
export const BusinessInfluencerSuccessPagination = (influencer) => {
  return {
    type: INFLUENCER_SUCCESS_PAGINATION_FROM_BUSINESS,
    payload: influencer,
  };
};
export const BusinessInfluencerFailure = (error) => {
  return {
    type: INFLUENCER_FAILURE_FROM_BUSINESS,
    ResponseStatus: "",
    payload: error,
  };
};
export const BusinessInfluencerAction = (startPageNo,pageDataLimit) => {
  return (dispatch) => {
    dispatch(BusinessInfluencerRequest());
    const fetchData = async () => {
      const res = await ApiGet(`user/influencer/?page=${startPageNo}&limit=${pageDataLimit}`);
      try {
        if (res.data.status === 200) {
          dispatch(BusinessInfluencerSuccess(res.data.data));
        }
      } catch (err) {
        dispatch(BusinessInfluencerFailure(res.data.message))
      }
    };
    fetchData();
  };
};

export const BusinessInfluencerPagination = (startPageNo,pageDataLimit) => {
  return (dispatch) => {
    dispatch(BusinessInfluencerRequestPagination());
    const fetchData = async () => {
      const res = await ApiGet(`user/influencer/?page=${startPageNo}&limit=${pageDataLimit}`);
      try {
        if (res.data.status === 200) {
          dispatch(BusinessInfluencerSuccessPagination(res.data.data));
        }
      } catch (err) {
        dispatch(BusinessInfluencerFailure(err));
      }
    };
    fetchData();
  };
};
