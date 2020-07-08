import * as types from './../types';

export const setPath = (path) => {
    return dispatch => {
        dispatch({
            type: types.SET_PATH,
            path,
        });
    }
}