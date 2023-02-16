import React from 'react';
import PropTypes from 'prop-types';
import { pluralize } from '../../../../../../utils/formatagesUtils';
import ElementNumber from './ElementNumber';
import ElementText from './ElementText';

function StatistiquesTotalAccompagnements({ nbTotalAccompagnements }) {
  return (
    <div className="fr-grid-row">
      <div className={`fr-col-12 ${nbTotalAccompagnements.toString().length <= 4 ? 'fr-col-md-3' : ''} print-chiffre`}>
        <ElementNumber nombre={nbTotalAccompagnements} classe="number"/>
      </div>
      <div className={`fr-col-12 ${nbTotalAccompagnements.toString().length <= 4 ? 'fr-col-md-9' : ''} print-texte`}>
        <ElementText classe="text" textePluralize={pluralize(
          'nouvel usager accompagné durant cette période',
          'nouvel usager accompagné durant cette période',
          'nouveaux usagers accompagnés durant cette période',
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
