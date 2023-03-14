const initialState = {
  dateDebut: new Date(1605571200000),
  dateFin: new Date(),
};
    
export default function filtresHistoriqueConvention(state = initialState, action) {
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
    case 'RESET_FILTER_AND_SORTS':
      return initialState;
    default:
      return state;
  }
}
    
  
