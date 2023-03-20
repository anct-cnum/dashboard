import React from 'react';
import PropTypes from 'prop-types';

const InformationCard = () => (
  <div className="fr-callout fr-fi-information-line fr-mb-7w">
    <h4 className="fr-callout__title">
      Renouvellement : Quel est le montant de la subvention ? Quelle est la durée de la subvention et du
      contrat ?
    </h4>
    <p className="fr-callout__text">
      Le renouvellement du dispositif Conseiller numérique France Services s&lsquo;accompagne par la
      poursuite d un soutien financier de l&lsquo;Etat aux structures employant des CnFS. À ce titre, les
      structures employeuses sont éligibles à une nouvelle convention de subvention pour une période de
      trois ans si, à l&lsquo;échéance de la période couverte par la première convention, elles souhaitent
      conserver les postes qui leurs ont été attribués. En savoir plus.
    </p>
  </div>
);

InformationCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};
export default InformationCard;
