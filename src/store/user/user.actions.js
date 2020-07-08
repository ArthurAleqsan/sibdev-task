import * as types from './../types';
import AuthService from '../../services/AuthService';
import { message } from 'antd';
import UserService from '../../services/UserService';

export const signUp = (data) => {
    return () => {
        AuthService.signUp(data)
            .then(res => {
                if (AuthService.isOkStatus(res.status)) {
                    return message.success('Вы успешно зарегестрировались, войдите на странчку.');
                } else {
                    return message.error('Something is a wrong');
                }
            })
    }
};

export const signIn = (data) => {
    return dispatch => {
        AuthService.login(data)
            .then(res => {
                const { status, json } = res;
                if (AuthService.isOkStatus(status)) {
                    localStorage.setItem('token', json.access_token);
                    dispatch(getUser());
                } else {
                    return message.error('Invalid username or/and password');
                }

            })
    }
};

export const logout = () => {
    return dispatch => {
        localStorage.clear();
        dispatch({
            type: types.SET_USER,
            user: null,
        })
    }
}

export const getUser = () => {
    return dispatch => {
        UserService.getUser()
            .then(res => {
                const { status, json } = res;
                if (UserService.isOkStatus(status)) {
                    dispatch({
                        type: types.SET_USER,
                        user: json
                    })
                }
            })
    }
};