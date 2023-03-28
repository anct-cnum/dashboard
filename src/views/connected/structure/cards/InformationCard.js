import React from 'react';
import PropTypes from 'prop-types';

const InformationCard = () => (
  <div className="fr-callout fr-fi-information-line fr-mb-7w">
    <h4 className="fr-callout__title">
      Renouvellement : Quel est le montant de la subvention ? Quelle est la durée de la subvention et du
      contrat ?
    </h4>
    <p className="fr-callout__text">
    Le renouvellement du dispositif Conseiller num&eacute;rique France Services s&lsquo;accompagne par la
      poursuite d&lsquo;un soutien financier de l&lsquo;Etat aux structures employant des CnFS. &Agrave; ce titre, les
      structures employeuses sont &eacute;ligibles &agrave; une nouvelle convention de subvention pour une p&eacute;riode de
      trois ans si, &agrave; l&lsquo;&eacute;ch&eacute;ance de la p&eacute;riode couverte par la premi&egrave;re convention, elles souhaitent
      conserver les postes qui leurs ont &eacute;t&eacute; attribu&eacute;s. En savoir plus.
    </p>
  </div>
);

InformationCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};
export default InformationCard;
