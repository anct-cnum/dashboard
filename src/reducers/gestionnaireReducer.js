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
        loadingSuppression: true,
        errorGestionnaire: false
      };
    case 'DELETE_GESTIONNAIRE_SUCCESS':
      return {
        ...state,
        loadingSuppression: false,
        deleteMessageSuccess: action.response.deleteMessageSuccess,
        items: { ...state.items,
          total: state.items.total - 1,
          data: state.items.data.filter(gestionnaire => gestionnaire._id !== action.response.idUser),
        }
      };
    case 'DELETE_ROLE_GESTIONNAIRE_SUCCESS':
      return {
        ...state,
        loadingSuppression: false,
        deleteMessageSuccess: action.response.deleteMessageSuccess,
        items: { ...state.items,
          data: state.items.data.map(
            gestionnaire => (gestionnaire._id === action.response.idUser) ? action.response.user : gestionnaire
          ),
        }
      };
    case 'DELETE_GESTIONNAIRE_FAILURE':
      return {
        ...state,
        loadingSuppression: false,
        errorGestionnaire: action.error
      };
    default:
      return state;
  }
}
