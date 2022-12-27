import React from 'react';
import PropTypes from 'prop-types';
import { pluralize } from '../../../../../../utils/formatagesUtils';
import ElementNumber from './ElementNumber';
import ElementText from './ElementText';

function StatistiquesAccompagnements({ nbAccompagnement }) {
  return (
    <div className="fr-grid-row">
      <div className={`fr-col-12 ${nbAccompagnement.toString().length <= 4 ? 'fr-col-md-3' : ''} print-chiffre`}>
        <ElementNumber nombre={nbAccompagnement} classe="numbers"/></div>
      <div className={`fr-col-12 ${nbAccompagnement.toString().length <= 4 ? 'fr-col-md-9' : ''} print-texte`}>
        <ElementText textePluralize={pluralize(
          'accompagnement total enregistré (dont récurrent)',
          'accompagnement total enregistré (dont récurrent)',
          'accompagnements totaux enregistrés (dont récurrent)',
          nbAccompagnement
        )} classe="text"/>
      </div>
    </div>
  );
}

StatistiquesAccompagnements.propTypes = {
  nbAccompagnement: PropTypes.number,
};

export default StatistiquesAccompagnements;
