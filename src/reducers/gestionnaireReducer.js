const initialState = {
  error: false,
};

export default function gestionnaire(state = initialState, action) {
  switch (action.type) {
    case 'GETALL_GESTIONNAIRES_REQUEST':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'GETALL_GESTIONNAIRES_SUCCESS':
      return {
        ...state,
        loading: false,
        items: action.gestionnaires
      };
    case 'GETALL_GESTIONNAIRES_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'RESUBMIT_INSCRIPTION_GESTIONNAIRE_REQUEST':
      return {
        ...state,
        loading: true,
        errorGestionnaire: false
      };
    case 'RESUBMIT_INSCRIPTION_GESTIONNAIRE_SUCCESS':
      return {
        ...state,
        successResendInvitGestionnaire: action.successRelanceInvitation,
        loading: false
      };
    case 'RESUBMIT_INSCRIPTION_GESTIONNAIRE_FAILURE':
      return {
        ...state,
        errorGestionnaire: action.error,
        loading: false
      };
    case 'DELETE_GESTIONNAIRE_REQUEST':
      return {
        ...state,
        loading: true,
        errorGestionnaire: false
      };
    case 'DELETE_GESTIONNAIRE_SUCCESS':
      return {
        ...state,
        loading: false,
        successDeleteGestionnaire: action.deleteSuccess
      };
    case 'DELETE_GESTIONNAIRE_FAILURE':
      return {
        ...state,
        loading: false,
        errorGestionnaire: action.error
      };
    default:
      return state;
  }
}
