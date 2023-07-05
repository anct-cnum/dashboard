const initialState = {
  error: false,
};

export default function contrat(state = initialState, action) {
  switch (action.type) {
    case 'GETALL_CONTRAT_REQUEST':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'GETALL_CONTRAT_SUCCESS':
      return {
        ...state,
        loading: false,
        items: action.contrats,
      };
    case 'GETALL_CONTRAT_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'VALIDATION_CONTRAT_RENOUVELLEMENT_REQUEST':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'VALIDATION_CONTRAT_RENOUVELLEMENT_SUCCESS':
      return {
        ...state,
        loading: false,
      };
    case 'VALIDATION_CONTRAT_RENOUVELLEMENT_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'GETALL_HISTORIQUE_CONTRAT_REQUEST':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'GETALL_HISTORIQUE_CONTRAT_SUCCESS':
      return {
        ...state,
        loading: false,
        items: action.contrats,
      };
    case 'GETALL_HISTORIQUE_CONTRAT_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'CREATE_CONTRAT_RENOUVELLEMENT_REQUEST':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'CREATE_CONTRAT_RENOUVELLEMENT_SUCCESS':
      return {
        ...state,
        loading: false
      };
    case 'CREATE_CONTRAT_RENOUVELLEMENT_FAILURE':
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case 'UPDATE_CONTRAT_RENOUVELLEMENT_REQUEST':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'UPDATE_CONTRAT_RENOUVELLEMENT_SUCCESS':
      return {
        ...state,
        loading: false
      };
    case 'UPDATE_CONTRAT_RENOUVELLEMENT_FAILURE':
      return {
        ...state,
        error: action.error,
        loading: false
      };
    default:
      return state;
  }
}

