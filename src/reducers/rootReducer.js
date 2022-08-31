import { combineReducers } from 'redux';
import menuReducer from './menuReducer';
import authenticationReducer from './authenticationReducer';
import exportsReducer from './exportsReducer';
import invitationReducer from './invitationReducer';

const rootReducer = combineReducers({
  menu: menuReducer,
  authentication: authenticationReducer,
  exports: exportsReducer,
  invitation: invitationReducer,
});

export default rootReducer;
