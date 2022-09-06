const anneeEnCours = new Date().getFullYear();
const initialState = {
  dateDebut: new Date(anneeEnCours + '/01/01'),
  dateFin: new Date(),
  codePostalStats: '',
  listeAutresReorientations: [],
  statsDataError: false,
  statsDataLoading: false,
};

export default function statistiques(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_DATE_DEBUT':
      return {
        ...state,
        dateDebut: action.dateDebut,
      };
    case 'CHANGE_DATE_FIN':
      return {
        ...state,
        dateFin: action.dateFin,
      };
    case 'CHANGE_CODE_POSTAL_STATS':
      return {
        ...state,
        codePostalStats: action.codePostal,
      };
    case 'GET_CODES_POSTAUX_CRA_REQUEST':
      return {
        ...state,
        codesPostauxLoading: true,
        codesPostauxError: false,
      };
    case 'GET_CODES_POSTAUX_CRA_SUCCESS':
      return {
        ...state,
        listeCodesPostaux: action.listeCodesPostaux,
        codesPostauxLoading: false,
      };
    case 'GET_CODES_POSTAUX_CRA_FAILURE':
      return {
        ...state,
        codesPostauxLoading: false,
        codesPostauxError: true,
      };
    case 'GET_STATS_CRA_NATIONALES_REQUEST':
      return {
        ...state,
        statsDataLoading: true,
        statsDataError: false,
      };
    case 'GET_STATS_CRA_NATIONALES_SUCCESS':
      return {
        ...state,
        statsData: action.statsNationales,
        statsDataLoading: false,
      };
    case 'GET_STATS_CRA_NATIONALES_FAILURE':
      return {
        ...state,
        statsDataError: action.error,
        statsDataLoading: false,
      };
    case 'UPDATE_AUTRES_REORIENTATIONS':
      return {
        ...state,
        listeAutresReorientations: action.listeAutresReorientations
      };
    case 'GET_DATAS_STRUCTURES_REQUEST':
      return {
        ...state,
        statistiquesStructuresLoading: true,
        statistiquesStructuresError: false,
      };
    case 'GET_DATAS_STRUCTURES_SUCCESS':
      return {
        ...state,
        statistiquesStructures: action.statsStructure,
        statistiquesStructuresLoading: false,
      };
    case 'GET_DATAS_STRUCTURES_FAILURE':
      return {
        ...state,
        statistiquesStructuresError: action.error,
        statistiquesStructuresLoading: false,
      };
    case 'GET_DATAS_TERRITOIRES_REQUEST':
      return {
        ...state,
        statsTerritoiresLoading: true,
        statsTerritoiresError: false,
      };
    case 'GET_DATAS_TERRITOIRES_SUCCESS':
      return {
        ...state,
        statsTerritoires: action.statsTerritoires,
        statsTerritoiresLoading: false,
      };
    case 'GET_DATAS_TERRITOIRES_FAILURE':
      return {
        ...state,
        statsTerritoiresError: action.error,
        statsTerritoiresLoading: false,
      };
    case 'GET_TERRITOIRE_REQUEST':
      return {
        ...state,
        territoireLoading: true,
        territoireError: false,
      };
    case 'GET_TERRITOIRE_SUCCESS':
      return {
        ...state,
        territoire: action.territoire,
        territoireLoading: false,
      };
    case 'GET_TERRITOIRE_FAILURE':
      return {
        ...state,
        territoireError: action.error,
        territoireLoading: false,
      };
    case 'GET_STATS_CRA_TERRITOIRE_REQUEST':
      return {
        ...state,
        statsDataLoading: true,
        statsDataError: false,
      };
    case 'GET_STATS_CRA_TERRITOIRE_SUCCESS':
      return {
        ...state,
        statsData: action.statsTerritoire,
        statsDataLoading: false,
      };
    case 'GET_STATS_CRA_TERRITOIRE_FAILURE':
      return {
        ...state,
        statsDataError: action.error,
        statsDataLoading: false,
      };
    case 'GET_STATS_CRA_STRUCTURE_REQUEST':
      return {
        ...state,
        statsDataLoading: true,
        statsDataError: false,
      };
    case 'GET_STATS_CRA_STRUCTURE_SUCCESS':
      return {
        ...state,
        statsData: action.statsStructure,
        statsDataLoading: false,
      };
    case 'GET_STATS_CRA_STRUCTURE_FAILURE':
      return {
        ...state,
        statsDataError: action.error,
        statsDataLoading: false,
      };
    case 'GET_EXPORT_TERRITOIRE_REQUEST':
      return {
        ...state,
        downloading: true,
      };
    case 'GET_EXPORT_TERRITOIRE_SUCCESS':
      return {
        ...state,
        exportTerritoireFileBlob: action.exportTerritoireFileBlob,
        downloading: false,
      };
    case 'GET_EXPORT_TERRITOIRE_FAILURE':
      return {
        ...state,
        exportTerritoireFileError: action.error,
        downloading: false,
      };
    case 'EXPORT_TERRITOIRE_RESET': {
      const {
        exportTerritoireFileBlob: _file,
        exportTerritoireFileError: _error,
        ...nextState
      } = state;
      return nextState;
    }
    case 'GET_STATS_PDF_REQUEST':
      return {
        ...state,
        loadingPDF: true,
        errorPDF: false
      };
    case 'GET_STATS_PDF_SUCCESS':
      return {
        ...state,
        blob: action.data,
        statistiquesPDF: action.download,
        loadingPDF: false,
        errorPDF: false
      };
    case 'GET_STATS_PDF_FAILURE':
      return {
        ...state,
        blob: null,
        loadingPDF: false,
        errorPDF: action.error
      };
    case 'GET_STATS_CSV_REQUEST':
      return {
        ...state,
        loadingCSV: true,
        error: false
      };
    case 'GET_STATS_CSV_SUCCESS':
      return {
        ...state,
        blob: action.data,
        statistiquesCSV: action.download,
        loadingCSV: false
      };
    case 'GET_STATS_CSV_FAILURE':
      return {
        ...state,
        error: action.error
      };
    case 'RESET_FILE':
      return {
        ...state,
        blob: null,
      };
    default:
      return state;
  }
}
