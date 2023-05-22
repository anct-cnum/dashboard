const initialState = {
  dateDebut: new Date(1605571200000),
  dateFin: new Date(),
  profil: 'tous',
  nomStructure: undefined,
  nomConseiller: undefined,
  ordre: true,
  ordreNom: undefined,
  searchInput: undefined,
  region: 'tous',
  departement: 'tous',
};
  
export default function filtresConseillers(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_DATE_DEBUT':
      return {
        ...state,
        dateDebut: action.dateDebut,
      };
    case 'CHANGE_NOM_CONSEILLER':
      return {
        ...state,
        nomConseiller: action.nomConseiller,
        nomStructure: undefined
      };
    case 'CHANGE_NOM_STRUCTURE':
      return {
        ...state,
        nomStructure: action.nomStructure,
        nomConseiller: undefined
      };
    case 'CHANGE_DATE_FIN':
      return {
        ...state,
        dateFin: action.dateFin,
      };
    case 'CHANGE_ORDRE':
      return {
        ...state,
        ordre: !state.ordre,
        ordreNom: action.ordreNom
      };
    case 'CHANGE_PROFIL':
      return {
        ...state,
        profil: action.dataProfil
      };
    case 'CHANGE_CERTIFIE':
      return {
        ...state,
        certifie: action.dataCertifie
      };
    case 'CHANGE_GROUPE_CRA':
      return {
        ...state,
        groupeCRA: action.dataGroupeCRA
      };
    case 'CHANGE_COORDINATEUR':
      return {
        ...state,
        coordinateur: action.dataCoordinateur
      };
    case 'CHANGE_RUPTURE':
      return {
        ...state,
        rupture: action.dataRupture
      };
    case 'CHANGE_REGION':
      return {
        ...state,
        region: action.region
      };
    case 'CHANGE_DEPARTEMENT':
      return {
        ...state,
        departement: action.departement
      };
    case 'SAVE_SEARCH_INPUT':
      return {
        ...state,
        region: action.region,
        searchInput: action.searchInput
      };
    case 'RESET_FILTER_AND_SORTS':
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
