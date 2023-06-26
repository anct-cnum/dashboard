import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import days from 'dayjs';
import { structureActions } from '../../../../actions';

const DeniedAvenantBanner = ({ structure }) => {
  const dispatch = useDispatch();

  function closeBanner() {
    dispatch(structureActions.closeBanner('avenant', structure?._id));
  }

  return (
    <div
      className="fr-notice fr-py-4w banner warning background"
    >
      <div className="fr-container warning responsive__banner">
        <span className="fr-icon-warning-fill icon__color" aria-hidden="true"></span>
        <div className="fr-notice__body responsive__banner" style={{ paddingLeft: '20px' }}>
          <div>
            <p className="fr-notice__title title__color">
              Vous avez d&eacute;pos&eacute; une demande d&apos;ajout de poste(s)
              {structure?.lastDemandeCoselec?.emetteurAvenant?.date ?
                ` le ${days(structure?.lastDemandeCoselec?.emetteurAvenant?.date).format('DD/MM/YYYY')}` :
                ' non renseignée'
              }
            </p>
            <p className="fr-text--md">
            Votre demande &agrave; &eacute;t&eacute; refus&eacute;e.
            </p>
          </div>
        </div>
        <span
          className="fr-icon-close-line"
          aria-hidden="true"
          style={{ marginLeft: '28rem', cursor: 'pointer' }}
          onClick={closeBanner}
        ></span>
      </div>
    </div>
  );
};

DeniedAvenantBanner.propTypes = {
  structure: PropTypes.object
};

export default DeniedAvenantBanner;
