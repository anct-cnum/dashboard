import { roleActivated, rolesUser } from '../helpers';
import { getUser } from '../helpers/getUser';
import { getAccessToken } from '../helpers/getAccessToken';
const initialState = {
  roleActivated: roleActivated(),
  rolesAllowed: rolesUser(),
  user: getUser(),
  accessToken: getAccessToken(),
  isAuthenticated: !!getAccessToken(),
  error: null,
  isLoggingOut: false,
  loading: false
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
        isAuthenticated: true,
        loading: false
      };
    case 'REFRESH_TOKEN':
      return {
        ...state,
        accessToken: action.accessToken,
        isAuthenticated: true
      };
    case 'LOGIN_FAILURE':
      return {
        ...initialState,
        isAuthenticated: false
      };
    case 'LOGOUT_REQUEST':
      return {
        ...state,
        loading: true,
        isLoggingOut: true,
        error: null
      };
    case 'LOGOUT_SUCCESS':
      return {
        ...initialState,
        isLoggingOut: false
      };
    case 'LOGOUT_FAILURE':
      return {
        ...state,
        loading: false,
        isLoggingOut: false,
        error: action.error
      };
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
    case 'CLOSE_BANNER_REFUS_RECRUTEMENT_SUCCESS':
      return {
        ...state,
        user: {
          ...state.user, miseEnRelationRefusRecrutement: state.user.miseEnRelationRefusRecrutement?.filter(
            miseEnRelation =>
              miseEnRelation._id !== action.idMiseEnRelation)
        },
      };
    default:
      return state;
  }
}
