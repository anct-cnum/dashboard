const initialState = {
  nom: undefined,
  ordre: true,
  ordreNomCoordinateur: 'codePostal',
  ordreNomConseiller: 'createdAt',
  region: 'tous',
  departement: 'tous',
  avisPrefet: 'tous',
};

export default function filtresDemandes(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_NOM':
      return {
        ...state,
        nom: action.nom,
      };
    case 'CHANGE_ORDRE_CONSEILLER':
      return {
        ...state,
        ordre: !state.ordre,
        ordreNomConseiller: action.ordreNom
      };
    case 'CHANGE_ORDRE_COORDINATEUR':
      return {
        ...state,
        ordre: !state.ordre,
        ordreNomCoordinateur: action.ordreNom
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
    case 'CHANGE_AVIS_PREFET':
      return {
        ...state,
        avisPrefet: action.avisPrefet
      };
    case 'RESET_FILTER_AND_SORTS':
      return initialState;
    default:
      return state;
  }
}

