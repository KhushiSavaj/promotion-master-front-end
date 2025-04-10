import {
  HOME_REQUEST_FROM_BUSINESS,
  HOME_REQUEST_PAGINATION_FROM_BUSINESS,
  HOME_SUCCESS_FROM_BUSINESS,
  HOME_FAILURE_FROM_BUSINESS,
  HOME_SUCCESS_PAGINATION_FROM_BUSINESS,
} from "./BusinessHomeAction";

const initialstate = {
  loading: false,
  campaignData: [],
  influencer: [],
  seeMoreLoading: false,
  error: "",
};

export const BusinessHomeReducer = (state = initialstate, action) => {
  switch (action.type) {
    case HOME_REQUEST_FROM_BUSINESS:
      return {
        ...state,
        loading: true,
      };
    case HOME_REQUEST_PAGINATION_FROM_BUSINESS:
      return {
        ...state,
        loading: false,
        seeMoreLoading: true,
      };
    case HOME_SUCCESS_FROM_BUSINESS:
      return {
        ...state,
        loading: false,
        campaignData: action.payload.businessMan.my_campaign,
        influencer: action.payload.influecer,
        error: "",
      };
    case HOME_SUCCESS_PAGINATION_FROM_BUSINESS:
      state = { ...state, seeMoreLoading: false, loading: false, error: "" };
      action.payload.user.my_campaign.map((item) => state.data.push(item));
      return state;
    case HOME_FAILURE_FROM_BUSINESS:
      return {
        ...state,
        loading: false,
        campaignData: [],
        influencer: [],
        seeMoreLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
