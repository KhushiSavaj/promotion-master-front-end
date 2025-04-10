import {
    APPLY_FROM_HOME_REQUEST,
    APPLY_FROM_HOME_SUCCESS,
    APPLY_FROM_HOME_FAILURE,
} from './ApplyCampaignFromHomeAction'
const initialstate = {
    data: {},
    error:''
}

export const ApplyCampaignHomeReducer = (state = initialstate, action) => {
    switch (action.type) {
        case APPLY_FROM_HOME_REQUEST: return {
            ...state,
        }
        case APPLY_FROM_HOME_SUCCESS: return {
            ...state,
            loading: false,
            data: action.payload,
            error: ''
        }
        case APPLY_FROM_HOME_FAILURE: return {
            ...state,
            data: {},
            error: action.payload
        }
        default:
            return state;
    }
}