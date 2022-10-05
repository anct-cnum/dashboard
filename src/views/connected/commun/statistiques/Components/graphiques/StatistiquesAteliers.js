import React from 'react';
import PropTypes from 'prop-types';
import { pluralize } from '../../../../../../utils/formatagesUtils';
import ElementNumber from './ElementNumber';
import ElementText from './ElementText';

function StatistiquesAteliers({ nbAteliers, nbTotalParticipant }) {

  return (
    <div className="fr-grid-row">
      <div className={`fr-col-12 ${nbAteliers.toString().length <= 4 ? 'fr-col-md-3' : ''} print-chiffre`}><ElementNumber nombre={nbAteliers}
        classe="numbers"/></div>
      <div className={`fr-col-12 ${nbAteliers.toString().length <= 4 ? 'fr-col-md-9' : ''} print-texte`}>
        <ElementText textePluralize={
          pluralize(
            'atelier réalisé, dont :',
            'atelier réalisé, dont :',
            'ateliers réalisés, dont :',
            nbAteliers
          )} classe="text"/><br/>
      </div>
      <div className={`fr-col-12 ${nbAteliers.toString().length <= 4 ? 'fr-col-md-3' : ''} print-chiffre`}><ElementNumber nombre={nbTotalParticipant}
        classe="numbers"/></div>
      <div className={`fr-col-12 ${nbAteliers.toString().length <= 4 ? 'fr-col-md-9' : ''} print-texte`}>
        <ElementText classe="text" textePluralize={pluralize(
          'participant au total',
          'participant au total',
          'participants au total',
          nbTotalParticipant
        )}/>
      </div>
    </div>
  );
}

StatistiquesAteliers.propTypes = {
  nbAteliers: PropTypes.number,
  nbTotalParticipant: PropTypes.number
};

export default StatistiquesAteliers;
