import {
  PROPOSAL_REQUEST,
  PROPOSAL_REQUEST_PAGINATION,
  PROPOSAL_SUCCESS,
  PROPOSAL_FAILURE,
  PROPOSAL_SUCCESS_PAGINATION,
} from "./ProposalAction";

const initialstate = {
  loading: false,
  data: [],
  count: 0,
  seeMoreLoading: false,
  error: "",
};

export const proposalReducer = (state = initialstate, action) => {
  switch (action.type) {
    case PROPOSAL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PROPOSAL_REQUEST_PAGINATION:
      return {
        ...state,
        loading: false,
        seeMoreLoading: true,
      };
    case PROPOSAL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.proposals,
        count: action.payload.count,
        error: "",
      };
    case PROPOSAL_SUCCESS_PAGINATION:
      state = { ...state,seeMoreLoading:false,count:action.payload.count, loading: false, error: "" };
          action.payload.proposals.map((item) =>  state.data.push(item))
      return state;
    case PROPOSAL_FAILURE:
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
