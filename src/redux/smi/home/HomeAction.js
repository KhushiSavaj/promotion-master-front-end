import { ApiGet } from "../../../helpers/API/ApiData";

export const HOME_REQUEST = "[Home/API] Load campaigns";
export const HOME_REQUEST_PAGINATION = "[Home/API] Load more campaigns";
export const HOME_SUCCESS = "[Home/API] Load campaigns success";
export const HOME_SUCCESS_PAGINATION = "[Home/API] Load more campaigns success";
export const HOME_FAILURE = "[Home/API] Load campaigns failure";

export const HomeRequest = () => {
  return {
    type: HOME_REQUEST,
  };
};
export const HomeRequestPagination = () => {
  return {
    type: HOME_REQUEST_PAGINATION,
  };
};
export const HomeSuccess = (Home) => {
  return {
    type: HOME_SUCCESS,
    payload: Home,
  };
};
export const HomeSuccessPagination = (Home) => {
  return {
    type: HOME_SUCCESS_PAGINATION,
    payload: Home,
  };
};
export const HomeFailure = (error) => {
  return {
    type: HOME_FAILURE,
    ResponseStatus: "",
    payload: error,
  };
};
export const HomeAction = (startPageNo,pageDataLimit,apply) => {
  return (dispatch) => {
    !apply && dispatch(HomeRequest());
    const fetchData = async () => {
      const res = await ApiGet(`campaign/myCampaignsOfSMI?page=${startPageNo}&limit=${pageDataLimit}`);
      try {
        if (parseInt(res.data.status) / 100 === 2) {
          dispatch(HomeSuccess(res.data.data));
        }
      } catch (err) {
        dispatch(HomeFailure(err));
      }
    };
    fetchData();
  };
};
export const HomePagination = (startPageNo,pageDataLimit) => {
  return (dispatch) => {
    dispatch(HomeRequestPagination());
    const fetchData = async () => {
      const res = await ApiGet(`campaign/myCampaignsOfSMI?page=${startPageNo}&limit=${pageDataLimit}`);
      try {
        if (parseInt(res.data.status) / 100 === 2) {
          dispatch(HomeSuccessPagination(res.data.data));
        }
      } catch (err) {
        dispatch(HomeFailure(err));
      }
    };
    fetchData();
  };
};
