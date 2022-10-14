import React from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

function Structure() {
  const structure = useSelector(state => state.structure);

  return (
    <div>
      <h2>Structure</h2>
      <p>Nom : <strong>{structure?.structure?.nom}</strong></p>
      <p>Siret : {structure?.structure?.siret}</p>
      <p>Date d&apos;inscription : {dayjs(structure?.structure?.dateDebutMission).format('DD/MM/YYYY')}</p>
      <p>Code Postal : {structure?.structure?.codePostal}</p>
    </div>
  );
}

export default Structure;
