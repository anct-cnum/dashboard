import React from 'react';
import PropTypes from 'prop-types';
import { pluralize } from '../../../../../../utils/formatagesUtils';
import ElementNumber from './ElementNumber';
import ElementText from './ElementText';

function StatistiquesRenouvellements({ nbUsagersBeneficiantSuivi, tauxTotalUsagersAccompagnes,
  caracteresSpeciaux, nbUsagersAccompagnementIndividuel, nbUsagersAtelierCollectif, nbReconduction }) {

  return (
    <div className="fr-grid-row">
      <div className={`fr-col-12 ${nbUsagersBeneficiantSuivi.toString().length <= 4 ? 'fr-col-md-2 fr-col-lg-3' : 'text-left'} print-chiffre`}>
        <ElementNumber nombre={nbUsagersBeneficiantSuivi} classe="numbers-renewal"/>
      </div>
      <div className={`fr-col-12 ${nbUsagersBeneficiantSuivi.toString().length <= 4 ? 'fr-col-md-10 fr-col-lg-9' : ''} print-texte`}>
        <ElementText classe="text" textePluralize={pluralize(
          'Accompagnement avec suivi, soit :',
          'Accompagnement avec suivi, soit :',
          'Accompagnements avec suivi, soit :',
          nbUsagersBeneficiantSuivi
        )}/>
        <br/>
      </div>
      <div className="fr-col-12 fr-col-md-2 fr-col-lg-3 print-chiffre">
        <ElementNumber nombre={tauxTotalUsagersAccompagnes} caracteresSpeciaux={caracteresSpeciaux} classe="many-numbers"/>
      </div>
      <div className="fr-col-12 fr-col-md-10 fr-col-lg-9 print-texte">
        <ElementText texte="du total des usagers accompagnés sur cette période, dont&nbsp;:" classe="texts"/><br/>
      </div>
      <div className="fr-col-12 fr-col-md-2 fr-col-lg-3 print-chiffre">
        <ElementNumber nombre={nbUsagersAccompagnementIndividuel} classe="many-numbers"/>
      </div>
      <div className="fr-col-12 fr-col-md-10 fr-col-lg-9 print-texte">
        <ElementText texte="en accompagnement individuel" classe="texts"/>
      </div>
      <div className="fr-col-12 fr-col-md-2 fr-col-lg-3 print-chiffre">
        <ElementNumber nombre={nbUsagersAtelierCollectif} classe="many-numbers"/>
      </div>
      <div className="fr-col-12 fr-col-md-10 fr-col-lg-9 print-texte">
        <ElementText texte="en atelier collectif" classe="texts"/><br/>
      </div>
      <div className="fr-col-12 fr-col-md-2 fr-col-lg-3 print-chiffre">
        <ElementNumber nombre={nbReconduction} classe="many-numbers"/>
      </div>
      <div className="fr-col-12 fr-col-md-10 fr-col-lg-9 print-texte">
        <ElementText classe="texts" textePluralize={pluralize(
          'redirection vers une autre structure agréée',
          'redirection vers une autre structure agréée',
          'redirections vers une autre structure agréée',
          nbReconduction
        )}/>
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
