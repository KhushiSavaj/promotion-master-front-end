import { ApiGet } from "../../../helpers/API/ApiData";

export const INFLUENCER_REQUEST = "[Influencer/API] Load influencer";
export const INFLUENCER_REQUEST_PAGINATION = "[Influencer/API] Load more influencer";
export const INFLUENCER_SUCCESS = "[Influencer/API] Load influencer success";
export const INFLUENCER_SUCCESS_PAGINATION = "[Influencer/API] Load more influencer success";
export const INFLUENCER_FAILURE = "[Influencer/API] Load influencer failure";

export const influencerRequest = () => {
  return {
    type: INFLUENCER_REQUEST,
  };
};
export const influencerRequestPagination = () => {
  return {
    type: INFLUENCER_REQUEST_PAGINATION,
  };
};
export const influencerSuccess = (influencer) => {
  return {
    type: INFLUENCER_SUCCESS,
    payload: influencer,
  };
};
export const influencerSuccessPagination = (influencer) => {
  return {
    type: INFLUENCER_SUCCESS_PAGINATION,
    payload: influencer,
  };
};
export const influencerFailure = (error) => {
  return {
    type: INFLUENCER_FAILURE,
    ResponseStatus: "",
    payload: error,
  };
};

export const influencerAction = (startPageNo,pageDataLimit) => {
  return (dispatch) => {
    dispatch(influencerRequest());
    const fetchData = async () => {
      const res = await ApiGet(`user/influencer/?page=${startPageNo}&limit=${pageDataLimit}`);
      try {
        if (res.data.status === 200) {
          dispatch(influencerSuccess(res.data.data));
        }
      } catch (err) {
        dispatch(influencerFailure(res.data.message))
      }
    };
    fetchData();
  };
};
export const influencerPagination = (startPageNo,pageDataLimit) => {
  return (dispatch) => {
    dispatch(influencerRequestPagination());
    const fetchData = async () => {
      const res = await ApiGet(`user/influencer/?page=${startPageNo}&limit=${pageDataLimit}`);
      try {
        if (res.data.status === 200) {
          dispatch(influencerSuccessPagination(res.data.data));
        } 
      } catch (err) {
        dispatch(influencerFailure(res.data.message))
      }
    };
    fetchData();
  };
};
