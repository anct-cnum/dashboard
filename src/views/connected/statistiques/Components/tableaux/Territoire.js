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
        <td data-tip="CRA enregistrées">{territoire?.CRAEnregistres ?? 0}</td>
        <td data-tip="Personnes accompagnées">{totalPersonnesUniquesAccompagnees ?? 0}</td>
        <td data-tip="Dotation de conseillers">{territoire?.nombreConseillersCoselec ?? 0}</td>
        <td data-tip="CnFS activés">{territoire?.cnfsActives ?? 0}</td>
        <td data-tip="CnFS en attente d'activation">{territoire?.cnfsInactives ?? 0}</td>
        <td data-tip="Taux d'activation">{territoire?.tauxActivation ?? 0} %</td>
        <td>
          <Link className="fr-btn details-btn" style={{ boxShadow: 'none' }} to={{
            pathname: '/statistiques-territoire/' + codeTerritoire }} >
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
  filtreTerritoire: PropTypes.string,
  currentPage: PropTypes.number,
};

export default Territoire;
