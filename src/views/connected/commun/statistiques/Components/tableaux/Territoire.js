import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Territoire({ territoire, filtreTerritoire }) {

  const totalPersonnesUniquesAccompagnees = territoire?.personnesAccompagnees - territoire?.personnesRecurrentes;
  const codeTerritoire = filtreTerritoire !== 'codeDepartement' ? territoire?.codeRegion : territoire?.codeDepartement;
  const maille = filtreTerritoire !== 'codeDepartement' ? 'region' : 'departement';

  return (
    <>
      <tr>
        <td>{territoire?.codeDepartement ? territoire?.codeDepartement : territoire?.codeRegion}</td>
        <td>{territoire?.nomDepartement ? territoire?.nomDepartement : territoire?.nomRegion}</td>
        <td>{territoire?.CRAEnregistres ?? 0}</td>
        <td>{totalPersonnesUniquesAccompagnees ?? 0}</td>
        <td>{territoire?.personnesAccompagnees ?? 0}</td>
        <td>{territoire?.nombreConseillersCoselec ?? 0}</td>
        <td>{territoire?.cnfsActives ?? 0}</td>
        <td>{territoire?.cnfsInactives ?? 0}</td>
        <td>{territoire?.tauxActivation ?? 0} %</td>
        <td>
          <Link
            className="fr-btn details-btn fr-fi-eye-line fr-btn--icon-left"
            style={{ boxShadow: 'none' }}
            to={`/statistiques-territoire/${maille}/${codeTerritoire}`}
            state={{ 'origin': '/statistiques-territoires', territoire }}
          >
              D&eacute;tails
          </Link>
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
