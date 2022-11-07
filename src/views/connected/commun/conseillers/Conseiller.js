import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Conseiller({ conseiller, currentPage }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);

  return (
    <>
      <tr>
        <td>{conseiller?.idPG}</td>
        <td>{conseiller?.nom}</td>
        <td>{conseiller?.prenom}</td>
        <td colSpan="12" style={{ width: '28rem' }}>
          <a className="email"href={'mailto:' + conseiller?.address}>
            {conseiller?.address}
          </a>
        </td>
        <td className="center-text">
          {conseiller.rupture}
        </td>
        <td className="center-text">
          {conseiller?.estCoordinateur ? 'Oui' : 'Non' }
        </td>
        <td>{conseiller?.craCount}</td>
        <td className="btn-actions-conseillers">
          <div className="fr-grid-row">
            <button
              className="fr-btn fr-icon-eye-line fr-mr-2w"
              title="D&eacute;tail"
              onClick={() => window.open(`/${roleActivated}/conseiller/${conseiller?._id}`)}/>
            <Link className="fr-btn fr-icon-line-chart-line" title="Statistiques" to={{
              pathname: `/statistiques-conseiller/${conseiller?._id}`,
              currentPage: currentPage,
              origin: `/liste-conseillers`,
              idConseiller: conseiller?._id }}>
            </Link>
          </div>
        </td>
      </tr>
    </>
  );
}

Conseiller.propTypes = {
  conseiller: PropTypes.object,
  currentPage: PropTypes.number,
};

export default Conseiller;
