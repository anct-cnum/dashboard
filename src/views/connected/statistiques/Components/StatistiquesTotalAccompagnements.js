import React from 'react';
import PropTypes from 'prop-types';
import Pluralize from 'react-pluralize';

import ElementNumber from './ElementNumber';
import ElementText from './ElementText';

function StatistiquesTotalAccompagnements({ type, nbTotalAccompagnements }) {

  return (
    <div className="fr-grid-row">
      <div className={ type ? 'fr-col-12' : 'fr-col-2 fr-col-lg-3' }>
        <ElementNumber nombre={nbTotalAccompagnements} classe={type ? 'number-' + type : 'number'}/>
      </div>
      <div className={ type ? 'fr-col-12' : 'fr-col-9' }>
        <ElementText textePluralize={
          <Pluralize
            zero={'personne totale accompagnée durant cette période'}
            singular={'personne totale accompagnée durant cette période'}
            plural={'personnes totales accompagnées durant cette période'}
            count={nbTotalAccompagnements}
            showCount={false} />
        } classe={type ? 'text-' + type : 'text'}/>
      </div>
    </div>
  );
}

StatistiquesTotalAccompagnements.propTypes = {
  nbTotalAccompagnements: PropTypes.number,
  type: PropTypes.string,
};

export default StatistiquesTotalAccompagnements;
