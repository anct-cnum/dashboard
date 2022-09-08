const anneeEnCours = new Date().getFullYear();
const initialState = {
  dateDebut: new Date(anneeEnCours + '/01/01'),
  dateFin: new Date(),
  codePostalStats: '',
  listeAutresReorientations: [],
  error: false,
  loading: false,
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
        loading: true,
        error: false,
      };
    case 'GET_CODES_POSTAUX_CRA_SUCCESS':
      return {
        ...state,
        listeCodesPostaux: action.listeCodesPostaux,
        loading: false,
      };
    case 'GET_CODES_POSTAUX_CRA_FAILURE':
      return {
        ...state,
        loading: false,
        error: true,
      };
    case 'GET_STATS_CRA_NATIONALES_REQUEST':
      return {
        ...state,
        loading: true,
        error: false,
      };
    case 'GET_STATS_CRA_NATIONALES_SUCCESS':
      return {
        ...state,
        statsData: action.statsNationales,
        loading: false,
      };
    case 'GET_STATS_CRA_NATIONALES_FAILURE':
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case 'UPDATE_AUTRES_REORIENTATIONS':
      return {
        ...state,
        listeAutresReorientations: action.listeAutresReorientations
      };
    case 'GET_DATAS_STRUCTURES_REQUEST':
      return {
        ...state,
        loading: true,
        error: false,
      };
    case 'GET_DATAS_STRUCTURES_SUCCESS':
      return {
        ...state,
        statistiquesStructures: action.statsStructure,
        loading: false,
      };
    case 'GET_DATAS_STRUCTURES_FAILURE':
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case 'GET_DATAS_TERRITOIRES_REQUEST':
      return {
        ...state,
        loading: true,
        error: false,
      };
    case 'GET_DATAS_TERRITOIRES_SUCCESS':
      return {
        ...state,
        statsTerritoires: action.statsTerritoires,
        loading: false,
      };
    case 'GET_DATAS_TERRITOIRES_FAILURE':
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case 'GET_TERRITOIRE_REQUEST':
      return {
        ...state,
        loading: true,
        error: false,
      };
    case 'GET_TERRITOIRE_SUCCESS':
      return {
        ...state,
        territoire: action.territoire,
        loading: false,
      };
    case 'GET_TERRITOIRE_FAILURE':
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case 'GET_STATS_CRA_TERRITOIRE_REQUEST':
      return {
        ...state,
        loading: true,
        error: false,
      };
    case 'GET_STATS_CRA_TERRITOIRE_SUCCESS':
      return {
        ...state,
        statsData: action.statsTerritoire,
        loading: false,
      };
    case 'GET_STATS_CRA_TERRITOIRE_FAILURE':
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case 'GET_STATS_CRA_STRUCTURE_REQUEST':
      return {
        ...state,
        loading: true,
        error: false,
      };
    case 'GET_STATS_CRA_STRUCTURE_SUCCESS':
      return {
        ...state,
        statsData: action.statsStructure,
        loading: false,
      };
    case 'GET_STATS_CRA_STRUCTURE_FAILURE':
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}
