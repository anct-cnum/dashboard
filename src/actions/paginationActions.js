export const paginationActions = {
  resetPage,
};

function resetPage(toggle) {
  return { type: 'RESET_PAGE', toggle };
}
