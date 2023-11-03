import { roleActivated, rolesUser } from '../helpers';
import { getUser } from '../helpers/getUser';
import { getAccessToken } from '../helpers/getAccessToken';
const initialState = {
  roleActivated: roleActivated(),
  rolesAllowed: rolesUser(),
  user: getUser(),
  accessToken: getAccessToken()
};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        loading: true
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.data.user,
        accessToken: action.data.accessToken,
        rolesAllowed: action.data.user.roles,
        roleActivated: action.data.user.roles[0],
        loading: false
      };
    case 'REFRESH_TOKEN':
      return {
        ...state,
        accessToken: action.accessToken
      };
    case 'LOGIN_FAILURE':
      return {};
    case 'CHANGE_ROLE':
      return {
        ...state,
        roleActivated: action.role
      };
    case 'CLOSE_BANNER_POSTE_COORDINATEUR_SUCCESS':
      return {
        ...state,
        user: {
          ...state.user, demandesCoordinateurBannerInformation: state.user.demandesCoordinateurBannerInformation?.filter(
            demandeCoordinateur =>
              demandeCoordinateur.id !== action.idDemandeCoordinateur)
        },
      };
    default:
      return state;
  }
}
