import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useMatomo } from '@datapunt/matomo-tracker-react';

function Structure({ structure }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const { trackEvent } = useMatomo();

  return (
    <>
      <tr>
        <td>{structure?.idPG}</td>
        <td colSpan="12" style={{ width: '28rem' }}>{structure?.nom}</td>
        <td>{structure?.contact?.nom}</td>
        <td>{structure?.contact?.prenom}</td>
        <td colSpan="12" style={{ width: '20rem' }}>{structure?.contact?.email}</td>
        <td>{structure?.contact?.telephone}</td>
        <td>
          <div className="btn-actions-structures">
            <button
              className="fr-btn fr-icon-eye-line fr-mr-2w"
              title="D&eacute;tail"
              onClick={() => window.open(`/${roleActivated}/structure/${structure?._id}`)}/>
            <Link
              onClick={() => trackEvent({ category: 'statistiques-structures', action: `click-${roleActivated}` })}
              className="fr-btn fr-icon-line-chart-line"
              title="Statistiques"
              to={`/statistiques-structure/${structure?._id}`}
              state={{ 'origin': `/liste-structures`, structure }}
            />
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
