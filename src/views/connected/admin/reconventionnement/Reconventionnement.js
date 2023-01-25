import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

function Reconventionnement({ candidat }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);

  return (
    <>
      <tr>
        <td>{candidat?.idPG}</td>
        <td>{candidat?.nom}</td>
        <td>{dayjs(candidat?.createdAt).format('DD/MM/YYYY')}</td>
        <td>{dayjs(candidat?.createdAt).format('DD/MM/YYYY')}</td>
        <td>{candidat?.idPG}</td>
        <td>Conventionnement initial</td>
        <td>
          <button
            className="fr-btn"
            title="D&eacute;tail"
            onClick={() => window.open(`/${roleActivated}/demandes/convention/${candidat?._id}`)}>
              Voir la demande
          </button>
        </td>
      </tr>
    </>
  );
}

Reconventionnement.propTypes = {
  candidat: PropTypes.object,
};

export default Reconventionnement;
