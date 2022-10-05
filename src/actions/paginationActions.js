export const paginationActions = {
  setPage,
  setPageCount,
  setElementsNavigate
};

function setPage(page) {
  return { type: 'SET_PAGE', page };
}

function setPageCount(pageCount) {
  return { type: 'SET_PAGE_COUNT', pageCount };
}

function setElementsNavigate(elements) {
  return { type: 'SET_ELEMENTS_NAVIGATE', elements };
}
