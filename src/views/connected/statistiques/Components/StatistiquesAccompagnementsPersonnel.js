import React from 'react';
import PropTypes from 'prop-types';
import Pluralize from 'react-pluralize';

import ElementNumber from './ElementNumber';
import ElementText from './ElementText';

function StatistiquesAccompagnementsPersonnel({ nbAccompagnementPerso, nbDemandePonctuel }) {

  return (
    <div className="fr-grid-row">
      <div className="fr-col-12 fr-col-md-3"><ElementNumber nombre={nbAccompagnementPerso}
        classe="numbers"/></div>
      <div className="fr-col-12 fr-col-md-9"><ElementText textePluralize={
        <Pluralize
          zero={'accompagnement individuel'}
          singular={'accompagnement individuel'}
          plural={'accompagnements individuels'}
          count={nbAccompagnementPerso}
          showCount={false} />
      } classe="text"/><br/></div>
      <div className="fr-col-12 fr-col-md-3"><ElementNumber nombre={nbDemandePonctuel}
        classe="numbers"/></div>
      <div className="fr-col-12 fr-col-md-9"><ElementText textePluralize={
        <Pluralize
          zero={'demande ponctuelle'}
          singular={'demande ponctuelle'}
          plural={'demandes ponctuelles'}
          count={nbDemandePonctuel}
          showCount={false} />
      } classe="text"/></div>
    </div>
  );
}

StatistiquesAccompagnementsPersonnel.propTypes = {
  nbAccompagnementPerso: PropTypes.number,
  nbDemandePonctuel: PropTypes.number
};

export default StatistiquesAccompagnementsPersonnel;
