import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filtresCandidatures, conseillerActions } from '../../../actions';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

function filtersAndSorts({ resetPage }) {

  const dispatch = useDispatch();
  let filtersAndSorts = useSelector(state => state.filtersAndSorts);
  const { search } = useSelector(state => state.search);
  let { filter } = useParams();

  const [filters, setFilters] = useState({
    pixLevel1: '',
    pixLevel2: '',
    pixLevel3: '',
    diplome: '',
    cv: '',
    orderByDateStart: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;

    if (name === 'orderByDateStart') {
      let order = e.target.checked ? 'conseillerObj.dateDisponibilite' : 'conseillerObj.createdAt';
      dispatch(filtresCandidatures.updateOrder(order));
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

      dispatch(filtresCandidatures.updatePix(pix));
    }

    if (name === 'selectDiplome') {
      // filtre "TOUS"
      let diplome = null;
      // filtre "avec diplome" ou "sans diplome"
      if (value !== '') {
        diplome = value === 'true';
      }
      dispatch(filtresCandidatures.updateDiplome(diplome));
    }

    if (name === 'selectCV') {
      // filtre "TOUS"
      let cv = null;
      // filtre "avec CV" ou "sans CV"
      if (value !== '') {
        cv = value === 'true';
      }
      dispatch(filtresCandidatures.updateCV(cv));
    }

    setFilters(inputs => ({ ...inputs, [name]: value }));

    let persoFilters = {
      pix: [!!filters.pixLevel1, !!filters.pixLevel2, !!filters.pixLevel3],
      cv: filters.cv,
      diplome: filters.diplome
    };

    dispatch(conseillerActions.getAll({ misesEnRelation: true, search, page: 0, filter, sortData: filtersAndSorts?.order, persoFilters }));
    resetPage(1);
  };

  return (
    <div>
      <div className="fr-grid-row">
        <div className="fr-col-12" >
          <div className="fr-form-group" style={{ float: 'left' }}>
            <fieldset className="fr-fieldset fr-fieldset--inline fr-co filtresCandidature">
              <div className="fr-mr-2w fr-mt-2w boxPix">
                <label className="labelPix">Niveau(x) Pix</label>
                <div className="fr-fieldset__content">
                  <div className="fr-checkbox-group fr-checkbox-group--md">
                    <input type="checkbox" id="pixLevel1" name="pixLevel1" value="1" onChange={handleChange} />
                    <label className="fr-label" htmlFor="pixLevel1">
                      <span style={{ verticalAlign: 'sub' }}>
                        <i className="ri-star-fill"></i>
                      </span>
                    </label>
                  </div>
                  <div className="fr-checkbox-group fr-checkbox-group--md">
                    <input type="checkbox" id="pixLevel2" name="pixLevel2" value="2" onChange={handleChange} />
                    <label className="fr-label" htmlFor="pixLevel2">
                      <span style={{ verticalAlign: 'sub' }}>
                        <i className="ri-star-fill"></i>
                        <i className="ri-star-fill"></i>
                      </span>
                    </label>
                  </div>
                  <div className="fr-checkbox-group fr-checkbox-group--md">
                    <input type="checkbox" id="pixLevel3" name="pixLevel3" value="3" onChange={handleChange} />
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
            <div className="fr-mr-2w selectOption">
              <label className="fr-label fr-mr-1w labelDiplome" htmlFor="selectDiplome">Diplôme</label>
              <select className="fr-select" id="selectDiplome" name="selectDiplome" onChange={handleChange} value={filtersAndSorts?.diplome}>
                <option value="">Tous</option>
                <option value="true">Oui</option>
                <option value="false">Non</option>
              </select>
            </div>
          </div>
          <div className="tri-en-ligne">
            <div className="fr-mr-1w selectOption">
              <label className="fr-label fr-mr-1w labelCV" htmlFor="selectCV">CV</label>
              <select className="fr-select" id="selectCV" name="selectCV" onChange={handleChange} value={filtersAndSorts?.cv}>
                <option value="">Tous</option>
                <option value="true">Oui</option>
                <option value="false">Non</option>
              </select>
            </div>
          </div>
          <div className="tri-en-ligne">
            {/* Tri */}
            <div className="fr-toggle fr-toggle--label-left">
              <input type="checkbox"
                className="fr-toggle__input"
                id="orderByDateStart"
                name="orderByDateStart"
                checked={filtersAndSorts?.order === 'conseillerObj.dateDisponibilite'}
                onChange={handleChange}/>

              <label className="fr-toggle__label"
                htmlFor="orderByDateStart"
                data-fr-checked-label="Activé"
                data-fr-unchecked-label="Désactivé">
                  Trier par date possible de démarrage
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

filtersAndSorts.propTypes = {
  resetPage: PropTypes.func
};

export default filtersAndSorts;
