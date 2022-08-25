import React from 'react';
import PropTypes from 'prop-types';
import Pluralize from 'react-pluralize';

import ElementNumber from './ElementNumber';
import ElementText from './ElementText';

function StatistiquesAteliers({ nbAteliers, nbTotalParticipant }) {

  return (
    <div className="fr-grid-row">
      <div className="fr-col-12 fr-col-md-3"><ElementNumber nombre={nbAteliers}
        classe="numbers"/></div>
      <div className="fr-col-12 fr-col-md-9"><ElementText textePluralize={
        <Pluralize
          zero={'atelier réalisé, dont :'}
          singular={'atelier réalisé, dont :'}
          plural={'ateliers réalisés, dont :'}
          count={nbAteliers}
          showCount={false} />
      } classe="text"/><br/></div>
      <div className="fr-col-12 fr-col-md-3"><ElementNumber nombre={nbTotalParticipant}
        classe="numbers"/></div>
      <div className="fr-col-12 fr-col-md-9"><ElementText textePluralize={
        <Pluralize
          zero={'participant au total'}
          singular={'participant au total'}
          plural={'participants au total'}
          count={nbTotalParticipant}
          showCount={false} />
      } classe="text"/></div>
    </div>
  );
}

StatistiquesAteliers.propTypes = {
  nbAteliers: PropTypes.number,
  nbTotalParticipant: PropTypes.number
};

export default StatistiquesAteliers;
