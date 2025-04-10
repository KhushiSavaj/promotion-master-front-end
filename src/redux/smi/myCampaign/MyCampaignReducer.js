import {
  MY_CAMPAIGN_REQUEST,
  MY_CAMPAIGN_REQUEST_PAGINATION,
  MY_CAMPAIGN_SUCCESS,
  MY_CAMPAIGN_FAILURE,
  MY_CAMPAIGN_SUCCESS_PAGINATION,
} from "./MyCampaignAction";

const initialstate = {
  loading: false,
  data: [],
  count: 0,
  seeMoreLoading: false,
  error: "",
};

export const MyCampaignReducer = (state = initialstate, action) => {
  switch (action.type) {
    case MY_CAMPAIGN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MY_CAMPAIGN_REQUEST_PAGINATION:
      return {
        ...state,
        loading: false,
        seeMoreLoading: true,
      };
    case MY_CAMPAIGN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.proposals,
        count: action.payload.count,
        error: "",
      };
    case MY_CAMPAIGN_SUCCESS_PAGINATION:
      state = { ...state,seeMoreLoading:false, loading: false, error: "" };
          action.payload.proposals.map((item) =>  state.data.push(item))
      return state;
    case MY_CAMPAIGN_FAILURE:
      return {
        ...state,
        loading: false,
        seeMoreLoading:false,
        data: [],
        count: 0,
        error: action.payload,
      };
    default:
      return state;
  }
};
