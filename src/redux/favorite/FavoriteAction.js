import { toast } from "react-toastify";
import { ApiGet, ApiPost } from "../../helpers/API/ApiData";

export const FAVORITE_REQUEST = "FAVORITE_REQUEST";
export const FAVORITE_SUCCESS = "FAVORITE_SUCCESS";
export const FAVORITE_FAILURE = "FAVORITE_FAILURE";
export const ADD_FAVORITE_REQUEST = "ADD_FAVORITE_REQUEST";
export const REMOVE_FAVORITE_REQUEST = "REMOVE_FAVORITE_REQUEST";
export const ADD_FAVORITE_SUCCESS = "ADD_FAVORITE_SUCCESS";
export const REMOVE_FAVORITE_SUCCESS = "REMOVE_FAVORITE_SUCCESS";
export const ADD_FAVORITE_FAILURE = "ADD_FAVORITE_FAILURE";
export const REMOVE_FAVORITE_FAILURE = "REMOVE_FAVORITE_FAILURE";

export const favoriteRequest = () => {
  return {
    type: FAVORITE_REQUEST,
  };
};
export const addAndRemoveFavoriteRequest = () => {
  return {
    type: ADD_FAVORITE_REQUEST || REMOVE_FAVORITE_REQUEST,
  };
};
export const addAndRemoveFavoriteSucess = () => {
  return {
    type: ADD_FAVORITE_SUCCESS || REMOVE_FAVORITE_SUCCESS,
  };
};
export const addAndRemoveFavoriteFailure = () => {
  return {
    type: REMOVE_FAVORITE_FAILURE || ADD_FAVORITE_FAILURE,
  };
};
export const favoriteSuccess = (favorite) => {
  return {
    type: FAVORITE_SUCCESS,
    payload: favorite,
  };
};
export const favoriteFailure = (error) => {
  return {
    type: FAVORITE_FAILURE,
    ResponseStatus: "",
    payload: error,
  };
};
export const favorite = () => {
  return (dispatch) => {
    dispatch(favoriteRequest());
    const fetchData = async () => {
      const res = await ApiGet("user/homepage");
      try {
        if (parseInt(res.data.status) / 100 === 2) {
          dispatch(
            favoriteSuccess(
              res.data.data.user
                ? res.data.data.user.favourite
                : res.data.data.favourite            )
          );
        }
      } catch (err) {
        dispatch(favoriteFailure(err));
      }
    };
    fetchData();
  };
};

export const addFavorite = (id) => {
  return (dispatch) => {
    dispatch(addAndRemoveFavoriteRequest())
    const fetchData = async () => {
      const res = await ApiPost("user/setFavourite/" + id);
      try {
        dispatch(addAndRemoveFavoriteSucess())
        dispatch(favorite());
      } catch (err) {
        toast.error(res.data.message);
        dispatch(addAndRemoveFavoriteFailure())
      }
    };
    fetchData();
  };
};

export const removeFavorite = (id) => {
  return (dispatch) => {
    dispatch(addAndRemoveFavoriteRequest())
    const fetchData = async () => {
      const res = await ApiPost("user/unFavourite/" + id);
      try {
        dispatch(addAndRemoveFavoriteSucess())
        dispatch(favorite());
      } catch (err) {
        toast.error(res.data.message);
        dispatch(addAndRemoveFavoriteFailure())
      }
    };
    fetchData();
  };
};
