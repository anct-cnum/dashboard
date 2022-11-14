import { roleActivated, rolesUser } from '../helpers';
import { getUser } from '../helpers/getUser';
const initialState = {
  roleActivated: roleActivated(),
  rolesAllowed: rolesUser(),
  user: getUser()
};

export default function authentication(state = initialState, action) {
  switch (action.type) {
   
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: { user: action.user, accessToken: action.accessToken },
        rolesAllowed: action.user.roles,
        roleActivated: action.user.roles[0],
        loading: false
      };
    case 'REFRESH_TOKEN':
      return {
        ...state,
        user: { ...state.user, accessToken: action.accessToken }
      };
    case 'LOGIN_FAILURE':
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
