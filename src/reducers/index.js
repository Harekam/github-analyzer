import { combineReducers } from 'redux';
import UserAuthReducer from './UserReducers/userAuthReducer';
import NavReducer from './NavReducers/navReducer';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';

const rootReducer = combineReducers({
  form: formReducer,
  toastr: toastrReducer,
  userAuth: UserAuthReducer,
  navDetails: NavReducer
});

export default rootReducer;
