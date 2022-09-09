const initialState = {
  currentPage: 1,
  pageCount: 0,
};

export default function menu(state = initialState, action) {
  switch (action.type) {
    case 'SET_PAGE':
      return {
        ...state,
        currentPage: action.page,
      };
    case 'SET_PAGE_COUNT':
      return {
        ...state,
        pageCount: action.pageCount,
      };
    default:
      return state;
  }
}
