import {
  INFLUENCER_REQUEST_FROM_BUSINESS,
  INFLUENCER_REQUEST_PAGINATION_FROM_BUSINESS,
  INFLUENCER_SUCCESS_FROM_BUSINESS,
  INFLUENCER_FAILURE_FROM_BUSINESS,
  INFLUENCER_SUCCESS_PAGINATION_FROM_BUSINESS,
} from "./BusinessInfluencerAction";

const initialstate = {
  loading: false,
  data: [],
  count: 0,
  seeMoreLoading: false,
  error: "",
};

export const BusinessInfluencerReducer = (state = initialstate, action) => {
  switch (action.type) {
    case INFLUENCER_REQUEST_FROM_BUSINESS:
      return {
        ...state,
        loading: true,
      };
      case INFLUENCER_REQUEST_PAGINATION_FROM_BUSINESS:
        return {
          ...state,
          loading: false,
          seeMoreLoading: true,
        };
        case INFLUENCER_SUCCESS_FROM_BUSINESS:
          return {
            ...state,
            loading: false,
            data: action.payload.influencer,
            count:action.payload.count,
            error: "",
          };
          case INFLUENCER_SUCCESS_PAGINATION_FROM_BUSINESS:
            state = { ...state,seeMoreLoading:false,count:action.payload.count, loading: false, error: "" };
            action.payload.influencer.map((item) =>  state.data.push(item))
              return state;
              case INFLUENCER_FAILURE_FROM_BUSINESS:
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
