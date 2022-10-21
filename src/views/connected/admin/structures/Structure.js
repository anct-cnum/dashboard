import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

function Structure({ structure, currentPage }) {

  return (
    <>
      <tr>
        <td>{structure?.idPG}</td>
        <td>{structure?.nom}</td>
        <td>{structure?.prenom}</td>
        <td>{structure?.emailCN?.address}</td>
        <td className="center-text">
          {structure?.rupture ? 'Oui' : 'Non' }
        </td>
        <td className="center-text">
          {structure?.estCoordinateur ? 'Oui' : 'Non' }
        </td>
        <td>{structure?.craCount}</td>
        <td>
          <Link className="fr-btn details-btn" target="_blank" rel="noopener noreferrer" style={{ boxShadow: 'none' }} to={{
            pathname: `/structure/${structure?._id}`,
            currentPage: currentPage,
            origin: '/liste-structures' }}>
              Afficher
          </Link>
          <ReactTooltip html={true} className="infobulle" arrowColor="white"/>
        </td>
        <td>
          <Link className="fr-btn details-btn" target="_blank" rel="noopener noreferrer" style={{ boxShadow: 'none' }} to={{
            pathname: `/statistiques/structure/${structure?._id}`,
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

Structure.propTypes = {
  structure: PropTypes.object,
  currentPage: PropTypes.number,
};

export default Structure;
