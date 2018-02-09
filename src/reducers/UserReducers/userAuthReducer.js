import { ACTION_TYPES } from '../../configs';

const { LOGGED_IN, LOGGING_IN, LOGGED_OUT, LOGIN_ERROR } = ACTION_TYPES;
const initialState = {
    authenticated: false, error: null, isLoggingIn: false
};
export default function (state = initialState, action) {
    switch (action.type) {
        case LOGGED_IN:
            return { authenticated: true };
        case LOGGED_OUT:
            return { authenticated: false };
        case LOGIN_ERROR:
            return { error: action.payload };
        case LOGGING_IN:
            return { isLoggingIn: true };
        default:
            return state;
    }
}