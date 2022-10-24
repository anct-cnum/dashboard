import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { useSelector } from 'react-redux';

function Conseiller({ conseiller, currentPage }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);

  return (
    <>
      <tr>
        <td>{conseiller?.idPG}</td>
        <td>{conseiller?.nom}</td>
        <td>{conseiller?.prenom}</td>
        <td>
          <a className="email"href={'mailto:' + conseiller?.emailCN?.address}>
            {conseiller?.emailCN?.address}
          </a>
        </td>
        <td className="center-text">
          {conseiller?.rupture ? 'Oui' : 'Non' }
        </td>
        <td className="center-text">
          {conseiller?.estCoordinateur ? 'Oui' : 'Non' }
        </td>
        <td>{conseiller?.craCount}</td>
        <td>
          <Link className="fr-btn" target="_blank" rel="noopener noreferrer" style={{ boxShadow: 'none' }}
            to={`/${roleActivated}/conseiller/${conseiller?._id}`}>
              Afficher
          </Link>
          <ReactTooltip html={true} className="infobulle" arrowColor="white"/>
        </td>
        <td>
          <Link className="fr-btn" target="_blank" rel="noopener noreferrer" style={{ boxShadow: 'none' }} to={{
            pathname: `/statistiques/conseiller/${conseiller?._id}`,
            currentPage: currentPage,
            origin: '/liste-conseillers' }}>
              Voir
          </Link>
          <ReactTooltip html={true} className="infobulle" arrowColor="white"/>
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
