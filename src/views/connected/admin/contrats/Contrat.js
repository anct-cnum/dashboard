import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { formatNomConseiller } from '../../../../utils/formatagesUtils';

function Contrat({ candidat }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);

  return (
    <>
      <tr>
        <td>{candidat?.idPG}</td>
        <td>{candidat?.nom}</td>
        <td>
          <span className="fr-text--bold">{formatNomConseiller(candidat)}</span><br/>
          <span>ID {candidat.idPG}</span>
        </td>
        <td>{dayjs(candidat?.createdAt).format('DD/MM/YYYY')}</td>
        <td>{candidat?.prenom}</td>
        <td>
          <button
            className="fr-btn"
            title="D&eacute;tail"
            onClick={() => window.open(`/${roleActivated}/demandes/contrat/${candidat?._id}`)}>
              Voir la demande
          </button>
        </td>
      </tr>
    </>
  );
}

Contrat.propTypes = {
  candidat: PropTypes.object,
};

export default Contrat;
