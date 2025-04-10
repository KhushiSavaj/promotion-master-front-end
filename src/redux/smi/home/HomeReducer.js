import {
  HOME_REQUEST,
  HOME_REQUEST_PAGINATION,
  HOME_SUCCESS,
  HOME_FAILURE,
  HOME_SUCCESS_PAGINATION,
} from "./HomeAction";

const initialstate = {
  loading: false,
  data: [],
  count: 0,
  seeMoreLoading: false,
  error: "",
};

export const HomeReducer = (state = initialstate, action) => {
  switch (action.type) {
    case HOME_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case HOME_REQUEST_PAGINATION:
      return {
        ...state,
        loading: false,
        seeMoreLoading: true,
      };
    case HOME_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.campaigns,
        count: action.payload.count,
        error: "",
      };
    case HOME_SUCCESS_PAGINATION:
      state = { ...state,seeMoreLoading:false,count:action.payload.count, loading: false, error: "" };
          action.payload.campaigns.map((item) =>  state.data.push(item))
      return state;
    case HOME_FAILURE:
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
