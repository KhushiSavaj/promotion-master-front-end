import { ApiGet } from "../../helpers/API/ApiData";

export const SEARCH_REQUEST = "[Search/API] Load campaigns";
export const SEARCH_SUCCESS = "[Search/API] Load campaigns success";
export const SEARCH_FAILURE = "[Search/API] Load campaigns failure";
export const SEARCH_REQUEST_PAGINATION_FOR_CAMPAIGN = "[Search/API] Load more campaigns";
export const SEARCH_SUCCESS_PAGINATION_FOR_CAMPAIGN = "[Search/API] Load more campaigns success";
export const SEARCH_REQUEST_PAGINATION_FOR_INFLUENCER = "[Search/API] Load more campaign";
export const SEARCH_SUCCESS_PAGINATION_FOR_INFLUENCER = "[Search/API] Load more campaigns success";

export const SearchRequest = () => {
  return {
    type: SEARCH_REQUEST,
  };
};
export const SearchSuccess = (Search) => {
  return {
    type: SEARCH_SUCCESS,
    payload: Search,
  };
};
export const SearchFailure = (error) => {
  return {
    type: SEARCH_FAILURE,
    ResponseStatus: "",
    payload: error,
  };
};
export const SearchRequestPaginationForCampaign = () => {
  return {
    type: SEARCH_REQUEST_PAGINATION_FOR_CAMPAIGN,
  };
};
export const SearchSuccessPaginationForCampaign = (Search) => {
  return {
    type: SEARCH_SUCCESS_PAGINATION_FOR_CAMPAIGN,
    payload: Search,
  };
};
export const SearchRequestPaginationForInfluencer = () => {
  return {
    type: SEARCH_REQUEST_PAGINATION_FOR_INFLUENCER,
  };
};
export const SearchSuccessPaginationForInfluencer = (Search) => {
  return {
    type: SEARCH_SUCCESS_PAGINATION_FOR_INFLUENCER,
    payload: Search,
  };
};
export const SearchAction = (startPageNo,pageDataLimit,searchName) => {
  return (dispatch) => {
    dispatch(SearchRequest());
    const fetchData = async () => {
      const res = await ApiGet(`search?page=${startPageNo}&limit=${pageDataLimit}&search=${searchName}`);
      try {
        if (parseInt(res.data.status) / 100 === 2) {
          dispatch(SearchSuccess(res.data.data));
        }
      } catch (err) {
        dispatch(SearchFailure(err));
      }
    };
    fetchData();
  };
};
export const SearchPaginationForCampaign = (startPageNo,pageDataLimit,searchName,type) => {
  return (dispatch) => {
    dispatch(SearchRequestPaginationForCampaign());
    const fetchData = async () => {
      const res = await ApiGet(`search?page=${startPageNo}&limit=${pageDataLimit}&search=${searchName}&type=${type}`);
      try {
        if (parseInt(res.data.status) / 100 === 2) {
          dispatch(SearchSuccessPaginationForCampaign(res.data.data));
        }
      } catch (err) {
        dispatch(SearchFailure(err));
      }
    };
    fetchData();
  };
};
export const SearchPaginationForInfluencer = (startPageNo,pageDataLimit,searchName,type) => {
  return (dispatch) => {
    dispatch(SearchRequestPaginationForInfluencer());
    const fetchData = async () => {
      const res = await ApiGet(`search?page=${startPageNo}&limit=${pageDataLimit}&search=${searchName}&type=${type}`);
      try {
        if (parseInt(res.data.status) / 100 === 2) {
          dispatch(SearchSuccessPaginationForInfluencer(res.data.data));
        }
      } catch (err) {
        dispatch(SearchFailure(err));
      }
    };
    fetchData();
  };
};
