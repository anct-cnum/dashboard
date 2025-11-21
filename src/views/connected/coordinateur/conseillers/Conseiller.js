import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

function Conseiller({ conseiller }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);

  return (
    <tr>
      <td>{conseiller?.idPG}</td>
      <td style={{ maxWidth: '6.5rem' }}>{conseiller?.nom}</td>
      <td style={{ maxWidth: '7rem', overflowWrap: 'break-word' }}>{conseiller?.prenom}</td>
      <td style={{ width: '27rem' }}>{conseiller?.nomStructure}</td>
      <td style={{ width: '2rem' }}>{conseiller?.codeDepartement}</td>
      <td style={{ width: '7rem' }}>
        {conseiller?.dateDebutDeContrat ?
          dayjs(conseiller.dateDebutDeContrat).format('DD/MM/YYYY') :
          '-'}
      </td>
      <td style={{ width: '7rem' }}>
        {conseiller?.dateFinDeContrat ?
          dayjs(conseiller.dateFinDeContrat).format('DD/MM/YYYY') :
          '-'}
      </td>
      <td style={{ width: '4rem' }}>{conseiller?.craCount}</td>
      <td>
        <button
          className="fr-btn fr-icon-eye-line fr-mb-2w"
          title="D&eacute;tail"
          onClick={() => window.open(`/${roleActivated}/conseiller/${conseiller?._id}`)} />
      </td>
    </tr>
  );
}

Conseiller.propTypes = {
  conseiller: PropTypes.object,
};

export default Conseiller;
