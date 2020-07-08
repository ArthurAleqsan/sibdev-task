import * as types from './../types';

const initialState = {
    forms: null,
};

export const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_FORMS:
            return {
                ...state,
                forms: action.forms,
            }
        default:
            return state
    }
}