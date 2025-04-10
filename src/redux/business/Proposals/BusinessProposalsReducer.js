import {
  PROPOSALS_REQUEST_FROM_BUSINESS,
  PROPOSALS_REQUEST_PAGINATION_FROM_BUSINESS,
  PROPOSALS_SUCCESS_FROM_BUSINESS,
  PROPOSALS_FAILURE_FROM_BUSINESS,
  PROPOSALS_SUCCESS_PAGINATION_FROM_BUSINESS,
} from "./BusinessProposalsAction";

const initialstate = {
  loading: false,
  data: [],
  count: 0,
  seeMoreLoading: false,
  error: "",
};

export const BusinessProposalsReducer = (state = initialstate, action) => {
  switch (action.type) {
    case PROPOSALS_REQUEST_FROM_BUSINESS:
      return {
        ...state,
        loading: true,
      };
    case PROPOSALS_REQUEST_PAGINATION_FROM_BUSINESS:
      return {
        ...state,
        loading: false,
        seeMoreLoading: true,
      };
    case PROPOSALS_SUCCESS_FROM_BUSINESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        count: action.payload.totalCount,
        error: "",
      };
    case PROPOSALS_SUCCESS_PAGINATION_FROM_BUSINESS:
      state = { ...state, seeMoreLoading: false, loading: false, error: "" };
      action.payload.data.map((item) => state.data.push(item));
      return state;
    case PROPOSALS_FAILURE_FROM_BUSINESS:
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
