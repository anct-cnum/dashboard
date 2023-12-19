import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { contratActions } from '../../../../actions';
import { formatNomConseiller } from '../../../../utils/formatagesUtils';

const RefusRecrutementBanner = ({ conseiller, idMiseEnRelation }) => {
  const dispatch = useDispatch();
  function closeBanner() {
    dispatch(contratActions.closeBannerAnnulationRecrutement(idMiseEnRelation));
  }

  return (
    <div className="fr-notice fr-py-4w banner warning background fr-mt-2w">
      <div className="fr-container warning responsive__banner">
        <div style={{ display: 'flex', alignItems: 'center' }} className="fr-col-12">
          <span className="fr-icon-info-fill icon__color fr-mr-2w" aria-hidden="true"></span>
          <div>
            <p className="fr-notice__title title__color">
              Le recrutement de {formatNomConseiller(conseiller)} a &eacute;t&eacute; refus&eacute;.
            </p>
            <p className="fr-text fr-text--sm">
              Pour toutes question, veuillez contacter le&nbsp;
              <a style={{ color: '#000091' }} href="mailto:conseiller-numerique@anct.gouv.fr">
                service support Conseiller num&eacute;rique
              </a>
            </p>
          </div>
          <button
            title="Masquer le message"
            style={{ marginLeft: 'auto' }}
            className="fr-icon-close-line icon__color"
            onClick={closeBanner}></button>
        </div>
      </div>
    </div>
  );
};

RefusRecrutementBanner.propTypes = {
  conseiller: PropTypes.object,
  idMiseEnRelation: PropTypes.string
};

export default RefusRecrutementBanner;
