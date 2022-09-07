import { combineReducers } from 'redux';
import menuReducer from './menuReducer';
import authenticationReducer from './authenticationReducer';
import exportsReducer from './exportsReducer';
import invitationsReducer from './invitationsReducer';

const rootReducer = combineReducers({
  menu: menuReducer,
  authentication: authenticationReducer,
  exports: exportsReducer,
  invitations: invitationsReducer,
});

export default rootReducer;
