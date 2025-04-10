import { toast } from "react-toastify";
import { ApiPost } from "../../../helpers/API/ApiData";

export const CANCEL_PROPOSAL_REQUEST = "CANCEL_PROPOSAL_REQUEST";
export const CANCEL_PROPOSAL_SUCCESS = "CANCEL_PROPOSAL_SUCCESS";
export const CANCEL_PROPOSAL_FAILURE = "CANCEL_PROPOSAL_FAILURE";

export const cancelProposalRequest = () => {
  return {
    type: CANCEL_PROPOSAL_REQUEST,
  };
};
export const cancelProposalSuccess = (cancelProposal) => {
  return {
    type: CANCEL_PROPOSAL_SUCCESS,
    payload: cancelProposal,
  };
};
export const cancelProposalFailure = (error) => {
  return {
    type: CANCEL_PROPOSAL_FAILURE,
    ResponseStatus: "",
    payload: error,
  };
};
export const CancelProposal = (data) => {
  return (dispatch) => {
    dispatch(cancelProposalRequest());
    const fetchData = async () => {
      const res = await ApiPost(`proposal/cancel`, data);
      try {
        if (res.data.status === 200) {
          toast.success(res.data.message, { autoClose: 5000 });
          dispatch(cancelProposalSuccess(res.data))
          
        } else {
          toast.error(res.data.message, { autoClose: 5000 });
        }
      } catch (err) {
        toast.error("Internal server error", { autoClose: 5000 });
        dispatch(cancelProposalFailure(res.data.message))
      }
    };
    fetchData();
  };
};

