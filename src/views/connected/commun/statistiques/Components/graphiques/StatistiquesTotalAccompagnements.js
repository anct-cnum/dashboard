import React from 'react';
import PropTypes from 'prop-types';
import { pluralize } from '../../../../../../utils/formatagesUtils';
import ElementNumber from './ElementNumber';
import ElementText from './ElementText';

function StatistiquesTotalAccompagnements({ nbTotalAccompagnements }) {
  return (
    <div className="fr-grid-row">
      <div className="fr-col-12 print-chiffre">
        <ElementNumber nombre={nbTotalAccompagnements} classe="number"/>
      </div>
      <div className="fr-col-12 print-texte">
        <ElementText classe="text" textePluralize={pluralize(
          'personne totale accompagnée durant cette période',
          'personne totale accompagnée durant cette période',
          'personnes totales accompagnées durant cette période',
          nbTotalAccompagnements
        )}/>
      </div>
    </div>
  );
}

StatistiquesTotalAccompagnements.propTypes = {
  nbTotalAccompagnements: PropTypes.number,
  type: PropTypes.string,
};

export default StatistiquesTotalAccompagnements;
