const initialState = {
  loading: false,
  error: false,
};

export default function structures(state = initialState, action) {

  switch (action.type) {
    case 'GET_STRUCTURE_REQUEST':
      return {
        ...state,
        loading: true,
        error: false
      };
    case 'GET_STRUCTURE_SUCCESS':
      return {
        ...state,
        structure: action.structure,
        loading: false,
      };
    case 'GET_STRUCTURE_FAILURE':
      return {
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}
