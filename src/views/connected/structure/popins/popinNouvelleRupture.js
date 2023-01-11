import React from 'react';
import PropTypes from 'prop-types';

function popinNouvelleRupture({ setDisplayModal }) {

  return (
    <dialog aria-labelledby="fr-modal-title-modal-1" role="dialog" id="fr-modal-1" className="fr-modal modalOpened">
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
            <div className="fr-modal__body">
              <div className="fr-modal__header">
                <button className="fr-btn--close fr-btn"
                  onClick={() => setDisplayModal(false)}
                  title="Fermer la fenêtre modale" aria-controls="fr-modal-1">
                Fermer
                </button>
              </div>
              <div className="fr-modal__content">
                <h1 id="fr-modal-title-modal-1" className="fr-modal__title">
                  <span className="fr-fi-arrow-right-line fr-fi--lg" aria-hidden="true">
                  </span>Important</h1>
                <p>
                    Votre signalement de rupture de contrat <strong>a bien &eacute;t&eacute; pris en compte</strong> par nos &eacute;quipes.
                </p>
                <p>
                    Afin d&rsquo;&ecirc;tre en capacit&eacute; de finaliser celui-ci, et comme indiqu&eacute;
                    dans notre FAQ, nous vous remercions de bien vouloir nous transmettre,
                    via votre dossier sur la plateforme D&eacute;marches Simplifi&eacute;es,&nbsp;
                  <strong>tous les documents relatifs &agrave;	 la fin de contrat</strong> de votre Conseiller num&eacute;rique France Services
                    au sein de votre structure.
                </p>
                <p>
                    Une fois enregistr&eacute;s, <strong>un email vous confirmera que vous aurez la possibilit&eacute; de valider une nouvelle
                    candidature</strong> sur la plateforme.
                </p>
                <p>
                  <strong>Si vous ne souhaitez pas proc&eacute;der &agrave; un nouveau recrutement</strong>,
                    nous vous remercions de bien vouloir nous en informer
                    &agrave;	 l&rsquo;adresse suivante : <a href="mailto:conseiller-numerique@anct.gouv.fr"
                    title="conseiller-numerique@anct.gouv.fr">conseiller-numerique@anct.gouv.fr</a>, ainsi qu&rsquo;&agrave; l&rsquo;indiquer à votre
                    Pr&eacute;fecture de d&eacute;partement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );

}

popinNouvelleRupture.propTypes = {
  setDisplayModal: PropTypes.func
};

export default popinNouvelleRupture;
