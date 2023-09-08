const initialState = {
  error: false,
};

export default function coordinateur(state = initialState, action) {
  switch (action.type) {
    case 'GETALL_DEMANDES_COORDINATEUR_REQUEST':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'GETALL_DEMANDES_COORDINATEUR_SUCCESS':
      return {
        ...state,
        loading: false,
        items: action.demandesCoordinateur,
      };
    case 'GETALL_DEMANDES_COORDINATEUR_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'GET_DEMANDE_COORDINATEUR_REQUEST':
      return {
        ...state,
        loading: true,
        error: false
      };
    case 'GET_DEMANDE_COORDINATEUR_SUCCESS':
      return {
        ...state,
        coordinateur: action.coordinateur,
        loading: false
      };
    case 'GET_DEMANDE_COORDINATEUR_FAILURE':
      return {
        loading: false,
        error: action.error
      };
    case 'UPDATE_AVIS_PREFET_REQUEST':
      return {
        ...state,
        loading: true,
        error: false
      };
    case 'UPDATE_AVIS_PREFET_SUCCESS':
      return {
        ...state,
        successAvisPrefet: action.success,
        loading: false
      };
    case 'UPDATE_AVIS_PREFET_FAILURE':
      return {
        loading: false,
        error: action.error
      };
    case 'UPDATE_BANNER_AVIS_PREFET_REQUEST':
      return {
        ...state,
        loading: true,
        error: false
      };
    case 'UPDATE_BANNER_AVIS_PREFET_SUCCESS':
      return {
        ...state,
        loading: false,
        items: {
          ...state.items, data: state.items.data.map(
            demandeCoordinateur => demandeCoordinateur.id === action.idDemandeCoordinateur ? { ...demandeCoordinateur, banniereValidationAvisPrefet: false } :
              demandeCoordinateur)
        },
      };
    case 'UPDATE_BANNER_AVIS_PREFET_FAILURE':
      return {
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
