const anneeEnCours = new Date().getFullYear();
const initialState = {
  dateDebut: new Date(anneeEnCours + '/01/01'),
  dateFin: new Date(),
  codePostalStats: '',
  listeAutresReorientations: [],
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
    default:
      return state;
  }
}
