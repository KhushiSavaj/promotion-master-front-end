import {
    FAVORITE_REQUEST,
    FAVORITE_SUCCESS,
    FAVORITE_FAILURE,
    ADD_FAVORITE_REQUEST,
    ADD_FAVORITE_SUCCESS,
    ADD_FAVORITE_FAILURE,
    REMOVE_FAVORITE_REQUEST,
    REMOVE_FAVORITE_SUCCESS,
    REMOVE_FAVORITE_FAILURE,
} from './FavoriteAction'

const initialstate = {
    loading:false,
    favorite:[],
    error:'',
    buttonLoader:false
}

export const favoriteReducer = (state = initialstate, action) => {
    switch (action.type) {
        case FAVORITE_REQUEST: return {
            ...state,
            loading: true
        }
        case ADD_FAVORITE_REQUEST || REMOVE_FAVORITE_REQUEST: return {
            ...state,
            buttonLoader: true
        }
        case ADD_FAVORITE_SUCCESS || REMOVE_FAVORITE_SUCCESS: return {
            ...state,
            buttonLoader: false
        }
        case ADD_FAVORITE_FAILURE || REMOVE_FAVORITE_FAILURE: return {
            ...state,
            buttonLoader: false,
            error:action.payload
        }
        case FAVORITE_SUCCESS: return {
            ...state,
            loading: false,
            favorite: action.payload,
            error: ''
        }
        case FAVORITE_FAILURE: return {
            ...state,
            loading: false,
            favorite: [],
            error: action.payload
        }
        default:
            return state;
    }
}