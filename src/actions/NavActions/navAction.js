import { ACTION_TYPES } from '../../configs';

const { TITLE_UPDATE } = ACTION_TYPES;

export function titleUpdate(values) {
    return (dispatch) => {
        dispatch({ type: TITLE_UPDATE, payload: { title: values.title } });
    }
}