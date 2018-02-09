import axios from 'axios';

import { ACTION_TYPES, GITHUB_ROOT_URL } from '../../configs';

const { LOGGED_IN, LOGGING_IN, LOGGED_OUT, LOGIN_ERROR } = ACTION_TYPES;

export function login(values, callback) {
    const accessToken = btoa(`${values.username}:${values.password}`);
    const request = axios.get(GITHUB_ROOT_URL, {
        headers: {
            Authorization: `Basic ${accessToken}`
        }
    });
    return (dispatch) => {
        dispatch({ type: LOGGING_IN, payload: { isLoggingIn: true } });
        request.then(({ data }) => {
            dispatch({ type: LOGGED_IN, payload: data });
            localStorage.setItem('accessToken', accessToken);
            return callback();
        }).catch((reason) => {
            dispatch({ type: LOGIN_ERROR, payload: reason });
            return callback(reason);
        });
    };

}