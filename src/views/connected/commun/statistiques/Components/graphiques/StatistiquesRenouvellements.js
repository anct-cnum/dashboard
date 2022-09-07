import React from 'react';
import PropTypes from 'prop-types';
import Pluralize from 'react-pluralize';

import ElementNumber from './ElementNumber';
import ElementText from './ElementText';

function StatistiquesRenouvellements(props) {

  return (
    <div className="fr-grid-row">
      <div className="fr-col-12 fr-col-md-2 fr-col-lg-3 print-chiffre">
        <ElementNumber nombre={props.nbUsagersBeneficiantSuivi} classe="numbers-renewal"/>
      </div>
      <div className="fr-col-12 fr-col-md-10 fr-col-lg-9 print-texte">
        <ElementText textePluralize={
          <Pluralize
            zero={'Accompagnement avec suivi, soit :'}
            singular={'Accompagnement avec suivi, soit :'}
            plural={'Accompagnements avec suivi, soit :'}
            count={props.nbUsagersBeneficiantSuivi}
            showCount={false} />
        } classe="text"/><br/>
      </div>
      <div className="fr-col-12 fr-col-md-2 fr-col-lg-3 print-chiffre">
        <ElementNumber nombre={props.tauxTotalUsagersAccompagnes} caracteresSpeciaux={props.caracteresSpeciaux} classe="many-numbers"/>
      </div>
      <div className="fr-col-12 fr-col-md-10 fr-col-lg-9 print-texte">
        <ElementText texte="du total des usagers accompagnés sur cette période, dont&nbsp;:" classe="texts"/><br/>
      </div>
      <div className="fr-col-12 fr-col-md-2 fr-col-lg-3 print-chiffre">
        <ElementNumber nombre={props.nbUsagersAccompagnementIndividuel} classe="many-numbers"/>
      </div>
      <div className="fr-col-12 fr-col-md-10 fr-col-lg-9 print-texte">
        <ElementText texte="en accompagnement individuel" classe="texts"/>
      </div>
      <div className="fr-col-12 fr-col-md-2 fr-col-lg-3 print-chiffre">
        <ElementNumber nombre={props.nbUsagersAtelierCollectif} classe="many-numbers"/>
      </div>
      <div className="fr-col-12 fr-col-md-10 fr-col-lg-9 print-texte">
        <ElementText texte="en atelier collectif" classe="texts"/><br/>
      </div>
      <div className="fr-col-12 fr-col-md-2 fr-col-lg-3 print-chiffre">
        <ElementNumber nombre={props.nbReconduction} classe="many-numbers"/>
      </div>
      <div className="fr-col-12 fr-col-md-10 fr-col-lg-9 print-texte">
        <ElementText textePluralize={<Pluralize
          zero={'redirection vers une autre structure agréée'}
          singular={'redirection vers une autre structure agréée'}
          plural={'redirections vers une autre structure agréée'}
          count={props.nbReconduction}
          showCount={false} />} classe="texts"/>
      </div>
      <div className="fr-col-12">
        <div className="fr-m-6w"></div>
      </div>
    </div>
  );
}

StatistiquesRenouvellements.propTypes = {
  nbUsagersBeneficiantSuivi: PropTypes.number,
  tauxTotalUsagersAccompagnes: PropTypes.number,
  nbUsagersAccompagnementIndividuel: PropTypes.number,
  nbUsagersAtelierCollectif: PropTypes.number,
  nbReconduction: PropTypes.number,
  caracteresSpeciaux: PropTypes.string
};


export default StatistiquesRenouvellements;
