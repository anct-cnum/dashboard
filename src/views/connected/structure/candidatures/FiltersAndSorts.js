import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filtresCandidaturesActions, paginationActions } from '../../../../actions';

function filtersAndSorts() {

  const dispatch = useDispatch();
  const filtersAndSorts = useSelector(state => state.filtresCandidatures);
  const [searchInputValue, setSearchInputValue] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;

    if (name === 'orderByDateStart') {
      dispatch(filtresCandidaturesActions.toggleOrdre());
    }

    if (name === 'pixLevel1' || name === 'pixLevel2' || name === 'pixLevel3') {
      let pix = [];
      if (document.getElementById('pixLevel1').checked) {
        pix.push(1);
      }
      if (document.getElementById('pixLevel2').checked) {
        pix.push(2);
      }
      if (document.getElementById('pixLevel3').checked) {
        pix.push(3);
      }

      dispatch(filtresCandidaturesActions.updatePix(pix));
    }

    if (name === 'selectDiplome') {
      // filtre "TOUS"
      let diplome = null;
      // filtre "avec diplome" ou "sans diplome"
      if (value !== '') {
        diplome = value === 'true';
      }
      dispatch(filtresCandidaturesActions.updateDiplome(diplome));
    }

    if (name === 'selectCV') {
      // filtre "TOUS"
      let cv = null;
      // filtre "avec CV" ou "sans CV"
      if (value !== '') {
        cv = value === 'true';
      }
      dispatch(filtresCandidaturesActions.updateCV(cv));
    }

    if (name === 'selectCCP1') {
      // filtre "TOUS"
      let ccp1 = null;
      // filtre "avec CCP1" ou "sans CCP1"
      if (value !== '') {
        ccp1 = value === 'true';
      }
      dispatch(filtresCandidaturesActions.updateCCP1(ccp1));
    }
    dispatch(paginationActions.setPage(1));
  };

  const rechercheParNomCandidat = () => {
    dispatch(filtresCandidaturesActions.updateSearch(searchInputValue));
    dispatch(paginationActions.setPage(1));
  };

  const rechercheParNomCandidatToucheEntrer = e => {
    if (e.key === 'Enter') {
      rechercheParNomCandidat();
    }
  };

  const handleChangeSearchBar = e => {
    setSearchInputValue(e.target.value);
  };

  useEffect(() => {
    if (filtersAndSorts.search !== searchInputValue) {
      setSearchInputValue(filtersAndSorts.search);
    }
  }, [filtersAndSorts.search]);

  return (
    <div>
      <div className="fr-grid-row">
        <div className="fr-col-12">
          <div className="fr-search-bar fr-mb-4w fr-mt-1w" role="search">
            <label className="fr-label" htmlFor="fr-search-input">Recherche</label>
            <input
              className="fr-input"
              placeholder="Rechercher par nom du candidat ou par id"
              type="search"
              id="fr-search-input"
              value={searchInputValue}
              onChange={handleChangeSearchBar}
              onKeyDown={rechercheParNomCandidatToucheEntrer} />
            <button className="fr-btn" title="Rechercher" onClick={rechercheParNomCandidat}>
              Rechercher
            </button>
          </div>
          <div className="tri-en-ligne" style={{ float: 'left' }}>
            <label className="fr-label labelCcp1" htmlFor="selectCCP1">Formation CCP1</label>
            <select className="fr-select" id="selectCCP1" name="selectCCP1" onChange={handleChange} value={filtersAndSorts?.ccp1}>
              <option value="">Tous</option>
              <option value="true">Oui</option>
              <option value="false">Non</option>
            </select>
          </div>
          <div className="fr-form-group fr-mb-n2w block-pix" style={{ float: 'left' }}>
            <fieldset className="fr-fieldset fr-fieldset--inline fr-co filtresCandidature">
              <legend className="fr-fieldset__legend--regular fr-fieldset__legend fr-text--regular" id="checkboxes-inline-legend">
                Niveau(x) Pix
              </legend>
              <div className="fr-mr-2w boxPix">
                <div className="fr-fieldset__content">
                  <div className="fr-checkbox-group fr-checkbox-group--md">
                    <input type="checkbox" checked={filtersAndSorts.pix.includes(1)} id="pixLevel1" name="pixLevel1" value="1" onChange={handleChange} />
                    <label className="fr-label" htmlFor="pixLevel1">
                      <span style={{ verticalAlign: 'sub' }}>
                        <i className="ri-star-fill"></i>
                      </span>
                    </label>
                  </div>
                  <div className="fr-checkbox-group fr-checkbox-group--md">
                    <input type="checkbox" checked={filtersAndSorts.pix.includes(2)} id="pixLevel2" name="pixLevel2" value="2" onChange={handleChange} />
                    <label className="fr-label" htmlFor="pixLevel2">
                      <span style={{ verticalAlign: 'sub' }}>
                        <i className="ri-star-fill"></i>
                        <i className="ri-star-fill"></i>
                      </span>
                    </label>
                  </div>
                  <div className="fr-checkbox-group fr-checkbox-group--md">
                    <input type="checkbox" checked={filtersAndSorts.pix.includes(3)} id="pixLevel3" name="pixLevel3" value="3" onChange={handleChange} />
                    <label className="fr-label" htmlFor="pixLevel3">
                      <span style={{ verticalAlign: 'sub' }}>
                        <i className="ri-star-fill"></i>
                        <i className="ri-star-fill"></i>
                        <i className="ri-star-fill"></i>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
          <div className="tri-en-ligne">
            <label className="fr-label fr-mr-1w labelCV" htmlFor="selectCV">CV</label>
            <select className="fr-select" id="selectCV" name="selectCV" onChange={handleChange} value={filtersAndSorts?.cv}>
              <option value="">Tous</option>
              <option value="true">Oui</option>
              <option value="false">Non</option>
            </select>
          </div>
          <div className="tri-en-ligne block-diplome">
            <label className="fr-label fr-mr-1w labelDiplome" htmlFor="selectDiplome">Dipl&ocirc;me</label>
            <select className="fr-select" id="selectDiplome" name="selectDiplome" onChange={handleChange} value={filtersAndSorts?.diplome}>
              <option value="">Tous</option>
              <option value="true">Oui</option>
              <option value="false">Non</option>
            </select>
          </div>
          <div className="tri-en-ligne fr-mb-1w">
            {/* Tri */}
            <div className="fr-toggle fr-toggle--label-left">
              <input type="checkbox"
                className="fr-toggle__input"
                id="orderByDateStart"
                name="orderByDateStart"
                checked={filtersAndSorts?.ordre === false}
                onChange={handleChange}
              />
              <label className="fr-toggle__label" htmlFor="orderByDateStart">
                Trier par date de disponibilit&eacute;
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default filtersAndSorts;
