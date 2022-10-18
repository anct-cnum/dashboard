import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

function Conseiller({ conseiller, currentPage }) {

  return (
    <>
      <tr>
        <td>{conseiller?.idPG}</td>
        <td>{conseiller?.nom}</td>
        <td>{conseiller?.prenom}</td>
        <td>{conseiller?.emailCN?.address}</td>
        <td className="center-text">
          {conseiller?.rupture ? 'Oui' : 'Non' }
        </td>
        <td className="center-text">
          {conseiller?.estCoordinateur ? 'Oui' : 'Non' }
        </td>
        <td>{conseiller?.craCount}</td>
        <td>
          <Link className="fr-btn details-btn" target="_blank" rel="noopener noreferrer" style={{ boxShadow: 'none' }} to={{
            pathname: `/conseiller/${conseiller?._id}`,
            currentPage: currentPage,
            origin: '/liste-conseillers' }}>
              Afficher
          </Link>
          <ReactTooltip html={true} className="infobulle" arrowColor="white"/>
        </td>
        <td>
          <Link className="fr-btn details-btn" target="_blank" rel="noopener noreferrer" style={{ boxShadow: 'none' }} to={{
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
