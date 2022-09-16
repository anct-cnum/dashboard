export default function structure(state = null, action) {
  switch (action.type) {
    case 'GET_STRUCTURE_REQUEST':
      return {
        ...state,
        flashMessage: false
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
    case 'PATCH_STRUCTURE_REQUEST':
      return {
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
    
  
