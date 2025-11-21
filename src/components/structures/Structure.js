import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function Structure({ structure }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);

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
        <td>{structure?.conseillersRecruter}/{structure?.posteValiderCoselec}</td>
        <td>
          <div className="btn-actions-structures">
            <button
              className="fr-btn fr-icon-eye-line fr-mr-2w"
              title="D&eacute;tail"
              onClick={() => window.open(`/${roleActivated}/structure/${structure?._id}`)} />
          </div>
        </td>
      </tr>
    </>
  );
}

Structure.propTypes = {
  structure: PropTypes.object,
};

export default Structure;
