import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { closeBannerActions } from '../../../../actions';
import { formatNomConseiller } from '../../../../utils/formatagesUtils';

const ValidatedRenouvellementBanner = ({ conseiller, setBannieresRenouvellementValide, bannieresRenouvellementValide }) => {
  const dispatch = useDispatch();
  function closeBanner() {
    setBannieresRenouvellementValide(bannieresRenouvellementValide.filter(banniere => banniere._id !== conseiller._id));
    dispatch(closeBannerActions.closeBanner('renouvellement', conseiller?.miseEnrelationId));
  }
  return (
    <div className="fr-notice banner success background fr-py-4w" style={{ position: 'absolute', top: '173px', left: '0%', right: '0%' }}>
      <div className="fr-container success responsive__banner">
        <div className="fr-notice__body responsive__banner" style={{ paddingLeft: '5px' }}>
          <div>
            <p className="fr-notice__title title__color">
              <span className="fr-icon-checkbox-fill icon__color fr-mr-2w" aria-hidden="true"></span>
              Le nouveau contrat de {conseiller ? formatNomConseiller(conseiller) : ''} est pr&ecirc;t!
              <span
                className="fr-icon-close-line"
                aria-hidden="true"
                style={{ marginLeft: '44rem', cursor: 'pointer' }}
                onClick={closeBanner}
              ></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

ValidatedRenouvellementBanner.propTypes = {
  conseiller: PropTypes.object,
  setBannieresRenouvellementValide: PropTypes.func,
  bannieresRenouvellementValide: PropTypes.array,
};

export default ValidatedRenouvellementBanner;