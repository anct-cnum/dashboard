import React from 'react';
import PropTypes from 'prop-types';
import { structureActions } from '../../../../actions';
import { useDispatch } from 'react-redux';

const ValidatedBanner = ({ structure }) => {
  const dispatch = useDispatch();

  function closeBanner() {
    dispatch(structureActions.closeBanner('reconventionnement', structure?._id));
  }

  return (
    <div className="fr-notice fr-py-3w banner success background">
      <div className="fr-container success responsive__banner">
        <div className="fr-notice__body responsive__banner" style={{ paddingLeft: '5px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span className="fr-icon-checkbox-fill icon__color fr-mr-2w" aria-hidden="true"></span>
            <div>
              <p className="fr-notice__title title__color">
                Votre demande de reconventionnement a &eacute;t&eacute; prise en compte.
              </p>
              <p className="fr-text--md" >
                Ci-dessous, vous pouvez d&eacute;sormais proc&eacute;der &agrave; la saisie
                des contrats de vos conseillers ou aux recrutements de vos futurs conseillers.
              </p>
            </div>
          </div>
          <div className="banner__button_progress_reconventionnement">
            <button className="fr-icon-close-line" onClick={() => closeBanner()}></button>
          </div>
        </div>
      </div>
    </div>
  );
};

ValidatedBanner.propTypes = {
  structure: PropTypes.object,
};

export default ValidatedBanner;
