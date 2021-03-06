import * as types from './../types';

const initialState = {
    path: window.location.pathname,
};

export const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_PATH:
            return {
                ...state,
                path: action.path,
            }
        default:
            return state
    }
}