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
    
  
