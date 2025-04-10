import {
  INFLUENCER_REQUEST,
  INFLUENCER_REQUEST_PAGINATION,
  INFLUENCER_SUCCESS,
  INFLUENCER_FAILURE,
  INFLUENCER_SUCCESS_PAGINATION,
} from "./InfluencerAction";

const initialstate = {
  loading: false,
  data: [],
  count: 0,
  seeMoreLoading: false,
  error: "",
};

export const InfluencerReducer = (state = initialstate, action) => {
  switch (action.type) {
    case INFLUENCER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case INFLUENCER_REQUEST_PAGINATION:
      return {
        ...state,
        loading: false,
        seeMoreLoading: true,
      };
    case INFLUENCER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.influencer,
        count: action.payload.count,
        error: "",
      };
    case INFLUENCER_SUCCESS_PAGINATION:
      state = { ...state,seeMoreLoading:false,count:action.payload.count, loading: false, error: "" };
          action.payload.influencer.map((item) =>  state.data.push(item))
      return state;
    case INFLUENCER_FAILURE:
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
