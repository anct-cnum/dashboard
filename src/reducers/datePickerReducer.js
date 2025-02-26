const initialState = {
  dateDebut: new Date(1605571200000),
  dateFin: new Date(),
  dateDebutStatistique: new Date(1605571200000),
  dateFinStatistique: new Date(),
};

export default function datePicker(state = initialState, action) {
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
    case 'RESET_DATE_PICKER':
      return initialState;
    default:
      return state;
  }
}
