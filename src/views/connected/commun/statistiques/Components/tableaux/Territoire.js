import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

function Territoire({ territoire, filtreTerritoire }) {

  const totalPersonnesUniquesAccompagnees = territoire?.personnesAccompagnees - territoire?.personnesRecurrentes;
  const codeTerritoire = filtreTerritoire !== 'codeDepartement' ? territoire?.codeRegion : territoire?.codeDepartement;

  return (
    <>
      <tr>
        <td>{territoire?.codeDepartement ? territoire?.codeDepartement : territoire?.codeRegion}</td>
        <td>{territoire?.nomDepartement ? territoire?.nomDepartement : territoire?.nomRegion}</td>
        <td>{territoire?.CRAEnregistres ?? 0}</td>
        <td>{totalPersonnesUniquesAccompagnees ?? 0}</td>
        <td>{territoire?.nombreConseillersCoselec ?? 0}</td>
        <td>{territoire?.cnfsActives ?? 0}</td>
        <td>{territoire?.cnfsInactives ?? 0}</td>
        <td>{territoire?.tauxActivation ?? 0} %</td>
        <td>
          <Link
            className="fr-btn details-btn fr-fi-eye-line fr-btn--icon-left"
            style={{ boxShadow: 'none' }}
            to={`/statistiques-territoire/${codeTerritoire}`}
            state={{ 'origin': '/statistiques-territoires', territoire }}
          >
              D&eacute;tails
          </Link>
          <ReactTooltip html={true} className="infobulle" arrowColor="white"/>
        </td>
      </tr>
    </>
  );
}

Territoire.propTypes = {
  territoire: PropTypes.object,
  filtreTerritoire: PropTypes.string
};

export default Territoire;
