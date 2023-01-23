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
        <td>{candidat?.prenom}</td>
        <td>
          <Link
            className="fr-btn"
            title="Détails"
            to={`/${roleActivated}/reconventionnement/${candidat?._id}`}
            state={{ 'origin': `/${roleActivated}/reconventionnement` }}>Voir la demande</Link>
        </td>
      </tr>
    </>
  );
}

Reconventionnement.propTypes = {
  candidat: PropTypes.object,
};

export default Reconventionnement;
