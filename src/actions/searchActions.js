export const searchActions = {
  updateSearch,
};

function updateSearch(search) {
  return { type: 'UPDATE_SEARCH', search };
}
