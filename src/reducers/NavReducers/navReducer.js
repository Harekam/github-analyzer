import { ACTION_TYPES, DEFAULT_TITLE } from '../../configs';

const { TITLE_UPDATE } = ACTION_TYPES;
const initialState = {
    title: DEFAULT_TITLE
};
export default function (state = initialState, action) {
    switch (action.type) {
        case TITLE_UPDATE:
            return action.payload;
        default:
            return state;
    }
}