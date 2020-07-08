import { combineReducers } from 'redux';

import { globalReducer } from './global/global.reducer';
import { userReducer } from './user/user.reducer';
import { formReducer } from './forms/form.reducer';


export default combineReducers({
    global: globalReducer,
    user: userReducer,
    forms: formReducer,
});