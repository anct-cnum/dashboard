const initialState = {
  search: '',
};

export default function search(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_SEARCH':
      return {
        ...state,
        search: action.search,
      };
    default:
      return state;
  }
}
