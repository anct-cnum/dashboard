import React from 'react';
import PropTypes from 'prop-types';
import { pluralize } from '../../../../../../utils/formatagesUtils';
import ElementNumber from './ElementNumber';
import ElementText from './ElementText';

function StatistiquesAccompagnementsPersonnel({ nbAccompagnementPerso, nbDemandePonctuel }) {

  return (
    <div className="fr-grid-row">
      <div className={`fr-col-12 ${nbAccompagnementPerso.toString().length <= 4 ? 'fr-col-md-3' : ''} print-chiffre`}>
        <ElementNumber nombre={nbAccompagnementPerso} classe="numbers"/></div>
      <div className={`fr-col-12 ${nbAccompagnementPerso.toString().length <= 4 ? 'fr-col-md-9' : ''} print-texte`}>
        <ElementText classe="text" textePluralize={pluralize(
          'accompagnement individuel',
          'accompagnement individuel',
          'accompagnements individuels',
          nbAccompagnementPerso
        )}/><br/>
      </div>
      <div className={`fr-col-12 ${nbDemandePonctuel.toString().length <= 4 ? 'fr-col-md-3' : ''} print-chiffre`}>
        <ElementNumber nombre={nbDemandePonctuel} classe="numbers"/></div>
      <div className={`fr-col-12 ${nbDemandePonctuel.toString().length <= 4 ? 'fr-col-md-9' : ''} print-texte`}>
        <ElementText classe="text" textePluralize={pluralize(
          'demande ponctuelle',
          'demande ponctuelle',
          'demandes ponctuelles',
          nbDemandePonctuel
        )}/>
      </div>
    </div>
  );
}

StatistiquesAccompagnementsPersonnel.propTypes = {
  nbAccompagnementPerso: PropTypes.number,
  nbDemandePonctuel: PropTypes.number
};

export default StatistiquesAccompagnementsPersonnel;
