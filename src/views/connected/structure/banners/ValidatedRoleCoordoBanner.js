import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { structureActions } from '../../../../actions';
import { formatNomConseiller } from '../../../../utils/formatagesUtils';

const ValidatedRoleCoordoBanner = ({ conseiller, setBannieresRoleCoordoAjoute, bannieresRoleCoordoAjoute }) => {
  const dispatch = useDispatch();
  function closeBanner() {
    setBannieresRoleCoordoAjoute(bannieresRoleCoordoAjoute.filter(banniere => banniere._id !== conseiller._id));
    dispatch(structureActions.closeBanner('roleCoordinateur', conseiller?.miseEnrelationId));
  }

  return (
    <div className="fr-notice fr-py-4w banner success background">
      <div className="fr-container success responsive__banner">
        <div className="responsive__banner">
          <div>
            <p className="fr-notice__title title__color" style={{ width: '70rem' }}>
              <span className="fr-icon-checkbox-fill icon__color" aria-hidden="true"></span>
              <span className="fr-ml-2w">
                {`Le poste de coordinateur a été attribué à ${formatNomConseiller(conseiller)}.`}
              </span>
            </p>
          </div>
          <div className="banner__button_progress_contrat">
            <button className="fr-icon-close-line" onClick={() => closeBanner()}></button>
          </div>
        </div>
      </div>
    </div>
  );
};

ValidatedRoleCoordoBanner.propTypes = {
  conseiller: PropTypes.object,
  setBannieresRoleCoordoAjoute: PropTypes.func,
  bannieresRoleCoordoAjoute: PropTypes.array,
  structure: PropTypes.object,
};

export default ValidatedRoleCoordoBanner;
