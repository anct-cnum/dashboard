const initialState = {
  loading: false,
  blob: null
};
  
export default function exports(state = initialState, action) {
  switch (action.type) {
    case 'EXPORT_FILE_REQUEST':
      return {
        ...state,
        loading: true,
        blob: null,
        error: false
      };
    case 'EXPORT_FILE_SUCCESS':
      return {
        ...state,
        loading: false,
        blob: action.blob,
        nameFile: action.nameFile
      };
    case 'EXPORT_FILE_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'RESET_FILE':
      return {
        ...state,
        blob: null
      };
    default:
      return state;
  }
}
