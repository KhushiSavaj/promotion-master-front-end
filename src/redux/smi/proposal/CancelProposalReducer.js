import {
    CANCEL_PROPOSAL_REQUEST,
    CANCEL_PROPOSAL_SUCCESS,
    CANCEL_PROPOSAL_FAILURE,
} from './CancelProposalAction'
const initialstate = {
    data: {},
    error:''
}

export const CancelProposalReducer = (state = initialstate, action) => {
    switch (action.type) {
        case CANCEL_PROPOSAL_REQUEST: return {
            ...state,
        }
        case CANCEL_PROPOSAL_SUCCESS: return {
            ...state,
            loading: false,
            data: action.payload,
            error: ''
        }
        case CANCEL_PROPOSAL_FAILURE: return {
            ...state,
            data: {},
            error: action.payload
        }
        default:
            return state;
    }
}