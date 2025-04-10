import { toast } from "react-toastify";
import { ApiPost } from "../../../helpers/API/ApiData";

export const APPLY_CAMPAIGN_REQUEST = "APPLY_CAMPAIGN_REQUEST";
export const APPLY_CAMPAIGN_SUCCESS = "APPLY_CAMPAIGN_SUCCESS";
export const APPLY_CAMPAIGN_FAILURE = "APPLY_CAMPAIGN_FAILURE";

export const ApplyCampaignRequest = () => {
  return {
    type: APPLY_CAMPAIGN_REQUEST,
  };
};
export const ApplyCampaignSuccess = (ApplyCampaign) => {
  return {
    type: APPLY_CAMPAIGN_SUCCESS,
    payload: ApplyCampaign,
  };
};
export const ApplyCampaignFailure = (error) => {
  return {
    type: APPLY_CAMPAIGN_FAILURE,
    ResponseStatus: "",
    payload: error,
  };
};
export const ApplyForCampaign = (data) => {
  return (dispatch) => {
    dispatch(ApplyCampaignRequest());
    const fetchData = async () => {
      const res = await ApiPost("proposal/apply", data);
      try {
        if (res.data.status === 200) {
          toast.success(res.data.message, { autoClose: 5000 });
          dispatch(ApplyCampaignSuccess(res.data))
          
        } else {
          toast.error(res.data.message, { autoClose: 5000 });
        }
      } catch (err) {
        toast.error("Internal server error", { autoClose: 5000 });
        dispatch(ApplyCampaignFailure(res.data.message))
      }
    };
    fetchData();
  };
};
