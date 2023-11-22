import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { structureActions } from '../../../../actions';
import { formatNomConseiller } from '../../../../utils/formatagesUtils';

const ValidatedRoleCoordoBanner = ({ conseiller, structure, bannieresAjoutRoleCoordinateur, setBannieresAjoutRoleCoordinateur }) => {
  const dispatch = useDispatch();
  function closeBanner() {
    setBannieresAjoutRoleCoordinateur(bannieresAjoutRoleCoordinateur.filter(banniere => banniere._id !== conseiller._id));
    dispatch(structureActions.closeBanner('ajoutRoleCoordinateur', structure._id, conseiller?._id));
  }
  return (
    <div className="fr-notice fr-py-4w banner success background">
      <div className="fr-container success responsive__banner">
        <div className="responsive__banner">
          <div>
            <p className="fr-notice__title title__color" style={{ width: '70rem' }}>
              <span className="fr-icon-checkbox-fill icon__color" aria-hidden="true"></span>
              <span className="fr-ml-2w">
                Le poste de coordinateur a &eacute;t&eacute; attribu&eacute; &agrave; {formatNomConseiller(conseiller)}
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
  setBannieresAjoutRoleCoordinateur: PropTypes.func,
  bannieresAjoutRoleCoordinateur: PropTypes.array,
  structure: PropTypes.object,
};

export default ValidatedRoleCoordoBanner;
