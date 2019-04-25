import { SET_RESTAURANT } from '../actions/types';

const initialState = {
    restaurant : ''
}

export default function(state = initialState, action ) {
    switch(action.type) {
        case SET_RESTAURANT:
            return {
                ...state,
                restaurant: action.payload,
            }
        default: 
            return state;
    }
}