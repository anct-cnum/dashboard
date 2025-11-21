import React from 'react';
import PropTypes from 'prop-types';

function Structure({ structure }) {

  return (
    <>
      <tr>
        <td>{structure?.idPG}</td>
        <td colSpan="12" style={{ maxWidth: '15rem' }} className="truncated-text"><strong>{structure?.nom}</strong></td>
        <td>{structure?.siret}</td>
        <td style={{ maxWidth: '8rem', overflowWrap: 'break-word' }}>{structure?.contact?.nom}</td>
        <td>{structure?.contact?.prenom}</td>
        <td colSpan="12" style={{ maxWidth: '15rem', overflowWrap: 'break-word' }}>
          <a href={`mailto:${structure?.contact?.email}`}>
            {structure?.contact?.email}
          </a>
        </td>
        <td colSpan="12">{structure?.conseillersRecruter}/{structure?.posteValiderCoselec}</td>
      </tr>
    </>
  );
}

Structure.propTypes = {
  structure: PropTypes.object,
};

export default Structure;
