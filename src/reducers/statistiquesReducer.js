const initialState = {
  codePostalStats: 'tous',
  villeStats: 'tous',
  codeCommuneStats: null,
  listeAutresReorientations: [],
  error: false,
  errorTerritoire: false,
  loading: false,
  conseillerStats: 'tous',
  structureStats: 'tous',
  codeRegionStats: 'tous',
  numeroDepartementStats: 'tous',
  dateDebut: new Date('2020-11-17').toISOString(),
  dateFin: new Date().toISOString(),
};

export default function statistiques(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_CODE_POSTAL_STATS':
      return {
        ...state,
        codePostalStats: action.codePostal ?? 'tous',
        villeStats: action.ville ?? 'tous',
        codeCommuneStats: action.codeCommune,
      };
    case 'CHANGE_STRUCTURE_STATS':
      return {
        ...state,
        structureStats: action.structureId,
      };
    case 'CHANGE_CONSEILLER_STATS':
      return {
        ...state,
        conseillerStats: action.conseillerId,
      };
    case 'CHANGE_REGION_STATS':
      return {
        ...state,
        codeRegionStats: action.codeRegion,
      };
    case 'CHANGE_DEPARTEMENT_STATS':
      return {
        ...state,
        numeroDepartementStats: action.numeroDepartement,
      };
    case 'GET_CODES_POSTAUX_CRA_REQUEST':
      return {
        ...state,
        loadingCodesPostaux: true,
        error: false,
      };
    case 'GET_CODES_POSTAUX_CRA_SUCCESS':
      return {
        ...state,
        listeCodesPostaux: action.listeCodesPostaux,
        loadingCodesPostaux: false,
      };
    case 'GET_CODES_POSTAUX_CRA_FAILURE':
      return {
        ...state,
        loadingCodesPostaux: false,
        error: true,
      };
    case 'GET_FILTRES_CONSEILLER_CRA_REQUEST':
      return {
        ...state,
        loadingFiltresConseiller: true,
        error: false,
      };
    case 'GET_FILTRES_CONSEILLER_CRA_SUCCESS':
      return {
        ...state,
        loadingFiltresConseiller: false,
        listeCodesPostaux: action.response.listeCodesPostaux,
        listeStructures: action.response.listeStructures,
      };
    case 'GET_FILTRES_CONSEILLER_CRA_FAILURE':
      return {
        ...state,
        loadingFiltresConseiller: false,
        error: action.error,
      };
    case 'GET_STATS_CRA_NATIONALES_REQUEST':
      return {
        ...state,
        statsData: null,
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
    case 'GET_STATS_CRA_COOP_REQUEST':
      return {
        ...state,
        statsCoop: null,
        loading: true,
        error: false,
      };
    case 'GET_STATS_CRA_COOP_SUCCESS':
      return {
        ...state,
        statsCoop: action.statsCoop,
        loading: false,
      };
    case 'GET_STATS_CRA_COOP_FAILURE':
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
        statistiquesStructures: null,
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
        statsTerritoires: null,
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
        loadingTerritoire: true,
        errorTerritoire: false,
      };
    case 'GET_TERRITOIRE_SUCCESS':
      return {
        ...state,
        territoire: action.territoire,
        loadingTerritoire: false,
      };
    case 'GET_TERRITOIRE_FAILURE':
      return {
        ...state,
        errorTerritoire: action.error,
        loadingTerritoire: false,
      };
    case 'GET_STATS_CRA_TERRITOIRE_REQUEST':
      return {
        ...state,
        statsData: null,
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
        statsData: null,
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
    case 'GET_STATS_CRA_CONSEILLER_REQUEST':
      return {
        ...state,
        statsData: null,
        loading: true,
        error: false,
      };
    case 'GET_STATS_CRA_CONSEILLER_SUCCESS':
      return {
        ...state,
        statsData: action.statsConseiller,
        loading: false,
      };
    case 'GET_STATS_CRA_CONSEILLER_FAILURE':
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case 'RESET_FILTRES_STATS':
      return initialState;
    default:
      return state;
  }
}
