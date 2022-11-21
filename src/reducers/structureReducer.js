const anneeEnCours = new Date().getFullYear();
const initialState = {
  dateDebut: new Date(anneeEnCours + '/01/01'),
  dateFin: new Date(),
  error: false,
};

export default function structure(state = initialState, action) {
  switch (action.type) {
    case 'GET_STRUCTURE_REQUEST':
      return {
        ...state,
        error: false
      };
    case 'GET_STRUCTURE_SUCCESS':
      return {
        ...state,
        structure: action.structure
      };
    case 'GET_STRUCTURE_FAILURE':
      return {
        error: action.error
      };
    case 'GETALL_STRUCTURE_REQUEST':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'GETALL_STRUCTURE_SUCCESS':
      return {
        ...state,
        loading: false,
        items: action.structures
      };
    case 'GETALL_STRUCTURE_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'PATCH_STRUCTURE_REQUEST':
      return {
        error: false,
        flashMessage: false
      };
    case 'PATCH_STRUCTURE_SUCCESS':
      return {
        ...state,
        structure: action.structure,
        flashMessage: true
      };
    case 'PATCH_STRUCTURE_FAILURE':
      return {
        ...state,
        error: action.error,
        flashMessage: true
      };
    case 'VERIFY_STRUCTURE_SIRET_REQUEST':
      return {
        ...state,
        loadingSiret: true,
        error: false
      };
    case 'VERIFY_STRUCTURE_SIRET_SUCCESS':
      return {
        ...state,
        nomStructure: action.nomStructure,
        loadingSiret: false
      };
    case 'VERIFY_STRUCTURE_SIRET_FAILURE':
      return {
        ...state,
        error: action.error,
        loadingSiret: false
      };
    case 'UPDATE_STRUCTURE_SIRET_REQUEST':
      return {
        ...state,
        loading: true,
        error: false
      };
    case 'UPDATE_STRUCTURE_SIRET_SUCCESS':
      return {
        ...state,
        structure: { ...state.structure, siret: action.siretUpdated },
        nomStructure: null,
        loading: false
      };
    case 'UPDATE_STRUCTURE_SIRET_FAILURE':
      return {
        ...state,
        loading: false,
        nomStructure: null,
        error: action.error,
      };
    case 'CANCEL_STRUCTURE_SIRET_REQUEST':
      return {
        ...state,
        nomStructure: null,
        loadingSiret: false
      };
    case 'UPDATE_STRUCTURE_EMAIL_REQUEST':
      return {
        ...state,
        loading: true,
        error: false,
      };
    case 'UPDATE_STRUCTURE_EMAIL_SUCCESS':
      return {
        ...state,
        loading: false,
        structure: { ...state.structure.contact, email: action.emailUpdated },
      };
    case 'UPDATE_STRUCTURE_EMAIL_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case 'ERROR_MESSAGE_HIDDEN':
      return {
        ...state,
        error: false,
        flashMessage: false
      };
    default:
      return state;
  }
}
