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
        <td style={{ width: '16rem' }}>{territoire?.nomDepartement ? territoire?.nomDepartement : territoire?.nomRegion}</td>
        <td style={{ width: '10rem' }}>{territoire?.CRAEnregistres ?? 0}</td>
        <td style={{ width: '16rem' }}>{totalPersonnesUniquesAccompagnees ?? 0}</td>
        <td style={{ width: '10rem' }}>{territoire?.posteValider ?? 0}</td>
        <td style={{ width: '13rem' }}>{territoire?.conseillersRecruter ?? 0}</td>
        <td>
          <Link
            className="fr-btn fr-icon-eye-line"
            to={`/statistiques-territoire/${maille}/${codeTerritoire}`}
            state={{ 'origin': '/statistiques-territoires', territoire }}
          >
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
