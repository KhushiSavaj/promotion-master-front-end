import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  SEARCH_REQUEST_PAGINATION_FOR_CAMPAIGN,
  SEARCH_SUCCESS_PAGINATION_FOR_CAMPAIGN,
  SEARCH_REQUEST_PAGINATION_FOR_INFLUENCER,
  SEARCH_SUCCESS_PAGINATION_FOR_INFLUENCER,
} from "./SerachAction";

const initialstate = {
  loading: false,
  error: "",
  campaignData: [],
  influencerData: [],
  campaignCount: 0,
  influencerCount: 0,
  seeMoreCampaignLoading: false,
  seeMoreinfluencerLoading: false,
};

export const SearchReducer = (state = initialstate, action) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        campaignData: action.payload.campaigns,
        influencerData: action.payload.influencers,
        campaignCount: action.payload.campaignsCount,
        influencerCount: action.payload.influencersCount,
        error: "",
      };
    case SEARCH_FAILURE:
      return {
        ...state,
        loading: false,
        campaignData: [],
        influencerData: [],
        campaignCount: 0,
        influencerCount: 0,
        seeMoreCampaignLoading: false,
        seeMoreinfluencerLoading: false,
        error: action.payload,
      };
    case SEARCH_REQUEST_PAGINATION_FOR_CAMPAIGN:
      return {
        ...state,
        loading: false,
        seeMoreCampaignLoading: true,
        seeMoreinfluencerLoading: false
      };
    case SEARCH_SUCCESS_PAGINATION_FOR_CAMPAIGN:
      state = { ...state, seeMoreCampaignLoading: false, loading: false, error: "" };
      action.payload.campaigns.map((item) =>  state.campaignData.push(item));
      return state;
    case SEARCH_REQUEST_PAGINATION_FOR_INFLUENCER:
      return {
        ...state,
        loading: false,
        seeMoreinfluencerLoading: true,
        seeMoreCampaignLoading: false
      };
    case SEARCH_SUCCESS_PAGINATION_FOR_INFLUENCER:
      state = { ...state, seeMoreinfluencerLoading: false, loading: false, error: "" };
      action.payload.influencers.map((item) => state.influencerData.push(item))
      return state;
    default:
      return state;
  }
};
