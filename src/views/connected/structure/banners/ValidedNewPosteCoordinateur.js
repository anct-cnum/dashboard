import React from 'react';
import { Link } from 'react-router-dom';

const ValidatedNewPosteCoordinateur = () => {

  return (
    <div className="fr-notice fr-py-4w banner notice background">
      <div className="fr-container notice responsive__banner">
        <div style={{ display: 'flex', alignItems: 'center' }} className="fr-col-12">
          <span className="fr-icon-info-fill icon__color fr-mr-2w" aria-hidden="true"></span>
          <div>
            <p className="fr-notice__title title__color">
              Un poste de coordinateur a &eacute;t&eacute; attribu&eacute; &agrave; votre structure !
            </p>
            <div className="fr-text fr-text--sm" style={{ color: '#3A3A3A' }}>
              Rendez-vous dans l&rsquo;onglet &laquo;&nbsp;G&eacute;rer mes postes&nbsp;&raquo;&nbsp;:
              <ul className="fr-mt-0" style={{ listStyleType: '-' }}>
                <li>
                  &nbsp;Si le poste concerne l&rsquo;un des conseillers num&eacute;rique de votre &eacute;quipe,
                  cliquez sur &laquo;&nbsp;Attribuer un r&ocirc;le de coordinateur&nbsp;&raquo;.
                </li>
                <li>
                  &nbsp;Si le poste concerne une nouvelle personne, cliquez sur &laquo;&nbsp;Recruter
                  un conseiller&nbsp;&raquo;.
                </li>
              </ul>
            </div>
          </div>
          <Link to="/structure/postes" className="fr-ml-auto">
            <button className="fr-btn">
              G&eacute;rer mes postes
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ValidatedNewPosteCoordinateur;
