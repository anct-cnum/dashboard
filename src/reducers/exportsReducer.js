const initialState = {
  loading: false,
  blob: null
};
  
export default function exports(state = initialState, action) {
  switch (action.type) {
    case 'EXPORT_FILE_REQUEST':
      return {
        loading: true,
        blob: null,
        error: false
      };
    case 'EXPORT_FILE_SUCCESS':
      return {
        loading: false,
        blob: action.blob,
        nameFile: action.nameFile
      };
    case 'EXPORT_FILE_FAILURE':
      return {
        loading: false,
        error: action.error
      };
    case 'RESET_FILE':
      return {
        blob: null
      };
    default:
      return state;
  }
}
