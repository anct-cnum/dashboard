import { combineReducers } from 'redux';
import menuReducer from './menuReducer';
import authenticationReducer from './authenticationReducer';
import exportsReducer from './exportsReducer';
import invitationsReducer from './invitationsReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  menu: menuReducer,
  authentication: authenticationReducer,
  exports: exportsReducer,
  user: userReducer,
  invitations: invitationsReducer
});

export default rootReducer;
