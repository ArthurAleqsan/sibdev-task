import * as types from './../types';

const initialState = {
    forms: null,
    task: null,
};

export const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_FORMS:
            return {
                ...state,
                forms: action.forms,
            }
        case types.SET_TASK:
            return {
                ...state,
                task: action.task,
            }
        default:
            return state
    }
}