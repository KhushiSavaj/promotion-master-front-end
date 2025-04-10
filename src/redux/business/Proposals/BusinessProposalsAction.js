import { ApiGet } from "../../../helpers/API/ApiData";

export const PROPOSALS_REQUEST_FROM_BUSINESS = "[Proposals/API] Load campaigns from business";
export const PROPOSALS_REQUEST_PAGINATION_FROM_BUSINESS = "[Proposals/API] Load more campaigns from business";
export const PROPOSALS_SUCCESS_FROM_BUSINESS = "[Proposals/API] Load campaigns success from business";
export const PROPOSALS_SUCCESS_PAGINATION_FROM_BUSINESS = "[Proposals/API] Load more campaigns success from business";
export const PROPOSALS_FAILURE_FROM_BUSINESS = "[Proposals/API] Load campaigns failure from business";

export const BusinessProposalsRequest = () => {
  return {
    type: PROPOSALS_REQUEST_FROM_BUSINESS,
  };
};
export const BusinessProposalsRequestPagination = () => {
  return {
    type: PROPOSALS_REQUEST_PAGINATION_FROM_BUSINESS,
  };
};
export const BusinessProposalsSuccess = (Proposals) => {
  return {
    type: PROPOSALS_SUCCESS_FROM_BUSINESS,
    payload: Proposals,
  };
};
export const BusinessProposalsSuccessPagination = (Proposals) => {
  return {
    type: PROPOSALS_SUCCESS_PAGINATION_FROM_BUSINESS,
    payload: Proposals,
  };
};
export const BusinessProposalsFailure = (error) => {
  return {
    type: PROPOSALS_FAILURE_FROM_BUSINESS,
    ResponseStatus: "",
    payload: error,
  };
};
export const BusinessProposalsAction = (startPageNo,pageDataLimit) => {
  return (dispatch) => {
    dispatch(BusinessProposalsRequest());
    const fetchData = async () => {
      const res = await ApiGet(`campaign/proposals?page=${startPageNo}&limit=${pageDataLimit}`);
      try {
        if (parseInt(res.data.status)=== 200) {
          dispatch(BusinessProposalsSuccess(res.data.data));
        }
      } catch (err) {
        dispatch(BusinessProposalsFailure(err));
      }
    };
    fetchData();
  };
};
export const BusinessProposalsPagination = (startPageNo,pageDataLimit) => {
  return (dispatch) => {
    dispatch(BusinessProposalsRequestPagination());
    const fetchData = async () => {
      const res = await ApiGet(`campaign/proposals?page=${startPageNo}&limit=${pageDataLimit}`);
      try {
        if (parseInt(res.data.status)=== 200) {
          dispatch(BusinessProposalsSuccessPagination(res.data.data));
        }
      } catch (err) {
        dispatch(BusinessProposalsFailure(err));
      }
    };
    fetchData();
  };
};
