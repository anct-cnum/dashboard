import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { statistiquesActions } from '../../../../../../actions';

function ElementCodePostal() {

  const dispatch = useDispatch();

  const listeCodesPostaux = useSelector(state => state.statistiques?.listeCodesPostaux);

  const setCodePostal = e => {
    const codePostal = e.target.value.split('-')[0];
    const codeCommune = e.target.value.split('-')[1] ?? '';
    const ville = e.target.value.split('-')[2] ?? '';
    dispatch(statistiquesActions.changeCodePostalStats(codePostal, ville, codeCommune));
  };
  const optionList = [];
  listeCodesPostaux?.forEach(c => {
    if (c.villes?.length === 1) {
      const codeCommune = c?.codeCommune.find(e => e.ville === c.villes[0])?.codeCommune;
      optionList.push({
        text: c.id + ' - ' + c.villes[0]?.toUpperCase(),
        value: c.id + '-' + codeCommune + '-' + c.villes[0]
      });
    } else if (c.villes?.length > 1) {
      optionList.push({
        text: c.id + ' - TOUTES COMMUNES',
        value: c.id
      });
      c.villes.forEach(ville => {
        const codeCommune = c?.codeCommune.find(e => e.ville === ville)?.codeCommune;
        optionList.push({
          text: c.id + ' - ' + ville,
          value: c.id + '-' + codeCommune + '-' + ville
        });
      });
    }
  });

  return (
    <select className="fr-select code-postal-select" onChange={setCodePostal}>
      <option value="">Tous codes postaux</option>
      {listeCodesPostaux && listeCodesPostaux?.map((c, idx) => {
        const regex = new RegExp('TOUTES COMMUNES');
        return (<optgroup key={idx} label={c.id}>
          {regex.test(c?.text) &&
            <option value={c.value}>{c.text}</option>
          }
          {optionList && optionList.filter(e => e.value.split('-')[0] === c.id && !regex.test(e.value.split('-')[0]))?.map((o, idx) =>
            <option key={idx} value={o.value}>{o.text}</option>) }
        </optgroup>);
      })}
    </select>
  );
}

export default ElementCodePostal;
