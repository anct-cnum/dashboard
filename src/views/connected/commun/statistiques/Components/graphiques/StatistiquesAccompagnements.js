import React from 'react';
import PropTypes from 'prop-types';
import Pluralize from 'react-pluralize';

import ElementNumber from './ElementNumber';
import ElementText from './ElementText';

function StatistiquesAccompagnements({ nbAccompagnement }) {
  return (
    <div className="fr-grid-row">
      <div className="fr-col-12 fr-col-md-3 print-chiffre"><ElementNumber nombre={nbAccompagnement}
        classe="numbers"/></div>
      <div className="fr-col-12 fr-col-md-9 print-texte"><ElementText textePluralize={
        <Pluralize
          zero={'accompagnement total enregistré (dont récurrent)'}
          singular={'accompagnement total enregistré (dont récurrent)'}
          plural={'accompagnements total enregistrés (dont récurrent)'}
          count={nbAccompagnement}
          showCount={false} />
      } classe="text"/></div>
    </div>
  );
}

StatistiquesAccompagnements.propTypes = {
  nbAccompagnement: PropTypes.number,
};

export default StatistiquesAccompagnements;
