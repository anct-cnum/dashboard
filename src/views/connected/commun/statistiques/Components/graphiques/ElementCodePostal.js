import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { statistiquesActions } from '../../../../../../actions';

function ElementCodePostal() {

  const dispatch = useDispatch();

  const listeCodesPostaux = useSelector(state => state.statistiques?.listeCodesPostaux);

  const setCodePostal = e => {
    const codePostal = e.target.value.split(' - ')[0];
    const ville = e.target.value.split(' - ')[1];
    const listCp = listeCodesPostaux?.find(i => i.id === codePostal)?.codeCommune;
    const codeCommune = listCp?.find(e => e.ville === ville)?.codeCommune;
    dispatch(statistiquesActions.changeCodePostalStats(codePostal, ville, codeCommune));
  };
  return (
    <select className="fr-select code-postal-select" onChange={setCodePostal}>
      <option value="">Tous codes postaux</option>
      {listeCodesPostaux && listeCodesPostaux?.map((codePostal, idx) => {
        return (<optgroup key={idx} label={codePostal.id}>
          {codePostal?.villes?.length > 1 &&
            <option value={codePostal.id}>{codePostal.id} - TOUTES COMMUNES </option>
          }
          {codePostal?.villes?.map((ligne, idxbis) => {
            return (<option key={idxbis} value={`${codePostal.id} - ${ligne}`}>{codePostal.id} - {ligne.toUpperCase()}</option>);
          })}
        </optgroup>);
      })}
    </select>
  );
}

export default ElementCodePostal;
