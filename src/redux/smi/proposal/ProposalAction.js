import { ApiGet } from "../../../helpers/API/ApiData";

export const PROPOSAL_REQUEST = "[proposal/API] Load proposal";
export const PROPOSAL_REQUEST_PAGINATION = "[proposal/API] Load more proposal";
export const PROPOSAL_SUCCESS = "[proposal/API] Load proposal my success";
export const PROPOSAL_SUCCESS_PAGINATION = "[proposal/API] Load more proposal success";
export const PROPOSAL_FAILURE = "[proposal/API] Load proposal failure";

export const proposalRequest = () => {
  return {
    type: PROPOSAL_REQUEST,
  };
};
export const proposalRequestPagination = () => {
  return {
    type: PROPOSAL_REQUEST_PAGINATION,
  };
};
export const proposalSuccess = (proposal) => {
  return {
    type: PROPOSAL_SUCCESS,
    payload: proposal,
  };
};
export const proposalSuccessPagination = (proposal) => {
  return {
    type: PROPOSAL_SUCCESS_PAGINATION,
    payload: proposal,
  };
};
export const proposalFailure = (error) => {
  return {
    type: PROPOSAL_FAILURE,
    ResponseStatus: "",
    payload: error,
  };
};
export const proposalAction = (startPageNo,pageDataLimit) => {
  return (dispatch) => {
    dispatch(proposalRequest());
    const fetchData = async () => {
      const res = await ApiGet(`proposal/getProposalOfSmi?page=${startPageNo}&limit=${pageDataLimit}`);
      try {
        if (parseInt(res.data.status) / 100 === 2) {
          dispatch(proposalSuccess(res.data.data));
        }
      } catch (err) {
        dispatch(proposalFailure(err));
      }
    };
    fetchData();
  };
};
export const proposalPagination = (startPageNo,pageDataLimit) => {
  return (dispatch) => {
    dispatch(proposalRequestPagination());
    const fetchData = async () => {
      const res = await ApiGet(`proposal/getProposalOfSmi?page=${startPageNo}&limit=${pageDataLimit}`);
      try {
        if (parseInt(res.data.status) / 100 === 2) {
          dispatch(proposalSuccessPagination(res.data.data));
        }
      } catch (err) {
        dispatch(proposalFailure(err));
      }
    };
    fetchData();
  };
};
