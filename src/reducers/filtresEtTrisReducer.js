const initialState = {
  dateDebut: new Date(1605571200000),
  dateFin: new Date(),
  profil: 'tous',
  nom: undefined,
  ordre: true,
  ordreNom: undefined,
  structureId: null,
  searchInput: undefined,
  territoire: 'codeDepartement',
  region: 'tous',
};

export default function filtresEtTris(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_DATE_DEBUT':
      return {
        ...state,
        dateDebut: action.dateDebut,
      };
    case 'CHANGE_NOM':
      return {
        ...state,
        nom: action.nom,
        structureId: undefined
      };
    case 'CHANGE_STRUCTURE_ID':
      return {
        ...state,
        structureId: action.structureId,
        nom: undefined
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
    case 'CHANGE_TERRITOIRE':
      return {
        ...state,
        territoire: action.territoire
      };
    case 'SAVE_SEARCH_INPUT':
      return {
        ...state,
        region: action.region,
        searchInput: action.searchInput
      };
    case 'CHANGE_REGION':
      return {
        ...state,
        region: action.region
      };
    case 'RESET_FILTER_AND_SORTS':
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
