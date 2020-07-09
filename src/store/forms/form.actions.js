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
    const schema = {
        ...data, fields: data.fields.map(f => {
            delete f.id;
            return f;
        })
    };
    return (dispatch) => {
        FormService.createForm({ schema })
            .then(res => {
                console.log(res);
            })
    }
}
