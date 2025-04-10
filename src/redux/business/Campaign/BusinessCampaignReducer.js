import {
  CAMPAIGN_REQUEST_FROM_BUSINESS,
  CAMPAIGN_REQUEST_PAGINATION_FROM_BUSINESS,
  CAMPAIGN_SUCCESS_FROM_BUSINESS,
  CAMPAIGN_FAILURE_FROM_BUSINESS,
  CAMPAIGN_SUCCESS_PAGINATION_FROM_BUSINESS,
} from "./BusinessCampaignAction";

const initialstate = {
  loading: false,
  data: [],
  count: 0,
  seeMoreLoading: false,
  error: "",
};

export const BusinessCampaignReducer = (state = initialstate, action) => {
  switch (action.type) {
    case CAMPAIGN_REQUEST_FROM_BUSINESS:
      return {
        ...state,
        loading: true,
      };
    case CAMPAIGN_REQUEST_PAGINATION_FROM_BUSINESS:
      return {
        ...state,
        loading: false,
        seeMoreLoading: true,
      };
    case CAMPAIGN_SUCCESS_FROM_BUSINESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        count: action.payload.totalCount,
        error: "",
      };
    case CAMPAIGN_SUCCESS_PAGINATION_FROM_BUSINESS:
      state = { ...state, seeMoreLoading: false, loading: false, error: "" };
      action.payload.data.map((item) => state.data.push(item));
      return state;
    case CAMPAIGN_FAILURE_FROM_BUSINESS:
      return {
        ...state,
        loading: false,
        seeMoreLoading: false,
        data: [],
        count: 0,
        error: action.payload,
      };
    default:
      return state;
  }
};
