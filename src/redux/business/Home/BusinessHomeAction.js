import { ApiGet } from "../../../helpers/API/ApiData";

export const HOME_REQUEST_FROM_BUSINESS = "[Home/API] Load campaigns from business";
export const HOME_REQUEST_PAGINATION_FROM_BUSINESS = "[Home/API] Load more campaigns from business";
export const HOME_SUCCESS_FROM_BUSINESS = "[Home/API] Load campaigns success from business";
export const HOME_SUCCESS_PAGINATION_FROM_BUSINESS = "[Home/API] Load more campaigns success from business";
export const HOME_FAILURE_FROM_BUSINESS = "[Home/API] Load campaigns failure from business";

export const BusinessHomeRequest = () => {
  return {
    type: HOME_REQUEST_FROM_BUSINESS,
  };
};
export const BusinessHomeRequestPagination = () => {
  return {
    type: HOME_REQUEST_PAGINATION_FROM_BUSINESS,
  };
};
export const BusinessHomeSuccess = (Home) => {
  return {
    type: HOME_SUCCESS_FROM_BUSINESS,
    payload: Home,
  };
};
export const BusinessHomeSuccessPagination = (Home) => {
  return {
    type: HOME_SUCCESS_PAGINATION_FROM_BUSINESS,
    payload: Home,
  };
};
export const BusinessHomeFailure = (error) => {
  return {
    type: HOME_FAILURE_FROM_BUSINESS,
    ResponseStatus: "",
    payload: error,
  };
};
export const BusinessHomeAction = (startPageNo,pageDataLimit) => {
  return (dispatch) => {
    dispatch(BusinessHomeRequest());
    const fetchData = async () => {
      const res = await ApiGet(`user/businessHomePage?page=${startPageNo}&limit=${pageDataLimit}`);
      try {
        if (parseInt(res.data.status) / 100 === 2) {
          dispatch(BusinessHomeSuccess(res.data.data));
        }
      } catch (err) {
        dispatch(BusinessHomeFailure(err));
      }
    };
    fetchData();
  };
};
export const BusinessHomePagination = (startPageNo,pageDataLimit) => {
  return (dispatch) => {
    dispatch(BusinessHomeRequestPagination());
    const fetchData = async () => {
      const res = await ApiGet(`user/businessHomePage?page=${startPageNo}&limit=${pageDataLimit}`);
      try {
        if (parseInt(res.data.status) / 100 === 2) {
          dispatch(BusinessHomeSuccessPagination(res.data.data));
        }
      } catch (err) {
        dispatch(BusinessHomeFailure(err));
      }
    };
    fetchData();
  };
};
