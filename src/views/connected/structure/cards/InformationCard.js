import React from 'react';

const InformationCard = () => (
  <div className="fr-callout fr-fi-information-line fr-mb-7w">
    <h4 className="fr-callout__title">
      Renouvellement&nbsp;: Quel est le montant de la subvention&nbsp;? Quelle est la dur&eacute;e de la subvention et du
      contrat&nbsp;?
    </h4>
    <p className="fr-callout__text">
      Le renouvellement du dispositif conseiller num&eacute;rique s&lsquo;accompagne par la
      poursuite d&lsquo;un soutien financier de l&lsquo;Etat aux structures employant des CnFS. &Agrave; ce titre, les
      structures employeuses sont &eacute;ligibles &agrave; une nouvelle convention de subvention pour une p&eacute;riode de
      trois ans si, &agrave; l&lsquo;&eacute;ch&eacute;ance de la p&eacute;riode couverte par la premi&egrave;re convention, elles souhaitent
      conserver les postes qui leurs ont &eacute;t&eacute; attribu&eacute;s.{' '}
      <a className="fr-link"
        href={`${process.env.REACT_APP_AIDE_HOSTNAME}/article/renouvellement-informations-generales-1ci8cxv/`}
        target="_blank"
        rel="noopener noreferrer">
        En savoir plus
      </a>
    </p>
  </div>
);

export default InformationCard;
