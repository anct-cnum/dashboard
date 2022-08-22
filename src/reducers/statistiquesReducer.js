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
    default:
      return state;
  }
}
