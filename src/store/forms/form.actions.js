import * as types from './../types';
import FormService from '../../services/FormService';

export const getForms = () => {
    return (dispatch) => {
        FormService.getForms()
            .then(res => {
                const { status, json } = res;
                if (FormService.isOkStatus(status)) {
                    dispatch({
                        type: types.SET_FORMS,
                        forms: json,
                    });
                }
            })
    }
};

export const createForm = (data) => {
    return (dispatch) => {
        FormService.createForm(data)
        .then(res => {
            console.log(res);
        })
    }
}
