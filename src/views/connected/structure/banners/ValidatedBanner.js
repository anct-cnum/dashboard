import React from 'react';
import PropTypes from 'prop-types';
import { pluralize } from '../../../../utils/formatagesUtils';
import { useAdvisors } from '../hooks/useAdvisors';

const ValidatedBanner = ({ structure, setShowValidateBanner }) => {
  const {
    conseillersRecrutes,
    conseillersEnCoursDeRecrutement,
  } = useAdvisors();

  const postesOccupes = conseillersRecrutes?.length + conseillersEnCoursDeRecrutement?.length;

  function closeBanner() {
    setShowValidateBanner(false);
    localStorage.setItem('bannerClosed', 'true');
  }

  return (
    <div className="fr-notice fr-py-3w banner success background">
      <div className="fr-container success responsive__banner">
        <div className="fr-notice__body responsive__banner" style={{ paddingLeft: '5px' }}>
          <div>
            <p className="fr-notice__title title__color fr-mb-2w">
              <span className="fr-icon-checkbox-fill icon__color fr-mr-2w" aria-hidden="true"></span>
              Votre demande de reconventionnement a &eacute;t&eacute; accept&eacute;&nbsp;!
            
            </p>
            <>
              <p className="fr-text fr-text--sm">
                Vous avez obtenu{' '}
                <span className="fr-text fr-text--bold">
                  {structure?.posteValiderCoselec}{' '}
                  {pluralize('poste subventionné', 'poste subventionné', 'postes subventionnés', true)},{' '}
                </span>
                dont:
              </p>
              <ul className="fr-pl-4w">
                <li>
                  <p className="fr-text fr-text--sm">
                    {postesOccupes} {pluralize('poste occupé', 'poste occupé', 'postes occupés', true)}
                  </p>
                </li>
                <li>
                  <p className="fr-text fr-text--sm">
                    {structure?.posteValiderCoselec -
                          postesOccupes}{' '}
                    {pluralize('poste vacant', 'poste vacant', 'postes vacants', true)}
                  </p>
                </li>
              </ul>
              <p className="fr-text fr-text--sm">En savoir plus sur comment recruter vos conseillers.</p>
            </>
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
  conseillersActifs: PropTypes.array,
  setShowValidateBanner: PropTypes.func,
};

export default ValidatedBanner;
