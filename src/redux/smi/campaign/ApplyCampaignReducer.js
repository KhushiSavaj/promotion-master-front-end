import {
    APPLY_CAMPAIGN_REQUEST,
    APPLY_CAMPAIGN_SUCCESS,
    APPLY_CAMPAIGN_FAILURE,
} from './ApplyCampaignAction'
const initialstate = {
    data: {},
    error:''
}

export const ApplyCampaignReducer = (state = initialstate, action) => {
    switch (action.type) {
        case APPLY_CAMPAIGN_REQUEST: return {
            ...state,
        }
        case APPLY_CAMPAIGN_SUCCESS: return {
            ...state,
            loading: false,
            data: action.payload,
            error: ''
        }
        case APPLY_CAMPAIGN_FAILURE: return {
            ...state,
            data: {},
            error: action.payload
        }
        default:
            return state;
    }
}