import {
  LOAD_CAMPAIGN_REQUEST,
  LOAD_CAMPAIGN_REQUEST_PAGINATION,
  LOAD_CAMPAIGN_SUCCESS,
  LOAD_CAMPAIGN_FAILURE,
  LOAD_CAMPAIGN_SUCCESS_PAGINATION,
} from "./CampaignAction";

const initialstate = {
  loading: false,
  data: [],
  count: 0,
  seeMoreLoading: false,
  error: "",
};

export const CampaignReducer = (state = initialstate, action) => {
  switch (action.type) {
    case LOAD_CAMPAIGN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOAD_CAMPAIGN_REQUEST_PAGINATION:
      return {
        ...state,
        loading: false,
        seeMoreLoading: true,
      };
    case LOAD_CAMPAIGN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.campaigns,
        count: action.payload.count,
        error: "",
      };
    case LOAD_CAMPAIGN_SUCCESS_PAGINATION:
      state = { ...state,seeMoreLoading:false, loading: false, error: "" };
          action.payload.campaigns.map((item) => state.data.push(item))
      return state;
    case LOAD_CAMPAIGN_FAILURE:
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
