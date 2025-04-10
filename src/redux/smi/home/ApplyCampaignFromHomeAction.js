import { toast } from "react-toastify";
import { ApiPost } from "../../../helpers/API/ApiData";

export const APPLY_FROM_HOME_REQUEST = "APPLY_FROM_HOME_REQUEST";
export const APPLY_FROM_HOME_SUCCESS = "APPLY_FROM_HOME_SUCCESS";
export const APPLY_FROM_HOME_FAILURE = "APPLY_FROM_HOME_FAILURE";

export const ApplyFromHomeRequest = () => {
  return {
    type: APPLY_FROM_HOME_REQUEST,
  };
};
export const ApplyFromHomeSuccess = (ApplyFromHome) => {
  return {
    type: APPLY_FROM_HOME_SUCCESS,
    payload: ApplyFromHome,
  };
};
export const ApplyFromHomeFailure = (error) => {
  return {
    type: APPLY_FROM_HOME_FAILURE,
    ResponseStatus: "",
    payload: error,
  };
};
export const ApplyFromHome = (data) => {
  return (dispatch) => {
    dispatch(ApplyFromHomeRequest());
    const fetchData = async () => {
      const res = await ApiPost("proposal/apply", data);
      try {
        if (res.data.status === 200) {
          toast.success(res.data.message, { autoClose: 5000 });
          dispatch(ApplyFromHomeSuccess(res.data))
          
        } else {
          toast.error(res.data.message, { autoClose: 5000 });
        }
      } catch (err) {
        toast.error("Internal server error", { autoClose: 5000 });
        dispatch(ApplyFromHomeFailure(res.data.message))
      }
    };
    fetchData();
  };
};
