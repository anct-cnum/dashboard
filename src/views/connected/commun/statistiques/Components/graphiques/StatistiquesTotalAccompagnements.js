import React from 'react';
import PropTypes from 'prop-types';
import Pluralize from 'react-pluralize';

import ElementNumber from './ElementNumber';
import ElementText from './ElementText';

function StatistiquesTotalAccompagnements({ nbTotalAccompagnements }) {

  return (
    <div className="fr-grid-row">
      <div className="fr-col-12 fr-col-md-3 print-chiffre">
        <ElementNumber nombre={nbTotalAccompagnements} classe="number"/>
      </div>
      <div className="fr-col-12 fr-col-md-9 print-texte">
        <ElementText textePluralize={
          <Pluralize
            zero={'personne totale accompagnée durant cette période'}
            singular={'personne totale accompagnée durant cette période'}
            plural={'personnes totales accompagnées durant cette période'}
            count={nbTotalAccompagnements}
            showCount={false} />
        } classe="text"/>
      </div>
    </div>
  );
}

StatistiquesTotalAccompagnements.propTypes = {
  nbTotalAccompagnements: PropTypes.number,
  type: PropTypes.string,
};

export default StatistiquesTotalAccompagnements;
