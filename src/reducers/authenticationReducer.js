import { roleActivated, rolesUser, getUser } from '../helpers';

const initialState = {
  roleActivated: roleActivated(),
  rolesAllowed: rolesUser(),
  user: getUser()
};

export default function authentication(state = initialState, action) {

  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        error: false
      };
    case 'LOGIN_SUCCESS':
      return {
        user: getUser(),
        rolesAllowed: rolesUser(),
        roleActivated: roleActivated()
      };
    case 'LOGIN_FAILURE':
      return {
        error: action.error
      };
    case 'LOGOUT':
      return {};
    case 'CHANGE_ROLE':
      return {
        ...state,
        roleActivated: action.role
      };
    default:
      return state;
  }
}
