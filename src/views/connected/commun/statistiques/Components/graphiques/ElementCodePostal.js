import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { statistiquesActions } from '../../../../../../actions';

function ElementCodePostal() {

  const dispatch = useDispatch();

  const listeCodesPostaux = useSelector(state => state.statistiques?.listeCodesPostaux);

  const setCodePostal = e => {
    const codePostal = e.target.value.split(' - ')[0];
    const ville = e.target.value.split(' - ')[1];
    dispatch(statistiquesActions.changeCodePostalStats(codePostal, ville));
  };

  return (
    <select className="fr-select code-postal-select" onChange={setCodePostal}>
      <option value="">Tous codes postaux</option>
      {listeCodesPostaux && listeCodesPostaux?.map((codePostal, idx) => {
        return (<optgroup key={idx} label={codePostal.id}>
          {codePostal?.codePostal?.length > 1 &&
            <option value={codePostal.id}>{codePostal.id} - TOUTES COMMUNES </option>
          }
          {codePostal?.codePostal?.map((ligne, idxbis) => {
            return (<option key={idxbis} value={ligne}>{ligne.toUpperCase()}</option>);
          })}
        </optgroup>);
      })}
    </select>
  );
}

export default ElementCodePostal;
