import { combineReducers } from 'redux';

import auth from './auth.reducer';
import login from './login.reducer';
import register from './register.reducer';
import patient from './patient.reducer';


const reducers = combineReducers({
    auth,
    register,
    login,
    patient,
    
});

export default reducers;