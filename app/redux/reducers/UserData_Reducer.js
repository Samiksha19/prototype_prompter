import * as action_types from '../action_types';

const initialState = {
    userData: '',
};

export const UserDataReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case action_types.USER_DATA:
            return {
                ...state,
                userData: action.data
            };
    
        default:
            return state;
    }
};