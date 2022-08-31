import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { statistiquesActions } from '../../../../../actions';
import PropTypes from 'prop-types';

function ElementCodePostal({ idStructure = '' }) {

  const dispatch = useDispatch();

  const listeCodesPostaux = useSelector(state => state.statistiques?.listeCodesPostaux);

  const setCodePostal = e => {
    dispatch(statistiquesActions.changeCodePostalStats(e.target.value));
  };

  useEffect(() => {
    if (!listeCodesPostaux && idStructure) {
      dispatch(statistiquesActions.getCodesPostauxCrasConseillerStructure(idStructure));
    }
  });

  return (
    <select className="fr-select code-postal-select" onChange={setCodePostal}>
      <option value="">Tous codes postaux</option>
      {listeCodesPostaux && listeCodesPostaux?.map((codePostal, idx) => {
        return (<option key={idx} value={codePostal}>{codePostal}</option>);
      })}
    </select>
  );
}

ElementCodePostal.propTypes = {
  idStructure: PropTypes.string,
};
export default ElementCodePostal;
