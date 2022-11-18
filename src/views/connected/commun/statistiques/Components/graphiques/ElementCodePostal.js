import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { statistiquesActions } from '../../../../../../actions';

function ElementCodePostal() {

  const dispatch = useDispatch();

  const listeCodesPostaux = useSelector(state => state.statistiques?.listeCodesPostaux);

  const setCodePostal = e => {
    dispatch(statistiquesActions.changeCodePostalStats(e.target.value));
  };

  return (
    <select className="fr-select code-postal-select" onChange={setCodePostal}>
      <option value="">Tous codes postaux</option>
      {listeCodesPostaux && listeCodesPostaux?.map((codePostal, idx) => {
        return (<option key={idx} value={codePostal}>{codePostal}</option>);
      })}
    </select>
  );
}

export default ElementCodePostal;
