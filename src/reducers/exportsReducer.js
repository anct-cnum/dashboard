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
    case 'EXPORT_TERRITOIRE_REQUEST':
      return {
        ...state,
        loading: true,
        error: false,
      };
    case 'EXPORT_TERRITOIRE_SUCCESS':
      return {
        ...state,
        exportTerritoireFileBlob: action.exportTerritoireFileBlob,
        loading: false,
      };
    case 'EXPORT_TERRITOIRE_FAILURE':
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case 'EXPORT_TERRITOIRE_RESET': {
      const {
        exportTerritoireFileBlob: _file,
        error: _error,
        ...nextState
      } = state;
      return nextState;
    }
    case 'EXPORT_STATISTIQUES_CSV_REQUEST':
      return {
        ...state,
        loading: true,
        error: false
      };
    case 'EXPORT_STATISTIQUES_CSV_SUCCESS':
      return {
        ...state,
        blob: action.data,
        statistiquesCSV: action.download,
        loading: false
      };
    case 'EXPORT_STATISTIQUES_CSV_FAILURE':
      return {
        ...state,
        error: action.error,
        loading: false,
        blob: null
      };
    default:
      return state;
  }
}
