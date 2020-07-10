import * as types from './../types';
import FormService from '../../services/FormService';
import { removeFromArray, updateInArray } from '../../utils/helpers';

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
    return (dispatch, getState) => {
        FormService.createForm({ schema })
            .then(res => {
                const { status, json } = res;
                if (FormService.isOkStatus(status)) {
                    const { forms } = getState().forms;
                    const newForms = forms ? [...forms, { schema: json.schema, id: json.id }] : [{ schema: json.schema, id: json.id }];
                    dispatch({
                        type: types.SET_FORMS,
                        forms: newForms,
                    });
                }
            })
    }
};
export const getTask = (id) => {
    return dispatch => {
        FormService.getTask(id)
            .then(res => {
                const { status, json } = res;
                if (FormService.isOkStatus(status)) {
                    dispatch({
                        type: types.SET_TASK,
                        task: json,
                    });
                }
            })
    }
};
export const editTask = (id, schema) => {
    return (dispatch, getState) => {
        FormService.editTask(id, { schema })
            .then(res => {
                if (FormService.isOkStatus(res.status)) {
                    const { forms } = getState().forms;
                    const newForms = updateInArray(forms, item => item.id == id, schema);
                    dispatch({
                        type: types.SET_FORMS,
                        forms: newForms,
                    });
                }
            })
    }
}
export const removeTask = (id) => {
    return (dispatch, getState) => {
        FormService.removeTask(id)
            .then(res => {
                if (FormService.isOkStatus(res.status)) {
                    const { forms } = getState().forms;
                    const newForms = removeFromArray(forms, form => form.id == id);
                    dispatch({
                        type: types.SET_FORMS,
                        forms: newForms,
                    });
                }
            })
    }
};
