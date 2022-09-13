import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchActions } from '../actions';

function SearchBox() {

  const [searchInputValue, setSearchInputValue] = useState('');
  const { search } = useSelector(state => state.search);

  const dispatch = useDispatch();

  function handleChange(e) {
    setSearchInputValue(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      setSearchInputValue(e.target.value);
      dispatch(searchActions.updateSearch(searchInputValue));
    }
  }

  function applySearch() {
    dispatch(searchActions.updateSearch(searchInputValue));
  }

  useEffect(() => {
    setSearchInputValue(search);
  }, [search]);

  return (
    <div className="fr-search-bar fr-mb-4w fr-mt-1w" role="search">
      <label className="fr-label" htmlFor="fr-search-input">Recherche</label>
      <input
        className="fr-input"
        placeholder="Rechercher"
        type="search"
        id="fr-search-input"
        value={searchInputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown} />
      <button className="fr-btn" title="Rechercher" onClick={applySearch}>
        Rechercher
      </button>
    </div>
  );
}

export default SearchBox;
