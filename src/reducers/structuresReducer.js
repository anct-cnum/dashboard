const initialState = { };

export default function structures(state = initialState, action) {

  switch (action.type) {
    case 'GET_STRUCTURE_REQUEST':
      return {
        ...state,
        structureLoading: true,
        structureError: false
      };
    case 'GET_STRUCTURE_SUCCESS':
      return {
        ...state,
        structure: action.structure,
        structureLoading: false,
      };
    case 'GET_STRUCTURE_FAILURE':
      return {
        structureError: action.error,
        structureLoading: false,
      };
    default:
      return state;
  }
}
